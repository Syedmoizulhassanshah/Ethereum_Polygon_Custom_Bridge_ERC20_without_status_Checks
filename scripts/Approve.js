require('dotenv').config();
const ethers = require('ethers');
const LOCALHOST_URL_ROOT = process.env.LOCALHOST_URL_ROOT;
const PRIVATE_KEY_ROOT = process.env.PRIVATE_KEY_ROOT;
const rootTokenAddress = process.env.ROOT_TOKEN_CONTRACT_ADDRESS;
const rootTokenBuild = require('../build/contracts/DummyERC20.json');

const customHttpProviderRoot = new ethers.providers.JsonRpcProvider(LOCALHOST_URL_ROOT);

async function approve(ERC20Predicate, tokenAmount) {

    try {
        const walletRoot = new ethers.Wallet(PRIVATE_KEY_ROOT, customHttpProviderRoot);
        const rootTokenContract = new ethers.Contract(rootTokenAddress, rootTokenBuild.abi, walletRoot);

        console.log("Approving ERC20Predicate Contract.");
        const result = await rootTokenContract.approve(ERC20Predicate, tokenAmount);
        console.log("Transaction Successfully Done");
        console.log("Tx Hash :", result.hash);
    }

    catch (err) {
        console.log(err);
    }
}

let weiAmount = ethers.utils.parseEther('1000');

approve(
    "0x32502326008d7b3bD3a2606Db9078Fb829eCAcF5",
    weiAmount
);
