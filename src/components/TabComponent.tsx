import { useState } from "react";
import { House, ArrowLeftRight, Settings } from "lucide-react";

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState<string | null>("home");

  const renderTabContent = () => {
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
  };

  return (
    <div className="w-full grid place-items-center mx-auto fixed bottom-0 top-auto left-[auto] right-auto">
      <div className="bg-[#333333] max-sm:w-[100%] shadow-md md:mb-[2em] max-sm:grid grid-cols-3 md:flex gap-4 px-5 py-2 md:rounded-xl">
        <button
          onClick={() => setActiveTab("home")}
          className={`grid gap-2 place-items-center py-3 px-4`}
        >
          <House
            height={20}
            strokeWidth={3}
            width={20}
            color={`${activeTab === "home" ? "#007BFF" : "white"}`}
          />

          <p className="text-[0.95em]">Home</p>
        </button>

        <button
          onClick={() => setActiveTab("activity")}
          className={`grid gap-2 place-items-center py-3 px-4`}
        >
          <ArrowLeftRight
            height={20}
            strokeWidth={3}
            width={20}
            color={`${activeTab === "activity" ? "#007BFF" : "white"}`}
          />

          <p className="text-[0.9em]">Activity</p>
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`grid gap-2 place-items-center py-3 px-4`}
        >
          <Settings
            height={20}
            strokeWidth={3}
            width={20}
            color={`${activeTab === "settings" ? "#007BFF" : "white"}`}
          />

          <p className="text-[0.9em]">Settings</p>
        </button>
      </div>
      {/*<div className="tab-content">{renderTabContent()}</div>*/}
    </div>
  );
};

export default TabComponent;
