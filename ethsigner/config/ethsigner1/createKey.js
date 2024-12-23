const Web3 = require("web3");

// Web3 initialization (should point to the JSON-RPC endpoint)
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

var V3KeyStore = web3.eth.accounts.encrypt(
  "2f95904123ef6d4ac0beae74b165b15722ca60b8b5e5bde04c3917670329bf7f",
  "Password1"
);
console.log(JSON.stringify(V3KeyStore));
process.exit();
