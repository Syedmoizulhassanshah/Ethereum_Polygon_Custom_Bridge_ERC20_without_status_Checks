const ChildChainManager = artifacts.require('ChildChainManager')
const ChildChainManagerProxy = artifacts.require('ChildChainManagerProxy')

const ChildERC20 = artifacts.require('ChildERC20')
const ChildMintableERC20 = artifacts.require('ChildMintableERC20')


const MaticWETH = artifacts.require('MaticWETH')
const utils = require('../migrations/utils')

module.exports = async (deployer, network, accounts) => {
  deployer.then(async () => {
    const childChainManager = await deployer.deploy(ChildChainManager)
    const childChainManagerProxy = await deployer.deploy(ChildChainManagerProxy, '0x0000000000000000000000000000000000000000')
    await childChainManagerProxy.updateAndCall(childChainManager.address, childChainManager.contract.methods.initialize(accounts[0]).encodeABI())

    await deployer.deploy(ChildERC20, 'Dummy ERC20', 'DERC20', 18, ChildChainManagerProxy.address)
    await deployer.deploy(ChildMintableERC20, 'Dummy Mintable ERC20', 'DMERC20', 18, ChildChainManagerProxy.address)

    await deployer.deploy(MaticWETH, ChildChainManagerProxy.address)

    const contractAddresses = utils.getContractAddresses()

    contractAddresses.child.ChildChainManager = ChildChainManager.address
    contractAddresses.child.ChildChainManagerProxy = ChildChainManagerProxy.address

    contractAddresses.child.DummyERC20 = ChildERC20.address
    contractAddresses.child.DummyMintableERC20 = ChildMintableERC20.address

    contractAddresses.child.MaticWETH = MaticWETH.address

    utils.writeContractAddresses(contractAddresses)
  })
}