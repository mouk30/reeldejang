import React from 'react';
import { Flame, ShieldCheck, HelpCircle, FileText, Lock, Award, HeartHandshake } from 'lucide-react';

interface FooterProps {
  onOpenSeoModal?: () => void;
  onOpenContactModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContactModal }) => {
  return (
    <footer className="bg-[#050811] border-t border-slate-800 text-slate-400 text-xs">
      {/* Top SEO Keyword Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-slate-950 font-black">
                <Flame className="w-5 h-5 fill-slate-950" />
              </div>
              <span className="text-base font-extrabold text-white">릴게임 코리아 (ReelGame Korea)</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              대한민국 대표 릴게임 종합 포털로서 바다이야기, 야마토, 황금성, 손오공 등 정통 클래식 아케이드 릴게임의 올바른 족보 분석과 무료체험 시뮬레이터, 그리고 철저한 먹튀검증 안전 랭킹을 제공합니다.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>SSL 256-bit 엔드투엔드 보안 인증</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-3">포털 주요 메뉴</h4>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#simulator" className="hover:text-amber-400 transition-colors">무료체험 시뮬레이터 (전 게임)</a></li>
              <li><a href="#jackpots" className="hover:text-amber-400 transition-colors">실시간 잭팟 및 당첨자 현황</a></li>
              <li><a href="#guides" className="hover:text-amber-400 transition-colors">릴게임 족보 및 예시·연타 공략집</a></li>
              <li><a href="#rankings" className="hover:text-amber-400 transition-colors">안전 보증 사이트 순위 TOP 4</a></li>
              <li><a href="#mobile" className="hover:text-amber-400 transition-colors">모바일 스마트폰 원클릭 실행 가이드</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">자주 묻는 질문 FAQ</a></li>
            </ul>
          </div>

          {/* Featured Games SEO */}
          <div>
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-3">인기 릴게임 목록</h4>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#guides" className="hover:text-amber-400 transition-colors">오리지널 바다이야기 (황금고래 7연타)</a></li>
              <li><a href="#guides" className="hover:text-amber-400 transition-colors">우주전함 야마토 (파동포 15연타)</a></li>
              <li><a href="#guides" className="hover:text-amber-400 transition-colors">글라디에이터 황금성 (황금종 성문개폐)</a></li>
              <li><a href="#guides" className="hover:text-amber-400 transition-colors">서유기 손오공 (여의봉 번개소환)</a></li>
              <li><a href="#guides" className="hover:text-amber-400 transition-colors">북극해 백경 (빙산파쇄 황금작살)</a></li>
              <li><a href="#guides" className="hover:text-amber-400 transition-colors">오션파라다이스 & 알라딘 & 신천지</a></li>
            </ul>
          </div>

          {/* Google Search Terms (LSI Keywords) */}
          <div>
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-3">구글 공식 검색 키워드</h4>
            <div className="flex flex-wrap gap-1.5 text-[10px]">
              {[
                '릴게임', '릴게임사이트', '바다이야기', '야마토릴게임', '황금성릴게임', 
                '손오공릴게임', '백경릴게임', '무료릴게임', '모바일릴게임', '릴게임족보', 
                '릴게임예시', '릴게임연타', '릴게임먹튀검증', '릴게임순위', '오션파라다이스'
              ].map(tag => (
                <span key={tag} className="bg-slate-900 px-2 py-1 rounded text-slate-400 border border-slate-800">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-900 flex gap-2">
              <button
                onClick={onOpenContactModal}
                className="text-[11px] text-cyan-400 hover:underline cursor-pointer"
              >
                [1:1 안전 문의센터]
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Responsible Gaming & Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-[11px] text-slate-400 space-y-2 leading-relaxed">
        <p>
          <strong>책임감 있는 게임 이용 안내:</strong> 본 사이트에서 제공되는 무료체험 시뮬레이터는 금전의 충전이나 환전이 불가능한 100% 가상 크레딧 기반의 순수 오락·정보 제공용 콘텐츠입니다. 과도한 몰입을 지양하며 건전한 게임 문화를 지향합니다.
        </p>
        <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-900 text-slate-400">
          <div>
            © 2025~2026 릴게임 코리아 (ReelGame Korea) 공식 포털. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>개인정보보호방침</span>
            <span>이용약관</span>
            <span>책임있는게임</span>
            <span>사이트맵</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
