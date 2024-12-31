import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import WalletTab from "./tabs/WalletTab.tsx";
import ActivityTab from "./tabs/ActivityTab.tsx";
import ProfileTab from "./tabs/ProfileTab.tsx";
import TabComponent from "./components/TabComponent.tsx";
import fetchBalance from "./config/FetchBalance.ts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SendPage from "./SendPage.tsx";

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
    <div className="w-[100vw] h-[90vh] grid place-items-center">
      <img src="/Jarvis logo.png" className="max-h-[20em] max-w-[20em] sm:max-h-[23em] sm:max-w-[23em]" />
    </div>
  );
}

function RootComponent() {
  const [activeTab, setActiveTab] = useState<string | null>("wallet");
  const [balance, setBalance] = useState<string>("0.0000");
  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true);
  const [userData, setUserData] = useState<JarvisUserData | null>(null);
  const [telegramUserId, setTelegramUserId] = useState<string | null>(null);

  useEffect(() => {
    const initializeTelegramUser = () => {
      if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
        const { id } = window.Telegram.WebApp.initDataUnsafe.user;
        setTelegramUserId(id.toString()); // Save Telegram user ID as a string
      } else {
        console.error("Failed to fetch Telegram user ID. Ensure Telegram Web App is initialized properly.");
      }
    };

    initializeTelegramUser();
  }, []);

  useEffect(() => {
    const initializeUserData = async () => {
      const savedUserData = localStorage.getItem("jarvisUserData");
      console.log("retrieved data: ", savedUserData);

      if (savedUserData) {
        const parsedUserData = JSON.parse(savedUserData);
        setUserData(parsedUserData);
      } else {
        console.warn("No user data found in localStorage.");
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
            address={userData?.currentWallet}
            walletName={wallet ? wallet.wallet_name : ""}
             // Pass Telegram user ID as a prop
          />
        );
      case "activity":
        return <ActivityTab />;
      case "profile":
        return <ProfileTab address={userData?.currentWallet} telegramUserId={telegramUserId} />;
      default:
        return <WalletTab />;
    }
  };

  function MainComponent() {
    return(<>
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
          )}
        </div>
        <div>{renderTabContent()}</div>

        <TabComponent activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    )}</>) 
  }

  return (
    <StrictMode>
      <BrowserRouter>

      <Routes>
      <Route path="/" element={<MainComponent />} />
      <Route path="/main" element={<MainComponent />} />
      <Route path="/userId" element={<SendPage />} />
      
      </Routes>
      </BrowserRouter>

    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<RootComponent />);
