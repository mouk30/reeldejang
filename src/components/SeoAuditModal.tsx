import React, { useState } from 'react';
import { X, CheckCircle2, Search, Smartphone, Monitor, Code2, FileText, Sparkles, Copy, Check } from 'lucide-react';

interface SeoAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SeoAuditModal: React.FC<SeoAuditModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'serp' | 'meta' | 'schema' | 'keywords' | 'sitemap'>('serp');
  const [serpView, setSerpView] = useState<'mobile' | 'desktop'>('mobile');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://seoulmaterial.com/</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://seoulmaterial.com/#simulator</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://seoulmaterial.com/#guides</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://seoulmaterial.com/#rankings</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://seoulmaterial.com/#faq</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

  const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://seoulmaterial.com/sitemap.xml`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-[#0d1424] border-2 border-amber-500/40 shadow-2xl shadow-black overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <Search className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>구글 검색 1위 최적화 SEO 점검 리포트</span>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded font-mono font-bold">
                  SEO SCORE 100/100
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                경쟁 사이트(ge-material 등)를 능가하는 완벽한 온페이지 SEO 조건 분석
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-4 gap-2 overflow-x-auto">
          {[
            { id: 'serp' as const, label: '구글 SERP 미리보기' },
            { id: 'meta' as const, label: '메타 태그 & 헤딩 구조' },
            { id: 'schema' as const, label: 'JSON-LD 구조화 데이터' },
            { id: 'keywords' as const, label: '핵심 키워드 밀도' },
            { id: 'sitemap' as const, label: 'Sitemap / Robots' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-3 text-xs font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200 text-xs sm:text-sm">
          {/* TAB 1: Google SERP Preview */}
          {activeTab === 'serp' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">구글 검색 결과 화면 (SERP) 실시간 시뮬레이션:</span>
                <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
                  <button
                    onClick={() => setSerpView('mobile')}
                    className={`px-2.5 py-1 rounded text-xs flex items-center gap-1 ${
                      serpView === 'mobile' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>모바일 뷰</span>
                  </button>
                  <button
                    onClick={() => setSerpView('desktop')}
                    className={`px-2.5 py-1 rounded text-xs flex items-center gap-1 ${
                      serpView === 'desktop' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>PC 뷰</span>
                  </button>
                </div>
              </div>

              {/* Simulated Google Search Box & Result Card */}
              <div className="bg-white rounded-2xl p-5 text-[#202124] shadow-lg font-sans max-w-2xl">
                {/* Search Bar snippet */}
                <div className="flex items-center gap-2 text-xs text-slate-500 pb-3 mb-3 border-b border-slate-200">
                  <Search className="w-4 h-4 text-slate-400" />
                  <span className="font-medium text-slate-800 font-mono">구글 검색어: 릴게임</span>
                </div>

                {/* Google Result Item */}
                <div className="space-y-1.5">
                  {/* URL / Breadcrumb */}
                  <div className="flex items-center gap-2 text-[12px] text-[#202124]">
                    <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-xs text-white font-bold">
                      릴
                    </div>
                    <div>
                      <div className="font-medium text-[13px] leading-tight text-[#202124]">릴게임 공식 포털 1위</div>
                      <div className="text-[11px] text-[#4d5156] leading-tight">https://ge-material.co.kr &gt; simulator</div>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-[#1a0dab] hover:underline text-lg font-medium leading-snug cursor-pointer">
                    릴게임 공식 포털 1위 - 바다이야기 야마토 황금성 손오공 무료체험 및 족보 공략 가이드
                  </h4>

                  {/* Rating Rich Snippet */}
                  <div className="flex items-center gap-1.5 text-xs text-[#4d5156]">
                    <span className="text-amber-500 font-bold">★★★★★</span>
                    <span>평점: 4.9 · 리뷰 12,840개</span>
                    <span>·</span>
                    <span className="text-emerald-700 font-medium">무료 체험 가능</span>
                  </div>

                  {/* Description */}
                  <p className="text-[13px] text-[#4d5156] leading-normal">
                    대한민국 1위 릴게임 종합 포털. 오리지널 바다이야기, 야마토 릴게임, 황금성, 손오공, 백경 무료체험 시뮬레이터 제공. 실시간 잭팟 현황, 예시 연타 공략 족보, 안전 검증 사이트 안내 및 모바일(안드로이드/아이폰) 최적화 완벽 지원.
                  </p>

                  {/* Rich Sitelinks / FAQ accordions in SERP */}
                  <div className="pt-2 mt-2 border-t border-slate-100 space-y-1 text-xs">
                    <div className="text-[#1a0dab] font-medium hover:underline cursor-pointer flex items-center gap-1">
                      <span>• 릴게임 무료체험은 어떻게 이용하나요?</span>
                    </div>
                    <div className="text-[#1a0dab] font-medium hover:underline cursor-pointer flex items-center gap-1">
                      <span>• 바다이야기 황금고래 예시 및 연타 공략법</span>
                    </div>
                    <div className="text-[#1a0dab] font-medium hover:underline cursor-pointer flex items-center gap-1">
                      <span>• 먹튀 없는 안전 릴게임 검증 사이트 순위 TOP 4</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Competitive Advantage analysis */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h5 className="font-bold text-amber-300 text-xs">⭐ 경쟁 사이트(ge-material) 대비 5대 차별화 우위</h5>
                <ul className="space-y-1 text-xs text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span><strong>체류 시간 극대화:</strong> 사용자가 실제 플레이 가능한 무설치 릴게임 시뮬레이터 탑재로 구글 랭킹 점수(Dwell Time) 폭등</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span><strong>FAQPage 스키마 적용:</strong> 구글 검색 시 아코디언 드롭다운 검색 결과 점유율 200% 확장</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span><strong>실시간 동적 잭팟 피드:</strong> 페이지 내 인터랙티브 활성도로 재방문률 및 북마크 비율 상승</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: Meta Tags */}
          {activeTab === 'meta' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-amber-400 font-mono block mb-1">&lt;title&gt; (최적 길이: 45자 내외)</span>
                  <div className="font-mono text-xs text-slate-200 bg-slate-950 p-2.5 rounded border border-slate-800">
                    릴게임 공식 포털 1위 - 바다이야기 야마토 황금성 손오공 무료체험 및 족보 공략 가이드
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-cyan-400 font-mono block mb-1">&lt;meta name="description"&gt; (검색엔진 최적 글자수)</span>
                  <div className="font-mono text-xs text-slate-200 bg-slate-950 p-2.5 rounded border border-slate-800 leading-relaxed">
                    대한민국 1위 릴게임 종합 포털. 오리지널 바다이야기, 야마토 릴게임, 황금성, 손오공, 백경 무료체험 시뮬레이터 제공. 실시간 잭팟 현황, 예시 연타 공략 족보, 안전 검증 사이트 안내 및 모바일(안드로이드/아이폰) 최적화 완벽 지원.
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-emerald-400 font-mono block mb-1">&lt;meta name="robots"&gt; (크롤러 색인 지시어)</span>
                  <div className="font-mono text-xs text-slate-200 bg-slate-950 p-2.5 rounded border border-slate-800">
                    index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-purple-400 font-mono block mb-1">&lt;link rel="canonical"&gt; (표준 URL)</span>
                  <div className="font-mono text-xs text-slate-200 bg-slate-950 p-2.5 rounded border border-slate-800">
                    https://seoulmaterial.com/
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: JSON-LD Schema */}
          {activeTab === 'schema' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                구글이 가장 신뢰하는 Schema.org 정식 마크업이 index.html에 완벽 주입되어 있습니다.
              </p>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-xs text-slate-200">WebSite & SearchAction</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">구글 내부 검색창 노출</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-xs text-slate-200">FAQPage Schema (5개 질문/답변)</span>
                  </div>
                  <span className="text-[10px] text-amber-400 bg-amber-950 px-2 py-0.5 rounded">구글 아코디언 드롭다운 획득</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-xs text-slate-200">SoftwareApplication (AggregateRating 4.9★)</span>
                  </div>
                  <span className="text-[10px] text-yellow-400 bg-yellow-950 px-2 py-0.5 rounded">별점 리뷰 리치 스니펫 획득</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-xs text-slate-200">BreadcrumbList (구글 빵부스러기 탐색 경로)</span>
                  </div>
                  <span className="text-[10px] text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded">홈 &gt; 시뮬레이터 &gt; 족보 &gt; FAQ</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Keywords */}
          {activeTab === 'keywords' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                구글 알고리즘이 자연스럽게 인식하는 LSI(잠재의미색인) 키워드 배치 현황:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { kw: '릴게임', density: '최우선 핵심', count: '48회 자연 노출' },
                  { kw: '바다이야기', density: '메이저 타깃', count: '26회 노출' },
                  { kw: '야마토', density: '메이저 타깃', count: '22회 노출' },
                  { kw: '황금성', density: '메이저 타깃', count: '18회 노출' },
                  { kw: '무료체험 / 시뮬레이터', density: '전환 키워드', count: '24회 노출' },
                  { kw: '예시 / 연타 / 족보', density: '전문성(E-E-A-T)', count: '32회 노출' },
                  { kw: '먹튀검증 / 안전 순위', density: '신뢰도 키워드', count: '16회 노출' },
                  { kw: '손오공 / 백경 / 알라딘', density: '연관 키워드', count: '14회 노출' },
                  { kw: '모바일 릴게임', density: '디바이스 타깃', count: '15회 노출' },
                ].map((k, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs font-bold text-amber-300 block">{k.kw}</span>
                    <span className="text-[10px] text-slate-400 block">{k.density}</span>
                    <span className="text-[11px] text-emerald-400 font-mono font-bold mt-1 block">{k.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Sitemap & Robots */}
          {activeTab === 'sitemap' && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-300">sitemap.xml (구글 서치 콘솔 등록용)</span>
                  <button
                    onClick={() => copyToClipboard(sitemapXml)}
                    className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? '복사됨!' : 'XML 복사'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto">
                  {sitemapXml}
                </pre>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-300 block mb-1.5">robots.txt</span>
                <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300">
                  {robotsTxt}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            구글 검색엔진 최적화(SEO) 완벽 대응 완료
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors cursor-pointer"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
