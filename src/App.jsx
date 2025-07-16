import React, { useState } from "react";
import Sidebar from "./components/SideBar";
import SummaryCards from "./components/SummaryCards";
import Filters from "./components/Filters";
import CharacterTable from "./components/CharacterTable";
import useMarvelAPI from "./hooks/useMarvelAPI";

// About Component
const About = () => (
  <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
    <h2 className="text-2xl font-bold text-white mb-6">
      About Marvel Character Intelligence Panel
    </h2>
    <div className="space-y-4 text-gray-300">
      <p>
        Welcome to the Marvel Character Intelligence Panel - your gateway to
        exploring the vast universe of Marvel heroes and villains!
      </p>
      <p>
        This dashboard provides comprehensive insights into Marvel characters,
        including their comic appearances, series involvement, and detailed
        descriptions.
      </p>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-white mb-3">Features:</h3>
        <ul className="space-y-2 text-gray-300">
          <li>• Browse through Marvel's extensive character database</li>
          <li>• Search characters by name in real-time</li>
          <li>• Filter characters by comic book appearances</li>
          <li>• View detailed character statistics and summaries</li>
          <li>• Responsive design for all devices</li>
        </ul>
      </div>
    </div>
  </div>
);

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [comicsRange, setComicsRange] = useState(0);
  const { characters, loading, error } = useMarvelAPI();

  // Calculate max comics for slider
  const maxComics =
    characters.length > 0
      ? Math.max(...characters.map((char) => char.comics.available))
      : 5000;

  // Filter characters based on search term and comics range
  const filteredCharacters = characters.filter((character) => {
    const matchesSearch = character.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesComics = character.comics.available >= comicsRange;
    return matchesSearch && matchesComics;
  });

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
      case "search":
        return (
          <div>
            <SummaryCards characters={characters} />
            <Filters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              comicsRange={comicsRange}
              setComicsRange={setComicsRange}
              maxComics={maxComics}
            />
            <CharacterTable characters={filteredCharacters} loading={loading} />
          </div>
        );
      case "about":
        return <About />;
      default:
        return <div>Page not found</div>;
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">Error loading Marvel data</p>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

        <main className="flex-1 p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Marvel Character Intelligence Panel
            </h1>
            <p className="text-gray-400">
              Explore the universe of Marvel heroes and villains
            </p>
          </header>

          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
