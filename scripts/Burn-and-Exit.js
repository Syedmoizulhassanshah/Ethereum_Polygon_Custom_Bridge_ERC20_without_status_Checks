require('dotenv').config();
const ethers = require('ethers');
const LOCALHOST_URL_ROOT = process.env.LOCALHOST_URL_ROOT;
const LOCALHOST_URL_CHILD = process.env.LOCALHOST_URL_CHILD;
const PRIVATE_KEY_ROOT = process.env.PRIVATE_KEY_ROOT;
const PRIVATE_KEY_CHILD = process.env.PRIVATE_KEY_CHILD;
const childTokenAddress = process.env.CHILD_TOKEN_CONTRACT_ADDRESS;
const childTokenBuild = require('../build/contracts/ChildERC20.json');
const rootChainManagerAddress = process.env.ROOT_CHAIN_MANAGER_CONTRACT_ADDRESS;
const rootChainManagerBuild = require('../build/contracts/RootChainManager.json');

const customHttpProviderRoot = new ethers.providers.JsonRpcProvider(LOCALHOST_URL_ROOT);
const customHttpProviderChild = new ethers.providers.JsonRpcProvider(LOCALHOST_URL_CHILD);


async function Burn_And_Exit(_predicateAddress, _rootTokenAddress, _tokenAmount) {

    try {
        const walletRoot = new ethers.Wallet(PRIVATE_KEY_ROOT, customHttpProviderRoot);
        const walletChild = new ethers.Wallet(PRIVATE_KEY_CHILD, customHttpProviderChild);
        const childTokenContract = new ethers.Contract(childTokenAddress, childTokenBuild.abi, walletChild);
        const rootChainManagerContract = new ethers.Contract(rootChainManagerAddress, rootChainManagerBuild.abi, walletRoot);

        // burning process mechanism
        console.log("Withdrawing the ERC20 tokens from child-chain (burning the token on polygon).");
        console.log("Burning!...");
        const burnTx = await childTokenContract.withdraw(_tokenAmount);
        console.log("This is burnTxHash:", burnTx);
        console.log("This is burnTxHash:", burnTx.hash);
        console.log("Transaction Successfully Done, ERC20 Tokens burned on the CHILD chain (polygon)");

        //exiting process mechanism
        console.log("Releasing ERC20 Tokens Locked in ERC20 Predicate on User account on Ethereum (Exiting process getting executed).");
        console.log("Exiting.......");
        const result = await rootChainManagerContract.exit(_predicateAddress, _rootTokenAddress, _tokenAmount);
        console.log("Transaction Successfully Done, Tokens Released on the ROOT Chain (Ethereum) by the ERC20Predicate.");
        console.log("Tx Hash :", result.hash);

    }
    catch (err) {
        console.log(err);
    }
}

let weiAmount = ethers.utils.parseEther('100');

Burn_And_Exit('0x32502326008d7b3bD3a2606Db9078Fb829eCAcF5', '0x017660fFf7e0b4ECC5bA8641Fe55c983b159501e', weiAmount);
