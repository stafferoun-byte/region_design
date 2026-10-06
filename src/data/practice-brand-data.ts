/** JoongAng Brand page data — visuals/copy ported for /practice */

const IMG = "/images/joongang/brand";

export type BrandItem = {
  name: string;
  nameEn?: boolean;
  nameHtml?: string;
  href?: string;
  tit: string;
  info: string[];
  image?: string;
  gallery?: string[];
};

export type BrandSection = {
  id: string;
  menuId: string;
  label: string;
  className: string;
  hero: string;
  items: BrandItem[];
  inTabs?: boolean;
};

export const BRAND_SECTIONS: BrandSection[] = [
  {
    id: "News Brands",
    menuId: "News-Brands",
    label: "News Brands",
    className: "News-Brands",
    hero: `${IMG}/bg_brand_newspaper.jpg`,
    inTabs: true,
    items: [
      {
        name: "중앙일보",
        href: "https://www.joongang.co.kr/",
        tit: "현장의 중심을 중앙에 두다",
        image: `${IMG}/img_brand_newspaper01.jpg`,
        info: [
          "1965년 창간한 중앙일보는 정확한 뉴스와 깊이 있는 분석으로 세상을 전하는 신문입니다.",
          "‘중앙에 두다’를 슬로건으로 삼고",
          "현장의 진실을, 통합의 가치를, 내일의 성장을 중앙에 두겠다는 의지를 담았습니다.",
          "중앙일보의 역사는 한국 언론 혁신의 기록 그 자체입니다.",
          "한글 제호와 가로쓰기, 전문기자제 시행, 섹션신문 발행, 온라인 뉴스서비스 제공,",
          "가판 발행 폐지, 베를리너 판형 전환 등은 국내 최초의 시도였습니다.",
          "모두 독자 제일주의를 실천하기 위한 노력입니다.",
          "중앙일보는 한국 언론 중 가장 폭넓은 글로벌 네트워크를 갖췄습니다.",
          "미국의 뉴욕타임스, 블룸버그, CNN, 일본의 니혼게이자이신문, 지지통신, 중국의 신화사 등",
          "유수의 매체들과 제휴를 맺고 있습니다. 중앙일보는 해외 미디어들이 한국 소식을 전할 때",
          "가장 많이 인용 보도하는 매체입니다.",
        ],
      },
      {
        nameHtml: '중앙<span lang="en">SUNDAY</span>',
        name: "중앙SUNDAY",
        href: "https://www.joongang.co.kr/sunday",
        tit: "고품격 주말 신문",
        image: `${IMG}/img_brand_newspaper02.jpg`,
        info: [
          "중앙일보에서 국내 유일의 일요일 신문으로 2007년 창간한 중앙SUNDAY는 2018년 3월부터",
          "토요일에 독자를 찾아가고 있습니다. 정보가 홍수처럼 쏟아지는 디지털 시대에 중앙SUNDAY는",
          "긴 호흡으로 읽을 수 있는 품격 있는 콘텐트를 지향합니다. 깊이 있고 풍성한 내용으로 여러분의",
          "주말을 보다 알차게 채워드립니다.",
        ],
      },
      {
        name: "더중앙플러스",
        nameEn: true,
        href: "https://www.joongang.co.kr/plus",
        tit: "당신이 깊어지는 중",
        image: `${IMG}/img_brand_newspaper06.jpg`,
        info: [
          "더중앙플러스는 정제된 지식 콘텐트(Essential Knowledge)를",
          "제공하는 지식 구독 플랫폼을 지향합니다.",
          "",
          "콘텐트의 완성도를 높이고 콘텐트를 정제하는 안목으로",
          "시대와 고객이 필요로 하는 통찰력을 담습니다.",
          "",
          "더중앙플러스는 넘쳐나는 저품질 정보들 속에서 지식의 퀄리티를 보장합니다.",
          "60년 중앙일보의 각 분야 기자, 에디터들이 직접 취재하고 제작한 콘텐트로 신뢰할 수 있습니다.",
          "",
          "더중앙플러스는 깊이 있고 검증된 지식으로 구독자 경쟁력을 끌어올립니다.",
          "탄탄한 취재원과 견고한 네트워크를 통해 공신력있는 지식을 전하고,",
          "속도전을 넘어 뉴스의 공식을 깨고, 긴 호흡의 취재와 탐사를 통해 이슈를 파고듭니다.",
        ],
      },
      {
        name: "Korea JoongAng Daily",
        nameEn: true,
        href: "http://koreajoongangdaily.joins.com",
        tit: "국내 유일의 글로벌-로컬 신문",
        image: `${IMG}/img_brand_newspaper04_2022.jpg`,
        info: [
          "코리아중앙데일리는 중앙일보가 만드는 영어신문으로 뉴욕타임스 인터내셔널 에디션과 함께",
          "배달됩니다. 중앙일보의 주요 기사, 사설 번역은 물론, 중앙데일리 기자들이 취재한 자체 기사들이",
          "더해져 심도 있고 다양한 읽을거리를 제공합니다.",
          "",
          "함께 발행되는 뉴욕타임스는 세계 130개국 120만 오피니언 리더들이 읽는 세계적인 일간지입니다.",
          "전 세계에 퍼져있는 뉴욕타임스의 자체 취재망과 리포터를 통해 세계의 오늘을 보다 더 빠르고",
          "정확하게 보도합니다.",
        ],
      },
      {
        name: "The Korea Daily",
        nameEn: true,
        href: "http://koreadaily.com",
        tit: "미주 최대의 한국 언론",
        image: `${IMG}/img_brand_newspaper05.jpg`,
        info: [
          "Korea Daily는 미주 지역에서 가장 널리 읽히는 한국어 신문으로 중앙일보와 중앙일보의",
          "미국 법인인 미주 중앙일보가 발행합니다. 중앙일보가 전하는 한국의 최신 뉴스와 미주 중앙일보가",
          "취재한 미국의 생생한 현지 뉴스를 함께 제공합니다.",
        ],
      },
    ],
  },
  {
    id: "station",
    menuId: "station",
    label: "Station",
    className: "station",
    hero: `${IMG}/bg_brand_broadcast.png`,
    inTabs: true,
    items: [
      {
        name: "JTBC",
        nameEn: true,
        href: "https://jtbc.co.kr/",
        tit: "다채로운 즐거움",
        gallery: [
          `${IMG}/img_brand_broadcast01_2025.jpg`,
          `${IMG}/img_brand_broadcast02_2025.jpg`,
          `${IMG}/img_brand_broadcast03_2025.jpg`,
        ],
        info: [
          "JTBC는 2010년 정부 심사에서 압도적인 1위로 방송 사업자에 선정돼 2011년 12월 개국했습니다.",
          "개국 3년 만에 시청자가 뽑은 가장 공정하고 유익한 방송사로 선정됐으며 방송통신위원회가",
          "정보통신정책연구원(KISDI)에 의뢰해 진행하는 시청자 만족도 조사(KI)에서",
          "2014년부터 11차례 중 9번에 걸쳐 1위를 기록했습니다.",
          "",
          "메인뉴스 '뉴스룸'을 필두로 한 JTBC 보도 프로그램은 정치, 경제, 생활, 문화 등을 정확하고",
          "신속하게 전달하고 있습니다.",
        ],
      },
      {
        name: "JTBC2",
        nameEn: true,
        href: "http://jtbc2.joins.com",
        tit: "언제 봐도 즐거움을 주는 채널",
        image: `${IMG}/img_brand_broadcast02_2024.png`,
        info: [
          "JTBC의 다채로운 예능·드라마를 가장 빠르게, 시청자가 원하는 시간에 볼 수 있는 채널입니다.",
          "JTBC의 인기 예능과 드라마를 본방송 종료 직후, 가장 빠르게 다시 볼 수 있는",
          "‘바로 보는 본방’을 운영하고 있습니다.",
        ],
      },
      {
        name: "JTBC4",
        nameEn: true,
        tit: "그때 그 행복 소환 채널",
        image: `${IMG}/img_brand_broadcast04_2024.png`,
        info: [
          "다시 보고 싶은, 내가 좋아했던 콘텐트로 웃음과 감동을 전하는 채널입니다.",
          "‘히든 싱어’ ‘방구석 1열’등 JTBC의 역사를 함께 써내려간 프로그램부터",
          "최신작까지 시청자의 입맛에 맞는 콘텐트 큐레이션을 선사합니다.",
        ],
      },
    ],
  },
  {
    id: "studio",
    menuId: "studio",
    label: "Studio",
    className: "studio",
    hero: `${IMG}/bg_brand_studio.jpg`,
    inTabs: true,
    items: [
      {
        name: "SLL중앙",
        nameEn: true,
        tit: "GLOBAL IP POWERHOUSE",
        gallery: [
          `${IMG}/img_brand_studio01_2025.jpg`,
          `${IMG}/img_brand_broadcast_sll2.png`,
          `${IMG}/img_brand_studio03_2025.jpg`,
        ],
        info: [
          "SLL은 드라마, 영화, 예능, K-POP등 장르와 플랫폼을 넘나드는 다채로운 콘텐트와",
          "IP를 기획·개발, 제작해 전세계 시장에 공급하는 글로벌 크리에이티브 스튜디오입니다.",
        ],
      },
    ],
  },
  {
    id: "Sports Biz",
    menuId: "Sports-Biz",
    label: "Sports Biz",
    className: "Sports-Biz",
    hero: `${IMG}/bg_brand_sportsBiz.png`,
    inTabs: true,
    items: [
      {
        name: "JTBC GOLF",
        nameEn: true,
        tit: "대한민국 골프 전문 채널",
        gallery: [
          `${IMG}/img_brand_sportsBiz01_2025.jpg`,
          `${IMG}/img_brand_sportsBiz02_2025.jpg`,
          `${IMG}/img_brand_sportsBiz03_2025.jpg`,
        ],
        info: [
          "2005년 개국한 JTBC GOLF는 LPGA투어, 디오픈 챔피언십, 코오롱 한국오픈과 같은",
          "국내외 주요 메이저 골프 대회를 중계하며 대한민국 No.1 골프 채널의 입지를 강화하고 있습니다.",
        ],
      },
      {
        name: "JTBC GOLF&SPORTS",
        nameEn: true,
        tit: "종합 스포츠 채널",
        gallery: [
          `${IMG}/img_brand_sportsBiz04_2025.jpg`,
          `${IMG}/img_brand_sportsBiz05_2025.jpg`,
        ],
        info: [
          "JTBC GOLF&SPORTS는 2015년 개국한 종합 스포츠 채널입니다.",
          "K리그1 같은 국내 프로 스포츠를 비롯해 다양한 올림픽 종목 스포츠를 생중계하고 있습니다.",
        ],
      },
    ],
  },
  {
    id: "Space Mgmt Biz",
    menuId: "Space-Mgmt-Biz",
    label: "Space Mgmt Biz",
    className: "Space-Mgmt-Biz",
    hero: `${IMG}/bg_brand_multiplex.jpg`,
    inTabs: true,
    items: [
      {
        name: "메가박스",
        tit: "MEET PLAY SHARE",
        gallery: [
          `${IMG}/img_brand_multiplex_01.png`,
          `${IMG}/img_brand_multiplex_02.png`,
          `${IMG}/img_brand_multiplex_03_2025.png`,
        ],
        info: [
          "메가박스는 새로운 이야기를 만나고, 함께 어울려 즐기며, 특별한 순간을 나누는 공간입니다.",
          "가치 있는 콘텐트와 차별화된 공간 경험을 통해 영감과 감동을 선사합니다.",
        ],
      },
      {
        name: "플러스엠",
        tit: "대한민국 대표 영화 스튜디오",
        gallery: [
          `${IMG}/img_brand_multiplex_04_2025.png`,
          `${IMG}/img_brand_multiplex_05_2025.png`,
          `${IMG}/img_brand_multiplex_06_2025.png`,
        ],
        info: [
          "우리는 최고의 콘텐트를 제공하고자 합니다.",
          "제작, 투자, 유통을 아우르는 대한민국 대표 영화 스튜디오를 구축하고 있습니다.",
        ],
      },
      {
        name: "스템커피",
        tit: "좋은 양분이 되는 커피",
        gallery: [
          `${IMG}/img_brand_multiplex_07_2025.png`,
          `${IMG}/img_brand_multiplex_08_2025.png`,
          `${IMG}/img_brand_multiplex_09_2025.png`,
        ],
        info: [
          "스템커피는 식물의 줄기처럼, 당신의 생활에 좋은 양분을 주는 브랜드입니다.",
          "시즌마다 가장 잘 어울리는 스페셜티 원두를 큐레이션하여 커피 본연의 풍미를 전합니다.",
        ],
      },
      {
        name: "플레이타임중앙",
        tit: "Global No.1 도심형 실내 키즈 테마파크",
        gallery: [
          `${IMG}/img_brand_multiplex_10_2025.png`,
          `${IMG}/img_brand_multiplex_11_2025.png`,
          `${IMG}/img_brand_multiplex_12_2025.png`,
        ],
        info: [
          "플레이타임중앙은 국내외 200여 개의 실내 키즈 놀이 공간을 운영하는",
          "종합 놀이 콘텐트 전문 회사입니다.",
        ],
      },
    ],
  },
  {
    id: "leisure",
    menuId: "leisure",
    label: "Leisure",
    className: "leisure",
    hero: `${IMG}/bg_brand_leisure_2025.png`,
    inTabs: true,
    items: [
      {
        name: "휘닉스 파크",
        tit: "계절마다 즐거운 청정 휴양 리조트",
        gallery: [
          `${IMG}/img_brand_leisure01_2025.jpg`,
          `${IMG}/img_brand_leisure02_2025.jpg`,
          `${IMG}/img_brand_leisure03_2025.jpg`,
        ],
        info: [
          "강원도 평창 해발 700m 청정 고원지대에 위치한 휘닉스 파크는",
          "휴양과 레저가 조화를 이룬 프리미엄 종합 리조트입니다.",
        ],
      },
      {
        name: "휘닉스 아일랜드",
        tit: "자연과 사람이 만든 지상 낙원",
        gallery: [
          `${IMG}/img_brand_leisure04_2025.jpg`,
          `${IMG}/img_brand_leisure05_2025.jpg`,
          `${IMG}/img_brand_leisure06_2025.jpg`,
        ],
        info: [
          "제주 섭지코지에 자리한 휘닉스 아일랜드는",
          "자연과 건축이 조화를 이루는 자연친화적인 리조트입니다.",
        ],
      },
      {
        name: "플레이스캠프 by 휘닉스",
        tit: "NOT JUST A HOTEL",
        gallery: [
          `${IMG}/img_brand_leisure07_2025.jpg`,
          `${IMG}/img_brand_leisure08_2025.jpg`,
          `${IMG}/img_brand_leisure09_2025.jpg`,
        ],
        info: [
          "마음껏 웃고, 맛있게 먹고, 활기차게 걷고, 음악을 들으며,",
          "온전히 ‘나’일 수 있는 곳. 플레이스캠프를 호텔이 아니라 캠프라 부르는 이유입니다.",
        ],
      },
    ],
  },
  {
    id: "L&L",
    menuId: "L-L",
    label: "L&L",
    className: "L-L",
    hero: `${IMG}/bg_brand_L-L.png`,
    inTabs: true,
    items: [
      {
        name: "ELLE",
        nameEn: true,
        tit: "NO.1 FASHION & LIFESTYLE MEDIA",
        gallery: [
          `${IMG}/img_brand_L-L01_2025.png`,
          `${IMG}/img_brand_L-L01-1_2025.png`,
          `${IMG}/img_brand_L-L01-2_2025.png`,
        ],
        info: [
          "‘엘르’는 글로벌 2100만 독자와 함께 세계 최대 네트워크를 자랑하는 No.1 패션 미디어입니다.",
        ],
      },
      {
        name: "COSMOPOLITAN",
        nameEn: true,
        tit: "Fun, Fearless, Female",
        gallery: [
          `${IMG}/img_brand_L-L02_2025.png`,
          `${IMG}/img_brand_L-L02-1_2025.png`,
          `${IMG}/img_brand_L-L02-2_2025.png`,
        ],
        info: [
          "‘코스모폴리탄’은 국내 최대 판매 부수와 높은 정기구독률을 자랑하는",
          "글로벌 라이프스타일 미디어입니다.",
        ],
      },
      {
        name: "Harper’s BAZAAR",
        nameEn: true,
        tit: "Realistic Inspiration from Artistic Creation",
        gallery: [
          `${IMG}/img_brand_L-L03_2025.png`,
          `${IMG}/img_brand_L-L03-1_2025.png`,
          `${IMG}/img_brand_L-L03-2_2025.png`,
        ],
        info: [
          "‘하퍼스 바자’는 세계 최초의 패션 매거진으로",
          "현대 여성의 문화와 라이프스타일에 통찰력과 영감을 제공하고 있습니다.",
        ],
      },
      {
        name: "ESQUIRE",
        nameEn: true,
        tit: "MAN AT HIS BEST",
        gallery: [
          `${IMG}/img_brand_L-L04_2025.png`,
          `${IMG}/img_brand_L-L04-1_2025.png`,
          `${IMG}/img_brand_L-L04-2_2025.png`,
        ],
        info: [
          "‘에스콰이어’는 취향 있는 남자들을 위한 지적인 바이블입니다.",
        ],
      },
      {
        name: "STUDIO DOT",
        nameEn: true,
        tit: "A to Z 콘텐트 솔루션",
        gallery: [
          `${IMG}/img_brand_L-L05-1_2025.png`,
          `${IMG}/img_brand_L-L05-2_2025.png`,
          `${IMG}/img_brand_L-L05-3_2025.png`,
        ],
        info: [
          "HLL중앙은 미디어사 최초 광고대행사인 ‘스튜디오 닷’을 운영하고 있습니다.",
        ],
      },
      {
        name: "ODDSOCKS",
        nameEn: true,
        tit: "달라서 좋아!",
        gallery: [
          `${IMG}/img_brand_L-L06_2025.png`,
          `${IMG}/img_brand_L-L06-1_2025.png`,
          `${IMG}/img_brand_L-L06-2_2025.png`,
        ],
        info: [
          "오드삭스는 서로 다른 사람들의 개성을 제일 중요하게 생각합니다.",
        ],
      },
      {
        name: "SUBLIME",
        nameEn: true,
        tit: "K-엔터의 트렌드 메이커",
        image: `${IMG}/img_brand_L-L07_2025.png`,
        info: [
          "써브라임은 톱 아티스트 매니지먼트를 중심으로",
          "종합 엔터테인먼트 솔루션을 제공합니다.",
        ],
      },
    ],
  },
];

export const BRAND_TABS = BRAND_SECTIONS.filter((s) => s.inTabs !== false);
