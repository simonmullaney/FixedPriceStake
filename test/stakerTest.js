const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");


// `beforeEach` will run before each test, re-deploying the contract every
// time. It receives a callback, which can be async.
beforeEach(async function () {
  // Get the ContractFactory and Signers here.
  const Staker = await ethers.getContractFactory("Staker");
  [owner, addr1, addr2] = await ethers.getSigners();
  provider = waffle.provider;
  staker = await Staker.deploy();
});

describe("Staker contract deployment", function () {

  it("Should set the right owner", async function () {
    expect(await staker.owner()).to.equal(owner.address);
  });
});

describe("Staker transactions", function () {
  it("Should create two stake objects from different accounts", async function () {

    await staker.connect(owner).createStakeObject(10);
    await staker.connect(addr1).createStakeObject(100);
    expect(await staker.stakingPricesBalanceOf(owner.address)).to.equal(10);
    expect(await staker.stakingPricesBalanceOf(addr1.address)).to.equal(100);
    expect(await staker.stakesBalanceOf(owner.address)).to.equal(10);
    expect(await staker.stakesBalanceOf(addr1.address)).to.equal(100);

  });

  it("Should purchase stake", async function () {
    const startBalanceOwner = await provider.getBalance(owner.address);
    const predictedEndBalance = startBalanceOwner - 8;
    await staker.connect(owner).createStakeObject(10);
    await staker.connect(addr1).purchaseStake(owner.address,{value: 3});
    await staker.connect(addr2).purchaseStake(owner.address,{value: 5});
    const endBalanceOwner = await provider.getBalance(owner.address);
    expect(endBalanceOwner).to.equal(predictedEndBalance);
    expect(await staker.stakingPricesBalanceOf(owner.address)).to.equal(10);
    expect(await staker.stakesBalanceOf(owner.address)).to.equal(2);
    expect(await staker.stakesBalanceOf(addr1.address)).to.equal(3);
    expect(await staker.stakesBalanceOf(addr2.address)).to.equal(5);
  });

  it("Should not transfer stakes", async function () {

  });
});
