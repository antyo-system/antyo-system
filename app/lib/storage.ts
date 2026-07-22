import {
  UserStats,
  SabbathState,
  FocusTask,
  Transaction,
  HealthLog,
  Contact,
  JournalEntry,
  AIMessage,
} from "./types";

const KEYS = {
  STATS: "antyo_user_stats",
  SABBATH: "antyo_sabbath_state",
  TASKS: "antyo_focus_tasks",
  TRANSACTIONS: "antyo_transactions",
  HEALTH: "antyo_health_logs",
  CONTACTS: "antyo_contacts",
  JOURNAL: "antyo_journal_entries",
  AI_MESSAGES: "antyo_ai_messages",
};

// Initial Mock Data Seeds
const DEFAULT_STATS: UserStats = {
  level: 4,
  xp: 1450,
  xpToNextLevel: 2000,
  dailyStreak: 12,
  lifeBalanceScore: 88,
};

const DEFAULT_SABBATH: SabbathState = {
  enabled: false,
  pausedDomains: {
    time: false,
    finance: false,
    health: false,
    relationship: false,
    story: false,
  },
};

const DEFAULT_TASKS: FocusTask[] = [
  {
    id: "task-1",
    title: "Design ANTYO ERP Core Dashboard Layout",
    category: "deep",
    priority: "high",
    completed: true,
    pomodorosEstimate: 4,
    pomodorosCompleted: 4,
    createdAt: new Date().toISOString(),
  },
  {
    id: "task-2",
    title: "Implement Finance Cashflow Tracker Module",
    category: "deep",
    priority: "high",
    completed: false,
    pomodorosEstimate: 3,
    pomodorosCompleted: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "task-3",
    title: "Review Weekly Health Metrics & Water Intake",
    category: "admin",
    priority: "medium",
    completed: false,
    pomodorosEstimate: 1,
    pomodorosCompleted: 0,
    createdAt: new Date().toISOString(),
  },
];

const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    title: "SaaS Client Retainer",
    amount: 15000000,
    type: "income",
    category: "savings",
    date: new Date().toISOString().slice(0, 10),
    notes: "Monthly development retainer",
  },
  {
    id: "tx-2",
    title: "AWS Cloud Infrastructure",
    amount: 1250000,
    type: "expense",
    category: "needs",
    date: new Date().toISOString().slice(0, 10),
    notes: "Server hosting & database",
  },
  {
    id: "tx-3",
    title: "Ergonomic Desk Accessories",
    amount: 850000,
    type: "expense",
    category: "wants",
    date: new Date().toISOString().slice(0, 10),
    notes: "Workspace optimization",
  },
  {
    id: "tx-4",
    title: "Monthly Index Fund Investment",
    amount: 3000000,
    type: "expense",
    category: "investment",
    date: new Date().toISOString().slice(0, 10),
    notes: "Long term growth portfolio",
  },
];

const DEFAULT_HEALTH_LOGS: HealthLog[] = [
  {
    id: "hl-1",
    date: new Date().toISOString().slice(0, 10),
    sleepHours: 7.5,
    waterMl: 2500,
    workoutMinutes: 45,
    moodScore: 5,
    energyScore: 4,
  },
  {
    id: "hl-2",
    date: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
    sleepHours: 8.0,
    waterMl: 2000,
    workoutMinutes: 30,
    moodScore: 4,
    energyScore: 4,
  },
];

const DEFAULT_CONTACTS: Contact[] = [
  {
    id: "c-1",
    name: "Alex Rivera",
    tier: "inner_circle",
    role: "Co-founder & Tech Lead",
    lastContactDate: new Date().toISOString().slice(0, 10),
    healthStatus: "healthy",
    notes: "Discussed system architecture & product roadmap.",
  },
  {
    id: "c-2",
    name: "Dr. Evelyn Vance",
    tier: "mentor",
    role: "AI Research Advisor",
    lastContactDate: new Date(Date.now() - 86400000 * 3).toISOString().slice(0, 10),
    healthStatus: "healthy",
    notes: "Reviewed multi-agent feedback loop papers.",
  },
  {
    id: "c-3",
    name: "Marcus Brody",
    tier: "close_friend",
    role: "Design Lead",
    lastContactDate: new Date(Date.now() - 86400000 * 12).toISOString().slice(0, 10),
    healthStatus: "warning",
    notes: "Need to schedule monthly catchup coffee.",
  },
];

const DEFAULT_JOURNAL: JournalEntry[] = [
  {
    id: "j-1",
    date: new Date().toISOString().slice(0, 10),
    title: "Launching ANTYO ERP Life OS Architecture",
    content: "Refactored the core system into a unified 5-domain ERP layout. Clarified priorities, Sabbath mode, and AI feedback loops.",
    tag: "win",
    moodEmoji: "🚀",
  },
  {
    id: "j-2",
    date: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
    title: "Deep Focus Session & Mindful Hydration",
    content: "Completed 4 pomodoro blocks of uninterrupted deep work. Health and energy metrics remained steady throughout the afternoon.",
    tag: "reflection",
    moodEmoji: "🧠",
  },
];

const DEFAULT_AI_MESSAGES: AIMessage[] = [
  {
    id: "aim-1",
    companion: "azul",
    message: "Optimal focus window detected between 09:00 - 11:30 AM. Recommend scheduling 'Deep Work' tasks during this window.",
    timestamp: "10 mins ago",
    category: "strategy",
  },
  {
    id: "aim-2",
    companion: "azel",
    message: "You've maintained a 12-day streak! Remember to pause for 5 minutes and stretch after your next Pomodoro session.",
    timestamp: "1 hour ago",
    category: "mindfulness",
  },
];

// Generic LocalStorage Loader with Default Fallback
function getItem<T>(key: string, defaultVal: T): T {
  if (typeof window === "undefined") return defaultVal;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(raw) as T;
  } catch {
    return defaultVal;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
}

// User Stats API
export function getUserStats(): UserStats {
  return getItem<UserStats>(KEYS.STATS, DEFAULT_STATS);
}

export function saveUserStats(stats: UserStats): void {
  setItem(KEYS.STATS, stats);
}

export function addXP(amount: number): UserStats {
  const current = getUserStats();
  let newXp = current.xp + amount;
  let newLevel = current.level;
  let newXpToNext = current.xpToNextLevel;

  while (newXp >= newXpToNext) {
    newXp -= newXpToNext;
    newLevel += 1;
    newXpToNext = Math.round(newXpToNext * 1.25);
  }

  const updated: UserStats = {
    ...current,
    level: newLevel,
    xp: newXp,
    xpToNextLevel: newXpToNext,
  };
  saveUserStats(updated);
  return updated;
}

// Sabbath State API
export function getSabbathState(): SabbathState {
  return getItem<SabbathState>(KEYS.SABBATH, DEFAULT_SABBATH);
}

export function toggleSabbathMode(): SabbathState {
  const current = getSabbathState();
  const updated: SabbathState = {
    ...current,
    enabled: !current.enabled,
  };
  setItem(KEYS.SABBATH, updated);
  return updated;
}

// Tasks API
export function getFocusTasks(): FocusTask[] {
  return getItem<FocusTask[]>(KEYS.TASKS, DEFAULT_TASKS);
}

export function saveFocusTasks(tasks: FocusTask[]): void {
  setItem(KEYS.TASKS, tasks);
}

export function addFocusTask(task: Omit<FocusTask, "id" | "createdAt">): FocusTask {
  const tasks = getFocusTasks();
  const newTask: FocusTask = {
    ...task,
    id: `task-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  tasks.unshift(newTask);
  saveFocusTasks(tasks);
  return newTask;
}

export function toggleTaskComplete(id: string): FocusTask[] {
  const tasks = getFocusTasks().map((t) => {
    if (t.id === id) {
      const nextCompleted = !t.completed;
      if (nextCompleted) addXP(50);
      return { ...t, completed: nextCompleted };
    }
    return t;
  });
  saveFocusTasks(tasks);
  return tasks;
}

// Finance API
export function getTransactions(): Transaction[] {
  return getItem<Transaction[]>(KEYS.TRANSACTIONS, DEFAULT_TRANSACTIONS);
}

export function addTransaction(tx: Omit<Transaction, "id">): Transaction {
  const list = getTransactions();
  const newTx: Transaction = {
    ...tx,
    id: `tx-${Date.now()}`,
  };
  list.unshift(newTx);
  setItem(KEYS.TRANSACTIONS, list);
  addXP(25);
  return newTx;
}

// Health API
export function getHealthLogs(): HealthLog[] {
  return getItem<HealthLog[]>(KEYS.HEALTH, DEFAULT_HEALTH_LOGS);
}

export function addHealthLog(log: Omit<HealthLog, "id">): HealthLog {
  const logs = getHealthLogs();
  const newLog: HealthLog = {
    ...log,
    id: `hl-${Date.now()}`,
  };
  logs.unshift(newLog);
  setItem(KEYS.HEALTH, logs);
  addXP(30);
  return newLog;
}

// Contacts API
export function getContacts(): Contact[] {
  return getItem<Contact[]>(KEYS.CONTACTS, DEFAULT_CONTACTS);
}

export function addContact(contact: Omit<Contact, "id">): Contact {
  const contacts = getContacts();
  const newContact: Contact = {
    ...contact,
    id: `c-${Date.now()}`,
  };
  contacts.unshift(newContact);
  setItem(KEYS.CONTACTS, contacts);
  addXP(40);
  return newContact;
}

// Journal API
export function getJournalEntries(): JournalEntry[] {
  return getItem<JournalEntry[]>(KEYS.JOURNAL, DEFAULT_JOURNAL);
}

export function addJournalEntry(entry: Omit<JournalEntry, "id">): JournalEntry {
  const entries = getJournalEntries();
  const newEntry: JournalEntry = {
    ...entry,
    id: `j-${Date.now()}`,
  };
  entries.unshift(newEntry);
  setItem(KEYS.JOURNAL, entries);
  addXP(60);
  return newEntry;
}

// AI Messages API
export function getAIMessages(): AIMessage[] {
  return getItem<AIMessage[]>(KEYS.AI_MESSAGES, DEFAULT_AI_MESSAGES);
}
