'use client' // or remove if using in a regular React file

import React from 'react'
import { User } from '../types/user'

type LeaderboardProps = {
  users: User[]
  activeUserId: string
  getUserAvatar: (index: number) => string
}

export default function Leaderboard({
  users,
  activeUserId,
  getUserAvatar,
}: LeaderboardProps) {
  const sortedUsers = [...users].sort((a, b) => b.points - a.points)

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
        Leaderboard
      </h2>
      <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 shadow-xl overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-b border-white/10">
          <h3 className="font-medium text-cyan-300">Top Security Champions</h3>
        </div>
        <div>
          {sortedUsers.map((user, index) => {
            const isActive = user.id === activeUserId

            const rankColor = [
              'text-yellow-400',
              'text-gray-300',
              'text-amber-600',
              'text-gray-400',
            ][index] || 'text-gray-400'

            const avatarBg = [
              'bg-gradient-to-br from-yellow-500/30 to-amber-500/30 shadow-yellow-500/20',
              'bg-gradient-to-br from-gray-300/30 to-gray-400/30 shadow-gray-400/20',
              'bg-gradient-to-br from-amber-600/30 to-orange-600/30 shadow-amber-600/20',
            ][index] ||
              'bg-gradient-to-br from-blue-500/30 to-purple-500/30 shadow-blue-500/20'

            return (
              <div
                key={user.id}
                className={`flex items-center p-4 border-b border-white/5 transition-all duration-300 hover:bg-white/5 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/10'
                    : ''
                }`}
              >
                <div className={`font-semibold w-8 ${rankColor}`}>
                  {index + 1}
                </div>
                <div className="flex-1 flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full mr-3 flex items-center justify-center shadow-md ${avatarBg}`}
                  >
                    <span className="text-lg">{getUserAvatar(index)}</span>
                  </div>
                  <div>
                    <div className="font-medium text-white">{user.name}</div>
                    <div className="text-xs text-cyan-400">
                      Level {user.level}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="flex space-x-1">
                      {user.badges.slice(0, 3).map((badgeId) => (
                        <div
                          key={badgeId}
                          className="w-6 h-6 bg-purple-500/30 border border-purple-500/30 rounded-full flex items-center justify-center text-xs"
                        >
                          🛡️
                        </div>
                      ))}
                      {user.badges.length > 3 && (
                        <div className="w-6 h-6 bg-gray-700/50 border border-gray-600 rounded-full flex items-center justify-center text-xs">
                          +{user.badges.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="font-bold text-white">{user.points}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
