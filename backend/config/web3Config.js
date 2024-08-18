// backend/config/web3Config.js
const Web3 = require('web3'); // Ensure Web3 is properly required
const Election = require('../build/contracts/Election.json'); // Adjust the path if necessary

// Web3 v1.x.x: Proper instantiation
const web3 = new Web3('http://127.0.0.1:7545'); // Using the 'new' keyword in v1.x.x

// Replace this with your actual deployed contract address on Ganache
const contractAddress = '0xcdb4aA2F0E45714c497264AB8e425aDA3bf6aB0f';

const election = new web3.eth.Contract(Election.abi, contractAddress); // Use `web3.eth.Contract`

module.exports = { web3, election };
