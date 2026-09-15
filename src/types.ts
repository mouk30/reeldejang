export type GameId = 'sea-story' | 'yamato' | 'golden-castle' | 'son-goku' | 'ocean-paradise' | 'white-whale';

export interface ReelSymbol {
  id: string;
  name: string;
  icon: string; // emoji or label
  color: string;
  payout: number; // multiplier for 3 in a row
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface GameDefinition {
  id: GameId;
  name: string;
  nameEn: string;
  subtitle: string;
  tagline: string;
  badge: string;
  themeColor: string;
  accentColor: string;
  rtp: string;
  volatility: string;
  symbols: ReelSymbol[];
  noticePatterns: {
    title: string;
    description: string;
    chanceText: string;
  }[];
  comboFeatures: {
    title: string;
    description: string;
    multiplierRange: string;
  }[];
  description: string;
  historyText: string;
}

export interface JackpotRecord {
  id: string;
  gameId: GameId;
  gameName: string;
  userMasked: string;
  prizeAmount: number;
  comboCount: number;
  patternName: string;
  timeAgo: string;
  verified: boolean;
}

export interface SiteRanking {
  rank: number;
  name: string;
  badge: string;
  rating: number;
  reviewsCount: number;
  speedMs: number;
  safetyScore: number;
  depositGuarantee: string;
  supportedGames: string[];
  eventBonus: string;
  features: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: '일반' | '게임방법' | '안전검증' | '모바일';
}
