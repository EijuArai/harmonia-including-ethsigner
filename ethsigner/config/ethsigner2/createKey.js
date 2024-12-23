const Web3 = require("web3");

// Web3 initialization (should point to the JSON-RPC endpoint)
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

var V3KeyStore = web3.eth.accounts.encrypt(
  "509d9b6d669056ad19832f2dc8fed6c250695c29822e10d94db901226f5d36f7",
  "Password1"
);
console.log(JSON.stringify(V3KeyStore));
process.exit();
