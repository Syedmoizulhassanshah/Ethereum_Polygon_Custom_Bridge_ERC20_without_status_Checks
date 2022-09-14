# Ethereum_Polygon_Custom_Bridge_ERC20_without_status_Checks

## Note

using node version 12.22.12

## For testnet implementation 

### Steps

1. Deploy the root contracts firsts ,deployment file 1&2,using the command:

    `truffle deploy --network roottestnet`

2. Deploy the child Contracts now, deployment file 3, using the command:

    `truffle deploy --network childtestnet`
    
3. Initialize the root contracts now, deployment file 4, using the command:
   
     `truffle deploy --reset --network roottestnet`
     
4. Initialize the child contracts now, deployment file 5, using the command:     
      
      `truffle deploy --reset --network childtestnet`

5. Now verify the root contracts, using the command:
  
   `truffle run verify <ContractName> --network roottestnet`
   
6. Now verify the child contracts, using the command:

  `truffle run verify <ContractName> --network childtestnet`
  
7. Now update the mentioned contract addresses in the ".env" file:

  ```
   ROOT_TOKEN_CONTRACT_ADDRESS = ''
   CHILD_TOKEN_CONTRACT_ADDRESS = ''
   ROOT_CHAIN_MANAGER_CONTRACT_ADDRESS = ''
   DUMMY_STATE_SENDER_CONTRACT_ADDRESS = ''
   CHILD_CHAIN_MANAGER_CONTRACT_ADDRESS = ''
  ```

8. Now run the `Approve.js` script by replacing the `ERC20Predicate' address with the updated ones in the Approve.js.

   `async function approve(ERC20Predicate, tokenAmount)`
   
9. Now run the `Deposit.js` script by replacing the `receiverAddressPolygon` and `rootTokenContractAddress` with the updated ones in the Deposit.js to lock the tokens on the ERC20Predicate contract on 
   Ethereum side.

   `async function deposit(receiverAddressPolygon, rootTokenContractAddress)`
   
10. Now run the `Validation.js` script and wait for the `WRLDERC20` tokens balance to get added on the polygon side.

11. Now run the `Burn-and-Exit.js` script by replacing the `_predicateAddress` and `_rootTokenAddress` with the updated ones in the `Burn-and-Exit.js` and  wait for the `WRLDERC20` tokens to get burned on 
    the polygon side then Exit (released) back on the Ethereum side.

    `async function Burn_And_Exit(_predicateAddress, _rootTokenAddress, _tokenAmount)` 
