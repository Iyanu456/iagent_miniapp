import { ArrowLeftRight } from "lucide-react";

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
          onClick={() => props.handleTabChange("wallet")} disabled={props.activeTab === "wallet"}
          className={`sm:rounded-[8px] max-sm:py-3 hover:bg-[#1a1a1aa1] grid gap-2 place-items-center py-3 px-4`}
        >
          
          {props.activeTab === 'wallet' ? <img src="/wallet blue.svg" className="max-h-[25px] max-w-[25px]" /> :
          <img src="/wallet white.svg" className="max-h-[25px] max-w-[25px]" />}

          <p className="max-sm:text-[0.85em]">Wallet</p>
        </button>

        <button
          onClick={() => props.handleTabChange("activity")} disabled={props.activeTab === "activity"}
          className={`sm:rounded-[8px] max-sm:py-3 hover:bg-[rgba(60,60,60,0.1)] grid gap-2 place-items-center py-3 px-4`}
        >
          <ArrowLeftRight
            height={19}
            strokeWidth={2.5}
            width={19}
            color={`${props.activeTab === "activity" ? "#51b0fd" : "white"}`}
          />

          <p className="max-sm:text-[0.85em]">Activity</p>
        </button>


        <button
          onClick={() => props.handleTabChange("profile")} disabled={props.activeTab === "profile"}
          className={`sm:rounded-[8px] max-sm:py-3 hover:bg-[#1a1a1a75] grid gap-2 place-items-center py-3 px-4`}
        >
          
          {props.activeTab === 'profile' ? <img src="/user-circle blue.svg" className="max-h-[25px] max-w-[25px]" /> :
          <img src="/user-circle white.svg" className="max-h-[25px] max-w-[25px]" />}

          <p className="max-sm:text-[0.85em]">Profile</p>
        </button>

        

        
      </div>
      {/*<div className="tab-content">{renderTabContent()}</div>*/}
    </div>
  );
};

export default TabComponent;
