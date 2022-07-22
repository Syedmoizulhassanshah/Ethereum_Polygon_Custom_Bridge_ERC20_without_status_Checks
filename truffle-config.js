require('babel-register')
require('babel-polyfill')
require('dotenv').config();

/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

const HDWalletProvider = require('@truffle/hdwallet-provider')

// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

const MNEMONIC = process.env.MNEMONIC || 'extend memory song illness rack want century noodle scrap sound remember era'


module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  plugins: [
    'truffle-plugin-verify'
  ],

  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
    polygonscan: process.env.POLYGONSCAN_API_KEY
  },

  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      network_id: '*', // match any network
      skipDryRun: true,
      gas: 4500000,
    },
    root: {
      host: 'localhost',
      port: 7545,
      network_id: '*', // match any network
      skipDryRun: true,
      gas: 4500000,
    },
    child: {
      host: 'localhost',
      port: 9545,
      network_id: '*', // match any network
      skipDryRun: true,
      gas: 4500000,
    },
    roottestnet: {
      provider: () =>
        new HDWalletProvider(
          'extend memory song illness rack want century noodle scrap sound remember era',
          `https://goerli.infura.io/v3/6b3d4151d1a347c0b9c3e4058c04c151`
        ),
      network_id: 5,
      //   gas: 7000000,
      //   gasPrice: 10000000000,
      networkCheckTimeout: 100000,
      // confirmations: 1,    // # of confs to wait between deployments. (default: 0)
      // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          'extend memory song illness rack want century noodle scrap sound remember era',
          'https://rinkeby.infura.io/v3/6b3d4151d1a347c0b9c3e4058c04c151'
        ),
      network_id: 4,
      // gas: 7000000,
      // gasPrice: 10000000000,
      networkCheckTimeout: 100000,
      // confirmations: 1,    // # of confs to wait between deployments. (default: 0)
      // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          'extend memory song illness rack want century noodle scrap sound remember era',
          'https://ropsten.infura.io/v3/6b3d4151d1a347c0b9c3e4058c04c151'
        ),
      network_id: 3,
      // gas: 7000000,
      // gasPrice: 10000000000,
      networkCheckTimeout: 100000,
      // confirmations: 1,    // # of confs to wait between deployments. (default: 0)
      // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true
    },

    childtestnet: {
      provider: () =>
        new HDWalletProvider(
          'extend memory song illness rack want century noodle scrap sound remember era',
          'https://polygon-mumbai.g.alchemy.com/v2/KW2WE392WX-OtD0lA5va_tMi5vMtbh-N'
          // 'https://rpc-mumbai.maticvigil.com/'
          //'https://rpc-mumbai.matic.today'
          // 'https://matic-mumbai.chainstacklabs.com'
        ),
      network_id: 80001,
      // gas: 7000000,
      // gasPrice: 10000000000,
      networkCheckTimeout: 100000,
      //  confirmations: 1,    // # of confs to wait between deployments. (default: 0)
      // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true
    },

    mainnetRoot: {
      provider: () =>
        new HDWalletProvider(
          MNEMONIC,
          `https://mainnet.infura.io/v3/${API_KEY}`
        ),
      network_id: 1,
      gas: 7000000,
      gasPrice: 10000000000, // 10 gwei
      skipDryRun: true
    },

    mainnetChild: {
      provider: () =>
        new HDWalletProvider(
          MNEMONIC,
          'https://rpc-mainnet.matic.network'
        ),
      network_id: 137,
      gas: 7000000,
      gasPrice: 10000000000, // 10 gwei
      skipDryRun: true
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: 'USD',
      gasPrice: 21,
      outputFile: '/dev/null',
      showTimeSpent: true
    }
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.6.6', // Fetch exact version from solc-bin (default: truffle's version)
      docker: false, // Use "0.5.1" you've installed locally with docker (default: false)
      parser: 'solcjs',
      settings: { // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: 'istanbul'
      }
    }
  },

  verify: {
    preamble: 'Matic PoS Portal'
  },

}
