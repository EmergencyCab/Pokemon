import React from "react";
import { Users } from "lucide-react";
import CharacterCard from "./CharacterCard";

const CharacterTable = ({ characters, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="mx-auto text-gray-400 mb-4" size={48} />
        <p className="text-gray-400">
          No characters found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">
        Characters ({characters.length})
      </h3>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};

export default CharacterTable;
