import React from "react";
import { Info } from "lucide-react";
import type { TabType } from "../../types";

type ExtendedTabType = TabType | "sobre";

interface TabNavigationProps {
  activeTab: ExtendedTabType;
  setActiveTab: (tab: ExtendedTabType) => void;
  file: File | null;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  file,
}) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex bg-slate-800 rounded-lg p-1">
        <button
          className={`px-6 py-2 rounded-md transition-colors ${
            activeTab === "upload"
              ? "bg-purple-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("upload")}
        >
          Upload
        </button>
        <button
          className={`px-6 py-2 rounded-md transition-colors ${
            activeTab === "analyze"
              ? "bg-purple-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
          disabled={!file}
        >
          Analisar
        </button>
        <button
          className={`px-6 py-2 rounded-md transition-colors ${
            activeTab === "sanitize"
              ? "bg-purple-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
          disabled={!file}
        >
          Sanitizar
        </button>
        <button
          className={`px-6 py-2 rounded-md transition-colors ${
            activeTab === "sobre"
              ? "bg-purple-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("sobre")}
        >
          <Info className="w-4 h-4 inline mr-2" />
          Sobre
        </button>
      </div>
    </div>
  );
};

export default TabNavigation;