# Overview

Opinionated XCM client to relay and composable which allows to handle local and remote transfers and inter network setups and overviews. Designed for maximal debug ability.

# Updates

```
subxt codegen --url https://rococo-rpc.polkadot.io > src/generated/rococo_relay_chain.rs 
subxt codegen --url https://dali.devnets.composablefinance.ninja > src/generated/dali_parachain.rs 
echo "pub mod rococo_relay_chain;pub mod dali_parachain;" > src/generated/mod.rs
 ```