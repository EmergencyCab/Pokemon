import React from "react";
import { Search, Filter } from "lucide-react";

const Filters = ({
  searchTerm,
  setSearchTerm,
  comicsRange,
  setComicsRange,
  maxComics,
}) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Filter size={20} className="mr-2" />
        Filters
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Search Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Search by Name
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter character name..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Comics Range Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Minimum Comics: {comicsRange}
          </label>
          <input
            type="range"
            min="0"
            max={maxComics}
            value={comicsRange}
            onChange={(e) => setComicsRange(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0</span>
            <span>{maxComics}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
