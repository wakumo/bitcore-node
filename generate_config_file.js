const fs = require("fs");

(function () {
  let config = {
    "version": "5.0.0-beta.44",
    "network": process.env.BITCOIN_NETWORK || "livenet",
    "port": 3000,
    "services": [
      "web",
      "insight-api",
      "bitcoind"
    ],
    "servicesConfig": {
      "insight-api": {
        "cwdRequirePath": "node_modules/insight-api",
        "requirePath": "node_modules/insight-api",
      },
      "insight-ui": {
        "cwdRequirePath": "node_modules/insight-ui"
      },
      "bitcoind": {
        "connect": [
          {
            "rpchost": process.env.BITCOIND_HOST,
            "rpcport": process.env.BITCOIND_PORT || (process.env.BITCOIN_NETWORK === "testnet" ? 18332 : 8332),
            "rpcuser": process.env.BITCOIND_USER || "bitcoin-rpc",
            "rpcpassword": process.env.BITCOIND_PASS || "bitcoin-rpc-pass",
            "zmqpubrawtx": process.env.BITCOIND_ZMQ
          }
        ]
      }
    }
  };
  return fs.writeFileSync("bitcore-node.json", JSON.stringify(config, null, 2));
})();