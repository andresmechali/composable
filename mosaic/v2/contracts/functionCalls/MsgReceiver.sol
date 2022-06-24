// SPDX-License-Identifier: MIT
/**
 * @summary: Represents a user's persona; an id of the user for this layer
 * @author: @gcosmintech
 */

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "../interfaces/IMsgReceiverFactory.sol";

import "../libraries/ExcessivelySafeCall.sol";

contract MsgReceiver {
    using SafeERC20 for IERC20;
    using ExcessivelySafeCall for address;

    /// @notice user address
    address public user;

    /// @notice msg receiver factory
    address public msgReceiverFactory;

    /// @notice calls that have been forwarded
    mapping(bytes32 => bool) private forwarded;

    /// @notice indicates if the contract has been initialized
    bool private _initialized;

    /// @notice event emitted when erc20 tokens are saved
    event SavedTokens(
        address indexed admin,
        address indexed token,
        address indexed receiver,
        uint256 amount
    );

    /// @notice event emitted when erc20 tokens are saved
    event SavedNFT(
        address indexed admin,
        address indexed nftContract,
        address indexed receiver,
        uint256 nftId
    );

    /// @notice event emitted when eth is saved
    event SavedETH(address indexed admin, address indexed receiver, uint256 amount);

    /// @notice forward a function call to another smart contract
    /// @param _user the user contract for which the MsgReceiver is initialized
    /// @param _msgReceiverFactory the factory address
    function init(address _user, address _msgReceiverFactory)
        external
        validAddress(_user)
        validAddress(_msgReceiverFactory)
    {
        require(!_initialized, "already initialized");
        require(msg.sender == _msgReceiverFactory, "unauthorized");
        _initialized = true;
        user = _user;
        msgReceiverFactory = _msgReceiverFactory;
    }

    /// @notice receive function
    // solhint-disable-next-line no-empty-blocks
    receive() external payable {}

    /// @notice forward a function call to another smart contract
    /// @param _feeAmount the amount of the fee taken from the contract
    /// @param _feeToken token used for fee
    /// @param _feeReceiver address receiving the fee
    /// @param _id id generated by the source layer
    /// @param _gas The amount of gas to forward to the remote contract
    /// @param _contract contract to be called
    /// @param _data function call parameters encoded along its function name
    function forwardCall(
        uint256 _feeAmount,
        address _feeToken,
        address _feeReceiver,
        bytes32 _id,
        uint256 _gas,
        address _contract,
        bytes calldata _data
    ) external payable onlyRelayer(msg.sender) returns (bool success, bytes memory returnData) {
        require(!forwarded[_id], "call already forwared");
        require(
            IMsgReceiverFactory(msgReceiverFactory).whitelistedFeeTokens(_feeToken),
            "Fee token is not whitelisted"
        );

        uint256 balance = IERC20(_feeToken).balanceOf(address(this));
        require(balance >= _feeAmount, "Not enough tokens for the fee");
        forwarded[_id] = true;
        IERC20(_feeToken).safeTransfer(_feeReceiver, _feeAmount);

        // solhint-disable-next-line avoid-low-level-calls
        (success, returnData) = _contract.excessivelySafeCall(_gas, 32, _data, msg.value);
        require(success, "Failed to forward function call");
    }

    /// @notice forward a function call to another smart contract, approve
    /// previously tokens to the target contract
    /// @param _feeAmount the amount of the fee taken from the contract
    /// @param _feeToken token used for fee
    /// @param _token erc20 token address to be approved
    /// @param _amount erc20 token amount to be approved
    /// @param _feeReceiver address receiving the fee
    /// @param _id id generated by the source layer
    /// @param _gas The amount of gas to forward to the remote contract
    /// @param _contract contract to be called
    /// @param _data function call parameters encoded along its function name
    function approveERC20TokenAndForwardCall(
        uint256 _feeAmount,
        address _feeToken,
        address _feeReceiver,
        address _token,
        uint256 _amount,
        bytes32 _id,
        uint256 _gas,
        address _contract,
        bytes calldata _data
    ) external payable onlyRelayer(msg.sender) returns (bool success, bytes memory returnData) {
        require(
            IMsgReceiverFactory(msgReceiverFactory).whitelistedFeeTokens(_feeToken),
            "Fee token is not whitelisted"
        );
        require(!forwarded[_id], "call already forwared");
        //approve tokens to _contract
        IERC20(_token).safeIncreaseAllowance(_contract, _amount);
        // solhint-disable-next-line avoid-low-level-calls
        (success, returnData) = _contract.excessivelySafeCall(_gas, 32, _data, msg.value);
        require(success, "Failed to forward function call");

        uint256 balance = IERC20(_feeToken).balanceOf(address(this));
        require(balance >= _feeAmount, "Not enough tokens for the fee");
        forwarded[_id] = true;
        IERC20(_feeToken).safeTransfer(_feeReceiver, _feeAmount);
    }

    /// @notice transfers ETH available in the contract's balance
    /// @param _receiver destination address
    /// @param _amount eth amount
    /// @param _id call id
    /// @param _feeToken fee token
    /// @param _feeAmount fee amount
    /// @param _feeReceiver fee receiver
    function saveETH(
        address _receiver,
        uint256 _amount,
        bytes32 _id,
        address _feeToken,
        uint256 _feeAmount,
        address _feeReceiver
    ) external onlyUserOrRelayer(msg.sender) validAddress(_receiver) validAmount(_amount) {
        if (msg.sender == getRelayer()) {
            require(!forwarded[_id], "call already forwared");
            require(
                IMsgReceiverFactory(msgReceiverFactory).whitelistedFeeTokens(_feeToken),
                "Fee token is not whitelisted"
            );
            forwarded[_id] = true;
            uint256 balance = IERC20(_feeToken).balanceOf(address(this));
            require(balance >= _feeAmount, "Not enough tokens for the fee");
            IERC20(_feeToken).safeTransfer(_feeReceiver, _feeAmount);
        }

        require(_amount <= address(this).balance, "Exceeds balance");
        // solhint-disable-next-line avoid-low-level-calls
        (bool success, ) = _receiver.call{value: _amount}(new bytes(0));
        require(success, "Failed to transfer ETH");
        emit SavedETH(msg.sender, _receiver, _amount);
    }

    /// @notice erc721 received hook
    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) public virtual returns (bytes4) {
        return this.onERC721Received.selector;
    }

    /// @notice transfers an NFT available in the contract's balance
    /// @param _nftContract nft contract's address
    /// @param _nftId nft id
    /// @param _receiver destination address
    /// @param _id call id
    /// @param _feeToken fee token
    /// @param _feeAmount fee amount
    /// @param _feeReceiver fee receiver
    function saveNFT(
        address _nftContract,
        uint256 _nftId,
        address _receiver,
        bytes32 _id,
        address _feeToken,
        uint256 _feeAmount,
        address _feeReceiver
    ) external onlyUserOrRelayer(msg.sender) validAddress(_nftContract) validAddress(_receiver) {
        if (msg.sender == getRelayer()) {
            require(!forwarded[_id], "call already forwared");
            require(
                IMsgReceiverFactory(msgReceiverFactory).whitelistedFeeTokens(_feeToken),
                "Fee token is not whitelisted"
            );
            forwarded[_id] = true;
            uint256 balance = IERC20(_feeToken).balanceOf(address(this));
            require(balance >= _feeAmount, "Not enough tokens for the fee");
            IERC20(_feeToken).safeTransfer(_feeReceiver, _feeAmount);
        }
        address ownerOfNft = IERC721(_nftContract).ownerOf(_nftId);
        require(ownerOfNft == address(this), "Unauthorized");
        IERC721(_nftContract).safeTransferFrom(address(this), _receiver, _nftId);
        emit SavedNFT(msg.sender, _nftContract, _receiver, _nftId);
    }

    /// @notice transfers tokens available in the contract's balance
    /// @param _token token address
    /// @param _receiver destination address
    /// @param _amount token amount
    /// @param _id call id
    /// @param _feeToken fee token
    /// @param _feeAmount fee amount
    /// @param _feeReceiver fee receiver
    function saveTokens(
        address _token,
        address _receiver,
        uint256 _amount,
        bytes32 _id,
        address _feeToken,
        uint256 _feeAmount,
        address _feeReceiver
    ) external onlyUserOrRelayer(msg.sender) validAddress(_token) validAddress(_receiver) {
        if (msg.sender == getRelayer()) {
            require(!forwarded[_id], "call already forwared");
            require(
                IMsgReceiverFactory(msgReceiverFactory).whitelistedFeeTokens(_feeToken),
                "Fee token is not whitelisted"
            );
            forwarded[_id] = true;
            uint256 balance = IERC20(_feeToken).balanceOf(address(this));
            require(balance >= _feeAmount, "Not enough tokens for the fee");
            IERC20(_feeToken).safeTransfer(_feeReceiver, _feeAmount);
        }
        uint256 tokenBalance = IERC20(_token).balanceOf(address(this));
        require(_amount <= tokenBalance, "Exceeds balance");
        IERC20(_token).safeTransfer(_receiver, _amount);
        emit SavedTokens(msg.sender, _token, _receiver, _amount);
    }

    /// @notice approve erc20 tokens to an address
    /// @param _feeAmount the amount of the fee taken from the contract
    /// @param _feeToken token used for fee
    /// @param _feeReceiver address receiving the fee
    /// @param _id id generated by the source layer
    /// @param _token erc20 token address to be approved
    /// @param _to approve token to
    /// @param _amount erc20 token amount to be approved

    function approveERC20Token(
        uint256 _feeAmount,
        address _feeToken,
        address _feeReceiver,
        bytes32 _id,
        address _token,
        address _to,
        uint256 _amount
    ) public onlyUserOrRelayer(msg.sender) validAddress(_token) validAddress(_to) {
        require(!forwarded[_id], "call already forwared");
        require(
            IMsgReceiverFactory(msgReceiverFactory).whitelistedFeeTokens(_feeToken),
            "Fee token is not whitelisted"
        );
        //approve tokens to _contract
        IERC20(_token).safeIncreaseAllowance(_to, _amount);

        uint256 balance = IERC20(_feeToken).balanceOf(address(this));
        require(balance >= _feeAmount, "Not enough tokens for the fee");
        forwarded[_id] = true;
        IERC20(_feeToken).safeTransfer(_feeReceiver, _feeAmount);
    }

    /// @notice get relayer address from factory
    function getRelayer() public view returns (address) {
        return IMsgReceiverFactory(msgReceiverFactory).relayer();
    }

    modifier onlyRelayer(address _addr) {
        require(_addr == getRelayer(), "Unauthorized - not the relayer");
        _;
    }

    modifier onlyUserOrRelayer(address _addr) {
        require(_addr == user || _addr == getRelayer(), "Only user or relayer");
        _;
    }
    modifier validAddress(address _addr) {
        require(_addr != address(0), "Invalid address");
        _;
    }

    modifier validAmount(uint256 _amount) {
        require(_amount > 0, "Invalid amount");
        _;
    }
}
