/*

Using a platform of your choice, build a smart contract that will be used to sell an asset to multiple parties. More specifically, the contract needs to allow anyone to set up an object with a fixed “price” that other users can then “purchase” stakes in. Once a purchase is initiated, the owner of the object receives funds, while the buyer gets stakes. The stakes are stored in the contract and are not transferable further.



- CreateStakeObject(objectPrice) - Anyone can set up an object with a fixed price
- PurchaseStake() - Once a purchase is initiated, the owner of the object receives funds, while the buyer gets stakes. The stakes are stored in the contract and are not transferable further

*/

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Staker {

    address public owner;
    mapping(address => uint) public stakingPrices;
    mapping(address => uint) public stakes;

    constructor() {
      // console.log("Deploying a Staker contract with owner: ", msg.sender);
      owner = msg.sender;
    }

    function createStakeObject(uint fixedObjectPrice) public {
      stakingPrices[msg.sender] = fixedObjectPrice;
      stakes[msg.sender] = fixedObjectPrice;
    }

    function purchaseStake(address payable stakeOwner) payable public {
      // console.log("Account: ",msg.sender," creating purchaseStake. Current balance:", stakes[msg.sender]);

      // uint totalStakeObjectValue = stakingPrices[stakeOwner];
      // console.log("Owner account: " ,stakes[stakeOwner]);

      stakeOwner.transfer(msg.value);
      stakes[stakeOwner] =  stakes[stakeOwner] - msg.value;
      // console.log("Owner account: " ,stakes[stakeOwner]);

      stakes[msg.sender] = msg.value;

      // console.log("Purchaser Account ", stakes[msg.sender], " Owner account: " ,stakes[stakeOwner]);

    }

    function stakingPricesBalanceOf(address account) external view returns (uint256) {
        return stakingPrices[account];
    }


    function stakesBalanceOf(address account) external view returns (uint256) {
        return stakes[account];
    }
}
