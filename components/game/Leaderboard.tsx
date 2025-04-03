// src/components/game/Leaderboard.tsx
import { useState } from 'react';
import { MOCK_USERS, MOCK_TEAMS } from '../data/constant';


type LeaderboardProps = {
  activeUserId: string;
};

export default function Leaderboard({ activeUserId }: LeaderboardProps) {
  const [view, setView] = useState<'individual' | 'team'>('individual');
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setView('individual')}
          className={`flex-1 py-3 text-center font-medium ${
            view === 'individual' 
              ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Individual Rankings
        </button>
        <button
          onClick={() => setView('team')}
          className={`flex-1 py-3 text-center font-medium ${
            view === 'team' 
              ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Team Rankings
        </button>
      </div>
      
      {view === 'individual' ? (
        <div className="divide-y divide-gray-100">
          {MOCK_USERS
            .sort((a, b) => b.points - a.points)
            .map((user, index) => (
              <div 
                key={user.id} 
                className={`flex items-center p-4 ${user.id === activeUserId ? 'bg-blue-50' : ''}`}
              >
                <div className="font-semibold w-8 text-gray-700">{index + 1}</div>
                <div className="flex-1 flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center overflow-hidden">
                    {/* This would be an actual avatar image in production */}
                    <span>{user.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-gray-500">Level {user.level}</div>
                  </div>
                </div>
                <div className="font-bold text-blue-600">{user.points}</div>
              </div>
            ))}
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {MOCK_TEAMS
            .sort((a, b) => b.totalPoints - a.totalPoints)
            .map((team, index) => {
              const teamUsers = MOCK_USERS.filter(user => team.members.includes(user.id));
              const isUserInTeam = teamUsers.some(user => user.id === activeUserId);
              
              return (
                <div 
                  key={team.id} 
                  className={`flex items-center p-4 ${isUserInTeam ? 'bg-blue-50' : ''}`}
                >
                  <div className="font-semibold w-8 text-gray-700">{index + 1}</div>
                  <div className="flex-1">
                    <div className="font-medium">{team.name}</div>
                    <div className="text-xs text-gray-500">{team.members.length} members</div>
                  </div>
                  <div className="font-bold text-blue-600">{team.totalPoints}</div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}