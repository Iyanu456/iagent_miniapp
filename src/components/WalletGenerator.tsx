import React, { useState } from 'react';
import { createInjectiveWallet } from '../config/CreateWallet'; // Updated import to match the new function

interface WalletInfo {
  bech32Address: string; // Injective-specific address
  evmAddress: string;    // Ethereum-compatible address
  privateKey: string;
}

const WalletGenerator: React.FC = () => {
  const [wallet, setWallet] = useState<WalletInfo | any>(null);

  const handleGenerateWallet = async (): Promise<void> => {
    const newWallet = await createInjectiveWallet(); // Await the wallet creation
    setWallet(newWallet);
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center mb-4">Injective Wallet Generator</h1>
        <button
          onClick={handleGenerateWallet}
          className="w-full bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Generate Wallet
        </button>

        {wallet && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Wallet Details:</h2>
            <div className="p-4 rounded">
              <p>
                <strong>Bech32 Address (Injective):</strong>
                <br />
                {wallet.injectiveAddress}
              </p>
              <p className="mt-4">
                <strong>EVM-Compatible Address:</strong>
                <br />
                {wallet.evmAddress}
              </p>
              <p className="mt-4">
                <strong>Private Key:</strong>
                <br />
                {wallet.privateKey}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletGenerator;
