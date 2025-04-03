import { useRouter } from 'next/router';
import { Scenario } from '../data/constant';

type ScenarioCardProps = {
  scenario: Scenario;
};

export default function ScenarioCard({ scenario }: ScenarioCardProps) {
  const router = useRouter();
  
  const handleStartScenario = () => {
    router.push(`/scenarios/${scenario.id}`);
  };
  
  // Helper function to get category styling
  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'phishing':
        return 'bg-blue-950 text-blue-300';
      case 'social':
        return 'bg-purple-950 text-purple-300';
      case 'data-protection':
        return 'bg-green-950 text-green-300';
      default:
        return 'bg-gray-900 text-gray-300';
    }
  };
  
  // Helper function to get difficulty styling
  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-800';
      case 'intermediate':
        return 'bg-yellow-800';
      case 'advanced':
        return 'bg-red-800';
      default:
        return 'bg-gray-800';
    }
  };
  
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden transition-transform hover:transform hover:scale-[1.02] border border-gray-800">
      <div className={`h-2 ${getDifficultyStyle(scenario.difficulty)}`}></div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getCategoryStyle(scenario.category)}`}>
            {scenario.category.charAt(0).toUpperCase() + scenario.category.slice(1)}
          </span>
          {scenario.badge && (
            <div className="flex items-center text-xs text-gray-400">
              <span className="mr-1">🛡️</span>
              <span>Badge available</span>
            </div>
          )}
        </div>
        
        <h3 className="font-semibold text-lg mt-2 text-gray-100">{scenario.title}</h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-3">{scenario.description}</p>
        
        <div className="flex justify-between items-center mt-4 text-sm">
          <div className="flex items-center text-gray-400">
            <span className="mr-1">⏱️</span>
            <span>{scenario.estimatedTime} min</span>
          </div>
          <div className="flex items-center font-medium text-blue-400">
            <span className="mr-1">🏆</span>
            <span>{scenario.points} points</span>
          </div>
        </div>
        
        <button 
          onClick={handleStartScenario}
          className="w-full mt-4 bg-blue-800 text-gray-100 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <span>Start Scenario</span>
          <span className="ml-1">→</span>
        </button>
      </div>
    </div>
  );
}