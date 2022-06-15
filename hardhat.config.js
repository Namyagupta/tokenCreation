/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

const { ALCHEMY_API_KEY, GOERLI_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {},
    goerli: {
      url: ALCHEMY_API_KEY,
      accounts: [`0x${GOERLI_PRIVATE_KEY}`],
    },
  },
};
