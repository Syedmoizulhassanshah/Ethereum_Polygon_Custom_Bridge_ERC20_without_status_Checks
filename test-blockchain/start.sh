#!/usr/bin/env sh

BOR=bor
DIR=$PWD

mkdir $DIR/data
$BOR --datadir $DIR/data init $DIR/genesis.json
cp -rf $DIR/keystore $DIR/data/

$BOR --datadir $DIR/data \
  --port 30341 \
  --rpc --rpcaddr '0.0.0.0' \
  --rpcvhosts '*' \
  --rpccorsdomain '*' \
  --rpcport 8545 \
  --ipcpath $DIR/bor.ipc \
  --rpcapi 'personal,db,eth,net,web3,txpool,miner,admin,bor' \
  --syncmode 'full' \
  --networkid '15001' \
  --gasprice '0' \
  --unlock '0x96C42C56fdb78294F96B0cFa33c92bed7D75F96a,0x9fb29aac15b9a4b7f17c3385939b007540f4d791' \
  --password $DIR/password.txt \
  --allow-insecure-unlock \
  --without-heimdall \
  --mine

