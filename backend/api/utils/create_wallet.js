const { Wallet } = require('ethers');
const { getInjectiveAddress } = require('@injectivelabs/sdk-ts');

const createInjectiveWallet = async () => {
  const wallet = Wallet.createRandom();
  const evmAddress = wallet.address;

  // Ensure Injective address generation is awaited
  const injectiveAddress = await getInjectiveAddress(evmAddress);

  return {
      injectiveAddress,
      evmAddress,
      privateKey: wallet.privateKey,
  };
};



module.exports = { createInjectiveWallet };
