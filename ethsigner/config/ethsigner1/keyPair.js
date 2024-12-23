var Wallet = require("ethereumjs-wallet");
var addressData = Wallet.generate();
console.log("key: " + addressData.getPrivateKeyString().slice(2));
console.log("pub: " + addressData.getPublicKeyString().slice(2));
console.log("add: " + addressData.getAddressString().slice(2));
