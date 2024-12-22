const { Wallet } = require('ethers');
const { getInjectiveAddress } = require('@injectivelabs/sdk-ts');

const createInjectiveWallet = async () => {
  const wallet = Wallet.createRandom();
  const evmAddress = wallet.address;

  // Ensure Injective address generation is awaited
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
