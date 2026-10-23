"use client";

import { useState } from "react";
import { InViewSectionTitle } from "@/components/section-title-reveal";
import "./practice-affiliate.css";

const QUESTIONS = [
  {
    no: "01",
    q: "부모님 재산을 관리하던 형제가 제게는 내역을 알려주지 않아요.",
    a: "다른 형제의 설명만을 기다려야 하는 것은 아닙니다. 상속인 금융거래조회와 안심상속 원스톱서비스로 확인할 수 있는 재산과 채무부터 살핍니다. 과거 거래는 별도로 확인해야 하므로 부동산 처분 시점과 자금 이동을 연결해 추가 조회할 계좌와 기간을 특정합니다. 직접 확보하기 어려운 자료는 소송에서 법원을 통한 제출명령이나 사실조회가 필요한지 검토합니다. 처음부터 재산의 행방을 모두 밝혀 오실 필요는 없습니다.",
  },
  {
    no: "02",
    q: "형제는 생전에 집을 받았는데, 남은 재산은 똑같이 나누어야 하나요?",
    a: "반드시 같은 금액을 나누는 것은 아닙니다. 먼저 받은 집이 상속분을 미리 받은 재산인 ‘특별수익’이라면 남은 상속분을 계산할 때 반영합니다. 다만 집 자체를 증여받았는지, 취득자금만 지원받았는지, 특별한 부양의 대가로 받았는지에 따라 판단은 달라집니다. 등기 명의뿐 아니라 매매대금의 출처와 실제 지급, 재산을 이전한 경위를 확인해야 합니다. 그 결과에 따라 계산에 넣을 재산과 평가액을 정하고, 의뢰인의 몫이 어떻게 달라지는지 구체적인 금액으로 제시합니다.",
  },
  {
    no: "03",
    q: "오랫동안 부모님을 모신 시간은 상속에서 어떻게 인정받을 수 있을까요?",
    a: "함께 산 기간만으로 기여분이 정해지지는 않습니다. 부모님에게 필요했던 돌봄의 정도와 의뢰인이 실제로 맡은 역할, 다른 가족의 분담을 살핍니다. 병원비와 생활비도 부모님 재산에서 지출한 돈과 의뢰인이 부담한 돈을 구분합니다. 이미 받은 재산이 부양의 보상이었는지도 확인해, 보상된 부분과 추가로 주장할 부분을 구분합니다. 기록이 충분하지 않더라도 진료기록과 지출 내역, 가족 간 대화를 모아 통상적인 부양을 넘어선 기여를 입증할 근거를 찾습니다.",
  },
  {
    no: "04",
    q: "유언에 제 몫이 적은데, 그대로 받아들여야 하나요?",
    a: "유언이 있다는 이유만으로 그대로 받아들여야 하는 것은 아닙니다. 유언의 형식과 작성 당시의 판단능력을 확인하고, 작성 전후의 진료기록과 당시 관여한 사람들의 진술을 대조합니다. 유언이 유효하더라도 법이 보호하는 일정한 몫인 유류분이 침해되었는지 별도로 계산합니다. 이때에는 생전 증여와 채무, 의뢰인이 이미 받은 재산까지 살펴야 합니다. 상속개시 시점에 적용되는 법령과 청구 기한을 함께 검토해 유언의 효력을 다투는 동안 다른 권리행사를 놓치지 않도록 준비합니다.",
  },
  {
    no: "05",
    q: "돌아가신 뒤에야 알게 된 빚, 제가 정말 다 갚아야 하나요?",
    a: "뒤늦게 빚을 알았다고 해서 본인의 재산으로 모두 갚아야 한다고 단정할 수는 없습니다. 상속포기와 한정승인은 원칙적으로 상속개시와 자신이 상속인이 된 사실을 안 날부터 3개월 이내에 해야 합니다. 그 기한이 지났더라도 상속채무가 재산보다 많다는 사실을 중대한 과실 없이 뒤늦게 알았다면, 그 사실을 안 날부터 3개월 이내에 특별한정승인을 할 수 있습니다. 채무를 알게 된 날짜와 기존 재산조회, 이미 처분한 재산을 확인해 신청 가능성을 판단합니다. 지급명령이나 소장을 받았다면 별도의 대응 기한을 확인하고, 한정승인에 따른 책임제한도 재판에서 주장합니다.",
  },
] as const;

function splitAnswer(text: string) {
  const paragraph = text.indexOf("\n\n");
  const line = text.indexOf("\n");
  if (line >= 0 && line !== paragraph) {
    return {
      lead: text.slice(0, line).trim(),
      rest: text.slice(line + 1).trim(),
    };
  }
  const period = text.indexOf(".");
  if (period < 0) return { lead: text, rest: "" };
  return {
    lead: text.slice(0, period + 1),
    rest: text.slice(period + 1).trim(),
  };
}

function AnswerToggle({
  text,
  onOpenChange,
}: {
  text: string;
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const { lead, rest } = splitAnswer(text);

  return (
    <>
      <button
        type="button"
        className="jg-aff-link"
        aria-expanded={open}
        onClick={() =>
          setOpen((value) => {
            const next = !value;
            onOpenChange?.(next);
            return next;
          })
        }
      >
        {lead}
      </button>
      {open && rest ? <p className="jg-aff-more">{rest}</p> : null}
    </>
  );
}

function QuestionText({ text }: { text: string }) {
  return text.split("\n").map((line, index) => (
    <span key={index}>
      {index > 0 ? <br /> : null}
      {line}
    </span>
  ));
}

function QuestionRow({ item }: { item: { no: string; q: string; a: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="jg-aff-list">
      <strong className="jg-aff-cat">{item.no}</strong>
      <ol className="jg-aff-items">
        <li>
          <p className={`jg-aff-desc jg-aff-q${open ? " is-active" : ""}`}>
            <QuestionText text={item.q} />
          </p>
          <AnswerToggle text={item.a} onOpenChange={setOpen} />
        </li>
      </ol>
    </div>
  );
}

export function QuestionRows({
  items,
}: {
  items: readonly { no: string; q: string; a: string }[];
}) {
  return (
    <>
      {items.map((item) => (
        <QuestionRow item={item} key={item.no} />
      ))}
    </>
  );
}

type PracticeTitleLine = readonly (
  | string
  | { text: string; color?: string; glue?: boolean }
)[];

/** Same affiliate-list structure, with the family questions in place of the company list. */
export function PracticeAffiliateSection({
  ariaLabel = "가족에게는 꺼내기 어려웠던 질문들.",
  titleLines = [
    ["가족에게는"],
    [
      { text: "꺼내기", color: "#5DC39B" },
      { text: "어려웠던", color: "#5DC39B" },
      "질문들.",
    ],
  ],
  mobileTitleLines,
  questions = QUESTIONS,
}: {
  ariaLabel?: string;
  titleLines?: readonly PracticeTitleLine[];
  mobileTitleLines?: readonly PracticeTitleLine[];
  questions?: readonly { no: string; q: string; a: string }[];
} = {}) {
  return (
    <section className="jg-aff" aria-label={ariaLabel}>
      <InViewSectionTitle
        className={mobileTitleLines ? "jg-aff-title jg-aff-title--desktop" : "jg-aff-title"}
        ariaLabel={ariaLabel}
        lines={titleLines}
      />
      {mobileTitleLines ? (
        <InViewSectionTitle
          className="jg-aff-title jg-aff-title--mobile"
          ariaLabel={ariaLabel}
          lines={mobileTitleLines}
        />
      ) : null}
      <div className="jg-aff-list is-top">
        <strong className="jg-aff-cat">{questions[0].no}</strong>
        <ol className="jg-aff-items">
          <li>
            <p className="jg-aff-desc jg-aff-q">
              <QuestionText text={questions[0].q} />
            </p>
            <AnswerToggle text={questions[0].a} />
          </li>
        </ol>
      </div>
      {questions.slice(1).map((item) => (
        <div className="jg-aff-list" key={item.no}>
          <strong className="jg-aff-cat">{item.no}</strong>
          <ol className="jg-aff-items">
            <li>
              <p className="jg-aff-desc jg-aff-q">
                <QuestionText text={item.q} />
              </p>
              <AnswerToggle text={item.a} />
            </li>
          </ol>
        </div>
      ))}
    </section>
  );
}
