import React from 'react';
import { ShieldCheck, Star, Zap, CheckCircle2, AlertTriangle, ExternalLink, Award, Lock, HelpCircle } from 'lucide-react';
import { TOP_SITES } from '../data/games';

interface SafeVerificationRankingProps {
  onOpenSiteConnect: (siteName: string) => void;
}

export const SafeVerificationRanking: React.FC<SafeVerificationRankingProps> = ({ onOpenSiteConnect }) => {
  return (
    <section id="rankings" className="py-14 bg-[#0a0f1d] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold mb-3 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>2025~2026 먹튀검증 100% 완료 보증 업체</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            대한민국 릴게임 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">안전 보증 사이트 순위 TOP 4</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            본 포털 운영진이 최소 3개월 이상의 실시간 출금 테스트와 2억원 이상의 안전 보증금 예치를 마친 메이저 릴게임 공식 제휴 사이트입니다.
          </p>
        </div>

        {/* Site Ranking Cards */}
        <div className="space-y-4 mb-12">
          {TOP_SITES.map(site => (
            <div
              key={site.rank}
              className={`rounded-2xl p-5 sm:p-6 border transition-all duration-200 relative overflow-hidden ${
                site.rank === 1
                  ? 'bg-gradient-to-r from-[#101b33] via-[#0d1629] to-[#0a1120] border-amber-500/40 shadow-xl shadow-amber-500/10'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              {site.rank === 1 && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-yellow-500 text-slate-950 font-black text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider font-mono">
                  👑 OVERALL RANK #1
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                {/* Left: Rank & Title */}
                <div className="flex items-start sm:items-center gap-4">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 shadow-lg ${
                    site.rank === 1
                      ? 'bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 shadow-amber-500/30'
                      : site.rank === 2
                      ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-slate-950'
                      : 'bg-gradient-to-br from-amber-700 to-yellow-900 text-amber-200'
                  }`}>
                    {site.rank}위
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white">{site.name}</h3>
                      <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {site.badge}
                      </span>
                      <span className="text-xs text-amber-400 font-mono font-bold flex items-center gap-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {site.rating} ({site.reviewsCount.toLocaleString()}건 검증)
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                        🛡️ {site.depositGuarantee}
                      </span>
                      <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-cyan-300 font-mono">
                        ⚡ 출금 반응 {site.speedMs}ms
                      </span>
                      <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-emerald-300 font-mono">
                        안전도 {site.safetyScore}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle: Supported Games & Event */}
                <div className="lg:max-w-xs space-y-1.5">
                  <div className="text-xs text-slate-300">
                    <strong className="text-slate-400">제공 게임: </strong>
                    {site.supportedGames.join(', ')}
                  </div>
                  <div className="text-xs font-semibold text-amber-300 bg-amber-950/40 px-2.5 py-1 rounded border border-amber-500/30">
                    🎁 {site.eventBonus}
                  </div>
                </div>

                {/* Right: Connect Action Button */}
                <div className="flex sm:flex-col items-center gap-2 shrink-0">
                  <button
                    id={`ranking-connect-btn-${site.rank}`}
                    onClick={() => onOpenSiteConnect(site.name)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>안전 주소 바로가기</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] text-slate-500 font-medium">본사 직영 검증 코드 자동 적용</span>
                </div>
              </div>

              {/* Bottom Feature Badges */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-2 text-[11px] text-slate-400">
                {site.features.map((feat, i) => (
                  <span key={i} className="flex items-center gap-1 bg-slate-950/70 px-2.5 py-1 rounded-md border border-slate-800">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 7 Golden Rules for Reel Game Security (SEO Article Content) */}
        <div className="rounded-3xl bg-[#0c1322] border border-slate-800 p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-4">
            <Lock className="w-6 h-6 text-emerald-400" />
            <h3 className="text-xl sm:text-2xl font-black text-white">
              릴게임 먹튀 방지 및 안전 이용 7대 원칙
            </h3>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">
            인터넷 상에는 조작된 가짜 릴게임이나 출금을 거부하는 사칭 먹튀 사이트들이 다수 존재합니다. 
            구글 검색 이용자분들의 소중한 자산을 지키기 위해 아래 7가지 안전 검증 체크리스트를 반드시 확인하십시오.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {[
              {
                num: '01',
                title: '안전 보증금 예치 확인',
                desc: '포털에 최소 2억원 이상의 보증금을 예치하여 사고 발생 시 100% 전액 보상 체계가 확립된 업체를 선택하십시오.'
              },
              {
                num: '02',
                title: '과도한 꽁머니 유혹 주의',
                desc: '입금 없이 30만~50만 원을 지급한다는 사이트는 100% 환전 시 환전 수수료나 추가 입금을 요구하는 사기 수법입니다.'
              },
              {
                num: '03',
                title: '국제 표준 RNG 정품 알고리즘',
                desc: '운영자가 임의로 예시를 끄거나 연타를 조작할 수 없는 정품 아케이드 릴 메커니즘을 사용하는지 확인하세요.'
              },
              {
                num: '04',
                title: '24시간 1:1 실시간 상담 운영',
                desc: '입출금 오류나 게임 중 튕김 현상 발생 시 즉시 텔레그램이나 라이브챗으로 1분 내 응답하는 고객센터가 필수입니다.'
              },
              {
                num: '05',
                title: 'SSL 최신 보안 암호화 통신',
                desc: '개인정보와 계좌 정보가 256bit 암호화되어 외부 해킹이나 정보 유출 위협으로부터 철저히 보호되어야 합니다.'
              },
              {
                num: '06',
                title: '초고속 무제한 출금 시스템',
                desc: '연타 대박 당첨 시 롤링 핑계를 대지 않고 5분 이내 전액 송금 처리되는 투명한 자금력을 갖춘 곳만 엄선합니다.'
              }
            ].map(item => (
              <div key={item.num} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2 mb-1.5 font-bold text-slate-200">
                  <span className="font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    {item.num}
                  </span>
                  <span>{item.title}</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
