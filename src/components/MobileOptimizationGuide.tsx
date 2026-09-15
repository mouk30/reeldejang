import React from 'react';
import { Smartphone, Monitor, Apple, Chrome, Zap, Shield, DownloadCloud, CheckCircle2 } from 'lucide-react';

export const MobileOptimizationGuide: React.FC = () => {
  return (
    <section id="mobile" className="py-14 bg-gradient-to-b from-[#070b14] via-[#091020] to-[#070b14] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 text-xs font-bold mb-3 border border-blue-500/30">
            <Smartphone className="w-3.5 h-3.5" />
            <span>모바일 최적화 완벽 대응</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            스마트폰 · 태블릿 · PC <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">원클릭 접속 가이드</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            구글 크롬, 사파리, 삼성인터넷 등 모든 모바일 브라우저에서 다운로드 없이 즉시 60FPS 풀화면으로 구동됩니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Android Guide */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-4">
                <Chrome className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">안드로이드 (삼성 갤럭시 등)</h3>
              <p className="text-xs text-slate-400 mb-4">
                출처를 알 수 없는 위험한 APK 파일 설치 없이 크롬이나 삼성 브라우저로 1초 만에 실행합니다.
              </p>
              <ol className="space-y-2.5 text-xs text-slate-300 list-decimal list-inside">
                <li>스마트폰 브라우저로 본 포털 접속</li>
                <li>브라우저 우측 상단 더보기(⋮) 메뉴 터치</li>
                <li><strong>'홈 화면에 추가'</strong> 또는 <strong>'앱 설치'</strong> 선택</li>
                <li>바탕화면에 생성된 아이콘으로 즉시 원클릭 실행</li>
              </ol>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Android 8.0 이상 전 기종 완벽 호환</span>
            </div>
          </div>

          {/* iOS Guide */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center mb-4">
                <Apple className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">애플 iOS (아이폰 / 아이패드)</h3>
              <p className="text-xs text-slate-400 mb-4">
                애플 사파리(Safari) 고유의 전체 화면 웹앱 모드로 앱스토어 심사 제한 없이 쾌적하게 즐깁니다.
              </p>
              <ol className="space-y-2.5 text-xs text-slate-300 list-decimal list-inside">
                <li>기본 <strong>Safari</strong> 브라우저로 접속</li>
                <li>하단 중앙의 <strong>공유(아이콘 모양)</strong> 터치</li>
                <li>메뉴를 스크롤하여 <strong>'홈 화면에 추가'</strong> 터치</li>
                <li>홈 화면에서 앱처럼 독립적인 풀스크린 구동</li>
              </ol>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-blue-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>iOS 14 이상 아이폰 전 모델 대응</span>
            </div>
          </div>

          {/* PC Windows / Mac Guide */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mb-4">
                <Monitor className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">PC 데스크톱 (Windows / Mac)</h3>
              <p className="text-xs text-slate-400 mb-4">
                대화면 모니터에서 즐기는 압도적인 고화질 그래픽과 박진감 넘치는 릴 회전 사운드.
              </p>
              <ol className="space-y-2.5 text-xs text-slate-300 list-decimal list-inside">
                <li>크롬 또는 엣지 브라우저에서 바로 실행</li>
                <li>키보드 스페이스바 및 숫자키 단축키 지원</li>
                <li>F11 키를 눌러 극장식 풀스크린 모드 몰입</li>
                <li>멀티 윈도우 동시 실행 및 통계 창 지원</li>
              </ol>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-amber-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>윈도우 10/11 및 macOS 100% 최적화</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
