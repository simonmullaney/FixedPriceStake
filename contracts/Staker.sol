/*

Using a platform of your choice, build a smart contract that will be used to sell an asset to multiple parties. More specifically, the contract needs to allow anyone to set up an object with a fixed “price” that other users can then “purchase” stakes in. Once a purchase is initiated, the owner of the object receives funds, while the buyer gets stakes. The stakes are stored in the contract and are not transferable further.

*/

//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;


contract Staker {

    address public owner;
    mapping(address => uint) public stakingPrices;
    mapping(address => uint) public stakes;

    constructor() {
      owner = msg.sender;
    }

    /*
    Function to allow anyone to set up an object with a fixed price
    */
    function createStakeObject(uint fixedObjectPrice) public {
      stakingPrices[msg.sender] = fixedObjectPrice;
      stakes[msg.sender] = fixedObjectPrice;
    }

    /*
    Function to allow users to purchase stakes. Once a purchase is initiated, the owner of the object receives funds, while the buyer gets stakes.
    */
    function purchaseStake(address payable stakeOwner) payable public {
      stakeOwner.transfer(msg.value);
      stakes[stakeOwner] =  stakes[stakeOwner] - msg.value;
      stakes[msg.sender] = stakes[msg.sender] + msg.value;
    }

    /*
    Given an address return the fixed price stake created by that address
    */
    function stakingPricesBalanceOf(address account) external view returns (uint256) {
        return stakingPrices[account];
    }

    /*
    Given an address return the fixed price stake created by that address
    */
    function stakesBalanceOf(address account) external view returns (uint256) {
        return stakes[account];
    }
}
