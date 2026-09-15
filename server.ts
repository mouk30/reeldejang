import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', domain: 'seoulmaterial.com' });
});

// Helper to determine canonical base URL for crawlers
function resolveBaseUrl(req: express.Request): string {
  if (req.query.domain && typeof req.query.domain === 'string') {
    const d = req.query.domain.trim().replace(/^https?:\/\//, '').replace(/\/+$/, '');
    return `https://${d}`;
  }

  const reqHost = (req.headers['x-forwarded-host'] as string) || req.get('host') || '';
  if (reqHost && !reqHost.includes('localhost') && !reqHost.includes('127.0.0.1')) {
    // If request comes from a custom domain
    if (!reqHost.includes('run.app')) {
      const proto = req.headers['x-forwarded-proto'] || (req.secure ? 'https' : 'https');
      return `${proto}://${reqHost}`;
    }
  }

  // Default to official production domain
  return 'https://seoulmaterial.com';
}

// Dynamic robots.txt endpoint for search engines (Googlebot, Naver Yeti, Daumoa, Bingbot)
app.get('/robots.txt', (req, res) => {
  const baseUrl = resolveBaseUrl(req);

  const robotsTxt = `# robots.txt for Googlebot, Naver, Daum, and Search Crawlers
User-agent: *
Allow: /
Disallow: /api/

# Google Search & Google Images
User-agent: Googlebot
Allow: /
Disallow: /api/

User-agent: Googlebot-Image
Allow: /

# Naver Search Engine (Yeti)
User-agent: Yeti
Allow: /
Disallow: /api/

# Daum / Kakao Search Engine
User-agent: Daumoa
Allow: /
Disallow: /api/

# Microsoft Bing
User-agent: Bingbot
Allow: /
Disallow: /api/

# Dynamic XML Sitemap Link
Sitemap: ${baseUrl}/sitemap.xml
`;

  res.header('Content-Type', 'text/plain; charset=utf-8');
  res.header('Cache-Control', 'public, max-age=3600');
  res.send(robotsTxt);
});

// Dynamic sitemap.xml generator endpoint based on active game categories & guide sections
app.get('/sitemap.xml', (req, res) => {
  const baseUrl = resolveBaseUrl(req);
  const today = new Date().toISOString().split('T')[0];

  // Core sections
  const coreUrls = [
    { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${baseUrl}/#simulator`, priority: '0.95', changefreq: 'daily' },
    { loc: `${baseUrl}/#guides`, priority: '0.95', changefreq: 'daily' },
    { loc: `${baseUrl}/#rankings`, priority: '0.90', changefreq: 'daily' },
    { loc: `${baseUrl}/#mobile`, priority: '0.85', changefreq: 'weekly' },
    { loc: `${baseUrl}/#faq`, priority: '0.85', changefreq: 'weekly' },
  ];

  // Individual game categories & guide deep links
  const games = [
    { id: 'sea-story', priority: '1.0', changefreq: 'daily' },
    { id: 'yamato', priority: '1.0', changefreq: 'daily' },
    { id: 'golden-castle', priority: '0.9', changefreq: 'daily' },
    { id: 'son-goku', priority: '0.9', changefreq: 'daily' },
    { id: 'white-whale', priority: '0.85', changefreq: 'weekly' },
    { id: 'ocean-paradise', priority: '0.85', changefreq: 'weekly' },
  ];

  const gameUrls: Array<{ loc: string; priority: string; changefreq: string }> = [];
  games.forEach(game => {
    // Dynamic Query URL (opens simulator directly on game)
    gameUrls.push({
      loc: `${baseUrl}/?game=${game.id}`,
      priority: game.priority,
      changefreq: game.changefreq,
    });
    // Anchor deep link for specific game guide & strategy
    gameUrls.push({
      loc: `${baseUrl}/#guide-${game.id}`,
      priority: game.priority,
      changefreq: game.changefreq,
    });
  });

  const allUrls = [...coreUrls, ...gameUrls];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allUrls
  .map(
    url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.header('Content-Type', 'application/xml; charset=utf-8');
  res.header('Cache-Control', 'public, max-age=3600');
  res.send(sitemapXml);
});

// Lazy initialize Gemini client to avoid crashes if API key is not present initially
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY 환경변수가 설정되지 않았습니다.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API: SEO Competitor & Long-Tail Keyword Generator
app.post('/api/seo/generate-keywords', async (req, res) => {
  try {
    const { competitorUrlOrTopic, gameCategory, targetContent } = req.body;

    const targetTopic = competitorUrlOrTopic || '바다이야기 릴게임 족보 및 무료체험';
    const category = gameCategory || '전체';
    const contentType = targetContent || '메타태그 및 블로그 공략글';

    const prompt = `당신은 대한민국 구글 검색엔진(Google Korea) SEO 최상위 랭킹 전문 분석가입니다.
현재 경쟁사 도메인(예: hyrmd.co.kr, oakville.kr, ge-material.co.kr 등) 및 키워드 트렌드를 분석하여,
새로 낙장 도메인을 확보한 우리 사이트(seoulmaterial.com)가 구글 1페이지 1위를 장악할 수 있는 고효율 롱테일(Long-tail) 키워드와 콘텐츠 전략을 생성해 주세요.

[분석 대상 및 조건]
- 분석 대상 주제 / 경쟁사 정보: ${targetTopic}
- 게임 카테고리: ${category} (바다이야기, 야마토, 황금성, 손오공, 백경, 알라딘 등)
- 활용 목적: ${contentType} (메타 태그 삽입, 블로그/공략 포스팅, 구조화 FAQ)

[구글 한국 릴게임 시장 특성]
- 단일 키워드(예: '바다이야기')보다 3~4단어 결합형 롱테일 키워드('오리지널 바다이야기 고래 출현 예시 타이밍', '황금성 릴게임 무료 시뮬레이터 배당표')가 경쟁이 적고 클릭률(CTR)과 전환율이 10배 이상 높습니다.
- 체류 시간을 늘릴 수 있는 실전 족보/공략 키워드가 핵심입니다.

다음 JSON 형식으로 반드시 응답하세요:
{
  "analysisSummary": "경쟁사 사이트들의 취약점 및 우리 사이트의 구글 1위 침투 전략 요약 (2-3문장)",
  "recommendedMetaTags": {
    "title": "구글 1위 노출용 최적화 타이틀 (60자 내외, CTR 극대화)",
    "description": "구글 검색결과 스니펫에 노출될 클릭 유도 디스크립션 (130-150자)",
    "keywords": ["키워드1", "키워드2", "키워드3", "키워드4", "키워드5", "키워드6", "키워드7", "키워드8"]
  },
  "longTailKeywords": [
    {
      "keyword": "구체적인 롱테일 키워드 (예: 바다이야기 상어 예시 후 고래 출현 확률)",
      "intent": "정보탐색 | 족보공략 | 무료체험 | 안전검증 중 택 1",
      "competitionLevel": "매우 낮음(기회) | 낮음 | 보통 중 택 1",
      "searchVolumeEstimate": "상 | 중 | 틈새급",
      "strategyTip": "이 키워드로 구글 1등을 먹기 위한 1줄 팁"
    }
  ],
  "contentOutline": {
    "h2Heading": "방문자 체류시간을 극대화할 블로그/공략 추천 H2 대제목",
    "h3Sections": [
      {
        "title": "H3 소제목",
        "keyPoints": "다뤄야 할 핵심 내용 및 키워드 배치법"
      }
    ]
  },
  "faqSuggestions": [
    {
      "question": "구글 리치 스니펫 FAQ에 등록할 질문 (유저들이 가장 많이 묻는 질문)",
      "answer": "정확하고 신뢰성 높은 2-3줄 답변"
    }
  ]
}`;

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text?.trim() || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      parsedData = { rawText: responseText };
    }

    res.json({
      success: true,
      data: parsedData,
      domain: 'seoulmaterial.com',
    });
  } catch (error: any) {
    console.error('Gemini SEO Generation Error:', error);
    // Provide a comprehensive fallback dataset if Gemini API key is missing or encounters issues
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate SEO keywords',
      fallbackData: {
        analysisSummary: "경쟁사(hyrmd, ge-material)는 단순 텍스트 나열로 체류시간이 5초 미만입니다. 반면 seoulmaterial.com은 3×3 시뮬레이터와 정밀 족보 롱테일로 구글 알고리즘 가산점을 독점할 수 있습니다.",
        recommendedMetaTags: {
          title: "릴게임 공식 포털 1위 - 바다이야기 야마토 황금성 무료체험 및 족보 공략",
          description: "대한민국 구글 1위 릴게임 종합 안내소. 오리지널 바다이야기 고래 출현 타이밍, 황금성 배당표, 야마토 5연타 공략, 무설치 시뮬레이터 무료 제공.",
          keywords: ["릴게임 족보", "바다이야기 고래 예시", "황금성 무료체험", "야마토 연타 족보", "손오공 릴게임", "seoulmaterial"]
        },
        longTailKeywords: [
          {
            keyword: "오리지널 바다이야기 상어 예시 후 고래 출현 타이밍",
            intent: "족보공략",
            competitionLevel: "매우 낮음(기회)",
            searchVolumeEstimate: "상",
            strategyTip: "경쟁사들이 다루지 않는 초 단위 예시 패턴을 본문에 수록하면 당일 구글 1위 가능"
          },
          {
            keyword: "황금성 릴게임 무료 머니 충전 없는 시뮬레이터",
            intent: "무료체험",
            competitionLevel: "매우 낮음(기회)",
            searchVolumeEstimate: "상",
            strategyTip: "우리 사이트 3×3 시뮬레이터로 직결 링크를 걸어 체류시간 10분 확보"
          },
          {
            keyword: "야마토 릴게임 5연타 회전 패턴 및 대박 신호",
            intent: "정보탐색",
            competitionLevel: "낮음",
            searchVolumeEstimate: "중",
            strategyTip: "스핀 회전수별 그래프 도표를 함께 게시해 구글 이미지 검색까지 장악"
          }
        ],
        contentOutline: {
          h2Heading: "구글 1위 탈환을 위한 릴게임 종합 족보 및 예시 분석 가이드",
          h3Sections: [
            {
              title: "바다이야기 해파리/상어/고래 연속 출현 메커니즘",
              keyPoints: "사운드 변화와 배경 색상 반전에 따른 당첨 주기 설명"
            },
            {
              title: "황금성 성문 열림 신호와 종소리 횟수의 상관관계",
              keyPoints: "종소리 7회 이상 발생 시 대박 진입 족보 해설"
            }
          ]
        },
        faqSuggestions: [
          {
            question: "바다이야기에서 고래가 나오면 무조건 잭팟인가요?",
            answer: "네, 고래는 최고 등급의 당첨 예시로 최소 5연타 이상의 잭팟 사이클로 연결되는 가장 확실한 신호입니다."
          }
        ]
      }
    });
  }
});

// Setup Vite or static serving
async function startServer() {
  const distPath = path.join(process.cwd(), 'dist');
  const hasDist = fs.existsSync(path.join(distPath, 'index.html'));
  const isDev = process.env.NODE_ENV === 'development' || (!hasDist && process.env.NODE_ENV !== 'production');

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
