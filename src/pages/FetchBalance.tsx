import { useState } from 'react';
import { fetchBankBalances } from '../config/Query.ts'; // Import the fetchBankBalances function

export default function FetchBalance() {
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<string | null>(null); // Type the balance state

 

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
    setBalance(formattedBalance.toFixed(3))
    return formattedBalance.toFixed(3);  // You can change the number of decimals as needed
  } catch (error) {
    console.error('Error fetching balance:', error);
    return '0.0000';  // Return a default value in case of error
  }
};

  return (
    <div className='w-[100vw] grid place-items-center'>
    <div className='flex flex-col gap-[1.5em] justify-center center-align'>
      {balance !== null && <p className='font-semibold text-[2em] text-center'>{balance} INJ</p>} {/* Display balance */}
      <form className='flex flex-col gap-[1.5em] min-w-[20em]' onSubmit={(e) => {
        e.preventDefault();
        (fetchBalance(address))
        }}>
        <input className='px-3 py-2 rounded-md' placeholder='Enter address here' onChange={(e) => setAddress(e.target.value)} />
        <button type='submit'>Submit</button>

        </form>
      
    </div>
    </div>
  );
}
