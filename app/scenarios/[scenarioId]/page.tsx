import { MOCK_SCENARIOS } from '@/components/data/constant';
import ScenarioClient from './ScenarioClient';

// This function tells Next.js which scenario IDs to pre-render at build time
export async function generateStaticParams() {
  return MOCK_SCENARIOS.map(scenario => ({
    scenarioId: scenario.id
  }));
}

export default function ScenarioPage({ params }: { params: { scenarioId: string } }) {
  // Get the scenario data on the server
  const scenarioId = params.scenarioId;
  const scenario = MOCK_SCENARIOS.find(s => s.id === scenarioId);
  
  // If scenario doesn't exist, you could redirect here
  if (!scenario) {
    // In a server component, you'd use redirect from next/navigation
    // But for simplicity, we'll just show an error
    return <div>Scenario not found</div>;
  }
  
  // Pass the scenario data to the client component
  return <ScenarioClient scenario={scenario} />;
}