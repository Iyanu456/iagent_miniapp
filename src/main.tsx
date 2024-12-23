import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import WalletTab from './tabs/WalletTab.tsx';
import ActivityTab from './tabs/ActivityTab.tsx';
import ProfileTab from './tabs/ProfileTab.tsx';
import TabComponent from './components/TabComponent.tsx';
import { fetchBankBalances } from './config/Query.ts';
import useAxios from './hooks/useAxios.ts';


const baseUrl = import.meta.env.VITE_BACKEND_API_URL;



interface Wallet {
  wallet_name: string;
  injective_address: string;
  evm_address: string;
  balance: number;
}

interface JarvisUserData {
  userId: string;
  wallets: Wallet[];
}


function SplashScreen() {
  return (
    <div className=' w-[100vw] grid place-items-center'>
      <h1 className='text-[2.2em] font-semibold'>Jarvis</h1>
    </div>
  );
}

function RootComponent() {
  const [activeTab, setActiveTab] = useState<string | null>('wallet');
   const [balance, setBalance] = useState<string>('0.0000');
   const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true);
   const { data, setData, error, sendRequest } = useAxios();




   useEffect(() => {
    const initializeUserData = async () => {
      // Retrieve user data from localStorage
      const savedUserData = localStorage.getItem('jarvisUserData');

      if (savedUserData) {
        // User data exists in localStorage
        setData(JSON.parse(savedUserData));
      } else {
        // User data doesn't exist; create the first wallet
        const response = await sendRequest({
          url: `${baseUrl}/api/wallet`, // Replace with your create wallet endpoint
          method: 'POST',
        });

        if (response && response.userId && response.inj_address) {
          const newUserData: JarvisUserData = {
            userId: response.userId,
            wallets: [
              { 
                injective_address: response.injective_address,
                evm_address: response.evm_address,
                wallet_name: response.wallet_name,
                balance: response.balance // 100,000,000,000,000,000
               }],
          };

          // Save user data to localStorage
          localStorage.setItem('jarvisUserData', JSON.stringify(newUserData));
        }
      }
    };

    initializeUserData();
  }, [sendRequest]);


   useEffect(() => {
    // Simulate loading or initialization
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 1500); // Hide splash screen after 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);


  
 
 
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
       setBalance('0.0000');
       return '0.0000'; // Default value in case of error
     }
   };
 
     fetchBalance(data.inj_address);
   },[])

   /*const clearUserData = () => {
    localStorage.removeItem('jarvisUserData'); // Remove stored user ID
  };*/

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
      {isSplashVisible ? (
        <SplashScreen />
      ) : (
        <div className='reveal'>
          <div className="position fixed min-h-[3.6em] w-[100vw] border-[#3a3a3a8c] max-sm:border-b-2" ></div>
        {<div>{renderTabContent()}</div>}
          
        
          <TabComponent activeTab={activeTab} setActiveTab={setActiveTab} />
      
      </div>
      )}
      
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<RootComponent />);
