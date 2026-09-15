import React, { useState } from 'react';
import { Award, ChevronDown, ChevronUp, Play, BookOpen, AlertCircle, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { GameDefinition, GameId } from '../types';
import { REEL_GAMES } from '../data/games';

interface GameGuideCatalogProps {
  onPlayGame: (id: GameId) => void;
}

export const GameGuideCatalog: React.FC<GameGuideCatalogProps> = ({ onPlayGame }) => {
  const [selectedGameId, setSelectedGameId] = useState<GameId>('sea-story');
  const activeGame = REEL_GAMES.find(g => g.id === selectedGameId) || REEL_GAMES[0];

  return (
    <section id="guides" className="py-14 bg-gradient-to-b from-[#070b14] via-[#09101f] to-[#070b14] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-400 text-xs font-bold mb-3 border border-cyan-500/30">
            <BookOpen className="w-3.5 h-3.5" />
            <span>정통 아케이드 족보 백과사전</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            대표 릴게임별 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-amber-400">족보 및 예시·연타 완벽 공략</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            구글 검색 이용자들이 가장 많이 찾는 각 릴게임의 상징적인 예시 전조 현상과 고배당 연타 족보를 상세 분석했습니다.
          </p>
        </div>

        {/* Game Selection Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
          {REEL_GAMES.map(game => {
            const isSelected = selectedGameId === game.id;
            return (
              <button
                key={game.id}
                id={`guide-tab-${game.id}`}
                onClick={() => setSelectedGameId(game.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-cyan-950/80 to-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-2xl mb-1">{game.symbols[0].icon}</div>
                <h3 className="text-sm font-bold text-slate-100 truncate">{game.name.split(' ')[0]}</h3>
                <span className="text-[10px] text-cyan-400 block font-mono">{game.rtp}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Game Deep Dive Article */}
        <article className="rounded-3xl bg-[#0c1322] border border-slate-800 p-5 sm:p-8 shadow-xl">
          {/* Article Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl">{activeGame.symbols[0].icon}</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">{activeGame.name}</h3>
                <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full font-bold">
                  {activeGame.badge}
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
                {activeGame.description}
              </p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
              <button
                id={`guide-play-now-${activeGame.id}`}
                onClick={() => {
                  onPlayGame(activeGame.id);
                  const simEl = document.getElementById('simulator');
                  if (simEl) simEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{activeGame.name.split(' ')[0]} 즉시 시뮬레이터 실행</span>
              </button>
              <div className="text-xs text-slate-400 font-mono">
                변동성: <span className="text-amber-400 font-semibold">{activeGame.volatility}</span> | 환수율: <span className="text-emerald-400 font-semibold">{activeGame.rtp}</span>
              </div>
            </div>
          </div>

          {/* Core Content 3 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Column 1: Key Notice Patterns (예시 패턴) */}
            <div className="bg-slate-900/70 rounded-2xl p-5 border border-slate-800/80">
              <h4 className="text-base font-bold text-amber-300 flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <span>핵심 당첨 예시(豫示) 패턴</span>
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                릴게임 특유의 당첨 전조 증상입니다. 해당 연출이 포착되면 즉시 집중 베팅 타이밍입니다.
              </p>
              <div className="space-y-3.5">
                {activeGame.noticePatterns.map((pattern, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-200">{pattern.title}</span>
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                        {pattern.chanceText}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {pattern.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Combo Features (연타 메커니즘) */}
            <div className="bg-slate-900/70 rounded-2xl p-5 border border-slate-800/80">
              <h4 className="text-base font-bold text-cyan-300 flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span>폭발적인 연타(Combo) 시스템</span>
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                당첨 1회로 끝나지 않는 연속 잭팟의 구조와 기대 가능한 최대 배당 폭입니다.
              </p>
              <div className="space-y-3.5">
                {activeGame.comboFeatures.map((combo, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-200">{combo.title}</span>
                      <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                        {combo.multiplierRange}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {combo.description}
                    </p>
                  </div>
                ))}
                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 leading-relaxed">
                  💡 <strong>전문가 팁:</strong> 보너스 연타가 3회 이상 지속될 때는 임의로 사이트를 새로고침하지 마시고 자동 스핀으로 연타가 완전히 종료될 때까지 유지하는 것이 누적 승률에 유리합니다.
                </div>
              </div>
            </div>

            {/* Column 3: Symbol Paytable (심볼 배당표) */}
            <div className="bg-slate-900/70 rounded-2xl p-5 border border-slate-800/80">
              <h4 className="text-base font-bold text-emerald-300 flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>심볼별 3열 일치 배당률</span>
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                3x3 릴에서 가로 3열 또는 대각선 2열 일치 시 베팅액 대비 지급되는 배수입니다.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {activeGame.symbols.map(s => (
                  <div key={s.id} className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{s.icon}</span>
                      <div>
                        <span className="text-xs font-bold text-slate-200 block">{s.name}</span>
                        <span className="text-[10px] text-slate-500 uppercase">{s.rarity}</span>
                      </div>
                    </div>
                    <span className="text-sm font-black font-mono text-amber-400">
                      {s.payout}x
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>국제 공인 RNG 표준 난수 생성 방식 적용</span>
              </div>
            </div>
          </div>

          {/* Historical SEO Content Footer */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-300">개발 역사 및 알고리즘 정보: </strong>
            {activeGame.historyText}
          </div>
        </article>
      </div>
    </section>
  );
};
