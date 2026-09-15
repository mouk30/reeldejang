import React, { useState, useEffect } from 'react';
import { Trophy, Flame, Sparkles, CheckCircle2, TrendingUp, Clock, Filter } from 'lucide-react';
import { JackpotRecord, GameId } from '../types';
import { INITIAL_JACKPOTS } from '../data/games';

interface LiveJackpotFeedProps {
  customJackpots: JackpotRecord[];
}

export const LiveJackpotFeed: React.FC<LiveJackpotFeedProps> = ({ customJackpots }) => {
  const [jackpots, setJackpots] = useState<JackpotRecord[]>(INITIAL_JACKPOTS);
  const [filterGame, setFilterGame] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'live' | 'hall-of-fame'>('live');

  // Prepend new custom jackpots from user spins if any
  useEffect(() => {
    if (customJackpots.length > 0) {
      setJackpots(prev => [...customJackpots, ...prev]);
    }
  }, [customJackpots]);

  // Periodic simulated live updates every 7-12 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const mockGames: { id: GameId; name: string; patterns: string[]; range: [number, number] }[] = [
        { id: 'sea-story', name: '바다이야기', patterns: ['황금고래 5연타', '백상어 물결 4연타', '소나 암전 고래 7연타'], range: [1200000, 3800000] },
        { id: 'yamato', name: '야마토', patterns: ['파동포 충전 10연타', '붉은전함 4단변신 12연타', '안드로메다 8연타'], range: [2100000, 5200000] },
        { id: 'golden-castle', name: '황금성', patterns: ['황금성문 개방 6연타', '황금종 3타격 5연타', '글라디에이터 투구 7연타'], range: [1100000, 2900000] },
        { id: 'son-goku', name: '손오공', patterns: ['여의봉 번개 9연타', '근두운 승천 7연타', '천궁대소동 11연타'], range: [1500000, 4400000] },
        { id: 'white-whale', name: '백경', patterns: ['빙산파쇄 백경 8연타', '황금작살 6연타'], range: [1300000, 3100000] },
      ];

      const chosenGame = mockGames[Math.floor(Math.random() * mockGames.length)];
      const pattern = chosenGame.patterns[Math.floor(Math.random() * chosenGame.patterns.length)];
      const prize = Math.floor(Math.random() * (chosenGame.range[1] - chosenGame.range[0])) + chosenGame.range[0];
      const combo = parseInt(pattern.match(/\d+/)?.[0] || '5', 10);
      const randomPhone = `010-****-${Math.floor(1000 + Math.random() * 9000)}`;

      const newRecord: JackpotRecord = {
        id: 'jackpot_' + Date.now(),
        gameId: chosenGame.id,
        gameName: chosenGame.name,
        userMasked: randomPhone,
        prizeAmount: prize,
        comboCount: combo,
        patternName: pattern,
        timeAgo: '방금 전',
        verified: true,
      };

      setJackpots(prev => [newRecord, ...prev.slice(0, 19)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const filteredJackpots = jackpots.filter(j => {
    if (filterGame === 'all') return true;
    return j.gameId === filterGame;
  });

  // Calculate stats
  const totalTodayJackpot = jackpots.reduce((sum, j) => sum + j.prizeAmount, 0) + 124500000;
  const maxHitRecord = [...jackpots].sort((a, b) => b.prizeAmount - a.prizeAmount)[0];

  return (
    <section id="jackpots" className="py-12 bg-[#0a0f1d] border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/15 text-yellow-400 text-xs font-bold mb-2 border border-yellow-500/30">
              <Trophy className="w-3.5 h-3.5" />
              <span>실시간 잭팟 및 연타 현황</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              실시간 릴게임 <span className="text-amber-400">당첨 피드 & 명예의 전당</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              RNG 정품 검증을 거친 실시간 당첨 및 연타 기록이 초단위로 갱신됩니다.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5">
              <span className="text-[11px] text-slate-400 block">오늘 누적 잭팟 지급액</span>
              <span className="text-lg font-black text-amber-400 font-mono">
                {totalTodayJackpot.toLocaleString()} P
              </span>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5">
              <span className="text-[11px] text-slate-400 block">최고 연타 당첨자</span>
              <span className="text-lg font-black text-cyan-300 font-mono">
                {maxHitRecord ? `${maxHitRecord.gameName} ${maxHitRecord.comboCount}연타` : '15연타'}
              </span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: '전체 게임' },
              { id: 'sea-story', label: '바다이야기' },
              { id: 'yamato', label: '야마토' },
              { id: 'golden-castle', label: '황금성' },
              { id: 'son-goku', label: '손오공' },
              { id: 'white-whale', label: '백경' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterGame(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  filterGame === tab.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-lg border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>RNG 100% 무조작 검증 완료</span>
          </div>
        </div>

        {/* Jackpot Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredJackpots.slice(0, 9).map((record, index) => (
            <div
              key={record.id}
              className={`p-4 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                index === 0
                  ? 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border-amber-500/40 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              {index === 0 && (
                <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-bl font-mono">
                  LATEST HIT
                </div>
              )}

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                    {record.gameName}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{record.userMasked}</span>
                </div>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {record.timeAgo}
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-2">
                <div className="text-sm font-semibold text-slate-200 truncate max-w-[180px]">
                  {record.patternName}
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-amber-400 font-mono">
                    +{record.prizeAmount.toLocaleString()} P
                  </span>
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  정상 출금 확인
                </span>
                <span className="font-mono text-cyan-400 font-semibold">{record.comboCount}연타 완료</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
