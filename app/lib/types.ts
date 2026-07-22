export interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  dailyStreak: number;
  lifeBalanceScore: number;
}

export interface SabbathState {
  enabled: boolean;
  pausedDomains: {
    time: boolean;
    finance: boolean;
    health: boolean;
    relationship: boolean;
    story: boolean;
  };
}

export interface FocusSession {
  id: string;
  label: string;
  type: "work" | "break";
  category?: "deep" | "study" | "admin" | "creative";
  startTime: string;
  endTime: string;
  durationMinutes: number;
}

export interface FocusTask {
  id: string;
  title: string;
  category: "deep" | "study" | "admin" | "creative";
  priority: "low" | "medium" | "high";
  completed: boolean;
  pomodorosEstimate: number;
  pomodorosCompleted: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: "needs" | "wants" | "savings" | "investment";
  date: string; // YYYY-MM-DD
  notes?: string;
}

export interface HealthLog {
  id: string;
  date: string; // YYYY-MM-DD
  sleepHours: number;
  waterMl: number;
  workoutMinutes: number;
  moodScore: number; // 1-5
  energyScore: number; // 1-5
}

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  tier: "inner_circle" | "close_friend" | "mentor" | "network";
  role?: string;
  lastContactDate: string; // YYYY-MM-DD
  healthStatus: "healthy" | "warning" | "stale";
  notes?: string;
}

export interface JournalEntry {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  content: string;
  tag: "gratitude" | "win" | "challenge" | "reflection";
  moodEmoji?: string;
}

export interface AIMessage {
  id: string;
  companion: "azul" | "azel";
  message: string;
  timestamp: string;
  category: "strategy" | "mindfulness" | "encouragement" | "warning";
}
