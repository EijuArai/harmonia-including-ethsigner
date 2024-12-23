const Web3 = require("web3");

// Web3 initialization (should point to the JSON-RPC endpoint)
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

var V3KeyStore = web3.eth.accounts.encrypt(
  "192447412439bb90612a70366421e41c5efcba2d4e709027ca95c402c2db4184",
  "Password1"
);
console.log(JSON.stringify(V3KeyStore));
process.exit();
