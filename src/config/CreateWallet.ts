import { Wallet } from 'ethers';
import { getInjectiveAddress } from '@injectivelabs/sdk-ts'

interface WalletInfo {
  injectiveAddress: string; // Injective-specific address (Bech32 format)
  evmAddress: string;       // Ethereum-style address
  privateKey: string;
}

// Generate a new wallet
export const createInjectiveWallet = async (): Promise<WalletInfo> => {
  const wallet = Wallet.createRandom();
  const evmAddress = wallet.address; // Ethereum-style address

  // Await the Injective address conversion
  const injectiveAddress = await getInjectiveAddress(evmAddress);

  return {
    injectiveAddress,
    evmAddress,
    privateKey: wallet.privateKey,
  };
};

// Example usage
const generateWallet = async () => {
  const newUserWallet = await createInjectiveWallet();
  console.log('Injective Wallet Address (Bech32):', newUserWallet.injectiveAddress);
  console.log('EVM-Compatible Wallet Address:', newUserWallet.evmAddress);
  console.log('Private Key:', newUserWallet.privateKey);
};

generateWallet();
