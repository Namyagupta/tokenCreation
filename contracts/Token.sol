//SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.6.0 <0.9.0;

import "hardhat/console.sol";

contract Token{
    string public name = "My Hardhat Token";
    string public symbol = "MHT";

    // The fixed amount of tokens stored in an unsigned integer type variable.
    uint256 public totalSupply = 1000000;

    // An address type variable is used to store ethereum accounts.
    address public owner;

    // A mapping is a key/value map. Here we store each account balance.
    mapping(address => uint256) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }
    function transfer(address to, uint256 amount) external {
        console.log("**Sender balance is %s **", balances[msg.sender]);
        console.log("**Sender is sending %s tokens to %s address **", amount, to);
        require(balances[msg.sender] >= amount, "Not enough tokens");

        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}