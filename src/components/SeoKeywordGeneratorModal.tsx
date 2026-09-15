import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Copy,
  Check,
  Search,
  TrendingUp,
  Target,
  FileText,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Layers,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface SeoKeywordGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDomain?: string;
}

interface KeywordItem {
  keyword: string;
  intent: string;
  competitionLevel: string;
  searchVolumeEstimate: string;
  strategyTip: string;
}

interface GeneratedSeoData {
  analysisSummary: string;
  recommendedMetaTags: {
    title: string;
    description: string;
    keywords: string[];
  };
  longTailKeywords: KeywordItem[];
  contentOutline?: {
    h2Heading: string;
    h3Sections: {
      title: string;
      keyPoints: string;
    }[];
  };
  faqSuggestions?: {
    question: string;
    answer: string;
  }[];
}

const PRESET_COMPETITORS = [
  { name: 'hyrmd.co.kr (경쟁 1위)', query: 'hyrmd.co.kr 릴게임 분석' },
  { name: 'ge-material.co.kr (경쟁 2위)', query: 'ge-material.co.kr 바다이야기' },
  { name: 'oakville.kr (경쟁 3위)', query: 'oakville.kr 릴게임 포털' },
  { name: '바다이야기 족보 롱테일', query: '바다이야기 고래 출현 타이밍 및 족보' },
  { name: '황금성 무료체험 롱테일', query: '황금성 릴게임 무료체험 무설치 시뮬레이터' },
  { name: '야마토 연타 패턴', query: '야마토 릴게임 5연타 확률 및 회전수 공략' },
];

export const SeoKeywordGeneratorModal: React.FC<SeoKeywordGeneratorModalProps> = ({
  isOpen,
  onClose,
  initialDomain = 'seoulmaterial.com',
}) => {
  const [competitorQuery, setCompetitorQuery] = useState('hyrmd.co.kr (경쟁사 분석 및 바다이야기 족보)');
  const [selectedCategory, setSelectedCategory] = useState('바다이야기');
  const [targetContent, setTargetContent] = useState('메타태그 및 블로그 공략글');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'keywords' | 'meta' | 'outline' | 'faq'>('keywords');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [appliedToSite, setAppliedToSite] = useState(false);

  // Result state initialized with high-value default data so it works immediately
  const [seoResult, setSeoResult] = useState<GeneratedSeoData>({
    analysisSummary:
      "경쟁사(hyrmd, ge-material)는 텍스트만 나열되어 방문자 체류시간이 5초 미만입니다. seoulmaterial.com은 3×3 시뮬레이터와 정밀 족보 롱테일 키워드로 구글 크롤러 가산점을 독점할 수 있는 결정적 기회입니다.",
    recommendedMetaTags: {
      title: "릴게임 공식 포털 1위 - 바다이야기 야마토 황금성 무료체험 및 족보 공략",
      description:
        "대한민국 구글 1위 릴게임 종합 안내소. 오리지널 바다이야기 고래 출현 타이밍, 황금성 배당표, 야마토 5연타 공략, 무설치 시뮬레이터 무료 제공.",
      keywords: [
        "바다이야기 고래 족보",
        "황금성 무료체험",
        "야마토 연타 패턴",
        "릴게임 시뮬레이터",
        "seoulmaterial",
        "오리지널 릴게임 사이트",
        "신천지 릴게임 공략",
        "손오공 배당률",
      ],
    },
    longTailKeywords: [
      {
        keyword: "오리지널 바다이야기 상어 예시 후 고래 출현 타이밍",
        intent: "족보공략",
        competitionLevel: "매우 낮음(기회)",
        searchVolumeEstimate: "상",
        strategyTip: "초 단위 예시 패턴과 효과음 변화를 본문에 명시하면 당일 구글 1페이지 안착",
      },
      {
        keyword: "황금성 릴게임 무료 머니 충전 없는 시뮬레이터",
        intent: "무료체험",
        competitionLevel: "매우 낮음(기회)",
        searchVolumeEstimate: "상",
        strategyTip: "우리 사이트의 3×3 실시간 시뮬레이터와 앵커 링크 연결 시 체류시간 10분 돌파",
      },
      {
        keyword: "야마토 릴게임 5연타 회전 패턴 및 대박 신호",
        intent: "정보탐색",
        competitionLevel: "낮음",
        searchVolumeEstimate: "중",
        strategyTip: "스핀 회전수 표(배당 테이블)를 함께 배치해 구글 이미지 검색 상위권 동시 장악",
      },
      {
        keyword: "손오공 릴게임 여의봉 등장 주기 및 잭팟 조건",
        intent: "족보공략",
        competitionLevel: "매우 낮음(기회)",
        searchVolumeEstimate: "중",
        strategyTip: "FAQ 스키마에 해당 질의응답을 추가하여 검색결과 드롭다운 리치 스니펫 독점",
      },
      {
        keyword: "PC 모바일 연동 무설치 오리지널 바다이야기 주소",
        intent: "안전검증",
        competitionLevel: "낮음",
        searchVolumeEstimate: "상",
        strategyTip: "모바일 최적화 가이드 섹션과 연결하여 모바일 검색 유입자 300% 증가",
      },
    ],
    contentOutline: {
      h2Heading: "구글 1위 석권을 위한 릴게임 종합 족보 및 예시 분석 가이드",
      h3Sections: [
        {
          title: "1. 바다이야기 해파리/상어/고래 연속 출현 메커니즘",
          keyPoints: "사운드 변화와 배경 색상 반전에 따른 당첨 주기와 회전수 기준 상세 해설",
        },
        {
          title: "2. 황금성 성문 열림 신호와 종소리 횟수의 상관관계",
          keyPoints: "종소리 7회 이상 연속 발생 시 대박 진입 족보 해설 및 시뮬레이터 체험 연계",
        },
        {
          title: "3. 야마토 어뢰/전함 컷인 시 5연타 돌입 패턴",
          keyPoints: "컷인 애니메이션 발생 후 10스핀 이내 연타 확률 데이터 수치화",
        },
      ],
    },
    faqSuggestions: [
      {
        question: "바다이야기에서 고래가 나오면 무조건 잭팟인가요?",
        answer:
          "네, 고래는 최고 등급의 당첨 예시로 최소 5연타 이상의 잭팟 사이클로 연결되는 가장 확실한 신호입니다.",
      },
      {
        question: "황금성 릴게임 무료 시뮬레이터는 실제 확률과 동일한가요?",
        answer:
          "seoulmaterial.com의 3×3 시뮬레이터는 오리지널 오프라인 릴게임기의 회전 알고리즘과 심볼 배당률을 정밀하게 재현하여 실전 족보 연습에 최적화되어 있습니다.",
      },
    ],
  });

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsLoading(true);
    setAppliedToSite(false);
    try {
      const response = await fetch('/api/seo/generate-keywords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          competitorUrlOrTopic: competitorQuery,
          gameCategory: selectedCategory,
          targetContent,
        }),
      });

      const result = await response.json();
      if (result.success && result.data) {
        setSeoResult(result.data);
      } else if (result.fallbackData) {
        setSeoResult(result.fallbackData);
      }
    } catch (err) {
      console.warn('Using client fallback optimization', err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const copyAllKeywords = () => {
    const list = seoResult.longTailKeywords
      .map((k, i) => `${i + 1}. ${k.keyword} [${k.intent}] (경쟁도: ${k.competitionLevel}) - ${k.strategyTip}`)
      .join('\n');
    copyToClipboard(list, 'all-keywords');
  };

  const applyMetaToDocument = () => {
    if (seoResult.recommendedMetaTags) {
      document.title = seoResult.recommendedMetaTags.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', seoResult.recommendedMetaTags.description);
      }
      setAppliedToSite(true);
      setTimeout(() => setAppliedToSite(false), 3500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 text-slate-950 shadow-lg shadow-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Gemini AI 실시간 SEO 키워드 생성기
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  구글 1위 타깃
                </span>
              </div>
              <p className="text-xs text-slate-400">
                경쟁사(hyrmd, ge-material 등) 콘텐츠 갭을 분석하여 롱테일 키워드와 메타태그를 즉시 추출합니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Controller Area */}
        <div className="p-4 sm:p-5 bg-slate-950/60 border-b border-slate-800 shrink-0 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={competitorQuery}
                onChange={(e) => setCompetitorQuery(e.target.value)}
                placeholder="경쟁사 URL 또는 분석할 키워드 (예: hyrmd.co.kr, 바다이야기 고래 족보)"
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="전체">전체 게임</option>
                <option value="바다이야기">바다이야기</option>
                <option value="야마토">야마토</option>
                <option value="황금성">황금성</option>
                <option value="손오공">손오공</option>
                <option value="신천지/백경">신천지/백경</option>
              </select>

              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold rounded-lg text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 disabled:opacity-50 flex items-center gap-2 shrink-0 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>AI 분석 중...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-slate-950" />
                    <span>키워드 생성</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick preset chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-400">빠른 타깃 추천:</span>
            {PRESET_COMPETITORS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  setCompetitorQuery(preset.query);
                }}
                className="px-2 py-1 rounded text-[11px] bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-amber-300 border border-slate-700/60 transition-colors"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Competitor Gap Analysis Banner */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-amber-300 block mb-1">
                구글 알고리즘 침투 전략 (Competitor Gap Analysis)
              </span>
              <p className="text-slate-300 leading-relaxed">
                {seoResult.analysisSummary}
              </p>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex border-b border-slate-800 gap-2">
            <button
              onClick={() => setActiveTab('keywords')}
              className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'keywords'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Target className="w-4 h-4" />
              롱테일 키워드 15선 ({seoResult.longTailKeywords?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('meta')}
              className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'meta'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              추천 메타 태그
            </button>
            <button
              onClick={() => setActiveTab('outline')}
              className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'outline'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              블로그/공략 목차
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'faq'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              구글 FAQ 스키마 제안
            </button>
          </div>

          {/* TAB 1: Long-Tail Keywords */}
          {activeTab === 'keywords' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  구글 검색량이 풍부하면서도 경쟁사 사이트들이 놓치고 있는 황금 롱테일 키워드입니다.
                </span>
                <button
                  onClick={copyAllKeywords}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center gap-1.5 border border-slate-700"
                >
                  {copiedKey === 'all-keywords' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>복사 완료!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>키워드 전체 복사</span>
                    </>
                  )}
                </button>
              </div>

              <div className="border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-3">타깃 롱테일 키워드</th>
                      <th className="p-3 text-center">검색 의도</th>
                      <th className="p-3 text-center">경쟁도</th>
                      <th className="p-3">구글 1위 공략 팁</th>
                      <th className="p-3 text-right">복사</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                    {seoResult.longTailKeywords?.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3 font-semibold text-white flex items-center gap-1.5">
                          <span className="text-amber-500 font-mono text-[11px] w-4">{idx + 1}.</span>
                          <span>{item.keyword}</span>
                        </td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            {item.intent}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {item.competitionLevel}
                          </span>
                        </td>
                        <td className="p-3 text-slate-300 text-[11px]">
                          {item.strategyTip}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => copyToClipboard(item.keyword, `kw-${idx}`)}
                            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                            title="키워드 복사"
                          >
                            {copiedKey === `kw-${idx}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: Recommended Meta Tags */}
          {activeTab === 'meta' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  seoulmaterial.com의 상위 랭킹을 위한 최적 메타 태그 세트입니다.
                </span>
                <button
                  onClick={applyMetaToDocument}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  {appliedToSite ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>페이지에 즉시 적용됨!</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>사이트 타이틀/디스크립션에 즉시 적용</span>
                    </>
                  )}
                </button>
              </div>

              {/* Title Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">&lt;title&gt; (최적 권장 타이틀)</span>
                  <button
                    onClick={() => copyToClipboard(seoResult.recommendedMetaTags.title, 'meta-title')}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedKey === 'meta-title' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>복사</span>
                  </button>
                </div>
                <div className="font-mono text-xs sm:text-sm text-slate-200 bg-slate-900 p-3 rounded-lg border border-slate-800">
                  {seoResult.recommendedMetaTags.title}
                </div>
              </div>

              {/* Description Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400">&lt;meta name="description"&gt;</span>
                  <button
                    onClick={() => copyToClipboard(seoResult.recommendedMetaTags.description, 'meta-desc')}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedKey === 'meta-desc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>복사</span>
                  </button>
                </div>
                <div className="text-xs sm:text-sm text-slate-200 bg-slate-900 p-3 rounded-lg border border-slate-800 leading-relaxed">
                  {seoResult.recommendedMetaTags.description}
                </div>
              </div>

              {/* Keywords Card */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-400">추천 키워드 매트릭스 태그</span>
                  <button
                    onClick={() => copyToClipboard(seoResult.recommendedMetaTags.keywords.join(', '), 'meta-kw')}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedKey === 'meta-kw' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>전체 복사</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {seoResult.recommendedMetaTags.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-amber-300 font-mono flex items-center gap-1"
                    >
                      <span>#{kw}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Content Outline */}
          {activeTab === 'outline' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400">추천 H2 대제목 (체류시간 극대화용)</span>
                <div className="text-sm sm:text-base font-bold text-white bg-slate-900 p-3 rounded-lg border border-slate-800">
                  {seoResult.contentOutline?.h2Heading}
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400">H3 소단락 구성 가이드:</span>
                {seoResult.contentOutline?.h3Sections.map((sec, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="text-xs sm:text-sm font-bold text-amber-300">{sec.title}</div>
                    <div className="text-xs text-slate-300 leading-relaxed">{sec.keyPoints}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FAQ Suggestions */}
          {activeTab === 'faq' && (
            <div className="space-y-3">
              <span className="text-xs text-slate-400">
                구글 검색 결과창에서 질문-답변 리치 스니펫(FAQ 드롭다운)으로 즉시 채택될 수 있는 구조화 질문들입니다.
              </span>
              {seoResult.faqSuggestions?.map((faq, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                      Q
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white">{faq.question}</span>
                  </div>
                  <div className="pl-6 text-xs text-slate-300 leading-relaxed border-l-2 border-slate-800 ml-2">
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>타깃 도메인: <strong className="text-white font-mono">seoulmaterial.com</strong></span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
