import React from 'react';
import { Flame, ShieldCheck, Zap, Sparkles, Trophy, ChevronRight, PlayCircle, Layers, CheckCircle2 } from 'lucide-react';
import { GameId } from '../types';

interface HeroSectionProps {
  selectedGameId: GameId;
  onSelectGame: (id: GameId) => void;
  onScrollToSimulator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ selectedGameId, onSelectGame, onScrollToSimulator }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 border-b border-slate-800/80 bg-gradient-to-b from-[#0a0f1d] via-[#0d1424] to-[#070b14]">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Badges & SEO Headline Anchor */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>2025~2026 구글 검색 1위 릴게임 공식 포털</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>정품 기판 100% 동일 알고리즘 복각</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>PC · 스마트폰 무설치 웹 즉시 실행</span>
          </div>
        </div>

        {/* Primary Semantic H1 for Google Dominance */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
          대한민국 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">No.1 릴게임</span> 종합 공식 포털
          <br className="hidden sm:inline" />
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-300 mt-2 block">
            바다이야기 · 야마토 · 황금성 · 손오공 무료체험 & 족보 공략
          </span>
        </h1>

        {/* Detailed SEO paragraph satisfying user search intent */}
        <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed mb-6">
          국내 최정상 릴게임 매니아들을 위한 독보적인 정보 플랫폼입니다. 
          오리지널 아케이드 기판의 손맛을 그대로 담은 <strong className="text-amber-300 font-semibold">바다이야기 황금고래 7연타</strong>, 
          <strong className="text-yellow-300 font-semibold">야마토 붉은전함 4단 변신 및 파동포 예시</strong>, 
          <strong className="text-emerald-300 font-semibold">황금성 성문 개폐 잭팟</strong>, 
          <strong className="text-cyan-300 font-semibold">손오공 여의봉 보너스</strong>를 회원가입 및 결제 없이 
          브라우저에서 <strong>100% 무제한 무료체험</strong>하세요.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <button
            id="hero-play-simulator-cta-btn"
            onClick={onScrollToSimulator}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-bold text-base shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <PlayCircle className="w-5 h-5 fill-slate-950 text-amber-400" />
            <span>무료 릴게임 시뮬레이터 플레이</span>
          </button>

          <a
            href="#guides"
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-base transition-colors"
          >
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>게임별 예시 족보 공략집</span>
          </a>

          <a
            href="#rankings"
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 font-semibold text-base transition-colors"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>먹튀 검증 안전 사이트 TOP 4</span>
          </a>
        </div>

        {/* Quick Game Selector Bar */}
        <div className="bg-[#0e1627]/90 p-4 rounded-2xl border border-slate-800 shadow-xl backdrop-blur">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              인기 릴게임 빠른 체험 선택
            </span>
            <span className="text-xs text-slate-400">클릭 시 시뮬레이터 테마가 즉시 전환됩니다</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {[
              { id: 'sea-story' as const, name: '바다이야기', icon: '🐋', sub: '황금고래 7연타', color: 'border-cyan-500/50 hover:bg-cyan-950/40' },
              { id: 'yamato' as const, name: '야마토', icon: '🚀', sub: '파동포 15연타', color: 'border-red-500/50 hover:bg-red-950/40' },
              { id: 'golden-castle' as const, name: '황금성', icon: '🏰', sub: '성문개폐 보너스', color: 'border-yellow-500/50 hover:bg-yellow-950/40' },
              { id: 'son-goku' as const, name: '손오공', icon: '🐵', sub: '여의봉 번개소환', color: 'border-orange-500/50 hover:bg-orange-950/40' },
              { id: 'white-whale' as const, name: '백경', icon: '🐳', sub: '빙산파쇄 황금작살', color: 'border-sky-500/50 hover:bg-sky-950/40' },
              { id: 'ocean-paradise' as const, name: '오션파라다이스', icon: '🧜‍♀️', sub: '인어공주 산호초', color: 'border-teal-500/50 hover:bg-teal-950/40' },
            ].map(item => {
              const isSelected = selectedGameId === item.id;
              return (
                <button
                  key={item.id}
                  id={`hero-game-select-${item.id}`}
                  onClick={() => {
                    onSelectGame(item.id);
                    onScrollToSimulator();
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${item.color} ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 shadow-md shadow-amber-500/20 scale-[1.03]'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl">{item.icon}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">{item.name}</h3>
                    <p className="text-[11px] text-slate-400 font-medium truncate">{item.sub}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Pillars Trust Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">먹튀 이력 0건 보증</h4>
              <p className="text-[11px] text-slate-400">보증금 5억 예치 안전 검증</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">97.6% 원작 환수율</h4>
              <p className="text-[11px] text-slate-400">정통 아케이드 배당률 준수</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">초고속 1초 자동 입출금</h4>
              <p className="text-[11px] text-slate-400">지연 시 보상 제도 운영</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">HTML5 60FPS 무설치</h4>
              <p className="text-[11px] text-slate-400">모든 모바일 기기 완벽 지원</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
