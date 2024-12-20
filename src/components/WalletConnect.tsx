import React, { useState } from 'react';
import { Wallet } from '@injectivelabs/wallet-ts';
import { getAddresses } from '../config/walletConnection.ts';
import { fetchBankBalances } from '../config/Query.ts'; // Import the fetchBankBalances function

export default function ConnectWalletButton() {
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<string | null>(null); // Type the balance state

  const connectWallet = async () => {
    try {
      const addresses = await getAddresses(Wallet.Keplr);
      setAddress(addresses[0]);
      
      // After setting the address, fetch balance
      const fetchedBalance = await fetchBalance(addresses[0]);
      setBalance(fetchedBalance);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  // Fetch balance for the connected address
  const fetchBalance = async (injectiveAddress: string): Promise<string> => {
  try {
    const response = await fetchBankBalances(injectiveAddress);  // Fetch the response
    console.log(response);  // Log the entire response to check the structure

    // Assuming the response contains 'balances' field with 'denom' and 'amount'
    const balanceData = response.balances[0];
    const amount = balanceData?.amount || '0';

    // Convert the balance from smallest units (e.g., 1e18) to human-readable format
    const formattedBalance = parseFloat(amount) / 1e18;  // Adjust based on the smallest unit (1e18 for INJ)
    
    // Format the balance to 4 decimal places
    return formattedBalance.toFixed(3);  // You can change the number of decimals as needed
  } catch (error) {
    console.error('Error fetching balance:', error);
    return '0.0000';  // Return a default value in case of error
  }
};

  return (
    <div className='flex flex-col gap-[1.5em] justify-center center-align'>
      {balance !== null && <p className='font-semibold text-[2em] text-center'>{balance} INJ</p>} {/* Display balance */}
      <button onClick={connectWallet}>Connect Wallet</button>
      {address && <p>{address}</p>}
      
    </div>
  );
}
