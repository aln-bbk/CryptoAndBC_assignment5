require("@nomicfoundation/hardhat-toolbox");
// 1. Enable environment variable management via the .env file
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      // Public RPC URL for connecting to the network
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      // Retrieve the private key from .env (PRIVATE_KEY variable)
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
