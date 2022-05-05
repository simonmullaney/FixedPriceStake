# FixedPriceStake

Using a platform of your choice, build a smart contract that will be used to sell an asset to multiple parties. More specifically, the contract needs to allow anyone to set up an object with a fixed “price” that other users can then “purchase” stakes in. Once a purchase is initiated, the owner of the object receives funds, while the buyer gets stakes. The stakes are stored in the contract and are not transferable further.

## Prerequisites

Prerequisites for this project include: Node.js, NPM and Hardhat

## Installation

Git clone the repository. Change directory to root and run:

```
npm install
```

## Testing

run ```npx hardhat test``` to run test cases found in `./test/stakerTest.js`

## Deployment

### Hardhat

To deploy contract to embedded instance of Ethereum Hardhat Network run:

```
npx hardhat run scripts/deploy.js
```

### To Deploy to Ropsten test network:

Change `./scripts/deploy.js` to below template (Requires ALCHEMY_API_KEY, ROPSTEN_PRIVATE_KEY):

```
require("@nomiclabs/hardhat-waffle");

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = "KEY";

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const ROPSTEN_PRIVATE_KEY = "YOUR ROPSTEN PRIVATE KEY";

module.exports = {
  solidity: "0.7.3",
  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${c}`]
    }
  }
};

```
Run `npx hardhat run scripts/deploy.js --network ropsten` to deploy to Ropsten testnet
