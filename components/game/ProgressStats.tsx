// src/compone


import { MOCK_SCENARIOS, User } from "../data/constant";

type ProgressStatsProps = {
  user: User;
  nextLevelPoints: number;
};

export default function ProgressStats({ user, nextLevelPoints }: ProgressStatsProps) {
  // Calculate progress percentage to next level
  const currentLevelPoints = user.level * 1000; // Assuming 1000 points per level
  const pointsToNextLevel = nextLevelPoints - currentLevelPoints;
  const progressPercentage = ((user.points - currentLevelPoints) / pointsToNextLevel) * 100;
  
  // Calculate completion stats
  const totalScenarios = MOCK_SCENARIOS.length;
  const completedScenarios = user.completedScenarios.length;
  const completionPercentage = (completedScenarios / totalScenarios) * 100;
  
  // Calculate category breakdown
  const categoryStats = MOCK_SCENARIOS.reduce((acc, scenario) => {
    const isCompleted = user.completedScenarios.includes(scenario.id);
    
    if (!acc[scenario.category]) {
      acc[scenario.category] = { total: 0, completed: 0 };
    }
    
    acc[scenario.category].total += 1;
    if (isCompleted) acc[scenario.category].completed += 1;
    
    return acc;
  }, {} as Record<string, { total: number; completed: number }>);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Your Progress</h2>
      
      {/* Level Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Level {user.level}</span>
          <span className="text-sm text-gray-600">{user.points} / {nextLevelPoints} XP</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Scenario Completion */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Scenarios Completed</span>
          <span className="text-sm text-gray-600">{completedScenarios} / {totalScenarios}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-500 h-2.5 rounded-full" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Category Breakdown */}
      <div>
        <h3 className="font-medium mb-3">Category Breakdown</h3>
        <div className="space-y-3">
          {Object.entries(categoryStats).map(([category, stats]) => {
            const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
            const categoryPercentage = (stats.completed / stats.total) * 100;
            
            let barColor = '';
            switch (category) {
              case 'phishing':
                barColor = 'bg-blue-500';
                break;
              case 'social':
                barColor = 'bg-purple-500';
                break;
              case 'data-protection':
                barColor = 'bg-green-500';
                break;
              default:
                barColor = 'bg-gray-500';
            }
            
            return (
              <div key={category}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">{categoryName}</span>
                  <span className="text-xs text-gray-600">{stats.completed} / {stats.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${barColor} h-2 rounded-full`} 
                    style={{ width: `${categoryPercentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}