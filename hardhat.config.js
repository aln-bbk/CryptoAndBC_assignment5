require("@nomicfoundation/hardhat-toolbox");
// 1. Подключаем работу с файлом .env
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      // Публичная ссылка для подключения к сети
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      // Берем ключ из .env (переменная PRIVATE_KEY)
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};