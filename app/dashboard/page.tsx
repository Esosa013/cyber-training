"use client";
import { User, Scenario, Badge, MOCK_USERS, ACTIVE_USER_ID, MOCK_SCENARIOS, MOCK_BADGES } from '@/components/data/constant';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [allScenarios, setAllScenarios] = useState<Scenario[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [scenarioFilter, setScenarioFilter] = useState<string>('all');
  const [showCompletedOnly, setShowCompletedOnly] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const user = MOCK_USERS.find(u => u.id === ACTIVE_USER_ID) || null;
    setActiveUser(user);

    if (user) {
      const scenariosWithStatus = MOCK_SCENARIOS.map(scenario => ({
        ...scenario,
        completed: user.completedScenarios.includes(scenario.id)
      }));

      setAllScenarios(scenariosWithStatus);

      const badges = MOCK_BADGES.filter(
        badge => user.badges.includes(badge.id)
      );
      setEarnedBadges(badges);
    }
  }, []);

  const filterScenarios = () => {
    let filtered = [...allScenarios];

    if (scenarioFilter !== 'all') {
      filtered = filtered.filter(scenario => scenario.category === scenarioFilter);
    }

    if (showCompletedOnly) {
      filtered = filtered.filter(scenario => scenario.completed);
    }

    return filtered;
  };

  const getUserAvatar = (index: number) => {
    const avatars = ["👑", "🥈", "🥉", "🔒", "🛡️", "🔐", "⚔️", "🔍", "🌐", "💻", "🕵️", "🦹"];
    return index < avatars.length ? avatars[index] : "👤";
  };

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
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            CyberGuard Training
          </h1>
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

      <main className="container mx-auto p-4 md:p-6 relative">
        {/* Progress Overview */}
        <section className="mb-8 backdrop-blur-xl bg-white/5 rounded-2xl shadow-2xl border border-white/10 p-6 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-30"></div>
          <h2 className="text-xl font-semibold mb-6 relative z-10 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">Your Cybersecurity Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
            <div className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-400/20 transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-medium text-cyan-400">Level</h3>
              <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text my-2">{activeUser.level}</p>
              <p className="text-sm text-cyan-200/70">Next level: {activeUser.level + 1}</p>
            </div>
            <div className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg shadow-blue-500/10 hover:shadow-blue-400/20 transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-medium text-blue-400">Points</h3>
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text my-2">{activeUser.points}</p>
              <p className="text-sm text-blue-200/70">+250 points to next level</p>
            </div>
            <div className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg shadow-purple-500/10 hover:shadow-purple-400/20 transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-medium text-purple-400">Badges</h3>
              <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text my-2">{earnedBadges.length}</p>
              <p className="text-sm text-purple-200/70">of {MOCK_BADGES.length} total</p>
            </div>
            <div className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg shadow-green-500/10 hover:shadow-green-400/20 transition-all duration-300 hover:-translate-y-1">
              <h3 className="font-medium text-green-400">Scenarios Completed</h3>
              <p className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text my-2">{completedCount}</p>
              <p className="text-sm text-green-200/70">of {allScenarios.length} total</p>
            </div>
          </div>
        </section>

        {/* Scenarios Section */}
        <section className="mb-12 relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">All Scenarios</h2>
            <div className="flex flex-wrap gap-2">
              <div className="flex space-x-2">
                <button
                  onClick={() => setScenarioFilter('all')}
                  className={`px-4 py-2 border rounded-lg text-sm backdrop-blur-md transition-all duration-300 ${
                    scenarioFilter === 'all'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-transparent shadow-lg shadow-blue-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setScenarioFilter('phishing')}
                  className={`px-4 py-2 border rounded-lg text-sm backdrop-blur-md transition-all duration-300 ${
                    scenarioFilter === 'phishing'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-transparent shadow-lg shadow-blue-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  Phishing
                </button>
                <button
                  onClick={() => setScenarioFilter('social')}
                  className={`px-4 py-2 border rounded-lg text-sm backdrop-blur-md transition-all duration-300 ${
                    scenarioFilter === 'social'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-transparent shadow-lg shadow-blue-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  Social
                </button>
                <button
                  onClick={() => setScenarioFilter('data-protection')}
                  className={`px-4 py-2 border rounded-lg text-sm backdrop-blur-md transition-all duration-300 ${
                    scenarioFilter === 'data-protection'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-transparent shadow-lg shadow-blue-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  Data Protection
                </button>
                <button
                  onClick={() => setScenarioFilter('network-security')}
                  className={`px-4 py-2 border rounded-lg text-sm backdrop-blur-md transition-all duration-300 ${
                    scenarioFilter === 'network-security'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-transparent shadow-lg shadow-blue-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  Network Security
                </button>
                <button
                  onClick={() => setScenarioFilter('device-security')}
                  className={`px-4 py-2 border rounded-lg text-sm backdrop-blur-md transition-all duration-300 ${
                    scenarioFilter === 'device-security'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-transparent shadow-lg shadow-blue-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  Device Security
                </button>
                <button
                  onClick={() => setScenarioFilter('physical-security')}
                  className={`px-4 py-2 border rounded-lg text-sm backdrop-blur-md transition-all duration-300 ${
                    scenarioFilter === 'physical-security'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-transparent shadow-lg shadow-blue-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  Physical Security
                </button>
                <button
                  onClick={() => setScenarioFilter('remote-security')}
                  className={`px-4 py-2 border rounded-lg text-sm backdrop-blur-md transition-all duration-300 ${
                    scenarioFilter === 'remote-security'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-transparent shadow-lg shadow-blue-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  Remote Security
                </button>
                <button
                  onClick={() => setScenarioFilter('application-security')}
                  className={`px-4 py-2 border rounded-lg text-sm backdrop-blur-md transition-all duration-300 ${
                    scenarioFilter === 'application-security'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-transparent shadow-lg shadow-blue-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  Application Security
                </button>
                <button
                  onClick={() => setScenarioFilter('third-party-risk')}
                  className={`px-4 py-2 border rounded-lg text-sm backdrop-blur-md transition-all duration-300 ${
                    scenarioFilter === 'third-party-risk'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-transparent shadow-lg shadow-blue-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  Third Party Risk
                </button>
                <button
                  onClick={() => setScenarioFilter('incident-response')}
                  className={`px-4 py-2 border rounded-lg text-sm backdrop-blur-md transition-all duration-300 ${
                    scenarioFilter === 'incident-response'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-transparent shadow-lg shadow-blue-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  Incident Response
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowCompletedOnly(!showCompletedOnly)}
                  className={`px-4 py-2 border rounded-lg text-sm backdrop-blur-md transition-all duration-300 ${
                    showCompletedOnly
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-transparent shadow-lg shadow-green-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {showCompletedOnly ? 'Completed Only' : 'Show All'}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScenarios.length > 0 ? (
              filteredScenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className={`backdrop-blur-xl bg-white/5 rounded-xl shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                    scenario.completed ? 'border border-green-500/50 shadow-green-500/20' : 'border border-white/10'
                  }`}
                >
                  <div className={`h-1 ${
                    scenario.difficulty === 'beginner' ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                    scenario.difficulty === 'intermediate' ? 'bg-gradient-to-r from-yellow-400 to-amber-500' :
                    'bg-gradient-to-r from-red-400 to-rose-500'
                  }`}></div>
                  <div className="p-6 relative">
                    <div className="flex justify-between items-center">
                      <span className={`text-xs px-3 py-1 rounded-full backdrop-blur-md ${
                        scenario.category === 'phishing' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                        scenario.category === 'social' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                        'bg-green-500/20 text-green-300 border border-green-500/30'
                      }`}>
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
                          {MOCK_BADGES.find(b => b.id === scenario.badge)?.name}
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

        {/* Badges Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">Your Badges</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {earnedBadges.map((badge) => (
              <div key={badge.id} className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10 shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1 text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-500/50 to-pink-500/50 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="font-medium text-sm text-white">{badge.name}</h3>
                <p className="text-xs text-gray-400 mt-2">{badge.description}</p>
              </div>
            ))}

            {/* Placeholder for badges not yet earned */}
            {MOCK_BADGES.filter(badge => !activeUser.badges.includes(badge.id)).map((badge) => (
              <div key={badge.id} className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10 shadow-xl text-center opacity-70 hover:opacity-80 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-3 bg-gray-700/50 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-gray-500">?</span>
                </div>
                <h3 className="font-medium text-sm text-gray-400">{badge.name}</h3>
                <p className="text-xs text-gray-500 mt-2">{badge.description}</p>
                <p className="text-xs text-cyan-400 mt-2">{badge.requiredPoints} points needed</p>
              </div>
            ))}
          </div>
        </section>

        {/* Leaderboard */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">Leaderboard</h2>
          <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 shadow-xl overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-b border-white/10">
              <h3 className="font-medium text-cyan-300">Top Security Champions</h3>
            </div>
            <div>
              {MOCK_USERS.sort((a, b) => b.points - a.points).map((user, index) => (
                <div
                  key={user.id}
                  className={`flex items-center p-4 border-b border-white/5 transition-all duration-300 hover:bg-white/5 ${
                    user.id === activeUser.id ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/10' : ''
                  }`}
                >
                  <div className={`font-semibold w-8 ${
                    index === 0 ? 'text-yellow-400' :
                    index === 1 ? 'text-gray-300' :
                    index === 2 ? 'text-amber-600' : 'text-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1 flex items-center">
                    <div className={`w-10 h-10 rounded-full mr-3 flex items-center justify-center shadow-md ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-500/30 to-amber-500/30 shadow-yellow-500/20' :
                      index === 1 ? 'bg-gradient-to-br from-gray-300/30 to-gray-400/30 shadow-gray-400/20' :
                      index === 2 ? 'bg-gradient-to-br from-amber-600/30 to-orange-600/30 shadow-amber-600/20' :
                      'bg-gradient-to-br from-blue-500/30 to-purple-500/30 shadow-blue-500/20'
                    }`}>
                      <span className="text-lg">{getUserAvatar(index)}</span>
                    </div>
                    <div>
                      <div className="font-medium text-white">{user.name}</div>
                      <div className="text-xs text-cyan-400">Level {user.level}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="flex space-x-1">
                        {user.badges.slice(0, 3).map((badgeId) => (
                          <div key={badgeId} className="w-6 h-6 bg-purple-500/30 border border-purple-500/30 rounded-full flex items-center justify-center text-xs">
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
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}