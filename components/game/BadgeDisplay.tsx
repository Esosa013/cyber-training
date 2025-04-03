// src/components/game/BadgeDisplay.tsx

import { Badge } from "../data/constant";


type BadgeDisplayProps = {
  earnedBadges: Badge[];
  allBadges: Badge[];
};

export default function BadgeDisplay({ earnedBadges, allBadges }: BadgeDisplayProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-purple-50 border-b border-purple-100">
        <h3 className="font-medium text-purple-800">Security Badges</h3>
        <p className="text-sm text-purple-600">Earn badges by completing challenges</p>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {/* Earned badges */}
          {earnedBadges.map((badge) => (
            <div key={badge.id} className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-purple-100 rounded-full flex items-center justify-center">
                {/* This would be an actual image in production */}
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-medium text-sm mb-1">{badge.name}</h3>
              <p className="text-xs text-gray-500 line-clamp-2">{badge.description}</p>
            </div>
          ))}
          
          {/* Locked badges */}
          {allBadges
            .filter(badge => !earnedBadges.some(earned => earned.id === badge.id))
            .map((badge) => (
              <div key={badge.id} className="text-center opacity-50">
                <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xl">🔒</span>
                </div>
                <h3 className="font-medium text-sm mb-1">{badge.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{badge.description}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}