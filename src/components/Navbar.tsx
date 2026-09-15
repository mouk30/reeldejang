import React, { useState, useEffect } from 'react';
import { ShieldCheck, Flame, Search, HelpCircle, Smartphone, Award, Trophy, Volume2, VolumeX, Menu, X, BarChart3, Send } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  onOpenSeoModal: () => void;
  onOpenContactModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSeoModal, onOpenContactModal }) => {
  const [onlineUsers, setOnlineUsers] = useState(3842);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => prev + Math.floor(Math.random() * 7) - 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.enabled = next;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#070b14]/90 backdrop-blur-md border-b border-amber-500/20 shadow-lg shadow-black/40">
      {/* Top micro bar with real-time stats & keyword tickers */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-cyan-950/60 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-emerald-400">실시간 정상 가동 중</span>
            <span className="text-slate-600">|</span>
            <span>현재 동시 접속자: <strong className="text-amber-400 font-mono">{onlineUsers.toLocaleString()}</strong>명</span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">구글 검색 1위 릴게임 공식 정보 포털</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="navbar-sound-toggle-btn"
              onClick={toggleSound}
              className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer text-xs"
              title="사운드 효과 켜기/끄기"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
              <span>{soundEnabled ? '효과음 ON' : '효과음 OFF'}</span>
            </button>

            <button
              id="navbar-seo-audit-btn"
              onClick={onOpenSeoModal}
              className="flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-xs transition-colors cursor-pointer"
            >
              <BarChart3 className="w-3 h-3 text-amber-400" />
              <span>구글 SEO 점검</span>
            </button>

            <button
              id="navbar-contact-header-btn"
              onClick={onOpenContactModal}
              className="flex items-center gap-1 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded text-xs transition-colors cursor-pointer"
            >
              <Send className="w-3 h-3 text-cyan-400" />
              <span>1:1 검증 문의</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo with arcade emblem */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 via-amber-600 to-yellow-700 flex items-center justify-center shadow-lg shadow-amber-500/20 border border-amber-300/40 group-hover:scale-105 transition-transform">
            <Flame className="w-6 h-6 text-slate-950 fill-slate-950" />
            <span className="absolute -bottom-1 -right-1 bg-cyan-500 text-[9px] font-extrabold px-1 rounded text-slate-950">1위</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow">
                릴게임 KOREA
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.2 rounded">
                공식 포털
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium -mt-0.5">
              바다이야기 · 야마토 · 황금성 · 손오공 종합 가이드
            </p>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#simulator" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors py-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>무료체험 시뮬레이터</span>
          </a>
          <a href="#jackpots" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors py-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>실시간 잭팟 피드</span>
          </a>
          <a href="#guides" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors py-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>게임별 족보·예시 공략</span>
          </a>
          <a href="#rankings" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors py-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>안전 보증 사이트 순위</span>
          </a>
          <a href="#mobile" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors py-2">
            <Smartphone className="w-4 h-4 text-blue-400" />
            <span>모바일 가이드</span>
          </a>
          <a href="#faq" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors py-2">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span>자주 묻는 질문</span>
          </a>
        </div>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#simulator"
            id="nav-play-free-btn"
            className="relative group overflow-hidden rounded-lg p-px font-semibold text-xs tracking-wide"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-lg"></span>
            <span className="relative flex items-center gap-2 px-4 py-2 rounded-[7px] bg-[#0d1322] text-amber-300 font-bold group-hover:bg-transparent group-hover:text-slate-950 transition-all duration-200">
              <Flame className="w-4 h-4 text-amber-400 group-hover:text-slate-950" />
              <span>무료 릴게임 즉시 실행</span>
            </span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          id="mobile-menu-trigger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile dropdown navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0f1d] border-b border-slate-800 px-4 py-4 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <a
            href="#simulator"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 p-2.5 rounded-lg bg-amber-500/10 text-amber-300 font-medium text-sm"
          >
            <Flame className="w-5 h-5 text-amber-400" />
            <span>무료체험 시뮬레이터 (바다이야기/야마토/황금성)</span>
          </a>
          <a
            href="#jackpots"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 p-2.5 rounded-lg text-slate-200 hover:bg-slate-800 font-medium text-sm"
          >
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span>실시간 잭팟 피드 (당첨 알림)</span>
          </a>
          <a
            href="#guides"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 p-2.5 rounded-lg text-slate-200 hover:bg-slate-800 font-medium text-sm"
          >
            <Award className="w-5 h-5 text-cyan-400" />
            <span>릴게임 족보 & 예시 연타 공략</span>
          </a>
          <a
            href="#rankings"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 p-2.5 rounded-lg text-slate-200 hover:bg-slate-800 font-medium text-sm"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>안전 보증 사이트 순위 TOP 4</span>
          </a>
          <a
            href="#mobile"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 p-2.5 rounded-lg text-slate-200 hover:bg-slate-800 font-medium text-sm"
          >
            <Smartphone className="w-5 h-5 text-blue-400" />
            <span>스마트폰 모바일 접속 가이드</span>
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 p-2.5 rounded-lg text-slate-200 hover:bg-slate-800 font-medium text-sm"
          >
            <HelpCircle className="w-5 h-5 text-purple-400" />
            <span>자주 묻는 질문 FAQ</span>
          </a>

          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSeoModal();
              }}
              className="flex-1 py-2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold text-center"
            >
              SEO 점검 분석기
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContactModal();
              }}
              className="flex-1 py-2 rounded bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold text-center"
            >
              1:1 검증 문의
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
