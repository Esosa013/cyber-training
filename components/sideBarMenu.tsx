'use client'

import React from 'react'

type SidebarMenuProps = {
  scenarioOptions: { label: string; value: string }[]
  scenarioFilter: string
  setScenarioFilter: (value: string) => void
}

const SidebarMenu = ({ scenarioOptions, scenarioFilter, setScenarioFilter }: SidebarMenuProps) => {
  // Utility function for determining button class based on active filter state
  const getButtonClass = (isActive: boolean) =>
    isActive
      ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/30'
      : 'bg-transparent text-blue-500 border-blue-300 hover:bg-white/5'

  const baseButtonClass =
    'w-full px-4 py-3 rounded-lg font-medium border-2 transition-all duration-300 text-left mb-3'

  return (
    <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 shadow-xl p-5 sticky top-24">
      <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text mb-4">
        Filter Scenarios
      </h3>
      
      <div className="flex flex-col">
        {scenarioOptions.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setScenarioFilter(value)}
            className={`${baseButtonClass} ${getButtonClass(scenarioFilter === value)}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SidebarMenu