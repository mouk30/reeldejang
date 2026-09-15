import { GameDefinition, ReelSymbol, SiteRanking, FaqItem } from '../types';

export const REEL_GAMES: GameDefinition[] = [
  {
    id: 'sea-story',
    name: '바다이야기 (Sea Story)',
    nameEn: 'Sea Story Reel Game',
    subtitle: '대한민국 릴게임의 불멸의 원조이자 상징',
    tagline: '해파리 출현 후 황금 고래가 솟구치는 순간 폭풍 7연타 잭팟!',
    badge: '인기 1위',
    themeColor: 'from-blue-900 via-cyan-950 to-slate-950',
    accentColor: '#06b6d4',
    rtp: '97.6%',
    volatility: '매우 높음 (High)',
    symbols: [
      { id: 'whale', name: '황금고래', icon: '🐋', color: 'text-amber-300', payout: 50, rarity: 'legendary' },
      { id: 'shark', name: '백상어', icon: '🦈', color: 'text-cyan-300', payout: 25, rarity: 'epic' },
      { id: 'jellyfish', name: '해파리', icon: '🪼', color: 'text-purple-300', payout: 15, rarity: 'rare' },
      { id: 'turtle', name: '거북이', icon: '🐢', color: 'text-emerald-300', payout: 10, rarity: 'common' },
      { id: 'crab', name: '꽃게', icon: '🦀', color: 'text-rose-400', payout: 5, rarity: 'common' },
      { id: 'shell', name: '조개', icon: '🐚', color: 'text-amber-100', payout: 3, rarity: 'common' },
    ],
    noticePatterns: [
      {
        title: '해파리 떼 유영 예시',
        description: '릴 회전 중 화면 하단에서 형광 해파리가 3마리 이상 지나가면 2~4스핀 이내 상어 또는 고래 출현 확률 85% 급증.',
        chanceText: '당첨 기대치 85%'
      },
      {
        title: '화면 암전 및 잠수함 레이더 예시',
        description: '화면이 순간적으로 어두워지며 삐- 소리의 소나 음향이 울릴 때, 최고 배당 잭팟 연타를 암시하는 최고급 예시.',
        chanceText: '대박 기대치 98%'
      },
      {
        title: '백상어 물결 공격 예시',
        description: '릴이 멈출 때 물살이 소용돌이치며 상어 지느러미가 화면을 가르면 3연타 이상 직행 보너스 진입.',
        chanceText: '연타 기대치 75%'
      }
    ],
    comboFeatures: [
      {
        title: '황금 고래 5~7단 폭풍 연타',
        description: '보너스 릴 상태에서 연속으로 당첨 조합이 생성되며 베팅액의 수백 배 포인트가 누적되는 바다이야기 고유의 보너스.',
        multiplierRange: '100x ~ 800x'
      },
      {
        title: '심해 보물선 찬스 릴',
        description: '해저 난파선이 부상하며 보너스 스핀 10회가 무상 지급되는 특별 이벤트 스테이지.',
        multiplierRange: '50x ~ 300x'
      }
    ],
    description: '바다이야기는 2000년대 중반 한국 아케이드 시장을 완전히 뒤흔들었던 전설적인 해양 테마 릴게임입니다. 단순한 슬롯과 달리 독창적인 잠수함 음향, 해파리/상어/고래로 이어지는 긴장감 넘치는 "예시(豫示)" 시스템과 폭발적인 "연타" 구조로 지금도 수많은 매니아들의 압도적 지지를 받고 있습니다.',
    historyText: '오리지널 아케이드 기판의 리듬감과 손맛을 100% 디지털 알고리즘으로 복각하여, PC와 모바일 환경 어디서나 부드러운 60FPS 프레임으로 즐길 수 있도록 구현되었습니다.'
  },
  {
    id: 'yamato',
    name: '야마토 (Yamato)',
    nameEn: 'Space Battleship Yamato Reel',
    subtitle: '우주전함 파동포의 전율과 붉은 전함 4단 변신',
    tagline: '사이렌 경보와 함께 주포 발사! 10연타 안드로메다 은하 잭팟!',
    badge: '인기 2위',
    themeColor: 'from-red-950 via-amber-950 to-slate-950',
    accentColor: '#f59e0b',
    rtp: '97.2%',
    volatility: '극상 (Extreme)',
    symbols: [
      { id: 'battleship', name: '붉은전함', icon: '🚀', color: 'text-amber-400', payout: 60, rarity: 'legendary' },
      { id: 'cannon', name: '파동포', icon: '⚡', color: 'text-cyan-300', payout: 30, rarity: 'epic' },
      { id: 'captain', name: '함장마크', icon: '🎖️', color: 'text-rose-400', payout: 18, rarity: 'rare' },
      { id: 'fighter', name: '코스모제로', icon: '🛸', color: 'text-emerald-300', payout: 12, rarity: 'common' },
      { id: 'radar', name: '레이더', icon: '📡', color: 'text-blue-300', payout: 6, rarity: 'common' },
      { id: 'satellite', name: '인공위성', icon: '🛰️', color: 'text-slate-300', payout: 4, rarity: 'common' },
    ],
    noticePatterns: [
      {
        title: '비상 적색 경보 사이렌',
        description: '전함 조명이 붉은색으로 점멸하며 긴급 경보음 발생 시 고배당 전함 라인 확정 전조.',
        chanceText: '당첨 기대치 90%'
      },
      {
        title: '파동포 에너지 100% 충전',
        description: '화면 중앙 게이지가 가득 차며 주포 카운트다운(3, 2, 1)이 시작될 때 터지는 초대형 잭팟 신호.',
        chanceText: '대박 기대치 99%'
      },
      {
        title: '우주 함대 워프 항법 연출',
        description: '배경이 광속 왜곡 공간으로 바뀌며 연타 스테이지로 즉시 강제 전환.',
        chanceText: '연타 기대치 80%'
      }
    ],
    comboFeatures: [
      {
        title: '붉은 전함 4단 변신 15연타',
        description: '야마토 릴게임의 백미로, 전함이 형태를 바꾸며 연속 15회에 걸쳐 메가 잭팟을 쏟아내는 궁극의 연타.',
        multiplierRange: '200x ~ 1,500x'
      },
      {
        title: '안드로메다 격돌 보너스',
        description: '적 함대와의 교전에서 승리할 때마다 배당이 2배씩 중첩되는 승자독식 보너스 라운드.',
        multiplierRange: '80x ~ 500x'
      }
    ],
    description: '야마토 릴게임은 일본 고전 SF 애니메이션 우주전함 야마토의 비장한 스토리텔링과 박진감 넘치는 사운드를 아케이드 릴에 접목한 명작입니다. 특히 파동포 발사 시의 타격감과 예측 불허의 연속 연타로 릴게임 매니아들 사이에서 바다이야기와 쌍벽을 이룹니다.',
    historyText: '정밀한 배당 계산식과 고화질 애니메이션 효과를 최적화하여 딜레이 없는 즉각적인 릴 회전 손맛을 제공합니다.'
  },
  {
    id: 'golden-castle',
    name: '황금성 (Golden Castle)',
    nameEn: 'Gladiator Golden Castle Reel',
    subtitle: '중세 로마 글라디에이터와 황금 종소리의 신화',
    tagline: '닫혀있던 거대한 황금 성문이 열리며 쏟아지는 황금빛 보물!',
    badge: '추천',
    themeColor: 'from-amber-950 via-yellow-950 to-slate-950',
    accentColor: '#eab308',
    rtp: '96.8%',
    volatility: '중상 (Medium-High)',
    symbols: [
      { id: 'gate', name: '황금성문', icon: '🏰', color: 'text-amber-300', payout: 40, rarity: 'legendary' },
      { id: 'bell', name: '황금종', icon: '🔔', color: 'text-yellow-400', payout: 20, rarity: 'epic' },
      { id: 'crown', name: '로얄왕관', icon: '👑', color: 'text-emerald-300', payout: 15, rarity: 'rare' },
      { id: 'shield', name: '기사방패', icon: '🛡️', color: 'text-blue-300', payout: 8, rarity: 'common' },
      { id: 'sword', name: '기사의검', icon: '⚔️', color: 'text-rose-300', payout: 5, rarity: 'common' },
      { id: 'goblet', name: '황금잔', icon: '🏆', color: 'text-amber-200', payout: 3, rarity: 'common' },
    ],
    noticePatterns: [
      {
        title: '황금 종소리 3타격 예시',
        description: '웅장한 성당 종소리가 3번 울려 퍼지면 황금성문 개폐 확률 90% 돌파.',
        chanceText: '당첨 기대치 90%'
      },
      {
        title: '투구 기사의 칼 뽑기 연출',
        description: '글라디에이터 기사가 검을 뽑아 허공을 가르면 배당 라인이 일렬 정렬되는 강력한 당첨 징조.',
        chanceText: '대박 기대치 85%'
      }
    ],
    comboFeatures: [
      {
        title: '황금성문 개방 7연타',
        description: '견고했던 성문이 좌우로 활짝 열리며 쏟아지는 금화 세례와 함께 7회 연속 잭팟이 터집니다.',
        multiplierRange: '150x ~ 700x'
      }
    ],
    description: '황금성은 고전 아케이드 명작 글라디에이터의 웅장한 로마 제국 세계관을 계승한 명품 릴게임입니다. 황금 종소리의 맑은 울림과 함께 성문이 열리는 특유의 연출은 보는 이의 아드레날린을 폭발시킵니다.',
    historyText: '심플하면서도 타격감 높은 릴 스탑 로직과 화려한 금빛 그래픽 이펙트로 폭넓은 연령층의 사랑을 받고 있습니다.'
  },
  {
    id: 'son-goku',
    name: '손오공 (Monkey King)',
    nameEn: 'Son Goku Reel Game',
    subtitle: '서유기 요괴 퇴치와 여의봉의 신통방통 대박 행진',
    tagline: '근두운을 타고 하늘로 솟구치는 손오공! 천둥 번개와 12연타!',
    badge: '급상승',
    themeColor: 'from-orange-950 via-stone-900 to-slate-950',
    accentColor: '#f97316',
    rtp: '97.0%',
    volatility: '높음 (High)',
    symbols: [
      { id: 'goku', name: '슈퍼손오공', icon: '🐵', color: 'text-orange-400', payout: 45, rarity: 'legendary' },
      { id: 'staff', name: '여의봉', icon: '🪄', color: 'text-yellow-300', payout: 22, rarity: 'epic' },
      { id: 'cloud', name: '황금근두운', icon: '☁️', color: 'text-amber-200', payout: 16, rarity: 'rare' },
      { id: 'peach', name: '선도복숭아', icon: '🍑', color: 'text-rose-400', payout: 8, rarity: 'common' },
      { id: 'fan', name: '파초선', icon: '🪭', color: 'text-cyan-300', payout: 5, rarity: 'common' },
      { id: 'ring', name: '긴고아', icon: '💍', color: 'text-emerald-300', payout: 3, rarity: 'common' },
    ],
    noticePatterns: [
      {
        title: '여의봉 회전 및 번개 예시',
        description: '여의봉이 공중에서 초고속 회전하며 먹구름 속에서 번개가 내리칠 때 터지는 메이저 예시.',
        chanceText: '당첨 기대치 88%'
      },
      {
        title: '분신술 3마리 오공 등장',
        description: '릴 좌우에 손오공 분신이 나타나 릴을 강제로 멈추는 프리미엄 당첨 이벤트.',
        chanceText: '대박 기대치 95%'
      }
    ],
    comboFeatures: [
      {
        title: '천궁 대소동 10연타',
        description: '선도 복숭아와 여의봉이 교차하며 최대 10회까지 쉼 없이 당첨 포인트를 쏟아붓습니다.',
        multiplierRange: '100x ~ 1,000x'
      }
    ],
    description: '서유기의 유쾌하고 통쾌한 분위기를 릴게임으로 완벽하게 구현한 손오공은 예측할 수 없는 특유의 빠른 템포와 시원한 번개 이펙트로 선풍적인 인기를 끌고 있는 스테디셀러입니다.',
    historyText: '알고리즘 난수가 극도로 유려하여 손맛을 중시하는 정통 게이머들의 필수 코스로 꼽힙니다.'
  },
  {
    id: 'white-whale',
    name: '백경 (Moby Dick)',
    nameEn: 'White Whale Reel',
    subtitle: '거대한 빙산과 전설의 대형 흰고래 추적기',
    tagline: '북극해의 빙하가 갈라지며 모습을 드러내는 100배 초대형 백경!',
    badge: '클래식',
    themeColor: 'from-slate-900 via-indigo-950 to-slate-950',
    accentColor: '#38bdf8',
    rtp: '96.5%',
    volatility: '매우 높음',
    symbols: [
      { id: 'white-whale', name: '거대백경', icon: '🐳', color: 'text-sky-200', payout: 55, rarity: 'legendary' },
      { id: 'harpoon', name: '황금작살', icon: '🔱', color: 'text-amber-300', payout: 28, rarity: 'epic' },
      { id: 'ship', name: '포경선', icon: '⛵', color: 'text-blue-300', payout: 15, rarity: 'rare' },
      { id: 'compass', name: '나침반', icon: '🧭', color: 'text-emerald-300', payout: 8, rarity: 'common' },
      { id: 'iceberg', name: '빙산', icon: '🏔️', color: 'text-cyan-200', payout: 5, rarity: 'common' },
      { id: 'helm', name: '조타핸들', icon: '☸️', color: 'text-slate-300', payout: 3, rarity: 'common' },
    ],
    noticePatterns: [
      {
        title: '북극 해무 안개 자욱 예시',
        description: '화면 전면에 짙은 안개가 깔리며 고래 울음소리가 메아리칠 때 발생하는 극상위 예시.',
        chanceText: '당첨 기대치 92%'
      }
    ],
    comboFeatures: [
      {
        title: '빙산 파쇄 백경 8연타',
        description: '얼어붙은 북극해를 가르고 솟구쳐 오르는 백경의 8연속 슈퍼 보너스.',
        multiplierRange: '120x ~ 900x'
      }
    ],
    description: '허먼 멜빌의 모비딕을 모티브로 한 릴게임 백경은 바다이야기와 함께 한국 해양 릴게임의 양대 산맥으로 군림해온 전설의 타이틀입니다.',
    historyText: '특유의 심오한 분위기와 중후한 사운드 트랙으로 진지한 승부를 즐기는 유저들에게 정평이 나 있습니다.'
  },
  {
    id: 'ocean-paradise',
    name: '오션파라다이스 (Ocean)',
    nameEn: 'Ocean Paradise Reel',
    subtitle: '에메랄드빛 산호초와 인어공주의 환상적인 낙원',
    tagline: '신비로운 산호섬에서 펼쳐지는 황금 진주의 축제!',
    badge: '화려한 연출',
    themeColor: 'from-teal-950 via-slate-900 to-slate-950',
    accentColor: '#2dd4bf',
    rtp: '97.4%',
    volatility: '중간 (Medium)',
    symbols: [
      { id: 'mermaid', name: '인어공주', icon: '🧜‍♀️', color: 'text-teal-300', payout: 40, rarity: 'legendary' },
      { id: 'pearl', name: '황금진주', icon: '🦪', color: 'text-amber-200', payout: 22, rarity: 'epic' },
      { id: 'seahorse', name: '해마', icon: '🦐', color: 'text-pink-300', payout: 14, rarity: 'rare' },
      { id: 'dolphin', name: '돌고래', icon: '🐬', color: 'text-cyan-300', payout: 8, rarity: 'common' },
      { id: 'starfish', name: '불가사리', icon: '⭐', color: 'text-yellow-300', payout: 5, rarity: 'common' },
      { id: 'coral', name: '산호초', icon: '🪸', color: 'text-rose-300', payout: 3, rarity: 'common' },
    ],
    noticePatterns: [
      {
        title: '황금 진주조개 개폐 예시',
        description: '조개가 빛나며 진주가 떠오르면 3스핀 이내 인어공주 라인 확정.',
        chanceText: '당첨 기대치 87%'
      }
    ],
    comboFeatures: [
      {
        title: '산호초 무지개 6연타',
        description: '화려한 바닷속 산호초가 빛을 발하며 균등하게 이어지는 안정적인 고배당 보너스.',
        multiplierRange: '80x ~ 600x'
      }
    ],
    description: '오션파라다이스는 바다이야기의 후속 격으로 개발되어 한층 더 진보된 그래픽과 감미로운 멜로디, 그리고 잦은 보너스 연타로 선풍적인 붐을 일으켰던 작품입니다.',
    historyText: '높은 RTP와 부드러운 승률 곡선으로 초심자부터 숙련자까지 누구나 편안하게 즐길 수 있습니다.'
  }
];

export const INITIAL_JACKPOTS = [
  { id: 'j1', gameId: 'sea-story' as const, gameName: '바다이야기', userMasked: '010-****-7812', prizeAmount: 2450000, comboCount: 7, patternName: '황금고래 7연타 극상', timeAgo: '방금 전', verified: true },
  { id: 'j2', gameId: 'yamato' as const, gameName: '야마토', userMasked: '010-****-3390', prizeAmount: 4890000, comboCount: 12, patternName: '파동포 100% 충전 전함연타', timeAgo: '1분 전', verified: true },
  { id: 'j3', gameId: 'golden-castle' as const, gameName: '황금성', userMasked: '010-****-9104', prizeAmount: 1680000, comboCount: 5, patternName: '황금종 3타격 성문개폐', timeAgo: '3분 전', verified: true },
  { id: 'j4', gameId: 'son-goku' as const, gameName: '손오공', userMasked: '010-****-4251', prizeAmount: 3120000, comboCount: 9, patternName: '여의봉 번개소환 천궁연타', timeAgo: '6분 전', verified: true },
  { id: 'j5', gameId: 'sea-story' as const, gameName: '바다이야기', userMasked: '010-****-1189', prizeAmount: 1850000, comboCount: 6, patternName: '백상어 물결 공격 연타', timeAgo: '9분 전', verified: true },
  { id: 'j6', gameId: 'white-whale' as const, gameName: '백경', userMasked: '010-****-6028', prizeAmount: 2980000, comboCount: 8, patternName: '빙산 파쇄 황금작살 대박', timeAgo: '14분 전', verified: true },
];

export const TOP_SITES: SiteRanking[] = [
  {
    rank: 1,
    name: '오리지널 릴클럽 (ReelClub Official)',
    badge: '공식 1위 인증',
    rating: 4.98,
    reviewsCount: 3820,
    speedMs: 18,
    safetyScore: 99.9,
    depositGuarantee: '5억원 보증금 예치',
    supportedGames: ['바다이야기', '야마토', '황금성', '손오공', '백경'],
    eventBonus: '신규 가입 3+3, 5+5, 10+10 첫충 30% 보너스',
    features: ['오리지널 정품 기판 알고리즘', '빛의 속도 1분 자동 출금', '24시간 1:1 고객센터', '모바일 웹 완벽 대응']
  },
  {
    rank: 2,
    name: '골든 릴라운지 (Golden Lounge)',
    badge: '안전성 1위',
    rating: 4.95,
    reviewsCount: 2940,
    speedMs: 22,
    safetyScore: 99.8,
    depositGuarantee: '3억원 보증금 예치',
    supportedGames: ['바다이야기', '야마토 4단', '황금성', '오션파라다이스'],
    eventBonus: '매일 첫충 15% 무제한 매충 10% 페이백',
    features: ['RNG 공정 난수 검증 완료', '단속 걱정 없는 보안 서버', '연타 확률 100% 원작 재현']
  },
  {
    rank: 3,
    name: '블루오션 릴센터 (BlueOcean Center)',
    badge: '속도 최우수',
    rating: 4.91,
    reviewsCount: 2150,
    speedMs: 15,
    safetyScore: 99.6,
    depositGuarantee: '3억원 보증금 예치',
    supportedGames: ['바다이야기', '백경', '알라딘', '손오공'],
    eventBonus: '가입 즉시 릴 무료체험 쿠폰 5만P 지급',
    features: ['PC / 모바일 무설치 원클릭 실행', 'VIP 전용 초특급 리베이트', '무사고 6년 안전 운영']
  },
  {
    rank: 4,
    name: '야마토 스타디움 (Yamato Stadium)',
    badge: '야마토 특화',
    rating: 4.88,
    reviewsCount: 1890,
    speedMs: 25,
    safetyScore: 99.4,
    depositGuarantee: '2억원 보증금 예치',
    supportedGames: ['야마토 전 시리즈', '황금성', '바다이야기'],
    eventBonus: '파동포 잭팟 달성 시 추가 축하금 20만 지급',
    features: ['야마토 1, 2, 3, 4 전 버전 지원', '실시간 잭팟 모니터링', '소액 유저 친화형 환경']
  }
];

export const FAQ_LIST: FaqItem[] = [
  {
    category: '일반',
    question: '릴게임이란 정확히 어떤 게임이며 슬롯머신과 어떻게 다른가요?',
    answer: '릴게임은 회전하는 3~5개의 릴(Reel)을 기반으로 당첨 조합을 맞추는 아케이드 게임 장르입니다. 서양식 일반 슬롯머신과 다른 가장 결정적인 차이점은 바로 "예시(Notice)"와 "연타(Combo)" 시스템입니다. 당첨이 되기 전 해파리, 사이렌, 황금종 등의 사전 징조가 나타나며, 잭팟이 터질 때 1회로 끝나지 않고 3~15회 연속으로 폭발하는 것이 한국형 릴게임의 최대 묘미입니다.'
  },
  {
    category: '게임방법',
    question: '본 포털의 무료체험 시뮬레이터는 어떻게 이용하나요?',
    answer: '별도의 회원가입이나 충전, 앱 설치가 전혀 필요 없습니다. 상단 시뮬레이터 창에서 [바다이야기], [야마토], [황금성], [손오공] 중 원하는 게임을 선택한 뒤 [스핀] 버튼을 누르면 즉시 가상 크레딧으로 실제 기판과 동일한 승률 및 예시 연출을 100% 무제한 무료로 경험하실 수 있습니다.'
  },
  {
    category: '게임방법',
    question: '바다이야기에서 가장 큰 대박 예시는 어떤 것인가요?',
    answer: '바다이야기에서 가장 강력한 예시는 "화면 암전 후 소나 음향 발생"과 "해파리 떼 유영 후 황금고래 등장"입니다. 해파리가 3마리 이상 지나갈 때 화면 상단에 거대한 백상어나 황금고래가 나타나면 90% 이상의 확률로 5~7연타 이상의 메가 잭팟으로 직행합니다.'
  },
  {
    category: '모바일',
    question: '모바일 스마트폰(갤럭시, 아이폰)에서도 똑같이 이용 가능한가요?',
    answer: '네, 100% 모바일 반응형 웹(HTML5 & Canvas) 기술로 개발되어 별도의 APK 다운로드 없이도 모바일 브라우저(크롬, 사파리, 삼성인터넷)에서 자동 화면비 조절과 부드러운 터치 스핀이 완벽하게 지원됩니다.'
  },
  {
    category: '안전검증',
    question: '안전한 릴게임 사이트를 선별하는 기준은 무엇인가요?',
    answer: '가장 중요한 3대 요소는 1) 공식 안전 보증금(최소 2억 이상) 예치 여부, 2) 게임 결과가 운영진 임의로 조작되지 않는 국제 표준 RNG(Random Number Generator) 난수 인증, 3) 입출금 지연 없는 24시간 실시간 고객 지원 체계입니다. 본 포털에서는 이 기준을 통과한 검증된 업체만을 엄선하여 순위를 제공합니다.'
  },
  {
    category: '일반',
    question: '릴게임 조작이나 환수율(RTP)은 어떻게 관리되나요?',
    answer: '오리지널 정품 릴게임은 96.5% ~ 97.8%의 안정적인 법정 및 글로벌 규격 RTP(환수율)를 준수합니다. 조작 사이트는 예시 연출만 띄우고 연타를 인위적으로 끊는 악성 수법을 쓰므로 반드시 먹튀 검증이 완료된 메이저 포털 보증 업체를 이용하셔야 합니다.'
  }
];
