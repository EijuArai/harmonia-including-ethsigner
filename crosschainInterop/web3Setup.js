const {
  setupNetwork,
  setupIntegration,
  updateConfig,
} = require("./web3Deploy");
const path = require("path");
const w3 = require("web3");
const web3 = new w3();

const cordaRequestFollowLeg = {
  prototype: "requestFollowLeg(string,string,string,address,uint256,uint256)",
  command: "net.corda.samples.example.contracts.DCRContract$Commands$Earmark",
  signature: web3.eth.abi.encodeFunctionSignature(
    "requestFollowLeg(string,string,string,address,uint256,uint256)"
  ),
  handlers: [
    {
      fingerprint: "net.corda:DldW9yS4tBOze6qv6U4QTA==",
      componentIndex: "0x00",
      describedSize: "0x08",
      describedType: "String",
      describedPath: "0x06",
      solidityType: "string",
      calldataPath: "0x00",
      parser: "PathParser",
    },
    {
      fingerprint: "net.corda:ngdwbt6kRT0l5nn16uf87A==",
      componentIndex: "0x01",
      describedSize: "0x06",
      describedType: "String",
      describedPath: "0x00",
      solidityType: "string",
      calldataPath: "0x01",
      parser: "PartyParser",
    },
    {
      fingerprint: "net.corda:ngdwbt6kRT0l5nn16uf87A==",
      componentIndex: "0x00",
      describedSize: "0x06",
      describedType: "String",
      describedPath: "0x00",
      solidityType: "string",
      calldataPath: "0x02",
      parser: "PartyParser",
    },
    {
      fingerprint: "",
      componentIndex: "0x00",
      describedSize: "0x00",
      describedType: "",
      describedPath: "0x00",
      solidityType: "address",
      calldataPath: "0x03",
      parser: "NoParser",
    },
    {
      fingerprint: "",
      componentIndex: "0x00",
      describedSize: "0x00",
      describedType: "",
      describedPath: "0x00",
      solidityType: "uint256",
      calldataPath: "0x04",
      parser: "NoParser",
    },
    {
      fingerprint: "net.corda:DldW9yS4tBOze6qv6U4QTA==",
      componentIndex: "0x00",
      describedSize: "0x08",
      describedType: "String",
      describedPath: "0x07",
      solidityType: "uint256",
      calldataPath: "0x05",
      parser: "PathParser",
    },
  ],
};
const cordaPerformCancellation = {
  prototype: "performCancellation(string,string,string)",
  command: "net.corda.samples.example.contracts.XVPContract$Commands$Cancel",
  signature: web3.eth.abi.encodeFunctionSignature(
    "performCancellation(string,string,string)"
  ),
  handlers: [
    {
      fingerprint: "net.corda:9GdANdKRptKFtq6zQDfG+A==",
      componentIndex: "0x00",
      describedSize: "0x06",
      describedType: "String",
      describedPath: "0x05",
      solidityType: "string",
      calldataPath: "0x00",
      parser: "PathParser",
    },
    {
      fingerprint: "net.corda:ngdwbt6kRT0l5nn16uf87A==",
      componentIndex: "0x00",
      describedSize: "0x06",
      describedType: "String",
      describedPath: "0x00",
      solidityType: "string",
      calldataPath: "0x01",
      parser: "PartyParser",
    },
    {
      fingerprint: "net.corda:ngdwbt6kRT0l5nn16uf87A==",
      componentIndex: "0x01",
      describedSize: "0x06",
      describedType: "String",
      describedPath: "0x00",
      solidityType: "string",
      calldataPath: "0x02",
      parser: "PartyParser",
    },
  ],
};
const cordaParameterHandlers = [
  cordaRequestFollowLeg,
  cordaPerformCancellation,
];

// Specific test setup will set up an Ethereum network to work with an Adhara Corda App and Corda transaction based proofs.
async function main() {
  let configGBP = {
    networkName: "bc-local-gbp",
    networkId: 44844,
    ethProvider: "http://localhost:8545",
    web3Provider: "http://localhost:18545",
    logLevel: "silent",
    deployerAddress: "0x91dda694a388858d5c13fa8543b36b089d92a39a",
    localNetworkId: 1, // Local Ethereum ledger
    remoteNetworks: [
      {
        cordaNetworkId: 0, // Remote Corda ledger
        cordaPartyAKey:
          "0xe7cde091a026eeb55d4ff2c5b111fd4d1a280f26a16799aca138d4f02cfca4f7",
        cordaPartyALocalId: "HTUSUS00GBP",
        cordaPartyARemoteId: "Tz1QYXJ0eUEsIEw9TG9uZG9uLCBDPUdC", // O=PartyA, L=London, C=GB
        cordaPartyBKey:
          "0x0a074c1f8fa27fe09ae14c33e5bab2140275fdb147991e2f898b29ed45c22fa4",
        cordaPartyBLocalId: "HTGBGB00GBP",
        cordaPartyBRemoteId: "Tz1QYXJ0eUIsIEw9TmV3IFlvcmssIEM9VVM=", // O=PartyB, L=New York, C=US
        cordaNotaryKey:
          "0xfd68ad9b80ca1f510968bfb6a5d04da6d2508546b990c554de41746b129d1a2b",
        cordaParameterHandlers: cordaParameterHandlers,
      },
      {
        ethNetworkId: 2, // Remote Ethereum ledger
        ethValidatorAddresses: ["0xca31306798b41bc81c43094a1e0462890ce7a673"],
        ethPartyALocalId: "HTGBGB00GBP",
        ethPartyARemoteId: "HTGBGB00USD",
        ethPartyBLocalId: "HTUSUS00GBP",
        ethPartyBRemoteId: "HTUSUS00USD",
      },
    ],
    holdNotaryId: "NOTARY00XVP",
    tokenAccount: "HTGBGB00GBP",
    tokenAmount: "100000000000",
  };
  let configUSD = {
    networkName: "bc-local-usd",
    networkId: 55755,
    ethProvider: "http://localhost:7545",
    web3Provider: "http://localhost:17545",
    logLevel: "silent",
    deployerAddress: "0x9a6ebb71415a32a2a20a0cbde5385f4ba15aa2df",
    localNetworkId: 2, // Local Ethereum ledger
    remoteNetworks: [
      {
        cordaNetworkId: 0, // Remote Corda ledger
        cordaPartyAKey:
          "0xe7cde091a026eeb55d4ff2c5b111fd4d1a280f26a16799aca138d4f02cfca4f7",
        cordaPartyALocalId: "HTGBGB00USD",
        cordaPartyARemoteId: "Tz1QYXJ0eUEsIEw9TG9uZG9uLCBDPUdC", // O=PartyA, L=London, C=GB
        cordaPartyBKey:
          "0x0a074c1f8fa27fe09ae14c33e5bab2140275fdb147991e2f898b29ed45c22fa4",
        cordaPartyBLocalId: "HTUSUS00USD",
        cordaPartyBRemoteId: "Tz1QYXJ0eUIsIEw9TmV3IFlvcmssIEM9VVM=", // O=PartyB, L=New York, C=US
        cordaNotaryKey:
          "0xfd68ad9b80ca1f510968bfb6a5d04da6d2508546b990c554de41746b129d1a2b",
        cordaParameterHandlers: cordaParameterHandlers,
      },
      {
        ethNetworkId: 1, // Remote Ethereum ledger
        ethValidatorAddresses: ["0xca31306798b41bc81c43094a1e0462890ce7a673"],
        ethPartyALocalId: "HTGBGB00USD",
        ethPartyARemoteId: "HTGBGB00GBP",
        ethPartyBLocalId: "HTUSUS00USD",
        ethPartyBRemoteId: "HTUSUS00GBP",
      },
    ],
    holdNotaryId: "NOTARY00XVP",
    tokenAccount: "HTUSUS00USD",
    tokenAmount: "100000000000",
  };

  let deployedGBP = await setupNetwork(configGBP);
  await updateConfig(
    path.resolve("./config/config.json"),
    configGBP.localNetworkId,
    deployedGBP
  );
  let deployedUSD = await setupNetwork(configUSD);
  await updateConfig(
    path.resolve("./config/config.json"),
    configUSD.localNetworkId,
    deployedUSD
  );

  configGBP.remoteNetworks[0].connectorContract =
    "0x0000000000000000000000000000000000000000";
  configGBP.remoteNetworks[1].authenticatedContracts = [
    deployedUSD.crosschainXvP.address,
    deployedUSD.validatorSetManager.address,
  ];
  configGBP.remoteNetworks[1].connectorContract =
    deployedUSD.crosschainMessaging.address;
  //console.log(JSON.stringify(configGBP))
  await setupIntegration(configGBP, deployedGBP);

  configUSD.remoteNetworks[0].connectorContract =
    "0x0000000000000000000000000000000000000000";
  configUSD.remoteNetworks[1].authenticatedContracts = [
    deployedGBP.crosschainXvP.address,
    deployedGBP.validatorSetManager.address,
  ];
  configUSD.remoteNetworks[1].connectorContract =
    deployedGBP.crosschainMessaging.address;
  //console.log(JSON.stringify(configUSD))
  await setupIntegration(configUSD, deployedUSD);
}

main();
