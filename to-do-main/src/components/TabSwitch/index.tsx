import React from "react";
import "./index.css";

interface ITabSwitchProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

const TabSwitch: React.FC<ITabSwitchProps> = ({
  tabs,
  activeTab,
  onChange,
}) => {
  const handleTabChange = (tab: string) => {
    onChange(tab);
  };

  return (
    <div className="tabs">
      {tabs.map((tab) => {
        return (
          <button
            key={tab}
            className={tab === activeTab ? "tab tab--active" : "tab"}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default TabSwitch;
