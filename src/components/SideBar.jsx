import React from "react";
import { Search, Users, Star } from "lucide-react";

const Sidebar = ({ currentView, setCurrentView }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Users },
    { id: "search", label: "Search", icon: Search },
    { id: "about", label: "About", icon: Star },
  ];

  return (
    <div className="w-64 bg-gray-900 h-screen p-4 border-r border-red-700">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-red-500 mb-2">MARVEL</h2>
        <p className="text-gray-400 text-sm">Character Intelligence</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                currentView === item.id
                  ? "bg-red-700 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
