import React, { useMemo, useState } from "react";

const T = (en, zh) => ({ en, zh });

const theme = {
  bg: "#FCFAF2",
  paper: "#F7F2E7",
  ink: "#1F2933",
  muted: "#5B6570",
  line: "#D8CFC0",
  teal: "#2E5C6E",
  plum: "#622954",
  moss: "#5E6B4C",
  amber: "#9C6B2F",
  softTeal: "#E8F0F1",
  softPlum: "#F3EBF1",
  softMoss: "#EEF1E7",
  softAmber: "#F6EFE5",
  softRose: "#F7ECEB",
  rose: "#9B5C54",
};

const iconPaths = {
  compass: ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z", "m15.5 8.5-2.2 6.2-6.2 2.2 2.2-6.2 6.2-2.2Z"],
  layers: ["M12 3 3 8l9 5 9-5-9-5Z", "m3 12 9 5 9-5", "m3 16 9 5 9-5"],
  bolt: ["M13 2 4 14h6l-1 8 9-12h-6l1-8Z"],
  bridge: ["M4 18h16", "M6 18v-4m4 4v-6m4 6v-6m4 6v-4", "M5 10c2.5-2 4.833-3 7-3s4.5 1 7 3"],
  loop: ["M4 7h10a4 4 0 1 1 0 8H8", "m10-4 4-4-4-4", "m-4 16-4-4 4-4"],
  shield: ["M12 3 5 6v5c0 5 3.5 8.5 7 10 3.5-1.5 7-5 7-10V6l-7-3Z", "m9.5 9-8 8", "m9-1.5-9 9"],
  people: ["M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M10 7a4 4 0 1 0 0 .01", "M20 21v-2a4 4 0 0 0-3-3.87", "M14 3.13a4 4 0 0 1 0 7.75"],
  chart: ["M4 19h16", "M7 16V9", "M12 16V5", "M17 16v-7"],
  target: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z", "M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"],
  checklist: ["M9 6h11", "M9 12h11", "M9 18h11", "m3 6 1.5 1.5L7 5", "m-4 7 1.5 1.5L7 12", "m-4 6 1.5 1.5L7 18"],
  building: ["M4 21V5l8-2v18", "M12 21h8V9l-8-2", "M7 8h1m-1 4h1m-1 4h1m7-8h1m-1 4h1m-1 4h1", "M10 21v-4h4v4"],
  eye: ["M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"],
  book: ["M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z", "M8 7h8", "M8 11h8", "M8 15h6"],
  arrows: ["M5 12h14", "m13-4 4 4-4 4"],
  warning: ["M12 3 2.5 20h19L12 3Z", "M12 9v5", "M12 17h.01"],
};

function Icon({ name, size = 20, stroke = theme.ink, className = "" }) {
  const paths = iconPaths[name] || [];
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <path key={`${name}-${i}`} d={d} />
      ))}
    </svg>
  );
}

function LangText({ text, mode = "en", className = "", as = "span" }) {
  const Tag = as;
  if (text == null) return null;
  if (typeof text === "string") return <Tag className={className}>{text}</Tag>;
  if (mode === "en") return <Tag className={className}>{text.en}</Tag>;
  if (mode === "zh") return <Tag className={className}>{text.zh}</Tag>;
  return (
    <Tag className={className}>
      <span className="lang-en">{text.en}</span>
      <span className="lang-zh">{text.zh}</span>
    </Tag>
  );
}

function Badge({ children, tone = "neutral" }) {
  return <span className={`si-badge si-badge-${tone}`}>{children}</span>;
}

function SectionTitle({ eyebrow, title, body, mode, icon }) {
  return (
    <div className="si-section-head">
      <div className="si-section-title-row">
        <div className="si-icon-wrap">
          <Icon name={icon} size={18} stroke={theme.teal} />
        </div>
        <div>
          <div className="si-eyebrow">{eyebrow}</div>
          <h2 className="si-h2">
            <LangText text={title} mode={mode} />
          </h2>
        </div>
      </div>
      {body ? <p className="si-lead"><LangText text={body} mode={mode} /></p> : null}
    </div>
  );
}

const summaryCards = [
  {
    value: "6",
    label: T("firm-level drivers beyond SPARK", "SPARK 之外的公司層級驅動因素"),
    tone: "teal",
  },
  {
    value: "4",
    label: T("moves in the implementation loop", "執行循環的四個主要動作"),
    tone: "plum",
  },
  {
    value: "3",
    label: T("classic failure formulas to remember", "要記住的三種典型失能公式"),
    tone: "moss",
  },
  {
    value: "1",
    label: T("core test: can the organization carry the strategy?", "核心測試：組織是否真能承載策略？"),
    tone: "amber",
  },
];

const coreDrivers = [
  {
    icon: "compass",
    title: T("Leadership", "領導力"),
    body: T(
      "Direction, motivation, tone, standards, and the external face of the firm.",
      "方向、激勵、基調、標準，以及企業對外的代表性。"
    ),
    ask: T("Is leadership pointed in a strategically coherent direction?", "領導力是否被指向一個策略上融貫的方向？"),
    tone: "teal",
  },
  {
    icon: "bolt",
    title: T("Execution", "執行"),
    body: T(
      "Knowing what to do, overcoming inertia, and getting the right things done in the organization.",
      "知道該做甚麼、克服慣性，並在組織中把正確的事做成。"
    ),
    ask: T(
      "How large is the gap between strategic intent and actual organizational behavior?",
      "策略意圖與實際組織行為之間的落差有多大？"
    ),
    tone: "plum",
  },
  {
    icon: "people",
    title: T("Organization and management", "組織與管理"),
    body: T(
      "Division of labor, structures, systems, decision rights, human resources, and firm-level capabilities.",
      "分工、結構、系統、決策權、人力資源，以及公司層級能力。"
    ),
    ask: T("What must change in structure, process, and capability to carry the strategy?", "要承載策略，結構、流程與能力需要改甚麼？"),
    tone: "moss",
  },
  {
    icon: "shield",
    title: T("Governance", "治理"),
    body: T(
      "Governance standards, compliance costs, and the effect of control systems on strategy and decision making.",
      "治理標準、合規成本，以及控制系統對策略與決策的影響。"
    ),
    ask: T("Do control and oversight systems support the strategy or undermine it?", "控制與監督系統是在支撐策略，還是在削弱策略？"),
    tone: "amber",
  },
  {
    icon: "building",
    title: T("Firm-level policies", "企業層級政策"),
    body: T(
      "Subsidies, state support, preferences, and other policies targeted at the specific firm.",
      "補貼、國家支持、優惠安排，以及針對個別企業的其他政策。"
    ),
    ask: T("What special supports or constraints shape implementation?", "有哪些特殊支持或限制會影響執行？"),
    tone: "teal",
  },
  {
    icon: "book",
    title: T("Firm-level institutions", "企業層級制度"),
    body: T(
      "Corporate universities, foundations, affiliated entities, and other firm-created institutions.",
      "企業大學、基金會、附屬實體，以及其他由企業建立的制度。"
    ),
    ask: T("What institutional infrastructure makes execution easier or harder?", "哪些制度性基礎設施會讓執行變容易或變困難？"),
    tone: "plum",
  },
];

const dysfunctions = [
  {
    title: T("Analysis + leadership, without action", "有分析有領導，沒有行動"),
    result: T("Paralysis", "癱瘓"),
    tone: "plum",
  },
  {
    title: T("Action + leadership, without analysis", "有行動有領導，沒有分析"),
    result: T("Misdirected", "方向錯誤"),
    tone: "amber",
  },
  {
    title: T("Analysis + action, without leadership", "有分析有行動，沒有領導"),
    result: T("Scattered and confused", "分散且混亂"),
    tone: "rose",
  },
];

const ceoRoles = [
  T("Strategy setting", "策略制定"),
  T("Decision making under uncertainty", "在不確定下做決策"),
  T("Mentorship and succession", "培育接班與管理團隊"),
  T("Public face in good times and bad", "在順境與危機中作為企業公眾面孔"),
  T("Setting standards and ethics", "設定標準與倫理基調"),
  T("Handling public opinion and scrutiny", "面對公眾審視與輿論壓力"),
];

const processSteps = [
  {
    title: T("Analysis and diagnosis", "分析與診斷"),
    body: T("Understand present performance, external conditions, internal reality, and what is changing.", "理解目前績效、外部條件、內部現實，以及正在發生的變化。"),
  },
  {
    title: T("Formulation and decision", "制定與決策"),
    body: T("Choose a direction that fits opportunities, constraints, capabilities, and likely change.", "選擇一個能對上機會、限制、能力與可能變化的方向。"),
  },
  {
    title: T("Deployment, implementation, execution", "部署、實施、執行"),
    body: T("Translate the choice into owners, sequence, systems, budgets, and day-to-day behavior.", "把選擇轉成負責人、先後順序、系統、預算與日常行為。"),
  },
  {
    title: T("Monitoring, assessment, adjustment", "監測、評估、調整"),
    body: T("Measure results, review assumptions, and adjust when facts move.", "衡量結果、檢視假設，並在事實改變時調整。"),
  },
];

const missingPieces = [
  {
    title: T("Do not stop at the recommendation", "不要停在建議本身"),
    body: T("A recommendation is incomplete until the organization can actually carry it.", "只要組織還無法真正承載，一個建議就還沒有完成。"),
  },
  {
    title: T("Control is not a back-office detail", "管控不是後台瑣事"),
    body: T("Budgeting and control are the transmission mechanism from strategy to operating targets.", "預算與管控是把策略傳到營運目標的傳導機制。"),
  },
  {
    title: T("Governance is performance-relevant", "治理直接影響績效"),
    body: T("Governance failure is often implementation failure in disguise.", "治理失敗常常只是換了名字的執行失敗。"),
  },
  {
    title: T("Implementation is a loop, not a launch", "執行是循環，不是一次發射"),
    body: T("Monitoring and adjustment belong inside the process, not after it.", "監測與調整本來就屬於流程內部，不是事後補件。"),
  },
];

const caseAnchors = [
  {
    brand: "NEC",
    partner: "GTE",
    title: T("Strategic architecture versus fragmented execution", "策略架構對比分散執行"),
    points: [
      T("NEC used a clearly communicated C&C architecture to coordinate competence building across the firm.", "NEC 以清楚傳達的 C&C 架構，協調整個企業的能力建構。"),
      T("GTE lacked a commonly accepted view of required competencies, and decentralization weakened focus.", "GTE 缺乏對所需能力的共同理解，分權也削弱了焦點。"),
      T("The lesson is not abstract vision alone. It is whether the vision organizes capability acquisition and daily decisions.", "重點不只是抽象願景，而是願景是否能組織能力取得與日常決策。"),
    ],
    tone: "teal",
  },
  {
    brand: "P&G",
    partner: "China",
    title: T("Strategy turned into operating architecture", "策略如何轉成營運架構"),
    points: [
      T("Brand portfolio choices, manufacturing footprint shifts, distributor development, and digital channel moves all count as implementation.", "品牌組合選擇、製造布局移動、通路培養、數位渠道布局，全部都屬於執行。"),
      T("P&G helped build suppliers, distributors, category understanding, and local managerial depth in China.", "P&G 在中國協助建立供應商、經銷體系、品類教育與本地管理深度。"),
      T("The lesson is that execution often looks like supply chain design, channel design, talent design, and local adaptation.", "重點是，執行常常具體表現在供應鏈設計、渠道設計、人才設計與在地化調整。"),
    ],
    tone: "plum",
  },
  {
    brand: "Gov.",
    partner: "Failure",
    title: T("When control systems do not support strategy", "當控制系統撐不住策略"),
    points: [
      T("The course repeatedly uses governance-failure firms as a caution set rather than trivia.", "課程反覆使用治理失敗企業，不是冷知識，而是警示集合。"),
      T("If behavior cannot be monitored, risk cannot be checked, and standards cannot be held, formal strategy may collapse.", "若行為無法監測、風險無法控制、標準無法維持，再好的正式策略也可能崩塌。"),
      T("Implementation quality includes discipline, not only momentum.", "執行品質不只包含推進速度，也包含紀律。"),
    ],
    tone: "moss",
  },
];

const longCaseChecklist = [
  {
    key: T("Owner", "負責人"),
    ask: T("Who is accountable for each major move?", "每一個主要動作由誰負責？"),
  },
  {
    key: T("Sequence", "順序"),
    ask: T("What must happen first, second, and later?", "哪些事情要先做、後做、再做？"),
  },
  {
    key: T("Capabilities", "所需能力"),
    ask: T("What must the organization be able to do well?", "組織必須具備哪些關鍵能力？"),
  },
  {
    key: T("Structure", "結構"),
    ask: T("What reporting lines, decision rights, or coordination routines must change?", "匯報線、決策權或協調機制需要怎麼改？"),
  },
  {
    key: T("Budget and control", "預算與管控"),
    ask: T("How will resources, targets, and operating review be aligned with the strategy?", "資源、目標與營運檢討如何與策略對齊？"),
  },
  {
    key: T("KPIs", "關鍵績效指標"),
    ask: T("How will management know implementation is working?", "管理層如何知道執行真的在運作？"),
  },
  {
    key: T("Review triggers", "檢討觸發點"),
    ask: T("What facts would force reassessment and adjustment?", "哪些事實一旦出現，就必須重估與調整？"),
  },
];

const evidenceLadder = [
  {
    tier: "Tier 1",
    label: T("High-confidence course core", "高信心度課程主體"),
    items: T(
      "Session 1 on strategy as more than the big picture, Chapter 2 on budgeting and control, Chapter 3 on firm-level drivers beyond SPARK, and the cyclical strategy process.",
      "Session 1 對策略不只是 big picture 的定義、第二章對預算與管控的強調、第三章對 SPARK 之外公司層級驅動因素的鋪陳，以及循環式策略流程。"
    ),
  },
  {
    tier: "Tier 2",
    label: T("Strong case anchors", "高可用性的案例錨點"),
    items: T(
      "NEC versus GTE, P&G in China, CEO role contrasts, and governance-failure caution cases.",
      "NEC 對 GTE、P&G 中國、CEO 角色對比，以及治理失敗警示案例。"
    ),
  },
  {
    tier: "Tier 3",
    label: T("Use carefully as deepening material", "可用來深化，但要審慎"),
    items: T(
      "Supplementary control-system language and broader recurring examples that help interpretation but are not the primary anchor for this page.",
      "補充性的控制系統語言與更廣泛的反覆案例，可幫助詮釋，但不是本頁的第一主錨。"
    ),
  },
];

const sources = [
  "Session 1: The Course, slides on strategy, implementation, cases, and the basic strategy process.",
  "Strategy for the Real World, Chapter 2: Drivers of Firm Performance.",
  "Strategy for the Real World, Chapter 3: Firm Level Drivers and the Basics of Strategy.",
  "Current Session 13 prep draft supplied in this workspace.",
  "NEC/GTE case exhibits and P&G in China case materials used as case anchors.",
];

function ToneCard({ tone = "teal", children, className = "" }) {
  return <div className={`si-card si-tone-${tone} ${className}`}>{children}</div>;
}

function StrategyProcessDiagram({ mode }) {
  return (
    <div className="si-process-wrap">
      {processSteps.map((step, index) => (
        <React.Fragment key={step.title.en}>
          <div className="si-process-step">
            <div className="si-process-index">0{index + 1}</div>
            <h3 className="si-h4"><LangText text={step.title} mode={mode} /></h3>
            <p className="si-body"><LangText text={step.body} mode={mode} /></p>
          </div>
          {index < processSteps.length - 1 ? (
            <div className="si-process-arrow" aria-hidden="true">
              <Icon name="arrows" size={18} stroke={theme.plum} />
            </div>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
}

function ControlFlow({ mode }) {
  const items = [
    T("Strategy choice", "策略選擇"),
    T("Budget and control system", "預算與管控系統"),
    T("Concrete operating targets", "具體營運目標"),
    T("Measurement and review", "衡量與檢討"),
    T("Adjustment", "調整"),
  ];
  return (
    <div className="si-flow-row">
      {items.map((item, index) => (
        <React.Fragment key={item.en}>
          <div className="si-flow-pill"><LangText text={item} mode={mode} /></div>
          {index < items.length - 1 ? <div className="si-flow-line" /> : null}
        </React.Fragment>
      ))}
    </div>
  );
}

function BridgeDiagram({ mode }) {
  return (
    <div className="si-bridge-card">
      <div className="si-bridge-side">
        <div className="si-bridge-label"><LangText text={T("Strategic intent", "策略意圖")} mode={mode} /></div>
        <p className="si-body"><LangText text={T("What leadership says the firm should do.", "領導層認為企業應該做的事。") } mode={mode} /></p>
      </div>
      <div className="si-bridge-center">
        <Icon name="bridge" size={26} stroke={theme.teal} />
        <div className="si-bridge-text"><LangText text={T("Management system", "管理系統")} mode={mode} /></div>
      </div>
      <div className="si-bridge-side">
        <div className="si-bridge-label"><LangText text={T("Actual behavior", "實際行為")} mode={mode} /></div>
        <p className="si-body"><LangText text={T("What people, budgets, structures, and routines really produce.", "人員、預算、結構與例行機制實際產生的結果。") } mode={mode} /></p>
      </div>
    </div>
  );
}

function BrandBadge({ left, right, tone }) {
  return (
    <div className={`si-brand-badge si-tone-${tone}`}>
      <span>{left}</span>
      {right ? <><span className="si-brand-sep">•</span><span>{right}</span></> : null}
    </div>
  );
}

export default function StrategyImplementationInfrastructure() {
  const [mode, setMode] = useState("en");

  const nav = useMemo(
    () => [
      { id: "overview", label: T("Overview", "總覽") },
      { id: "core", label: T("Core drivers", "核心驅動因素") },
      { id: "loop", label: T("Process loop", "流程循環") },
      { id: "control", label: T("Control system", "管控系統") },
      { id: "cases", label: T("Case anchors", "案例錨點") },
      { id: "application", label: T("Case application", "長案應用") },
      { id: "evidence", label: T("Evidence ladder", "證據階梯") },
    ],
    []
  );

  return (
    <div className="si-root">
      <style>{`
        :root {
          color-scheme: light;
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        .si-root {
          --bg: ${theme.bg};
          --paper: ${theme.paper};
          --ink: ${theme.ink};
          --muted: ${theme.muted};
          --line: ${theme.line};
          --teal: ${theme.teal};
          --plum: ${theme.plum};
          --moss: ${theme.moss};
          --amber: ${theme.amber};
          --rose: ${theme.rose};
          --soft-teal: ${theme.softTeal};
          --soft-plum: ${theme.softPlum};
          --soft-moss: ${theme.softMoss};
          --soft-amber: ${theme.softAmber};
          --soft-rose: ${theme.softRose};
          min-height: 100vh;
          background: var(--bg);
          color: var(--ink);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          line-height: 1.55;
        }
        .si-root a { color: inherit; text-decoration: none; }
        .si-shell {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
          padding: 20px 0 120px;
        }
        .si-hero {
          border: 1px solid var(--line);
          background: rgba(255,255,255,0.34);
          padding: 24px;
        }
        .si-topbar {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 14px;
        }
        .si-course-meta {
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .si-fab-switch {
          position: fixed;
          right: max(14px, env(safe-area-inset-right));
          bottom: max(14px, env(safe-area-inset-bottom));
          z-index: 40;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px;
          border: 1px solid rgba(91, 101, 112, 0.18);
          background: rgba(247, 242, 231, 0.92);
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 24px rgba(31, 41, 51, 0.08);
        }
        .si-fab-switch button {
          width: 32px;
          height: 32px;
          border: 0;
          background: transparent;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          color: var(--muted);
        }
        .si-fab-switch button.si-active {
          background: var(--teal);
          color: #fff;
        }
        .si-title {
          margin: 0;
          font-family: "Source Serif 4", Georgia, "Times New Roman", serif;
          font-size: clamp(30px, 4vw, 52px);
          line-height: 1.04;
          letter-spacing: -0.02em;
          max-width: 10.5ch;
        }
        .si-subtitle {
          margin: 10px 0 0;
          max-width: 68ch;
          color: var(--muted);
          font-size: 15.5px;
          line-height: 1.65;
        }
        .si-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(300px, 0.95fr);
          gap: 24px;
          margin-top: 22px;
        }
        .si-hero-copy {
          display: grid;
          gap: 14px;
          min-width: 0;
        }
        .si-callout {
          border-left: 4px solid var(--plum);
          padding-left: 14px;
          margin: 0;
          font-size: 17px;
          line-height: 1.6;
          max-width: 56ch;
        }
        .si-callout strong { color: var(--plum); }
        .si-summary-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          min-width: 0;
        }
        .si-summary-card {
          border: 1px solid var(--line);
          padding: 12px;
          min-height: 96px;
          display: grid;
          align-content: start;
          gap: 6px;
          min-width: 0;
        }
        .si-summary-card.si-tone-teal { background: var(--soft-teal); }
        .si-summary-card.si-tone-plum { background: var(--soft-plum); }
        .si-summary-card.si-tone-moss { background: var(--soft-moss); }
        .si-summary-card.si-tone-amber { background: var(--soft-amber); }
        .si-summary-value {
          font-family: "Source Serif 4", Georgia, serif;
          font-size: 32px;
          line-height: 1;
        }
        .si-summary-label {
          font-size: 12px;
          line-height: 1.5;
          color: var(--muted);
          overflow-wrap: anywhere;
        }
        .si-sticky {
          position: sticky;
          top: 0;
          z-index: 25;
          background: rgba(252, 250, 242, 0.94);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--line);
          margin-top: 16px;
        }
        .si-sticky-inner {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
          padding: 8px 0;
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .si-sticky-inner::-webkit-scrollbar { display: none; }
        .si-nav-link {
          white-space: nowrap;
          border: 1px solid var(--line);
          padding: 6px 10px;
          background: rgba(255,255,255,0.56);
          font-size: 12px;
          line-height: 1.2;
        }
        .si-content {
          display: grid;
          gap: 18px;
          margin-top: 18px;
        }
        .si-section {
          border: 1px solid var(--line);
          background: rgba(255,255,255,0.38);
          padding: 20px;
          scroll-margin-top: 64px;
          min-width: 0;
        }
        .si-section-head {
          margin-bottom: 16px;
          max-width: 72ch;
        }
        .si-section-title-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .si-icon-wrap {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--line);
          background: var(--soft-teal);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .si-eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 11px;
          color: var(--muted);
          margin-bottom: 4px;
        }
        .si-h2 {
          margin: 0;
          font-size: clamp(21px, 2.1vw, 30px);
          line-height: 1.16;
          font-family: "Source Serif 4", Georgia, serif;
        }
        .si-h3 {
          margin: 0;
          font-size: 18px;
          line-height: 1.25;
          font-family: "Source Serif 4", Georgia, serif;
          overflow-wrap: anywhere;
        }
        .si-h4 {
          margin: 0;
          font-size: 16px;
          line-height: 1.28;
          font-family: "Source Serif 4", Georgia, serif;
          overflow-wrap: anywhere;
        }
        .si-lead,
        .si-body,
        .si-bullets li,
        .si-table,
        .si-table td,
        .si-table th,
        .si-small {
          color: var(--muted);
          overflow-wrap: anywhere;
          word-break: normal;
          hyphens: auto;
        }
        .si-body,
        .si-bullets li,
        .si-table,
        .si-small {
          font-size: 14.5px;
          line-height: 1.65;
        }
        .si-lead {
          margin: 10px 0 0;
          max-width: 68ch;
          font-size: 15px;
          line-height: 1.68;
        }
        .si-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
        .si-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
        .si-grid-4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
        .si-card {
          border: 1px solid var(--line);
          padding: 14px;
          background: rgba(255,255,255,0.52);
          min-width: 0;
        }
        .si-tone-teal { background: var(--soft-teal); }
        .si-tone-plum { background: var(--soft-plum); }
        .si-tone-moss { background: var(--soft-moss); }
        .si-tone-amber { background: var(--soft-amber); }
        .si-tone-rose { background: var(--soft-rose); }
        .si-driver-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 10px;
          min-width: 0;
        }
        .si-driver-icon {
          width: 34px;
          height: 34px;
          border: 1px solid var(--line);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.72);
        }
        .si-ask {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px dashed var(--line);
          font-size: 13px;
        }
        .si-process-wrap {
          display: grid;
          grid-template-columns: repeat(7, auto);
          align-items: stretch;
          gap: 10px;
        }
        .si-process-step {
          min-width: 0;
          border: 1px solid var(--line);
          padding: 12px;
          background: rgba(255,255,255,0.54);
        }
        .si-process-index {
          font-size: 12px;
          color: var(--plum);
          margin-bottom: 8px;
          letter-spacing: 0.08em;
        }
        .si-process-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 24px;
        }
        .si-flow-row {
          display: grid;
          grid-template-columns: repeat(9, auto);
          align-items: center;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .si-flow-pill {
          border: 1px solid var(--line);
          padding: 10px 12px;
          background: rgba(255,255,255,0.68);
          white-space: nowrap;
        }
        .si-flow-line {
          width: 24px;
          height: 1px;
          background: var(--plum);
        }
        .si-bridge-card {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 220px minmax(0, 1fr);
          gap: 14px;
          align-items: stretch;
        }
        .si-bridge-side,
        .si-bridge-center {
          border: 1px solid var(--line);
          padding: 16px;
          background: rgba(255,255,255,0.54);
        }
        .si-bridge-center {
          display: grid;
          place-items: center;
          text-align: center;
          background: var(--soft-teal);
        }
        .si-bridge-label {
          display: inline-block;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 8px;
        }
        .si-bridge-text { margin-top: 8px; font-weight: 600; }
        .si-failure-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
        .si-failure-title {
          font-size: 13.5px;
          line-height: 1.55;
          min-height: 46px;
          overflow-wrap: anywhere;
        }
        .si-failure-result {
          font-family: "Source Serif 4", Georgia, serif;
          font-size: 24px;
          line-height: 1.1;
          margin-top: 8px;
        }
        .si-badge {
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--line);
          padding: 4px 8px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          background: rgba(255,255,255,0.72);
        }
        .si-badge-teal { color: var(--teal); }
        .si-badge-plum { color: var(--plum); }
        .si-badge-moss { color: var(--moss); }
        .si-badge-amber { color: var(--amber); }
        .si-bullets { margin: 10px 0 0; padding-left: 18px; }
        .si-bullets li + li { margin-top: 8px; }
        .si-case-card { display: grid; gap: 12px; }
        .si-brand-badge {
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--line);
          padding: 5px 9px;
          font-weight: 700;
          letter-spacing: 0.04em;
          background: rgba(255,255,255,0.74);
          width: fit-content;
          max-width: 100%;
          overflow-wrap: anywhere;
        }
        .si-brand-sep { margin: 0 8px; color: var(--muted); }
        .si-table-wrap {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .si-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 560px;
          font-size: 13.5px;
          line-height: 1.55;
        }
        .si-table th,
        .si-table td {
          border: 1px solid var(--line);
          padding: 8px 10px;
          text-align: left;
          vertical-align: top;
          background: rgba(255,255,255,0.56);
        }
        .si-table th {
          background: var(--paper);
          color: var(--ink);
          font-weight: 700;
        }
        .si-ladder { display: grid; gap: 12px; }
        .si-ladder-row {
          display: grid;
          grid-template-columns: 120px minmax(0, 1fr);
          gap: 12px;
          align-items: start;
          border: 1px solid var(--line);
          padding: 14px;
          background: rgba(255,255,255,0.54);
        }
        .si-ladder-tier {
          font-family: "Source Serif 4", Georgia, serif;
          font-size: 22px;
        }
        .si-source-list {
          margin: 0;
          padding-left: 18px;
          display: grid;
          gap: 8px;
        }
        .si-mini-note {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          border: 1px dashed var(--line);
          padding: 12px;
          background: rgba(255,255,255,0.46);
          min-width: 0;
        }
        .si-mini-note svg { flex-shrink: 0; margin-top: 2px; }
        .si-lang-grid { display: grid; gap: 6px; }
        .lang-en,
        .lang-zh {
          display: block;
          min-width: 0;
        }
        .lang-zh { margin-top: 6px; color: var(--muted); }

        @media (max-width: 1100px) {
          .si-hero-grid,
          .si-grid-4,
          .si-grid-3,
          .si-grid-2,
          .si-bridge-card { grid-template-columns: 1fr 1fr; }
          .si-bridge-center { grid-column: 1 / -1; order: -1; }
          .si-summary-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .si-process-wrap { grid-template-columns: 1fr; }
          .si-process-arrow { display: none; }
          .si-flow-row { grid-template-columns: 1fr; }
          .si-flow-line { width: 1px; height: 14px; justify-self: center; }
          .si-ladder-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 820px) {
          .si-shell, .si-sticky-inner { width: min(100% - 24px, 1180px); }
          .si-hero { padding: 16px; }
          .si-section { padding: 16px; }
          .si-topbar { flex-direction: column; align-items: stretch; }
          .si-hero-grid,
          .si-grid-4,
          .si-grid-3,
          .si-grid-2,
          .si-summary-grid,
          .si-failure-grid,
          .si-bridge-card { grid-template-columns: 1fr; }
          .si-title { max-width: none; }
          .si-callout { font-size: 16px; max-width: none; }
          .si-bridge-center { order: 0; }
          .si-body,
          .si-bullets li,
          .si-table,
          .si-small { font-size: 14px; }
          .si-fab-switch button { width: 30px; height: 30px; }
        }
        @media (max-width: 560px) {
          .si-shell, .si-sticky-inner { width: min(100% - 20px, 1180px); }
          .si-content { gap: 14px; }
          .si-section { padding: 14px; }
          .si-summary-grid { grid-template-columns: 1fr; }
          .si-summary-card { min-height: 0; }
          .si-nav-link { padding: 6px 9px; font-size: 11px; }
          .si-table { min-width: 0; }
          .si-table th,
          .si-table td { padding: 7px 8px; }
        }
      `}</style>

      <div className="si-fab-switch" aria-label="Language mode switch">
        <button className={mode === "en" ? "si-active" : ""} onClick={() => setMode("en")} title="English">EN</button>
        <button className={mode === "zh" ? "si-active" : ""} onClick={() => setMode("zh")} title="中文">中</button>
        <button className={mode === "bi" ? "si-active" : ""} onClick={() => setMode("bi")} title="Bilingual">BI</button>
      </div>

      <div className="si-sticky">
        <div className="si-sticky-inner">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="si-nav-link">
              <LangText text={item.label} mode={mode} />
            </a>
          ))}
        </div>
      </div>

      <div className="si-shell">
        <header className="si-hero" id="top">
          <div className="si-topbar">
            <div>
              <div className="si-course-meta">STRT 6200 · Strategy Implementation · Professor Enright</div>
            </div>
          </div>

          <div className="si-hero-grid">
            <div className="si-hero-copy">
              <div>
                <h1 className="si-title">
                  <LangText
                    mode={mode}
                    text={T("Strategy Implementation", "策略執行" )}
                  />
                </h1>
                <p className="si-subtitle">
                  <LangText
                    mode={mode}
                    text={T(
                      "A reader-facing, evidence-tiered guide to what this session is really about, what most summaries miss, and how to carry the logic into long-case recommendations.",
                      "一份面向讀者、按證據層級整理的導覽，聚焦這堂課真正的主題、多數整理常漏掉的部分，以及如何把這套邏輯帶進長案建議。"
                    )}
                  />
                </p>
              </div>

              <p className="si-callout">
                <strong><LangText mode={mode} text={T("Core answer", "核心答案")} /></strong>{" "}
                <LangText
                  mode={mode}
                  text={T(
                    "A strategy is not complete when it sounds right. It is complete when the organization can carry it, control it, measure it, review it, and adjust it.",
                    "一個策略不是在它聽起來正確時就完成，而是在組織能夠承載它、控制它、衡量它、檢視它，並在必要時調整它時，才算完成。"
                  )}
                />
              </p>

              <div className="si-mini-note">
                <Icon name="warning" size={18} stroke={theme.rose} />
                <div className="si-body">
                  <LangText
                    mode={mode}
                    text={T(
                      "The major risk in this session is not weak analysis. It is incomplete strategy. Many people stop after the recommendation. Enright’s logic does not.",
                      "這堂的主要風險不是分析太弱，而是策略沒有做完。很多人會停在建議本身。Enright 的邏輯不會。"
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="si-summary-grid">
              {summaryCards.map((card) => (
                <div key={card.value + card.label.en} className={`si-summary-card si-tone-${card.tone}`}>
                  <div className="si-summary-value">{card.value}</div>
                  <div className="si-summary-label"><LangText text={card.label} mode={mode} /></div>
                </div>
              ))}
            </div>
          </div>
        </header>

        <main className="si-content">
          <section className="si-section" id="overview">
            <SectionTitle
              eyebrow="Session reading"
              title={T("What the session is really doing", "這堂課真正正在做的事")}
              body={T(
                "This session functions as the course’s return to the firm-level drivers beyond SPARK. It pulls the class from analysis alone into the problem of organizational carry-through.",
                "這堂課可以理解為課程重新拉回 SPARK 之外的公司層級驅動因素，把討論從單純分析，拉向組織如何把策略真正做出來。"
              )}
              mode={mode}
              icon="target"
            />

            <div className="si-grid-2">
              <ToneCard tone="teal">
                <Badge tone="teal">Core evidence</Badge>
                <h3 className="si-h3" style={{ marginTop: 10 }}>
                  <LangText text={T("Session 1 already set the standard", "Session 1 其實早已把標準講清楚")} mode={mode} />
                </h3>
                <ul className="si-bullets">
                  <li><LangText mode={mode} text={T("Strategy is not only the big picture. It also includes the detailed plans and processes that deploy and execute it.", "策略不只是 big picture，也包含讓它得以部署與執行的細部計畫與流程。")}/></li>
                  <li><LangText mode={mode} text={T("Doing strategy well includes knowing how to make strategy work inside the organization.", "把 strategy 做好，包含知道如何讓它在組織裡真正運作。")}/></li>
                  <li><LangText mode={mode} text={T("Cases are primary teaching vehicles, so implementation logic should be expected to show up through repeated cases, not only through lecture definitions.", "案例是主要教學載體，所以執行邏輯很可能透過反覆案例出現，而不只透過定義投影片出現。")}/></li>
                </ul>
              </ToneCard>

              <ToneCard tone="plum">
                <Badge tone="plum">Interpretive takeaway</Badge>
                <h3 className="si-h3" style={{ marginTop: 10 }}>
                  <LangText text={T("What most shallow summaries miss", "多數淺層整理最常漏掉的部分")} mode={mode} />
                </h3>
                <ul className="si-bullets">
                  <li><LangText mode={mode} text={T("Execution is not a motivational slogan. It is an organizational design problem.", "執行不是口號，而是組織設計問題。")}/></li>
                  <li><LangText mode={mode} text={T("Governance is not separate from implementation. It often determines whether implementation can survive contact with reality.", "治理和執行不是分開的。它往往決定執行能不能在現實中存活。")}/></li>
                  <li><LangText mode={mode} text={T("Budgeting and control belong inside strategy, not after strategy.", "預算與管控屬於 strategy 內部，不是 strategy 之後才補上的東西。")}/></li>
                </ul>
              </ToneCard>
            </div>
          </section>

          <section className="si-section" id="core">
            <SectionTitle
              eyebrow="Firm-level template"
              title={T("The company-level drivers beyond SPARK", "SPARK 之外的公司層級驅動因素")}
              body={T(
                "SPARK covers scope, positioning, activities, resources, and knowledge. This session’s center of gravity is the rest of the firm-level template.",
                "SPARK 涵蓋的是 scope、positioning、activities、resources、knowledge。這堂課的重心則是公司層級模板剩下的部分。"
              )}
              mode={mode}
              icon="layers"
            />

            <div className="si-grid-3">
              {coreDrivers.map((driver) => (
                <ToneCard key={driver.title.en} tone={driver.tone}>
                  <div className="si-driver-top">
                    <h3 className="si-h4"><LangText text={driver.title} mode={mode} /></h3>
                    <span className="si-driver-icon"><Icon name={driver.icon} size={18} stroke={theme.ink} /></span>
                  </div>
                  <p className="si-body"><LangText text={driver.body} mode={mode} /></p>
                  <p className="si-ask"><strong><LangText text={T("Reader question", "讀者應問")} mode={mode} />:</strong> <LangText text={driver.ask} mode={mode} /></p>
                </ToneCard>
              ))}
            </div>

            <div style={{ marginTop: 18 }}>
              <BridgeDiagram mode={mode} />
            </div>
          </section>

          <section className="si-section">
            <SectionTitle
              eyebrow="Failure logic"
              title={T("Three failure formulas worth remembering cold", "值得直接背下來的三種失能公式")}
              body={T(
                "The course’s warning is blunt. Strategy in the real world requires analysis, decisions, action, and leadership working together. Missing one creates a recognizable failure pattern.",
                "課程的提醒很直接。真實世界的策略需要分析、決策、行動與領導一起運作。少掉一項，就會形成可辨識的失能模式。"
              )}
              mode={mode}
              icon="warning"
            />

            <div className="si-failure-grid">
              {dysfunctions.map((item) => (
                <ToneCard key={item.title.en} tone={item.tone}>
                  <div className="si-failure-title"><LangText text={item.title} mode={mode} /></div>
                  <div className="si-failure-result"><LangText text={item.result} mode={mode} /></div>
                </ToneCard>
              ))}
            </div>

            <div className="si-mini-note" style={{ marginTop: 16 }}>
              <Icon name="chart" size={18} stroke={theme.amber} />
              <div className="si-body">
                <LangText
                  mode={mode}
                  text={T(
                    "The 95% question matters. If a 5% failure rate is acceptable in a high-stakes operating setting, what exactly are you accepting? This is why implementation rigor is framed as essential from day one.",
                    "95% 的問題很重要。若在高風險營運場景中，5% 的失敗率也算可接受，那你到底是在接受甚麼？這就是為甚麼課程從第一天就把執行嚴謹度視為必要條件。"
                  )}
                />
              </div>
            </div>
          </section>

          <section className="si-section" id="loop">
            <SectionTitle
              eyebrow="Strategy process"
              title={T("Implementation belongs inside a cycle", "執行屬於循環，不是流程尾端")}
              body={T(
                "The cleanest way to visualize the course logic is as a loop. Implementation is not the endpoint. Monitoring and adjustment are part of strategy, not optional aftercare.",
                "若要把課程邏輯視覺化，最清楚的方式是循環。執行不是終點。監測與調整本來就是 strategy 的一部分，不是事後保養。"
              )}
              mode={mode}
              icon="loop"
            />

            <StrategyProcessDiagram mode={mode} />
          </section>

          <section className="si-section" id="control">
            <SectionTitle
              eyebrow="Transmission mechanism"
              title={T("Budgeting and control are not side details", "預算與管控不是旁支細節")}
              body={T(
                "One of the most usable claims in the course is that budgeting and control should be the transmission mechanism that ties strategy to concrete targets managers are supposed to meet or beat.",
                "課程中最實用的一個主張，是預算與管控應該成為把策略連到管理者必須達成或超越之具體目標的傳導機制。"
              )}
              mode={mode}
              icon="checklist"
            />

            <ControlFlow mode={mode} />

            <div className="si-grid-2" style={{ marginTop: 18 }}>
              <ToneCard tone="amber">
                <Badge tone="amber">Why this matters</Badge>
                <ul className="si-bullets" style={{ marginTop: 10 }}>
                  <li><LangText mode={mode} text={T("Mechanical budgeting based only on last year’s numbers is not neutral. It can sever strategy from action.", "只按去年的數字機械編預算，並不是中性的。它可能直接切斷 strategy 與 action 的連結。")}/></li>
                  <li><LangText mode={mode} text={T("A strong strategy with a weak control system is still operationally weak.", "再好的策略，如果控制系統很弱，營運上仍然是弱的。")}/></li>
                  <li><LangText mode={mode} text={T("Control-system fit matters. Different businesses call for different control intensity and style.", "控制系統要講求契合度。不同事業需要不同強度與風格的控制。")}/></li>
                </ul>
              </ToneCard>

              <ToneCard tone="moss">
                <Badge tone="moss">What many summaries omit</Badge>
                <div className="si-grid-2" style={{ marginTop: 10 }}>
                  {missingPieces.map((item) => (
                    <div key={item.title.en} className="si-card">
                      <h3 className="si-h4"><LangText text={item.title} mode={mode} /></h3>
                      <p className="si-body" style={{ marginTop: 8 }}><LangText text={item.body} mode={mode} /></p>
                    </div>
                  ))}
                </div>
              </ToneCard>
            </div>
          </section>

          <section className="si-section">
            <SectionTitle
              eyebrow="Leadership and judgment"
              title={T("Why CEO roles matter here", "為甚麼 CEO 角色在這堂特別重要")}
              body={T(
                "Chapter 3 does not treat the CEO as a celebrity topic. It uses the CEO role to show that leadership without direction is dangerous, and direction without leadership is weak.",
                "第三章不是把 CEO 當成名人話題，而是用 CEO 角色來說明：沒有方向的領導很危險，沒有領導的方向也很脆弱。"
              )}
              mode={mode}
              icon="compass"
            />

            <div className="si-grid-2">
              <ToneCard tone="teal">
                <Badge tone="teal">Role set</Badge>
                <ul className="si-bullets" style={{ marginTop: 10 }}>
                  {ceoRoles.map((role) => (
                    <li key={role.en}><LangText text={role} mode={mode} /></li>
                  ))}
                </ul>
              </ToneCard>

              <ToneCard tone="plum">
                <Badge tone="plum">Plain-language lesson</Badge>
                <p className="si-body" style={{ marginTop: 10 }}>
                  <LangText
                    mode={mode}
                    text={T(
                      "The course is not asking whether leadership exists. It is asking whether leadership points the organization in the right direction, builds the right team, and holds the right standards while decisions are being made under uncertainty.",
                      "課程真正要問的，不是領導力有沒有存在，而是它有沒有把組織帶向正確方向、組成正確團隊，並在不確定下做決策時守住正確標準。"
                    )}
                  />
                </p>
              </ToneCard>
            </div>
          </section>

          <section className="si-section" id="cases">
            <SectionTitle
              eyebrow="Recurring case anchors"
              title={T("Cases that make implementation visible", "讓執行變得可見的案例錨點")}
              body={T(
                "Cases in this course are primary teaching vehicles, not decoration. These anchors are the cleanest way to see implementation in operating terms.",
                "這門課的案例是主要教學載體，不是裝飾。以下這些案例錨點，是看見執行如何落到營運層面的最清楚方式。"
              )}
              mode={mode}
              icon="eye"
            />

            <div className="si-grid-3">
              {caseAnchors.map((item) => (
                <ToneCard key={item.title.en} tone={item.tone} className="si-case-card">
                  <BrandBadge left={item.brand} right={item.partner} tone={item.tone} />
                  <h3 className="si-h4"><LangText text={item.title} mode={mode} /></h3>
                  <ul className="si-bullets" style={{ marginTop: 0 }}>
                    {item.points.map((point) => (
                      <li key={point.en}><LangText text={point} mode={mode} /></li>
                    ))}
                  </ul>
                </ToneCard>
              ))}
            </div>
          </section>

          <section className="si-section" id="application">
            <SectionTitle
              eyebrow="Long-case use"
              title={T("How to carry this into your own recommendations", "如何把這套邏輯帶進自己的建議")}
              body={T(
                "After every major recommendation, add the operational follow-through. That is how you prevent a smart answer from becoming an incomplete one.",
                "每一個重大建議後面，都要補上營運跟進。這就是避免一個聰明答案變成一個不完整答案的方法。"
              )}
              mode={mode}
              icon="bridge"
            />

            <div className="si-table-wrap">
              <table className="si-table">
                <thead>
                  <tr>
                    <th><LangText mode={mode} text={T("Element", "元素")} /></th>
                    <th><LangText mode={mode} text={T("Question to answer", "必答問題")} /></th>
                  </tr>
                </thead>
                <tbody>
                  {longCaseChecklist.map((row) => (
                    <tr key={row.key.en}>
                      <td><strong><LangText text={row.key} mode={mode} /></strong></td>
                      <td><LangText text={row.ask} mode={mode} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="si-section" id="evidence">
            <SectionTitle
              eyebrow="Accuracy discipline"
              title={T("What is core, what is anchor, and what should be used more carefully", "甚麼是主體、甚麼是錨點、甚麼需要更審慎使用")}
              body={T(
                "This page is built to separate verified course core from higher-order synthesis, so the reader can use it confidently without overclaiming.",
                "這一頁刻意把已驗證的課程主體與較高階的綜合整理分開，讓讀者能夠放心使用，同時避免過度主張。"
              )}
              mode={mode}
              icon="shield"
            />

            <div className="si-ladder">
              {evidenceLadder.map((row, i) => (
                <div key={row.tier} className="si-ladder-row">
                  <div className="si-ladder-tier">{row.tier}</div>
                  <div>
                    <h3 className="si-h4"><LangText text={row.label} mode={mode} /></h3>
                    <p className="si-body" style={{ marginTop: 8 }}><LangText text={row.items} mode={mode} /></p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="si-section">
            <SectionTitle
              eyebrow="Source grounding"
              title={T("Primary source base used to build this page", "本頁使用的主要來源基礎")}
              body={T(
                "The content structure here was built from the course files first, then tightened using the current Session 13 prep draft so that the page stays accurate without becoming thin.",
                "本頁的內容架構先以課程檔案為主，再用目前的 Session 13 備課稿補強，使它維持準確，同時不會過薄。"
              )}
              mode={mode}
              icon="book"
            />

            <ol className="si-source-list si-small">
              {sources.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
        </main>
      </div>
    </div>
  );
}
