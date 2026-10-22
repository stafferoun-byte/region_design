import type { ReactNode } from "react";
import {
  ArrowLeftRight,
  Banknote,
  Calculator,
  CalendarClock,
  Car,
  FileCheck,
  FileText,
  Gavel,
  Handshake,
  HeartHandshake,
  Home,
  Landmark,
  Layers,
  MessageSquare,
  RefreshCw,
  Scale,
  ScrollText,
  Search,
  Smartphone,
  Stethoscope,
  Users,
  Video,
} from "lucide-react";
import { InViewSectionTitle } from "@/components/section-title-reveal";
import "./practice-strategy.css";

type StrategyIcon =
  | "house"
  | "transfer"
  | "care"
  | "calc"
  | "terms"
  | "speech"
  | "scale"
  | "phone"
  | "banknote"
  | "refresh"
  | "landmark"
  | "handshake"
  | "search"
  | "users"
  | "layers"
  | "filecheck"
  | "scroll"
  | "calendar"
  | "gavel"
  | "video"
  | "stethoscope"
  | "car";

type StrategyStep = {
  no: string;
  title: ReactNode;
  note: string;
  body?: string;
  icon?: StrategyIcon;
};

type TitleLine = readonly (string | { text: string; color?: string; glue?: boolean })[];

const STEPS: readonly StrategyStep[] = [
  {
    no: "01",
    title: (
      <>
        매매의 실질을
        <br />
        밝힙니다
      </>
    ),
    note: "취득자금 · 대금 반환 · 명의",
    body: "계약금과 잔금의 출처, 대금이 되돌아온 거래를 연결합니다. 집 자체의 증여인지, 매매 후 대금을 증여한 것인지 구분해 청구의 근거와 금액을 정합니다.",
    icon: "house",
  },
  {
    no: "02",
    title: (
      <>
        같은 송금도
        <br />
        다르게 다룹니다
      </>
    ),
    note: "증여 · 대여 · 부양의 보상",
    body: "차용증 유무에 그치지 않고 이자와 원금의 실제 상환을 확인합니다. 취득자금 지원인지 비용 정산인지, 특별한 부양의 보상인지에 따라 상속분에 반영할 금액을 구분합니다.",
    icon: "transfer",
  },
  {
    no: "03",
    title: (
      <>
        <span className="jg-st-mline">돌봄의 실제 부담을</span>{" "}
        <span className="jg-st-mline">입증합니다</span>
      </>
    ),
    note: "직접 간병 · 비용 분담 · 기존 보상",
    body: "부모님 재산에서 지출한 비용과 의뢰인이 부담한 돈을 나눕니다. 간병인과 다른 가족이 맡은 시간을 제외한 돌봄, 이미 받은 보상을 확인해 기여의 범위를 입증합니다.",
    icon: "care",
  },
  {
    no: "04",
    title: (
      <>
        상대방의 계산도
        <br />
        다시 풉니다
      </>
    ),
    note: "증여 누락 · 중복 산입 · 평가 시점",
    body: "상대방이 받은 증여는 빠져 있지 않은지, 같은 돈을 여러 번 계산하지는 않았는지 확인합니다. 증여재산과 분할재산의 평가 시점을 구분하고, 과도하게 산정된 청구액을 다툽니다.",
    icon: "calc",
  },
  {
    no: "05",
    title: "받을 몫과 지급 조건을 설계합니다",
    note: "인정 범위 · 현금 정산 · 지급 담보",
    body: "특별수익과 기여분의 인정 범위에 따라 실제 취득액을 비교합니다. 부동산을 보유할지 현금으로 정산할지 정하고, 지급 기한·담보·등기 이전 시기까지 협의안에 담습니다.",
    icon: "terms",
  },
];

const STRATEGY_ICONS = {
  house: Home,
  transfer: ArrowLeftRight,
  care: HeartHandshake,
  calc: Calculator,
  terms: FileText,
  speech: MessageSquare,
  scale: Scale,
  phone: Smartphone,
  banknote: Banknote,
  refresh: RefreshCw,
  landmark: Landmark,
  handshake: Handshake,
  search: Search,
  users: Users,
  layers: Layers,
  filecheck: FileCheck,
  scroll: ScrollText,
  calendar: CalendarClock,
  gavel: Gavel,
  video: Video,
  stethoscope: Stethoscope,
  car: Car,
} as const;

function StrategyGlyph({ icon }: { icon: StrategyIcon }) {
  const Icon = STRATEGY_ICONS[icon];
  return (
    <span className="jg-st-icon" aria-hidden>
      <Icon size={20} strokeWidth={1.75} color="#171717" />
    </span>
  );
}

const DEFAULT_STRATEGY_TITLE: readonly TitleLine[] = [
  ["재산", "하나,"],
  ["송금", "한", "건,"],
  [
    { text: "부양의", color: "#5DC39B" },
    { text: "시간", color: "#5DC39B", glue: true },
    "까지.",
  ],
];

export function PracticeStrategySection({
  ariaLabel = "재산 하나, 송금 한 건, 부양의 시간까지.",
  titleLines = DEFAULT_STRATEGY_TITLE,
  lead,
  steps = STEPS,
  close,
}: {
  ariaLabel?: string;
  titleLines?: readonly TitleLine[];
  lead?: ReactNode;
  steps?: readonly StrategyStep[];
  close?: ReactNode;
} = {}) {
  const closeNode =
    close === undefined ? (
      <>
        청구할 때도, 청구받았을 때도,
        <br />
        재산의 성격과 계산의 근거부터 따집니다.
      </>
    ) : (
      close
    );

  return (
    <section className="jg-st" aria-label={ariaLabel}>
      <div className="jg-st-intro">
        <div>
          <InViewSectionTitle
            className="jg-st-title"
            ariaLabel={ariaLabel}
            lines={titleLines}
          />
        </div>
        {lead ?? (
          <p className="jg-st-lead">
            매매로 넘긴 집의 대금이 다시 돌아왔다면, 등기만으로 거래를 판단할 수 없습니다. <br className="jg-st-br" />
            이로운은 취득자금과 대금의 반환, 돌봄에 대한 보상까지 확인해 청구할 재산과 방어할 재산의 근거를 구분합니다.
          </p>
        )}
      </div>
      <div className="jg-st-grid">
        {steps.map((step) => (
          <article className="jg-st-item" key={step.no}>
            {step.icon ? <StrategyGlyph icon={step.icon} /> : <p className="jg-st-no">{step.no}</p>}
            <h3>{step.title}</h3>
            <p className="jg-st-note">{step.note}</p>
            {step.body ? <p className="jg-st-body">{step.body}</p> : null}
          </article>
        ))}
      </div>
      {closeNode ? <p className="jg-st-close">{closeNode}</p> : null}
    </section>
  );
}
