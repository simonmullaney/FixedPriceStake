const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

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

  it("Should purchase stake from different accounts", async function () {

    await staker.connect(owner).createStakeObject(10);

    let startBalanceOwner = await provider.getBalance(owner.address);
    let predictedOwnerEndBalance = startBalanceOwner.add(8);
    predictedOwnerEndBalance = predictedOwnerEndBalance.toString();
    await staker.connect(addr1).purchaseStake(owner.address,{value: 3});
    await staker.connect(addr2).purchaseStake(owner.address,{value: 5});


    let endBalanceOwner = await provider.getBalance(owner.address);
    endBalanceOwner = endBalanceOwner.toString();

    //Expect owner balance to increase by 8 Wei
    expect(endBalanceOwner).to.equal(predictedOwnerEndBalance);
    //Expect Staking price to remain at 10
    expect(await staker.stakingPricesBalanceOf(owner.address)).to.equal(10);
    //Expect owner to only have 2 stakes remaining
    expect(await staker.stakesBalanceOf(owner.address)).to.equal(2);
    //Expect addr1 to have 3 stakes
    expect(await staker.stakesBalanceOf(addr1.address)).to.equal(3);
    //Expect addr2 to have 5 stakes
    expect(await staker.stakesBalanceOf(addr2.address)).to.equal(5);
  });

  it("One account should be able to purchase multiple stakes", async function () {

    await staker.connect(owner).createStakeObject(10);

    let startBalanceOwner = await provider.getBalance(owner.address);
    let predictedOwnerEndBalance = startBalanceOwner.add(8);
    predictedOwnerEndBalance = predictedOwnerEndBalance.toString();
    await staker.connect(addr1).purchaseStake(owner.address,{value: 3});
    await staker.connect(addr1).purchaseStake(owner.address,{value: 5});


    let endBalanceOwner = await provider.getBalance(owner.address);
    endBalanceOwner = endBalanceOwner.toString();

    //Expect owner balance to increase by 8 Wei
    expect(endBalanceOwner).to.equal(predictedOwnerEndBalance);
    //Expect Staking price to remain at 10
    expect(await staker.stakingPricesBalanceOf(owner.address)).to.equal(10);
    //Expect owner to only have 2 stakes remaining
    expect(await staker.stakesBalanceOf(owner.address)).to.equal(2);
    //Expect addr1 to have 8 stakes
    expect(await staker.stakesBalanceOf(addr1.address)).to.equal(8);
  });
s
});
