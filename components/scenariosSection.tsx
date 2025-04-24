'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Scenario } from '@/components/data/constant'

type ScenarioFilterProps = {
  scenarioOptions: { label: string; value: string }[]
  scenarioFilter: string
  setScenarioFilter: (value: string) => void
  showCompletedOnly: boolean
  setShowCompletedOnly: (value: boolean) => void
  filteredScenarios: Scenario[]
  MOCK_BADGES: any[]
}

export default function ScenariosSection({
  scenarioOptions,
  scenarioFilter,
  setScenarioFilter,
  showCompletedOnly,
  setShowCompletedOnly,
  filteredScenarios,
  MOCK_BADGES,
}: ScenarioFilterProps) {
  const router = useRouter()

  // Utility function for determining button class based on active filter state
  const getButtonClass = (isActive: boolean, color = 'blue') =>
    isActive
      ? `bg-${color}-500 text-white border-${color}-500`
      : `bg-transparent text-${color}-500 border-${color}-300`

  const baseButtonClass =
    'px-4 py-2 rounded-lg font-medium border-2 transition-all duration-300'

  return (
    <section className="mb-12 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
          All Scenarios
        </h2>

        {/* <div className="flex flex-wrap gap-2">
          {scenarioOptions.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setScenarioFilter(value)}
              className={`${baseButtonClass} ${getButtonClass(scenarioFilter === value)}`}
            >
              {label}
            </button>
          ))}
        </div> */}

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowCompletedOnly(!showCompletedOnly)}
            className={`${baseButtonClass} ${getButtonClass(showCompletedOnly, 'green')}`}
          >
            {showCompletedOnly ? 'Completed Only' : 'Show All'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScenarios.length > 0 ? (
          filteredScenarios.map((scenario) => (
            <div
              key={scenario.id}
              className={`backdrop-blur-xl bg-white/5 rounded-xl shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                scenario.completed
                  ? 'border border-green-500/50 shadow-green-500/20'
                  : 'border border-white/10'
              }`}
            >
              <div
                className={`h-1 ${
                  scenario.difficulty === 'beginner'
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                    : scenario.difficulty === 'intermediate'
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                    : 'bg-gradient-to-r from-red-400 to-rose-500'
                }`}
              />
              <div className="p-6 relative">
                <div className="flex justify-between items-center">
                  <span
                    className={`text-xs px-3 py-1 rounded-full backdrop-blur-md ${
                      scenario.category === 'phishing'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : scenario.category === 'social'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-green-500/20 text-green-300 border border-green-500/30'
                    }`}
                  >
                    {scenario.category.charAt(0).toUpperCase() + scenario.category.slice(1)}
                  </span>
                  {scenario.completed && (
                    <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 backdrop-blur-md">
                      Completed
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-lg mt-3 text-white">{scenario.title}</h3>
                <p className="text-gray-300 text-sm mt-2">{scenario.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-400">{scenario.estimatedTime} min</span>
                  <span className="text-sm font-medium text-cyan-400">{scenario.points} points</span>
                </div>
                {scenario.badge && (
                  <div className="mt-3 flex items-center">
                    <span className="text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full flex items-center backdrop-blur-md">
                      <span className="mr-1">🏆</span>
                      {MOCK_BADGES.find((b) => b.id === scenario.badge)?.name}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => router.push(`/scenarios/${scenario.id}`)}
                  className={`w-full mt-5 py-3 rounded-lg font-medium transition-all duration-300 ${
                    scenario.completed
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50'
                  }`}
                >
                  {scenario.completed ? 'Review Scenario' : 'Start Scenario'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-10 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 shadow-xl">
            <p className="text-gray-400">No scenarios match your current filters</p>
          </div>
        )}
      </div>
    </section>
  )
}
