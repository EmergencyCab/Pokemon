import React from "react";
import { Users, TrendingUp, Calendar } from "lucide-react";

const SummaryCards = ({ characters }) => {
  const totalCharacters = characters.length;
  const mostPopularHero = characters.reduce(
    (prev, current) =>
      prev.comics.available > current.comics.available ? prev : current,
    characters[0] || {}
  );
  const oldestYear = Math.min(
    ...characters.map((char) => new Date(char.modified).getFullYear())
  );

  const cards = [
    {
      title: "Total Characters",
      value: totalCharacters,
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
    },
    {
      title: "Most Popular Hero",
      value: mostPopularHero?.name || "N/A",
      subtitle: `${mostPopularHero?.comics?.available || 0} comics`,
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-green-900/20",
    },
    {
      title: "Oldest Record",
      value: oldestYear || "N/A",
      subtitle: "First appearance year",
      icon: Calendar,
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`${card.bgColor} p-6 rounded-lg border border-gray-700`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">{card.title}</p>
                <p className={`text-2xl font-bold ${card.color}`}>
                  {card.value}
                </p>
                {card.subtitle && (
                  <p className="text-gray-500 text-xs mt-1">{card.subtitle}</p>
                )}
              </div>
              <Icon className={`${card.color} opacity-60`} size={32} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
