import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import FetchBalance from './pages/FetchBalance.tsx';
import './index.css';
//import App from './pages/App.tsx';
//import CreateWallet from './pages/CreateWallet.tsx';
import WalletTab from './tabs/WalletTab.tsx';
import ActivityTab from './tabs/ActivityTab.tsx';
import ProfileTab from './tabs/ProfileTab.tsx';
import TabComponent from './components/TabComponent.tsx';
import { fetchBankBalances } from './config/Query.ts';

function RootComponent() {
  const [activeTab, setActiveTab] = useState<string | null>('wallet');
   //const [address, setAddress] = useState<string>('');
   const [balance, setBalance] = useState<string | null>(null);
   const [error, setError] = useState<string | null>(null);
 
 
   useEffect(() => {
 
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
       console.log('request succesful');
       setBalance(formattedBalance.toFixed(3));
       return formattedBalance.toFixed(3);  
     } catch (error) {
       console.error('Error fetching balance:', error);
       setError('Error fetching balance. Please try again later.');
       setBalance('0.0000');
       return '0.0000'; // Default value in case of error
     }
   };
 
     fetchBalance('inj1rrqc20lhy48e9lxetcpxvqwj3t594hwy3q3y77');
   },[])


  const renderTabContent = () => {
    switch (activeTab) {
      case "wallet":
        return <WalletTab balance={balance} error={error} />;
      case "activity":
        return <ActivityTab />;
      case "profile":
        return <ProfileTab />;
      default:
        return <WalletTab />;
    }
  };

  return (
    <StrictMode>
      <div className="">
        {<div>{renderTabContent()}</div>}
          
        
          <TabComponent activeTab={activeTab} setActiveTab={setActiveTab} />
      
      </div>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<RootComponent />);
