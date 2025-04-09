import { useState, useEffect } from 'react';
import { User, Scenario, Badge, MOCK_BADGES, MOCK_SCENARIOS } from '@/components/data/constant';
import { useUser } from '@clerk/nextjs';

const useDashboard = () => {
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [allScenarios, setAllScenarios] = useState<Scenario[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [scenarioFilter, setScenarioFilter] = useState<string>('all');
  const [showCompletedOnly, setShowCompletedOnly] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/get-user');
        if (!res.ok) {
          throw new Error(`Failed to fetch user: ${res.status}`);
        }
        const data = await res.json();
        setActiveUser(data);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    const fetchAllUsers = async () => {
      try {
        const res = await fetch('/api/get-users');
        if (!res.ok) {
          throw new Error(`Failed to fetch users: ${res.status}`);
        }
        const data = await res.json();
        setAllUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    if (user) {
      fetchUser();
    }
    fetchAllUsers(); // Fetch all users when the component mounts

    if (activeUser) {
      const scenariosWithStatus = MOCK_SCENARIOS.map(scenario => ({
        ...scenario,
        completed: activeUser.completedScenarios.includes(scenario.id),
      }));

      setAllScenarios(scenariosWithStatus);

      const badges = MOCK_BADGES.filter(
        badge => activeUser.badges.includes(badge.id)
      );
      setEarnedBadges(badges);
    }
  }, [user, activeUser]); // Re-run when `user` or `activeUser` changes

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

  const scenarioOptions = [
    { label: 'All', value: 'all' },
    { label: 'Phishing', value: 'phishing' },
    { label: 'Social', value: 'social' },
    { label: 'Data Protection', value: 'data-protection' },
    { label: 'Network Security', value: 'network-security' },
    { label: 'Device Security', value: 'device-security' },
    { label: 'Physical Security', value: 'physical-security' },
    { label: 'Remote Security', value: 'remote-security' },
    { label: 'Application Security', value: 'application-security' },
    { label: 'Third Party Risk', value: 'third-party-risk' },
    { label: 'Incident Response', value: 'incident-response' }
  ];

  const baseButtonClass = 'px-4 py-2 border rounded-lg text-sm backdrop-blur-md transition-all duration-300';

  const getButtonClass = (active: boolean, activeColor: string = 'blue') =>
    active
      ? `bg-gradient-to-r from-cyan-500 to-${activeColor}-500 text-white border-transparent shadow-lg shadow-${activeColor}-500/30`
      : 'bg-white/5 border-white/10 hover:bg-white/10';

  return {
    activeUser,
    setActiveUser,
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
  };
};

export default useDashboard;
