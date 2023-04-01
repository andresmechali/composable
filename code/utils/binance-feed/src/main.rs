#[macro_use]
extern crate tokio;

use binance::websockets::*;
use binance::ws_model::{CombinedStreamEvent, WebsocketEvent, WebsocketEventUntag};
use futures::future::BoxFuture;
use futures::stream::StreamExt;
use serde_json::from_str;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::RwLock;
use tokio::sync::mpsc::UnboundedSender;
use tokio_tungstenite::tungstenite::Message;

#[tokio::main]
async fn main() {
	let (logger_tx, mut logger_rx) = tokio::sync::mpsc::unbounded_channel::<WebsocketEvent>();
	let (close_tx, mut close_rx) = tokio::sync::mpsc::unbounded_channel::<bool>();
	let wait_loop = tokio::spawn(async move {
		'hello: loop {
			select! {
                event = logger_rx.recv() => println!("{event:?}"),
                _ = close_rx.recv() => break 'hello
            }
		}
	});

	let streams: Vec<BoxFuture<'static, ()>> = vec![
		Box::pin(market_websocket(logger_tx.clone())),
		// Box::pin(last_price(logger_tx.clone())),
		// Box::pin(combined_orderbook(logger_tx.clone())),
		// Box::pin(custom_event_loop(logger_tx)),
	];

	for stream in streams {
		tokio::spawn(stream);
	}

	select! {
        _ = wait_loop => { println!("Finished!") }
        _ = tokio::signal::ctrl_c() => {
            println!("Closing websocket stream...");
            close_tx.send(true).unwrap();
            tokio::time::sleep(tokio::time::Duration::from_secs(1)).await;
        }
    }
}

#[allow(dead_code)]
async fn market_websocket(logger_tx: UnboundedSender<WebsocketEvent>) {
	let keep_running = AtomicBool::new(true); // Used to control the event loop
	let agg_trades: Vec<String> = vec!["btcusdt", "ethusdt"]
		.into_iter()
		.map(|symbol| agg_trade_stream(symbol))
		.collect();

	let mut web_socket: WebSockets<'_, CombinedStreamEvent<_>> =
		WebSockets::new(|event: CombinedStreamEvent<WebsocketEventUntag>| {
			if let WebsocketEventUntag::WebsocketEvent(we) = &event.data {
				if let WebsocketEvent::AggTrade(symbol) = we {
					println!("symbol: {}, price: {}", &symbol.symbol, &symbol.price);
				}
			}
			Ok(())
		});

	web_socket.connect_multiple(agg_trades).await.unwrap(); // check error
	if let Err(e) = web_socket.event_loop(&keep_running).await {
		println!("Error: {e}");
	}
	web_socket.disconnect().await.unwrap();
	println!("disconnected");
}

#[allow(dead_code)]
async fn last_price(logger_tx: UnboundedSender<WebsocketEvent>) {
	let keep_running = AtomicBool::new(true);
	let all_ticker = all_ticker_stream();
	let btcusdt: RwLock<f32> = RwLock::new("0".parse().unwrap());

	let mut web_socket: WebSockets<'_, Vec<WebsocketEvent>> = WebSockets::new(|events: Vec<WebsocketEvent>| {
		for tick_events in events {
			// logger_tx.send(tick_events.clone()).unwrap();
			if let WebsocketEvent::DayTicker(tick_event) = tick_events {
				if tick_event.symbol == "BTCUSDT" {
					let mut btcusdt = btcusdt.write().unwrap();
					*btcusdt = tick_event.average_price.parse::<f32>().unwrap();
					let btcusdt_close: f32 = tick_event.current_close.parse().unwrap();
					println!("{btcusdt} - {btcusdt_close}");

					if btcusdt_close as i32 == 7000 {
						// Break the event loop
						keep_running.store(false, Ordering::Relaxed);
					}
				}
			}
		}

		Ok(())
	});

	web_socket.connect(all_ticker).await.unwrap(); // check error
	if let Err(e) = web_socket.event_loop(&keep_running).await {
		println!("Error: {e}");
	}
	web_socket.disconnect().await.unwrap();
	println!("disconnected");
}

#[allow(dead_code)]
async fn combined_orderbook(logger_tx: UnboundedSender<WebsocketEvent>) {
	let keep_running = AtomicBool::new(true);
	let streams: Vec<String> = vec!["btcusdt", "ethusdt"]
		.into_iter()
		.map(|symbol| partial_book_depth_stream(symbol, 5, 1000))
		.collect();
	let mut web_socket: WebSockets<'_, CombinedStreamEvent<_>> =
		WebSockets::new(|event: CombinedStreamEvent<WebsocketEventUntag>| {
			if let WebsocketEventUntag::WebsocketEvent(we) = &event.data {
				logger_tx.send(we.clone()).unwrap();
			}
			let data = event.data;
			if let WebsocketEventUntag::Orderbook(orderbook) = data {
				println!("{orderbook:?}")
			}
			Ok(())
		});

	web_socket.connect_multiple(streams).await.unwrap(); // check error
	if let Err(e) = web_socket.event_loop(&keep_running).await {
		println!("Error: {e}");
	}
	web_socket.disconnect().await.unwrap();
	println!("disconnected");
}

#[allow(dead_code)]
async fn custom_event_loop(logger_tx: UnboundedSender<WebsocketEvent>) {
	let streams: Vec<String> = vec!["btcusdt", "ethusdt"]
		.into_iter()
		.map(|symbol| partial_book_depth_stream(symbol, 5, 1000))
		.collect();
	let mut web_socket: WebSockets<'_, CombinedStreamEvent<_>> =
		WebSockets::new(|event: CombinedStreamEvent<WebsocketEventUntag>| {
			if let WebsocketEventUntag::WebsocketEvent(we) = &event.data {
				logger_tx.send(we.clone()).unwrap();
			}
			let data = event.data;
			if let WebsocketEventUntag::Orderbook(orderbook) = data {
				println!("{orderbook:?}")
			}
			Ok(())
		});
	web_socket.connect_multiple(streams).await.unwrap(); // check error
	loop {
		if let Some((ref mut socket, _)) = web_socket.socket {
			if let Ok(message) = socket.next().await.unwrap() {
				match message {
					Message::Text(msg) => {
						if msg.is_empty() {
							continue;
						}
						let event: CombinedStreamEvent<WebsocketEventUntag> = from_str(msg.as_str()).unwrap();
						eprintln!("event = {event:?}");
					}
					Message::Ping(_) | Message::Pong(_) | Message::Binary(_) | Message::Frame(_) => {}
					Message::Close(e) => {
						eprintln!("closed stream = {e:?}");
						break;
					}
				}
			}
		}
	}
}