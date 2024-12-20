import { useState } from 'react';
import { Wallet } from '@injectivelabs/wallet-ts';
import { getAddresses } from '../config/walletConnection.ts';
import { fetchBankBalances } from '../config/Query.ts';



export default function ConnectWalletButton() {
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      const isTelegramWebView = !!window.Telegram?.WebApp?.initData;

      if (isTelegramWebView) {
        // Use Keplr deep link for Telegram
        const keplrDeepLink = 'keplrwallet://walletconnect';
        window.open(keplrDeepLink, '_self');
      } else if (window.keplr) {
        // Use Keplr browser extension for non-Telegram environments
        const addresses = await getAddresses(Wallet.Keplr);
        setAddress(addresses[0]);

        // Fetch and set the balance after connecting the wallet
        const fetchedBalance = await fetchBalance(addresses[0]);
        setBalance(fetchedBalance);
      } else {
        alert(
          'Keplr Wallet not detected. Please install the extension or mobile app.'
        );
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setError(`${error}`);
    }
  };

  // Fetch balance for the connected address
  const fetchBalance = async (injectiveAddress: string): Promise<string> => {
    try {
      const response = await fetchBankBalances(injectiveAddress);
      console.log(response); // Log the response to check the structure

      // Assuming the response contains 'balances' field with 'denom' and 'amount'
      const balanceData = response.balances[0];
      const amount = balanceData?.amount || '0';

      // Convert balance to a human-readable format (adjust based on smallest unit)
      const formattedBalance = parseFloat(amount) / 1e18;

      // Format the balance to 4 decimal places
      return formattedBalance.toFixed(3);
    } catch (error) {
      console.error('Error fetching balance:', error);
      return '0.0000'; // Default value in case of error
    }
  };

  return (
    <div className="flex flex-col gap-[1.5em] justify-center center-align">
      {balance !== null && (
        <p className="font-semibold text-[2em] text-center">{balance} INJ</p>
      )} 
      <button
        onClick={connectWallet}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Connect Wallet
      </button>
      {address && <p className="text-gray-700">Address: {address}</p>}
      {error && <p className="text-white">Error</p>}
    </div>
  );
}
