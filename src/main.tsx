import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import WalletTab from "./tabs/WalletTab.tsx";
import ActivityTab from "./tabs/ActivityTab.tsx";
import ProfileTab from "./tabs/ProfileTab.tsx";
import TabComponent from "./components/TabComponent.tsx";
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import SendPage from "./SendPage.tsx";
import useAxios from "./hooks/useAxios.ts";

interface Wallet {
  wallet_name: string;
  injective_address: string;
  evm_address: string;
  private_key: string;
}

interface UserDetails {
  user_id: string;
  current_injective_address: string;
  wallets: Wallet[];
}

function SplashScreen() {
  return (
    <div className="w-[100vw] h-[90vh] grid place-items-center">
      <img
        src="/Jarvis logo.png"
        className="max-h-[20em] max-w-[20em] sm:max-h-[23em] sm:max-w-[23em]"
        alt="Splash Logo"
      />
    </div>
  );
}



const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function MainComponent() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('user_id');
  const [activeTab, setActiveTab] = useState<string>("wallet");
  const [balance, setBalance] = useState<string>("0.00");
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [telegramUserId, setTelegramUserId] = useState<string | null>(null);
  const { sendRequest } = useAxios();
  const [error_1, setError1] = useState<string | null>(null);
  const [error_2, setError2] = useState<string | null>(null);


  //useEffect(() => {
  //  const initializeTelegramUser = () => {
  //    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
  //      const { id } = window.Telegram.WebApp.initDataUnsafe.user;
  //      setTelegramUserId(id.toString()); // Save Telegram user ID as a string
  //    } else {
  //      console.error("Failed to fetch Telegram user ID. Ensure Telegram Web App is initialized properly.");
  //    }
  //  };

  //  initializeTelegramUser();
  //}, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await sendRequest({
          url: `${apiBaseUrl}/check_user/${telegramUserId}`,
          method: "GET",
          headers: { Authorization: "Bearer Iyanuoluwa" },
        });

        if (response?.exists) {
          await fetchUserDetails(telegramUserId!);
          await queryBalances(telegramUserId!);
        } else {
          const registerResponse = await sendRequest({
            url: `${apiBaseUrl}/create_wallet`,
            method: "POST",
            headers: { Authorization: "Bearer Iyanuoluwa" },
            body: { user_id: telegramUserId, wallet_name: "wallet" },
          });

          if (registerResponse?.ok) {
            await fetchUserDetails(telegramUserId!);
            await queryBalances(telegramUserId!);
          } else {
            throw new Error("User registration failed");
          }
        }
      } catch (err) {
        setError("An error occurred");
        setError1(`${err}`);
        console.error(err);
      }
    };

    const fetchUserDetails = async (id: string) => {
      try {
        const userData = await sendRequest({
          url: `${apiBaseUrl}/get_user_details/${id}`,
          method: "GET",
          headers: { Authorization: "Bearer Iyanuoluwa" },
        });
        setUserDetails(userData || null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user details");
      }
    };

    const queryBalances = async (id: string) => {
      try {
        const balanceData = await sendRequest({
          url: `${apiBaseUrl}/query_balances`,
          method: "POST",
          headers: { Authorization: "Bearer Iyanuoluwa" },
          body: { user_id: id },
        });
    
        // Extract the `inj` balance
        const injBalanceRaw = balanceData?.balances?.find((b: { token: string }) => b.token === "inj")?.balance || "0";
        const injBalance = parseFloat(injBalanceRaw);
    
        // Round to exactly 4 decimal places
        const roundedBalance = Math.floor(injBalance * 10000) / 10000;
    
        // Format the balance
        const formattedBalance = roundedBalance === 0 ? "0" : `${roundedBalance.toFixed(4)}`;
    
        setBalance(formattedBalance);
      } catch (err) {
        console.error(err);
        setError2(`${err}`);
        setError("Failed to fetch balances");
      }
    };

    const initializeTelegramUser = () => {
      if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
        const { id } = window.Telegram.WebApp.initDataUnsafe.user;
        setTelegramUserId(id.toString()); // Save Telegram user ID as a string
      } else {
        console.error("Failed to fetch Telegram user ID. Ensure Telegram Web App is initialized properly.");
      }
    };

    
    
    initializeTelegramUser();

    if (telegramUserId) {
      checkUser();
    }
  }, [telegramUserId]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "wallet":
        return (
          <WalletTab
            balance={balance}
            address={userDetails?.current_injective_address || ""}
            walletName={
              userDetails?.wallets && userDetails.wallets.length > 0
                ? userDetails.wallets[0].wallet_name
                : "N/A"
            }
          />
        );
      case "activity":
        return <ActivityTab />;
      case "profile":
        return <ProfileTab error_1={error_1} error={error} error_2={error_2} telegramUserId={telegramUserId} address={userDetails?.current_injective_address || ""} />;
      default:
        return <WalletTab />;
    }
  };

  return isSplashVisible ? (
    <SplashScreen />
  ) : (
    <div>
      {error && <div className="error">{error}</div>}
      <div className="position fixed py-5 w-[100vw] grid place-items-center">
      {userDetails && userDetails.wallets && userDetails.wallets.length > 0 && (
    <div className="flex gap-3 px-6 py-1 bg-gray-800 mx-auto rounded-2xl w-[7em] justify-center">
      <img
        src="/wallet white.svg"
        className="max-h-[22px] max-w-[22px]"
        alt="Wallet Icon"
      />
      <p className="text-center">{userDetails.wallets[0].wallet_name || "N/A"}</p>
    </div>
  )}
      </div>
      <div>{renderTabContent()}</div>
      <TabComponent activeTab={activeTab} setActiveTab={setActiveTab} userId={userId} />
    </div>
  );
}


function RootComponent() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route path="/transfer/" element={<SendPage />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<RootComponent />);
