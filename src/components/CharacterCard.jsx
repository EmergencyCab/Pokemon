import React, { useState } from "react";
import { Users, Book, Star } from "lucide-react";

const CharacterCard = ({ character }) => {
  const [imageVisible, setImageVisible] = useState(true);
  const imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-red-500 transition-colors">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {imageVisible ? (
              <img
                src={imageUrl}
                alt={character.name}
                className="w-16 h-16 rounded-lg object-cover"
                onError={() => setImageVisible(false)}
              />
            ) : (
              <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                <Users className="text-gray-400" size={24} />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white truncate">
              {character.name}
            </h3>
            <p className="text-gray-400 text-sm mt-1 line-clamp-2">
              {character.description || "No description available."}
            </p>

            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-1">
                <Book className="text-blue-400" size={16} />
                <span className="text-sm text-gray-300">
                  {character.comics.available} comics
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="text-yellow-400" size={16} />
                <span className="text-sm text-gray-300">
                  {character.series.available} series
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
