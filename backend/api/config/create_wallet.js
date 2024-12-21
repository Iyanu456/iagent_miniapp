const { Wallet } = require('ethers');
const { getInjectiveAddress } = require('@injectivelabs/sdk-ts');

// Generate a new wallet
const createInjectiveWallet = async () => {
  const wallet = Wallet.createRandom();
  const evmAddress = wallet.address; // Ethereum-style address

  // Await the Injective address conversion
  const injectiveAddress = await getInjectiveAddress(evmAddress);

  console.log('Injective Wallet Address (Bech32):', injectiveAddress);
  console.log('EVM-Compatible Wallet Address:', evmAddress);
  console.log('Private Key:', wallet.privateKey);

  return {
    injectiveAddress,
    evmAddress,
    privateKey: wallet.privateKey,
  };
};


module.exports = { createInjectiveWallet };
