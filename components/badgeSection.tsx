'use client'

import React from 'react'

type Badge = {
  id: string
  name: string
  description: string
  requiredPoints?: number
}

type BadgesSectionProps = {
  earnedBadges: Badge[]
  allBadges: Badge[]
  userBadgeIds: string[]
}

export default function BadgesSection({
  earnedBadges,
  allBadges,
  userBadgeIds,
}: BadgesSectionProps) {
  const lockedBadges = allBadges.filter((badge) => !userBadgeIds.includes(badge.id))

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
        Your Badges
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {earnedBadges.map((badge) => (
          <div
            key={badge.id}
            className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10 shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-500/50 to-pink-500/50 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/20">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="font-medium text-sm text-white">{badge.name}</h3>
            <p className="text-xs text-gray-400 mt-2">{badge.description}</p>
          </div>
        ))}

        {lockedBadges.map((badge) => (
          <div
            key={badge.id}
            className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10 shadow-xl text-center opacity-70 hover:opacity-80 transition-all duration-300"
          >
            <div className="w-16 h-16 mx-auto mb-3 bg-gray-700/50 rounded-full flex items-center justify-center">
              <span className="text-2xl text-gray-500">?</span>
            </div>
            <h3 className="font-medium text-sm text-gray-400">{badge.name}</h3>
            <p className="text-xs text-gray-500 mt-2">{badge.description}</p>
            {badge.requiredPoints && (
              <p className="text-xs text-cyan-400 mt-2">
                {badge.requiredPoints} points needed
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
