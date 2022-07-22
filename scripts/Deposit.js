require('dotenv').config();
const ethers = require('ethers');
const LOCALHOST_URL_ROOT = process.env.LOCALHOST_URL_ROOT;
const PRIVATE_KEY_ROOT = process.env.PRIVATE_KEY_ROOT;
const rootChainManagerAddress = process.env.ROOT_CHAIN_MANAGER_CONTRACT_ADDRESS;
const rootChainManagerBuild = require('../build/contracts/RootChainManager.json');

const customHttpProviderRoot = new ethers.providers.JsonRpcProvider(LOCALHOST_URL_ROOT);

async function deposit(receiverAddressPolygon, rootTokenContractAddress) {

    try {
        const walletRoot = new ethers.Wallet(PRIVATE_KEY_ROOT, customHttpProviderRoot);
        const rootChainManagerContract = new ethers.Contract(rootChainManagerAddress, rootChainManagerBuild.abi, walletRoot);

        const weiAmount = ethers.utils.parseEther('1000');
        const depositData = ethers.utils.defaultAbiCoder.encode(['uint256'], [weiAmount])
        console.log("Depositing tokens.....");
        const result = await rootChainManagerContract.depositFor(receiverAddressPolygon, rootTokenContractAddress, depositData);


        console.log("Transaction Successfully Done, Tokens deposited.");
        console.log("Tx Hash :", result.hash);
    }

    catch (err) {
        console.log(err);
    }
}

deposit("0x9fB29AAc15b9A4B7F17c3385939b007540f4d791",
    "0x017660fFf7e0b4ECC5bA8641Fe55c983b159501e"
);