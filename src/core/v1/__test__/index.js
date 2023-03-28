var Web3 = require('web3');
// var provider = 'https://mainnet.infura.io/v3/b1a0f70afcec4336be3baedce97b486e';
// var provider = 'https://cloudflare-eth.com/';
var provider = 'https://eth-mainnet.public.blastapi.io';

var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);
web3.eth
  .getBlockNumber()
  .then((result) => {
    console.log('Latest Ethereum Block is ', result);
  })
  .catch((error) => {
    console.error(error);
  });
