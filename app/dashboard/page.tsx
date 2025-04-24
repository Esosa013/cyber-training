"use client";
import BadgesSection from '@/components/badgeSection';
import { User, Scenario, Badge, MOCK_SCENARIOS, MOCK_BADGES } from '@/components/data/constant';
import Leaderboard from '@/components/leaderboard';
import ProgressOverview from '@/components/progressOverview';
import ScenariosSection from '@/components/scenariosSection';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import useDashboard from './useDashboard';
import { Shield } from 'lucide-react';
import SidebarMenu from '@/components/sideBarMenu';

export default function Dashboard() {
  const {
    activeUser,
    allScenarios,
    earnedBadges,
    scenarioFilter,
    setScenarioFilter,
    showCompletedOnly,
    setShowCompletedOnly,
    allUsers,
    filterScenarios,
    getUserAvatar,
    scenarioOptions,
    baseButtonClass,
    getButtonClass
  } = useDashboard();
  
  if (!activeUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-24 w-24 rounded-full bg-cyan-500/30 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-cyan-400/50 animate-spin"></div>
          </div>
          <div className="mt-4 text-cyan-400">Loading...</div>
        </div>
      </div>
    );
  }

  const filteredScenarios = filterScenarios();
  const completedCount = allScenarios.filter(scenario => scenario.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Dashboard Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10 shadow-lg">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-cyan-400 mr-2" />
            <span className="font-bold text-xl">SocialHackDefender</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-black/30 rounded-full px-4 py-2 backdrop-blur-md border border-white/10">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2 mr-2 shadow-lg shadow-blue-500/20">
                <span className="text-sm font-bold">{activeUser.level}</span>
              </div>
              <span className="text-cyan-100">{activeUser.name}</span>
            </div>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-500/30">
              {activeUser.points} points
            </div>
          </div>
        </div>
      </header>

      {/* Main content with sidebar layout */}
      <div className="container mx-auto p-4 md:p-6 relative">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <SidebarMenu 
              scenarioOptions={scenarioOptions}
              scenarioFilter={scenarioFilter}
              setScenarioFilter={setScenarioFilter}
            />
          </div>
          
          {/* Main content */}
          <div className="flex-grow">
            <ProgressOverview
              level={activeUser.level}
              points={activeUser.points}
              earnedBadgesCount={earnedBadges.length}
              totalBadgesCount={MOCK_BADGES.length}
              completedScenarios={completedCount}
              totalScenarios={allScenarios.length}
            />

            <ScenariosSection
              scenarioOptions={scenarioOptions}
              scenarioFilter={scenarioFilter}
              setScenarioFilter={setScenarioFilter}
              showCompletedOnly={showCompletedOnly}
              setShowCompletedOnly={setShowCompletedOnly}
              filteredScenarios={filteredScenarios}
              MOCK_BADGES={MOCK_BADGES}
            />

            <BadgesSection
              earnedBadges={earnedBadges}
              allBadges={MOCK_BADGES}
              userBadgeIds={activeUser.badges}
            />

            <Leaderboard
              users={allUsers}
              activeUserId={activeUser.id}
              getUserAvatar={getUserAvatar}
            />
          </div>
        </div>
      </div>
    </div>
  );
}