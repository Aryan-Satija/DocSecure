require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
    sepolia:{
      url: 'https://eth-sepolia.g.alchemy.com/v2/cs051QgBT8u-XSOyrVB47gsuRLsqohQ8',
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
