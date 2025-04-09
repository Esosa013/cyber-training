'use client'

import React from 'react'

type ProgressOverviewProps = {
  level: number
  points: number
  earnedBadgesCount: number
  totalBadgesCount: number
  completedScenarios: number
  totalScenarios: number
}

export default function ProgressOverview({
  level,
  points,
  earnedBadgesCount,
  totalBadgesCount,
  completedScenarios,
  totalScenarios,
}: ProgressOverviewProps) {
  return (
    <section className="mb-8 backdrop-blur-xl bg-white/5 rounded-2xl shadow-2xl border border-white/10 p-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-30" />
      <h2 className="text-xl font-semibold mb-6 relative z-10 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
        Your Cybersecurity Progress
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
        {/* Level */}
        <StatCard
          label="Level"
          value={level}
          sub={`Next level: ${level + 1}`}
          gradient="from-cyan-400 to-blue-400"
          textColor="text-cyan-400"
          subColor="text-cyan-200/70"
          shadow="shadow-cyan-500/10 hover:shadow-cyan-400/20"
        />
        {/* Points */}
        <StatCard
          label="Points"
          value={points}
          sub="+250 points to next level"
          gradient="from-blue-400 to-indigo-400"
          textColor="text-blue-400"
          subColor="text-blue-200/70"
          shadow="shadow-blue-500/10 hover:shadow-blue-400/20"
        />
        {/* Badges */}
        <StatCard
          label="Badges"
          value={earnedBadgesCount}
          sub={`of ${totalBadgesCount} total`}
          gradient="from-purple-400 to-pink-400"
          textColor="text-purple-400"
          subColor="text-purple-200/70"
          shadow="shadow-purple-500/10 hover:shadow-purple-400/20"
        />
        {/* Scenarios */}
        <StatCard
          label="Scenarios Completed"
          value={completedScenarios}
          sub={`of ${totalScenarios} total`}
          gradient="from-green-400 to-emerald-400"
          textColor="text-green-400"
          subColor="text-green-200/70"
          shadow="shadow-green-500/10 hover:shadow-green-400/20"
        />
      </div>
    </section>
  )
}

function StatCard({
  label,
  value,
  sub,
  gradient,
  textColor,
  subColor,
  shadow,
}: {
  label: string
  value: number
  sub: string
  gradient: string
  textColor: string
  subColor: string
  shadow: string
}) {
  return (
    <div
      className={`backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg transition-all duration-300 hover:-translate-y-1 ${shadow}`}
    >
      <h3 className={`font-medium ${textColor}`}>{label}</h3>
      <p className={`text-4xl font-bold bg-gradient-to-r ${gradient} text-transparent bg-clip-text my-2`}>
        {value}
      </p>
      <p className={`text-sm ${subColor}`}>{sub}</p>
    </div>
  )
}
