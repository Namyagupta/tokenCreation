const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", function(){
    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        Token = await ethers.getContractFactory("Token");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        hardhatToken = await Token.deploy();
    });
    
    describe("Deployment", function () {
        it("Should set the right owner", async function () {
          expect(await hardhatToken.owner()).to.equal(owner.address);
        });
        it("Should assign the total supply of tokens to the owner", async function () {
          const ownerBalance = await hardhatToken.balanceOf(owner.address);
          expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        });
    });
    
    describe("Transactions", function () {
        it("Should trasfer tokens between accounts", async function () {
          //owner account to addr1.address
          await hardhatToken.transfer(addr1.address, 5);
          const addr1Balance = await hardhatToken.balanceOf(addr1.address);
          expect(addr1Balance).to.equal(5);
    
          await hardhatToken.connect(addr1).transfer(addr2.address, 5);
          const addr2Balance = await hardhatToken.balanceOf(addr2.address);
          expect(addr2Balance).to.equal(5);
        });
    
        it("Should fail if sender does not have enough tokens", async function () {
          const initialOwnerBalance = await hardhatToken.balanceOf(owner.address); //10000
          await expect(
            hardhatToken.connect(addr1).transfer(owner.address, 1) //initially - 0 tokens addr1
          ).to.be.revertedWith("Not enough tokens");
          expect(await hardhatToken.balanceOf(owner.address)).to.equal(
            initialOwnerBalance
          );
        });
    
        it("Should update balances after transfers", async function () {
          const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
          await hardhatToken.transfer(addr1.address, 5);
          await hardhatToken.transfer(addr2.address, 10);
    
          const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
          expect(finalOwnerBalance).to.equal(initialOwnerBalance - 15);
    
          const addr1Balance = await hardhatToken.balanceOf(addr1.address);
          expect(addr1Balance).to.equal(5);
          const addr2Balance = await hardhatToken.balanceOf(addr2.address);
          expect(addr2Balance).to.equal(10);
        });
    });
});

// describe("Token contract", function () {
//   it("Deployment should assign the total supply of tokens to the owner", async function () {
//     const [owner] = await ethers.getSigners();
//     console.log("Signer's Object: ", owner);
 
//     //A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts, so Token here is a factory for instances of our token contract - instance contract
//     const Token = await ethers.getContractFactory("Token");

//     //Calling deploy() on a ContractFactory will start the deployment, and return a Promise that resolves to a Contract. This is the object that has a method for each of your smart contract functions. - deploy contract
//     const hardhatToken = await Token.deploy();

//     //Once the contract is deployed, we can call our contract methods on hardhatToken and use them to get the balance of the owner account by calling balanceOf()
//     const ownerBalance = await hardhatToken.balanceOf(owner.address);
//     expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
//   });

//   it("Should Transfer tokens between accounts", async function () {
//     const [owner, addr1, addr2] = await ethers.getSigners();

//     const Token = await ethers.getContractFactory("Token");

//     const hardhatToken = await Token.deploy();

//     //Transfer 10 tokens from owner to addr1
//     await hardhatToken.transfer(addr1.address, 10);
//     expect(await hardhatToken.balanceOf(addr1.address)).to.equal(10);

//     //Transfer from addr1 to addr2
//     await hardhatToken.connect(addr1).transfer(addr2.address, 5);
//     expect(await hardhatToken.balanceOf(addr2.address)).to.equal(5);
//   });
// });