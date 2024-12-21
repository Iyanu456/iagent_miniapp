import { Wallet, ArrowLeftRight, CircleUser } from "lucide-react";

const TabComponent = (props: any) => {

  /*const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <div>Welcome to your Dashboard</div>;
      case "activity":
        return <div>Your activity Information</div>;
      case "settings":
        return <div>your settings</div>;
      default:
        return <div>Select a tab to view content</div>;
    }
  };*/

  return (
    <div className="w-full grid place-items-center mx-auto fixed bottom-0 top-auto left-[auto] right-auto">
      <div className="bg-[#333333] max-sm:w-[100%] shadow-md sm:mb-[2.5em] grid grid-cols-3  sm:gap-4 sm:min-w-[30em] sm:p-3 sm:rounded-xl">
        <button
          onClick={() => props.setActiveTab("wallet")}
          className={`sm:rounded-[8px] max-sm:py-3 hover:bg-[#1a1a1a75] grid gap-2 place-items-center py-3 px-4`}
        >
          <Wallet
            height={20}
            strokeWidth={3}
            width={20}
            color={`${props.activeTab === "wallet" ? "#007BFF" : "white"}`}
          />

          <p className="text-[0.95em]">Wallet</p>
        </button>

        <button
          onClick={() => props.setActiveTab("activity")}
          className={`sm:rounded-[8px] max-sm:py-3 hover:bg-[#1a1a1a75] grid gap-2 place-items-center py-3 px-4`}
        >
          <ArrowLeftRight
            height={20}
            strokeWidth={3}
            width={20}
            color={`${props.activeTab === "activity" ? "#007BFF" : "white"}`}
          />

          <p className="text-[0.9em]">Activity</p>
        </button>


        <button
          onClick={() => props.setActiveTab("profile")}
          className={`sm:rounded-[8px] max-sm:py-3 hover:bg-[#1a1a1a75] grid gap-2 place-items-center py-3 px-4`}
        >
          <CircleUser
            height={20}
            strokeWidth={3}
            width={20}
            color={`${props.activeTab === "profile" ? "#007BFF" : "white"}`}
          />

          <p className="text-[0.9em]">Profile</p>
        </button>

        

        
      </div>
      {/*<div className="tab-content">{renderTabContent()}</div>*/}
    </div>
  );
};

export default TabComponent;
