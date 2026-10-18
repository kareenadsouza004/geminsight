export type PersonaType =
  | 'Chief Financial Officer (CFO)'
  | 'Chief Executive Officer (CEO)'
  | 'Chief People Officer (CHRO)'
  | 'Chief Digital & Technology Officer (CDTO)'
  | 'Chief Operations & Supply Chain Officer (COSO)';

export type ModuleType =
  | 'command-centre'
  | 'intelligence-hub'
  | 'radar'
  | 'cockpit'
  | 'talk-data';

export type TagSentiment = 'Good' | 'OK' | 'Bad';
export type PriorityLevel = 'Critical' | 'Medium' | 'Low';

export interface ContactPerson {
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  avatarColor?: string;
}

export interface IndustryBenchmark {
  value: string;
  comparisonText: string;
  isBeatingBenchmark: boolean;
  benchmarkSource?: string;
}

export interface KPICardData {
  id: string;
  title: string;
  value: string;
  unit?: string;
  trend: string;
  trendDirection: 'up' | 'down' | 'neutral';
  trendPositive: boolean;
  sparkline?: number[];
  industryBenchmark: IndustryBenchmark;
  detailTitle: string;
  detailDescription: string;
  detailItems: {
    label: string;
    value: string;
    subtext?: string;
    badge?: string;
    isPositive?: boolean;
  }[];
  leadContact: ContactPerson;
}

export interface ExtraDashboardData {
  title: string;
  subtitle: string;
  type: 'bar' | 'donut' | 'activity';
  items: {
    label: string;
    value: number | string;
    secondary?: string;
    color?: string;
  }[];
}

export interface StoreNode {
  id: string;
  name: string;
  type: 'company' | 'region' | 'cluster' | 'zone' | 'store';
  storeCount: number;
  managerTitle?: string;
  city?: string;
  children?: StoreNode[];
}

export interface IntelligenceItem {
  id: string;
  headline: string; // 8-10 words
  oneLiner: string; // 1 sentence
  source: string; // Not truncated
  timeAgo: string; // e.g. "2 hrs ago"
  tag: TagSentiment;
  fullDetail: string; // Short expansion
  inDepthReport: {
    summary: string;
    keyMetrics: { label: string; value: string }[];
    affectedStoresOrDepts: string;
    executiveRecommendation: string;
  };
  contactPerson: ContactPerson;
}

export interface RadarItem {
  id: string;
  type: 'risk' | 'opportunity';
  category: string; // High-level bucket (e.g. Supply Chain, Market, Finance, etc.)
  headline: string;
  description: string; // 2 short plain sentences
  priority: PriorityLevel;
  sourceType: string;
  sourceDetail: {
    senderOrDoc: string;
    timestamp: string;
    preview: string;
    metaInfo?: string;
  };
  contactPerson: ContactPerson;
  recommendedSolutions: [string, string];
}

export interface ActionItem {
  id: string;
  header: string;
  bullet1: string;
  bullet2: string;
  assignedTo: string;
  isAI: boolean;
  status: 'Done' | 'In progress' | 'Waiting';
  progress: number;
  contactPerson?: ContactPerson;
}

export interface StrategyItem {
  id: string;
  headline: string;
  twoSentenceDetail: string;
  tag: TagSentiment;
  percentCompleted: number;
  actions: ActionItem[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  followUps?: string[];
  actionCandidate?: {
    headline: string;
    detail: string;
    priority: PriorityLevel;
    solutions: string[];
  } | null;
}
