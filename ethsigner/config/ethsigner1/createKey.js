const Web3 = require("web3");

// Web3 initialization (should point to the JSON-RPC endpoint)
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

var V3KeyStore = web3.eth.accounts.encrypt(
  "b528a45d1eefdb27b55f338daf0b0ce2efa2ecadcca4f6bafa62ae3c121d60a9",
  "Password1"
);
console.log(JSON.stringify(V3KeyStore));
process.exit();
