import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import WalletTab from "./tabs/WalletTab.tsx";
import ActivityTab from "./tabs/ActivityTab.tsx";
import ProfileTab from "./tabs/ProfileTab.tsx";
import TabComponent from "./components/TabComponent.tsx";
import useAxios from "./hooks/useAxios.ts";
import fetchBalance from "./config/FetchBalance.ts";

//const baseUrl = import.meta.env.VITE_BACKEND_API_URL;

interface Wallet {
  wallet_name: string;
  injective_address: string;
  evm_address: string;
  balance: number;
}

interface JarvisUserData {
  userId: string;
  currentWallet: string;
  wallets: Wallet[];
}

function SplashScreen() {
  return (
    <div className="w-[100vw] h-[100vh] grid place-items-center">
      <img src="/Jarvis logo.png"  className="max-h-[20em] max-w-[20em] sm:max-h-[23em] sm:max-w-[23em]"/>
    </div>
  );
}

function RootComponent() {
  const [activeTab, setActiveTab] = useState<string | null>("wallet");
  const [balance, setBalance] = useState<string>("0.0000");
  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true);
  const { error, sendRequest } = useAxios();
  const [userData, setUserData] = useState<JarvisUserData | null>(null);

  useEffect(() => {
    const initializeUserData = async () => {
      const savedUserData = localStorage.getItem("jarvisUserData");
      console.log("retrieved data: ", savedUserData);

      if (savedUserData) {
        const parsedUserData = JSON.parse(savedUserData);
        setUserData(parsedUserData);
      } else {
        // User data doesn't exist; create the first wallet
        try {
          const response = await sendRequest({
            url: `https://iagent-miniapp-2.onrender.com/api/wallet`,
            method: "POST",
          });

          if (response.ok) {
            const newUserData: JarvisUserData = {
              userId: response.userId,
              currentWallet: response.injective_address,
              wallets: [
                {
                  injective_address: response.injective_address,
                  evm_address: response.evm_address,
                  wallet_name: response.wallet_name,
                  balance: response.balance,
                },
              ],
            };

            // Save user data to localStorage
            localStorage.setItem("jarvisUserData", JSON.stringify(newUserData));
            setUserData(newUserData);
          }
        } catch (error) {
          console.error("Error fetching wallet data:", error);
        }
      }
    };

    initializeUserData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchUserBalance = async () => {
      if (userData && userData.currentWallet) {
        const fetchedBalance = await fetchBalance(userData.currentWallet);
        setBalance(fetchedBalance);
      }
    };

    fetchUserBalance();
  }, [userData]);

  const getWalletByAddress = (address: string | null) => {
    if (!address) return undefined;
    const wallet = userData?.wallets.find(
      (wallet) => wallet.injective_address === address
    );

    return wallet;
  };

  const currentWallet = userData?.currentWallet || null; // Fallback to null if undefined
  const wallet = getWalletByAddress(currentWallet);

  const renderTabContent = () => {
  
    switch (activeTab) {
      case "wallet":
        return (
          <WalletTab
            balance={balance}
            error={error}
            address={userData?.currentWallet}
            walletName={wallet ? wallet.wallet_name : ""}
          />
        );
      case "activity":
        return <ActivityTab />;
      case "profile":
        return <ProfileTab address={userData?.currentWallet} />;
      default:
        return <WalletTab />;
    }
  };

  return (
    <StrictMode>
      {isSplashVisible ? (
        <SplashScreen />
      ) : (
        <div className="reveal">
          <div className="position fixed py-5 w-[100vw] grid place-items-center ">
          {wallet?.wallet_name !== null && (
          <div className="flex gap-3 px-6 py-1 bg-gray-800 mx-auto rounded-2xl w-[7em] justify-center">
            <img src="/wallet white.svg" className="max-h-[22px] max-w-[22px]" />
            <p className="text-center">{wallet?.wallet_name}</p>
          </div>
        )}</div>
          {<div>{renderTabContent()}</div>}

          <TabComponent activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      )}
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<RootComponent />);
