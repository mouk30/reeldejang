import React, { useState, useCallback } from 'react';
import { GameId, JackpotRecord } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ReelSimulator } from './components/ReelSimulator';
import { LiveJackpotFeed } from './components/LiveJackpotFeed';
import { GameGuideCatalog } from './components/GameGuideCatalog';
import { SafeVerificationRanking } from './components/SafeVerificationRanking';
import { MobileOptimizationGuide } from './components/MobileOptimizationGuide';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { SeoAuditModal } from './components/SeoAuditModal';
import { ContactModal } from './components/ContactModal';
import { Flame, BarChart3, Send, ArrowUp } from 'lucide-react';

export default function App() {
  const [selectedGameId, setSelectedGameId] = useState<GameId>('sea-story');
  const [isSeoModalOpen, setIsSeoModalOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [targetSiteName, setTargetSiteName] = useState<string | undefined>(undefined);
  const [customJackpots, setCustomJackpots] = useState<JackpotRecord[]>([]);

  // Scroll to simulator section smoothly
  const scrollToSimulator = useCallback(() => {
    const el = document.getElementById('simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // When user hits jackpot on the simulator, propagate to the live feed!
  const handleNewJackpotWin = useCallback((gameName: string, amount: number, comboText: string) => {
    const newRecord: JackpotRecord = {
      id: 'win_' + Date.now(),
      gameId: selectedGameId,
      gameName,
      userMasked: '010-****-' + Math.floor(1000 + Math.random() * 9000),
      prizeAmount: amount,
      comboCount: parseInt(comboText.match(/\d+/)?.[0] || '1', 10),
      patternName: `${comboText} 대박 달성`,
      timeAgo: '방금 전 (체험관)',
      verified: true,
    };
    setCustomJackpots(prev => [newRecord, ...prev.slice(0, 5)]);
  }, [selectedGameId]);

  // Open contact with specific site
  const handleOpenSiteConnect = (siteName: string) => {
    setTargetSiteName(siteName);
    setIsContactModalOpen(true);
  };

  const handleGeneralContact = () => {
    setTargetSiteName(undefined);
    setIsContactModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Navigation */}
      <Navbar
        onOpenSeoModal={() => setIsSeoModalOpen(true)}
        onOpenContactModal={handleGeneralContact}
      />

      {/* Main Semantic Content for Search Engines & Visitors */}
      <main>
        {/* 1. Hero Presentation */}
        <HeroSection
          selectedGameId={selectedGameId}
          onSelectGame={(id) => setSelectedGameId(id)}
          onScrollToSimulator={scrollToSimulator}
        />

        {/* 2. Interactive Reel Simulator (Heart of dwell-time & engagement) */}
        <ReelSimulator
          activeGameId={selectedGameId}
          onSelectGame={(id) => setSelectedGameId(id)}
          onNewJackpotWin={handleNewJackpotWin}
        />

        {/* 3. Real-Time Jackpot Ticker & Hall of Fame */}
        <LiveJackpotFeed customJackpots={customJackpots} />

        {/* 4. Complete Encyclopedia of Reel Games (족보 & 공략) */}
        <GameGuideCatalog
          onPlayGame={(id) => {
            setSelectedGameId(id);
            scrollToSimulator();
          }}
        />

        {/* 5. Safe Verification & Site Rankings */}
        <SafeVerificationRanking onOpenSiteConnect={handleOpenSiteConnect} />

        {/* 6. Mobile & Cross-Platform Optimization Guide */}
        <MobileOptimizationGuide />

        {/* 7. Comprehensive FAQ (Mapped to JSON-LD) */}
        <FaqSection onOpenContactModal={handleGeneralContact} />
      </main>

      {/* Footer with Keyword Matrix & Compliance */}
      <Footer
        onOpenSeoModal={() => setIsSeoModalOpen(true)}
        onOpenContactModal={handleGeneralContact}
      />

      {/* Modals */}
      <SeoAuditModal
        isOpen={isSeoModalOpen}
        onClose={() => setIsSeoModalOpen(false)}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        targetSiteName={targetSiteName}
      />

      {/* Floating Action Utility Bar on Mobile/Desktop */}
      <aside aria-label="빠른 실행 도구" className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
        <button
          id="floating-play-btn"
          onClick={scrollToSimulator}
          className="p-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-xl shadow-amber-500/40 hover:scale-110 transition-transform cursor-pointer flex items-center justify-center"
          title="무료 시뮬레이터로 이동"
        >
          <Flame className="w-5 h-5 fill-slate-950" />
        </button>

        <button
          id="floating-seo-btn"
          onClick={() => setIsSeoModalOpen(true)}
          className="p-3 rounded-full bg-slate-900 border border-amber-500/40 text-amber-400 shadow-xl hover:scale-110 transition-transform cursor-pointer flex items-center justify-center"
          title="구글 SEO 검증기"
        >
          <BarChart3 className="w-5 h-5" />
        </button>

        <button
          id="floating-contact-btn"
          onClick={handleGeneralContact}
          className="p-3 rounded-full bg-cyan-600 text-white shadow-xl shadow-cyan-500/30 hover:scale-110 transition-transform cursor-pointer flex items-center justify-center"
          title="24시간 실시간 문의"
        >
          <Send className="w-5 h-5" />
        </button>

        <button
          id="floating-scroll-top-btn"
          onClick={scrollToTop}
          className="p-3 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white shadow-xl hover:scale-110 transition-transform cursor-pointer flex items-center justify-center"
          title="맨 위로 가기"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </aside>
    </div>
  );
}
