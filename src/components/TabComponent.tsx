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
      <div className="sm:bg-[#4646464b] border-[#3a3a3a8c] max-sm:border-t-2 max-sm:w-[100%] shadow-md sm:mb-[2.5em] grid grid-cols-3  sm:gap-4 sm:min-w-[30em] sm:p-3 sm:rounded-xl">
        <button
          onClick={() => props.setActiveTab("wallet")}
          className={`sm:rounded-[8px] max-sm:py-3 hover:bg-[#1a1a1aa1] grid gap-2 place-items-center py-3 px-4`}
        >
          <Wallet
            height={18.5}
            strokeWidth={2.5}
            width={18.5}
            color={`${props.activeTab === "wallet" ? "#747bff" : "white"}`}
          />

          <p className="max-sm:text-[0.85em]">Wallet</p>
        </button>

        <button
          onClick={() => props.setActiveTab("activity")}
          className={`sm:rounded-[8px] max-sm:py-3 hover:bg-[#1a1a1a75] grid gap-2 place-items-center py-3 px-4`}
        >
          <ArrowLeftRight
            height={18.5}
            strokeWidth={2.5}
            width={18.5}
            color={`${props.activeTab === "activity" ? "#747bff" : "white"}`}
          />

          <p className="max-sm:text-[0.85em]">Activity</p>
        </button>


        <button
          onClick={() => props.setActiveTab("profile")}
          className={`sm:rounded-[8px] max-sm:py-3 hover:bg-[#1a1a1a75] grid gap-2 place-items-center py-3 px-4`}
        >
          <CircleUser
            height={18.5}
            strokeWidth={2.5}
            width={18.5}
            color={`${props.activeTab === "profile" ? "#747bff" : "white"}`}
          />

          <p className="max-sm:text-[0.85em]">Profile</p>
        </button>

        

        
      </div>
      {/*<div className="tab-content">{renderTabContent()}</div>*/}
    </div>
  );
};

export default TabComponent;
