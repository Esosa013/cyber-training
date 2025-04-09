export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    level: number;
    points: number;
    badges: string[];
    completedScenarios: string[];
    teamId: string | null;
  }