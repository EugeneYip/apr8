import React, { useMemo, useState } from "react";

const T = (en, zh) => ({ en, zh });

const theme = {
  bg: "#FCFAF2",
  paper: "#F3F3F3",
  ink: "#2E5C6E",
  muted: "#5C6E74",
  line: "#CFC5B7",
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


const leadershipExamples = [
  {
    title: T("Positive role references", "正面角色參照"),
    body: T(
      "Chapter 3 uses names such as Gates, Walton, Welch, early Eisner, Bezos, Morita, Kobayashi, Li Ka-shing, Murdoch, and Murthy to show leadership with direction, coherence, and strategic force.",
      "第三章用 Gates、Walton、Welch、前期 Eisner、Bezos、Morita、小林宏治、李嘉誠、Murdoch、Murthy 等名字，說明有方向、有融貫性、也有策略推進力的領導。"
    ),
    tone: "teal",
  },
  {
    title: T("Negative role references", "反面角色參照"),
    body: T(
      "Lay and Skilling, Holmes, and late Eisner matter because the course is not asking whether leadership exists. It is asking whether leadership is disciplined, strategically coherent, and organizationally constructive.",
      "Lay 與 Skilling、Holmes、後期 Eisner 之所以重要，是因為課程不是在問領導力有沒有存在，而是在問它是否有紀律、是否策略上融貫、是否對組織具有建設性。"
    ),
    tone: "rose",
  },
  {
    title: T("The public-opinion test", "公眾審視測試"),
    body: T(
      "Even when no law has been broken, public scrutiny can damage business prospects. That makes the CEO’s public-face role part of implementation, not a side issue.",
      "即使沒有違法，公眾審視仍可能傷害商業前景。這代表 CEO 的公眾面孔角色本身就是執行的一部分，不是旁支話題。"
    ),
    tone: "amber",
  },
];

const leadershipMatrix = [
  {
    side: T("Positive references", "正面參照"),
    tone: "teal",
    names: ["Gates", "Walton", "Welch", "Eisner (early)", "Bezos", "Ollila", "Morita", "Kobayashi", "Li Ka-shing", "Murdoch", "Murthy"],
  },
  {
    side: T("Negative references", "反面參照"),
    tone: "rose",
    names: ["Lay", "Skilling", "Holmes", "Eisner (late)", "Kobayashi vulnerability"],
  },
];

const governanceFailureSet = [
  "Ahold", "Anglo-Irish Bank", "Arthur Andersen", "Barclays", "Barings", "BCCI", "Enron", "Tyco",
  "Olympus", "Parmalat", "Sanlu", "Satyam", "Swissair", "Vivendi", "Waste Management", "WorldCom", "Yukos",
];

const listeningFrame = [
  T("What strategy is actually being implemented?", "到底在執行哪一個策略？"),
  T("What organizational changes are required to carry it?", "組織要改甚麼才能承載它？"),
  T("Where will inertia, misalignment, or capability gaps show up?", "慣性、錯配、能力缺口最可能出現在哪裡？"),
  T("How will management know implementation is working?", "管理層如何知道執行是否在運作？"),
  T("What must change if the facts change?", "若事實改變，甚麼要一起調整？"),
];

const usageGuide = [
  {
    stage: T("Before class", "課前"),
    tone: "teal",
    body: T("Read the Decision, Tier 1 core, Tier 2 anchors, and the listening frame. That is enough.", "看核心判斷、第一層主體、第二層錨點，以及聽課框架。這樣就夠了。"),
  },
  {
    stage: T("During class", "課中"),
    tone: "plum",
    body: T("Do not try to transcribe everything. Track new framework terms, recurring cases, and how implementation is tied to long-case expectations.", "不要試圖逐字抄寫所有內容。聚焦新的框架術語、重現案例，以及教授如何把執行連到長案期待。"),
  },
  {
    stage: T("After class", "課後"),
    tone: "moss",
    body: T("Update the long-case outline immediately. Add an explicit implementation section and recheck whether structure, systems, incentives, governance, and review can carry the proposal.", "立刻更新長案大綱，補上一個明確的執行段落，並重新檢查結構、系統、誘因、治理與檢討流程是否真的能承載提案。"),
  },
];

const outOfScope = [
  T("Treating every case as equally likely to recur.", "把所有案例都視為同等機率重現。"),
  T("Replacing managerial logic with generic statements like ‘execution matters’ without substance.", "用『execution 很重要』這類沒有管理實質的空話代替邏輯。"),
  T("Confusing polished writing with complete strategy.", "把寫得漂亮誤當成策略已完整。"),
  T("Importing marketing-course frameworks from other classes.", "把其他課的行銷框架硬搬進來。"),
];

const recurringExamples = [
  { name: T("Disney: Eisner versus Iger", "Disney：Eisner 對 Iger"), use: T("Matched-pair contrast inside the same company", "同一家公司內的配對對比") },
  { name: T("ETA and Swatch Group", "ETA 與 Swatch Group"), use: T("Control, dependence, and implementation constraints", "控制、依賴與執行限制") },
  { name: T("Stitch Fix", "Stitch Fix"), use: T("Operating model and implementation discipline", "營運模式與執行紀律") },
  { name: T("Seiko", "Seiko"), use: T("Execution choices across product and brand scope", "跨產品與品牌範圍的執行選擇") },
  { name: T("Acer and Wistron", "Acer 與 Wistron"), use: T("Organizational redesign and strategic follow-through", "組織重設與策略後續落地") },
  { name: T("GAFAM and Microsoft", "GAFAM 與 Microsoft"), use: T("Scale, control, and organizational carrying capacity", "規模、控制與組織承載力") },
  { name: T("Newell", "Newell"), use: T("Positive implementation exemplar when used carefully", "審慎使用時的正向執行範例") },
];

const architectureClusters = [
  {
    icon: "compass",
    tone: "teal",
    title: T("Direction and leadership", "方向與領導"),
    body: T(
      "Implementation starts with a direction people can recognize, a decision logic management can defend, and leadership that can set tone and standards.",
      "執行的起點，是一個組織能辨識的方向、一套管理層能捍衛的決策邏輯，以及能設定基調與標準的領導。"
    ),
    points: [
      T("Leadership supplies direction, motivation, standards, and external credibility.", "領導力提供方向、激勵、標準，以及對外可信度。"),
      T("Senior management still has to do strategy setting and decision making under uncertainty.", "高階管理者仍必須做策略制定，以及在不確定下做決策。"),
      T("Succession and mentorship matter because execution depends on who carries the strategy next.", "接班與培育之所以重要，是因為執行取決於下一個承載策略的人是誰。"),
    ],
    chips: [T("Strategy setting", "策略制定"), T("Decision making", "決策"), T("Succession", "接班"), T("Standards", "標準")],
    ask: T("Can the organization see one direction, one decision logic, and one standard set?", "組織是否看得見同一個方向、同一套決策邏輯，以及同一組標準？"),
  },
  {
    icon: "bolt",
    tone: "plum",
    title: T("Delivery system", "交付系統"),
    body: T(
      "Execution is not whether people are busy. It is whether structure, decision rights, routines, and capabilities turn intent into repeated behavior.",
      "執行不在於大家忙不忙，而在於結構、決策權、例行機制與能力，能否把意圖轉成可重複的行為。"
    ),
    points: [
      T("Execution means knowing what to do, overcoming inertia, and getting the right things done.", "執行是知道該做甚麼、克服慣性，並把正確的事做成。"),
      T("Organization and management decide how labor is divided, how information moves, and who gets to decide.", "組織與管理決定分工方式、資訊如何流動，以及誰有決策權。"),
      T("Firm-level capabilities are built through systems, not through motivational language alone.", "公司層級能力是靠系統建立的，不是只靠激勵語言。"),
    ],
    chips: [T("Execution", "執行"), T("Structure", "結構"), T("Decision rights", "決策權"), T("Capabilities", "能力")],
    ask: T("How large is the gap between strategic intent and day-to-day behavior?", "策略意圖與日常行為之間的落差有多大？"),
  },
  {
    icon: "shield",
    tone: "moss",
    title: T("Control and institutional support", "控制與制度支撐"),
    body: T(
      "A strategy survives only if governance, policies, and firm-built institutions support it rather than quietly working against it.",
      "一個策略能否存活，取決於治理、政策與企業自建制度是在支撐它，還是在暗中抵消它。"
    ),
    points: [
      T("Governance shapes oversight, compliance burden, and the quality of strategic control.", "治理影響監督方式、合規負擔，以及策略控制品質。"),
      T("Firm-specific policies can create support, preference, or constraint around implementation.", "企業特定政策可能為執行帶來支持、偏好或限制。"),
      T("Firm-built institutions such as corporate universities or affiliated entities can make execution easier to scale.", "像企業大學或附屬機構這類企業自建制度，能讓執行更容易擴大。"),
    ],
    chips: [T("Governance", "治理"), T("Policies", "政策"), T("Institutions", "制度"), T("Review", "檢討")],
    ask: T("Do the control and support systems reinforce the strategy or wear it down?", "控制與支撐系統是在強化策略，還是在磨損策略？"),
  },
];

const blueprintPhases = [
  {
    phase: T("Before launch", "正式推動前"),
    title: T("Assign ownership and sequence", "先定責任與先後順序"),
    tone: "teal",
    items: [
      T("Who owns each major move?", "每個主要動作由誰負責？"),
      T("What must happen first, second, and later?", "哪些事情要先做、後做、再做？"),
    ],
  },
  {
    phase: T("Build the system", "建立承載系統"),
    title: T("Define capabilities and structure", "定義能力與結構"),
    tone: "plum",
    items: [
      T("What must the organization be able to do well?", "組織必須具備哪些關鍵能力？"),
      T("What reporting lines, decision rights, or routines must change?", "匯報線、決策權或例行機制需要怎麼改？"),
    ],
  },
  {
    phase: T("Run the strategy", "讓策略跑起來"),
    title: T("Tie resources to control", "把資源綁到管控"),
    tone: "moss",
    items: [
      T("How will budgets and operating review support the strategy?", "預算與營運檢討如何支撐策略？"),
      T("How will management know implementation is working?", "管理層如何知道執行真的在運作？"),
    ],
  },
  {
    phase: T("Adjust", "持續調整"),
    title: T("Define review triggers", "定義重估觸發點"),
    tone: "amber",
    items: [
      T("What facts would force reassessment?", "哪些事實一出現就必須重估？"),
      T("What will be adjusted first if the assumptions move?", "若原本假設改變，第一個要調的是甚麼？"),
    ],
  },
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
      T("The lesson is not abstract vision alone. It is whether the vision organizes capability acquisition and daily decisions, while also acknowledging that a broad architecture can create vulnerability to more focused rivals.", "重點不只是抽象願景，而是願景是否能組織能力取得與日常決策，同時也要承認，過於寬廣的架構也可能對更聚焦的對手形成脆弱性。"),
    ],
    tone: "teal",
  },
  {
    brand: "P&G",
    partner: "China",
    title: T("Strategy turned into operating architecture", "策略如何轉成營運架構"),
    points: [
      T("Brand portfolio choices, manufacturing footprint shifts, distributor development, and digital channel moves all count as implementation.", "品牌組合選擇、製造布局移動、通路培養、數位渠道布局，全部都屬於執行。"),
      T("P&G helped build suppliers, distributors, category understanding, and local managerial depth in China, including a promote-from-within system and a deeply localized management base.", "P&G 在中國協助建立供應商、經銷體系、品類教育與本地管理深度，包含內部晉升系統與高度在地化的管理基礎。"),
      T("The lesson is that execution often looks like supply chain design, channel design, talent design, local adaptation, and the building of an organization that can export managerial talent rather than just consume it.", "重點是，執行常常具體表現在供應鏈設計、渠道設計、人才設計、在地化調整，以及建立一個不只消耗人才、還能輸出管理人才的組織。"),
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
      "NEC versus GTE, P&G in China, governance-failure caution cases, Disney Eisner versus Iger, ETA and Swatch Group, Stitch Fix, Seiko, Acer and Wistron, and GAFAM versus Microsoft as recurring implementation references.",
      "NEC 對 GTE、P&G 中國、治理失敗警示案例，以及 Disney 的 Eisner 對 Iger、ETA 與 Swatch Group、Stitch Fix、Seiko、Acer 與 Wistron、GAFAM 對 Microsoft 這些反覆出現的執行參照。"
    ),
  },
  {
    tier: "Tier 3",
    label: T("Use carefully as deepening material", "可用來深化，但要審慎"),
    items: T(
      "Prahalad and Hamel on organizational pathologies, Collis and Montgomery on financial versus operating control, and Newell as a positive exemplar that can deepen interpretation when used carefully.",
      "Prahalad 與 Hamel 對組織病灶的補強、Collis 與 Montgomery 對財務控制與營運控制的區分，以及 Newell 這類正向範例，能在審慎使用時深化理解，但不是本頁的第一主錨。"
    ),
  },
];

const deepeningReferences = [
  {
    source: "Prahalad and Hamel",
    focus: T("Three organizational pathologies", "三種組織病灶"),
    detail: T(
      "Imprisoned resources, bounded innovation, and destructive internal competition across SBU boundaries.",
      "被囚禁的資源、受限的創新，以及跨 SBU 邊界的破壞性內部競爭。"
    ),
  },
  {
    source: "Collis and Montgomery",
    focus: T("Financial versus operating control", "財務控制對營運控制"),
    detail: T(
      "Control systems cannot be judged in the abstract. Their quality depends on fit with the firm’s resources, business mix, and managerial familiarity with the operations.",
      "控制系統不能抽象評價。其有效性取決於它與企業資源、事業組合，以及管理者對營運熟悉度之間的契合。"
    ),
  },
  {
    source: "Newell",
    focus: T("Positive implementation exemplar", "正向執行範例"),
    detail: T(
      "Useful as a confirmed positive case when personal class experience supports it, but not a replacement for the main anchors.",
      "當個人上課記憶支持時，可作為正向範例使用，但不能取代主體案例錨點。"
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

function ArchitectureCard({ item, mode }) {
  return (
    <ToneCard tone={item.tone} className="si-arch-card">
      <div className="si-driver-top">
        <div>
          <h3 className="si-h3"><LangText text={item.title} mode={mode} /></h3>
          <p className="si-body si-arch-body"><LangText text={item.body} mode={mode} /></p>
        </div>
        <span className="si-driver-icon"><Icon name={item.icon} size={18} stroke={theme.ink} /></span>
      </div>
      <div className="si-chip-row">
        {item.chips.map((chip) => (
          <span key={chip.en} className="si-chip"><LangText text={chip} mode={mode} /></span>
        ))}
      </div>
      <ul className="si-bullets si-tight-list">
        {item.points.map((point) => (
          <li key={point.en}><LangText text={point} mode={mode} /></li>
        ))}
      </ul>
      <p className="si-ask"><strong><LangText text={T("Reader question", "讀者應問")} mode={mode} />:</strong> <LangText text={item.ask} mode={mode} /></p>
    </ToneCard>
  );
}

function BlueprintCard({ item, mode, index }) {
  return (
    <ToneCard tone={item.tone} className="si-blueprint-card">
      <div className="si-phase-top">
        <div className="si-process-index">0{index + 1}</div>
        <div className="si-badge"><LangText text={item.phase} mode={mode} /></div>
      </div>
      <h3 className="si-h4"><LangText text={item.title} mode={mode} /></h3>
      <ul className="si-bullets si-tight-list">
        {item.items.map((q) => (
          <li key={q.en}><LangText text={q} mode={mode} /></li>
        ))}
      </ul>
    </ToneCard>
  );
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
      { id: "overview", label: T("Core idea", "核心觀念") },
      { id: "core", label: T("Architecture", "執行架構") },
      { id: "leaders", label: T("Leadership", "領導判準") },
      { id: "loop", label: T("Process loop", "流程循環") },
      { id: "control", label: T("Control fit", "管控契合") },
      { id: "cases", label: T("Case anchors", "案例錨點") },
      { id: "application", label: T("Blueprint", "應用藍圖") },
      { id: "evidence", label: T("Evidence", "證據層級") },
    ],
    []
  );

  return (
    <div className="si-root">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600;700&family=Noto+Serif+TC:wght@400;600;700&display=swap");
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
          font-family: "Source Serif 4", "Noto Serif TC", Georgia, serif;
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
          margin-bottom: 10px;
        }
        .si-meta-grid {
          display: grid;
          gap: 4px;
        }
        .si-header-bar {
          height: 10px;
          background: var(--plum);
          margin-bottom: 18px;
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
          gap: 16px;
          margin-top: 16px;
        }
        .si-section {
          border: 1px solid var(--line);
          background: rgba(255,255,255,0.38);
          padding: 18px;
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
        .si-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
        .si-grid-4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
        .si-card {
          border: 1px solid var(--line);
          padding: 13px;
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
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 4px;
          min-width: 0;
        }
        .si-arch-card { display: grid; gap: 10px; }
        .si-arch-body { margin: 6px 0 0; max-width: 46ch; }
        .si-chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .si-name-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 8px;
        }
        .si-chip {
          display: inline-flex;
          align-items: center;
          padding: 4px 8px;
          border: 1px solid var(--line);
          background: rgba(255,255,255,0.68);
          font-size: 11px;
          line-height: 1.2;
          color: var(--muted);
        }
        .si-tight-list { margin-top: 0; }
        .si-tight-list li + li { margin-top: 6px; }
        .si-kpi-strip {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 14px;
        }
        .si-kpi-box {
          border: 1px solid var(--line);
          background: rgba(255,255,255,0.58);
          padding: 12px;
        }
        .si-kpi-label {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 6px;
        }
        .si-blueprint-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
        }
        .si-blueprint-card { display: grid; gap: 10px; min-height: 100%; }
        .si-phase-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }

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
        .si-micro-eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 11px;
          color: var(--plum);
          margin-bottom: 8px;
        }
        .si-question-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 10px;
        }
        .si-guide-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
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
        .lang-zh { margin-top: 6px; color: var(--muted); font-family: "Noto Serif TC", "PingFang TC", "Microsoft JhengHei", serif; }
        .si-source-foot {
          margin-top: 18px;
          border-top: 1px solid var(--line);
          padding-top: 12px;
          text-align: center;
        }

        @media (max-width: 1100px) {
          .si-hero-grid,
          .si-grid-4,
          .si-grid-3,
          .si-grid-2,
          .si-bridge-card,
          .si-blueprint-grid,
          .si-kpi-strip,
          .si-guide-grid { grid-template-columns: 1fr 1fr; }
          .si-question-grid { grid-template-columns: 1fr 1fr 1fr; }
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
          .si-bridge-card,
          .si-blueprint-grid,
          .si-kpi-strip,
          .si-guide-grid,
          .si-question-grid { grid-template-columns: 1fr; }
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
            <div className="si-meta-grid">
              <div className="si-course-meta">STRT 6200 · Session 13 · April 8, 2026 · Strategy Implementation</div>
              <div className="si-course-meta">Built from the current distilled prep text, Session 1, Chapters 1 to 3, and recurring case anchors.</div>
            </div>
          </div>
          <div className="si-header-bar" aria-hidden="true" />

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
                      "A complete reader-facing guide built from the distilled prep text and course files, designed to keep the original substance while making the logic easier to read and use.",
                      "一份面向讀者的完整導覽，直接建立在已濃縮的備課原文與課程檔案之上，在不減損原有內容密度的前提下，讓整體邏輯更容易閱讀、理解與使用。"
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
              eyebrow="Core idea"
              title={T("What the session is really teaching", "這堂課真正要教的核心") }
              body={T(
                "The session moves from having a recommendation to carrying a recommendation. That is the difference between analysis that sounds right and strategy that can survive inside an organization.",
                "這堂課的重點，是把焦點從『提出建議』推進到『讓建議真正被組織承載』。這正是聽起來正確的分析，與能在組織裡存活的策略之間的差別。"
              )}
              mode={mode}
              icon="target"
            />

            <div className="si-grid-2">
              <ToneCard tone="teal">
                <Badge tone="teal">Session 1 baseline</Badge>
                <h3 className="si-h3" style={{ marginTop: 10 }}>
                  <LangText text={T("The standard was set from day one", "這個標準其實第一堂就已經設下")} mode={mode} />
                </h3>
                <ul className="si-bullets si-tight-list">
                  <li><LangText mode={mode} text={T("Strategy is not only the big picture. It also includes the detailed plans and processes that deploy and execute it.", "策略不只是 big picture，也包含讓它得以部署與執行的細部計畫與流程。")}/></li>
                  <li><LangText mode={mode} text={T("Doing strategy well includes knowing how to make strategy work inside the organization.", "把 strategy 做好，也包含知道如何讓它在組織裡真正運作。")}/></li>
                  <li><LangText mode={mode} text={T("Cases are primary teaching vehicles, so implementation shows up in repeated operating situations, not only in definition slides.", "案例是主要教學載體，所以執行邏輯會反覆出現在營運情境中，不只出現在定義投影片。")}/></li>
                </ul>
              </ToneCard>

              <ToneCard tone="plum">
                <Badge tone="plum">Plain-language takeaway</Badge>
                <h3 className="si-h3" style={{ marginTop: 10 }}>
                  <LangText text={T("What the reader should hold onto", "讀者最應該抓住的句子")} mode={mode} />
                </h3>
                <p className="si-body" style={{ marginTop: 10 }}>
                  <LangText
                    mode={mode}
                    text={T(
                      "A strategy is not complete when it sounds right. It is complete when the organization can carry it, control it, measure it, review it, and adjust it.",
                      "一個策略不是在它聽起來正確時就完成，而是在組織能夠承載它、控制它、衡量它、檢視它，並在必要時調整它時，才算完成。"
                    )}
                  />
                </p>
                <div className="si-mini-note" style={{ marginTop: 12 }}>
                  <Icon name="warning" size={18} stroke={theme.rose} />
                  <div className="si-body">
                    <LangText
                      mode={mode}
                      text={T(
                        "The recurring risk is not weak analysis. It is incomplete strategy because the writer stops after the recommendation.",
                        "反覆出現的風險，不是分析太弱，而是作者停在建議本身，讓策略變得不完整。"
                      )}
                    />
                  </div>
                </div>
              </ToneCard>
            </div>

            <div className="si-kpi-strip">
              {dysfunctions.map((item) => (
                <div key={item.title.en} className="si-kpi-box">
                  <div className="si-kpi-label"><LangText text={T("Failure pattern", "失能模式")} mode={mode} /></div>
                  <div className="si-failure-title"><LangText text={item.title} mode={mode} /></div>
                  <div className="si-failure-result"><LangText text={item.result} mode={mode} /></div>
                </div>
              ))}
            </div>

            <div className="si-mini-note" style={{ marginTop: 14 }}>
              <Icon name="chart" size={18} stroke={theme.amber} />
              <div className="si-body">
                <LangText
                  mode={mode}
                  text={T(
                    "The 95% question belongs here. In a serious operating setting, accepting 5% failure can mean accepting a very large strategic cost. That is why implementation rigor is framed as basic, not optional.",
                    "95% 的問題就應該放在這裡理解。在嚴肅營運場景裡，接受 5% 失敗，可能就是接受非常高的策略成本。這就是為甚麼課程把執行嚴謹度視為基本要求，而不是可有可無。"
                  )}
                />
              </div>
            </div>

            <div className="si-mini-note" style={{ marginTop: 12 }}>
              <Icon name="people" size={18} stroke={theme.plum} />
              <div className="si-body">
                <LangText
                  mode={mode}
                  text={T(
                    "Very few people are strong at analysis, leadership, action, and disciplined follow-through all at once. That is why leading complex firms strategically is treated as a special managerial challenge.",
                    "極少人能同時擅長分析、領導、行動與有紀律的後續落地。這就是為甚麼策略性地帶領複雜企業，被視為一種特殊的管理挑戰。"
                  )}
                />
              </div>
            </div>
          
            <div style={{ marginTop: 16 }}>
              <div className="si-micro-eyebrow"><LangText text={T("Listening frame for class", "今晚聽課框架")} mode={mode} /></div>
              <div className="si-question-grid">
                {listeningFrame.map((item, index) => (
                  <ToneCard key={item.en} tone={index % 2 === 0 ? "teal" : "plum"}>
                    <div className="si-kpi-label"><LangText text={T(`Question ${index + 1}`, `問題 ${index + 1}`)} mode={mode} /></div>
                    <p className="si-body"><LangText text={item} mode={mode} /></p>
                  </ToneCard>
                ))}
              </div>
            </div>
</section>

          <section className="si-section" id="core">
            <SectionTitle
              eyebrow="Firm-level architecture"
              title={T("The parts of the organization that actually carry strategy", "真正承載策略的組織部件")}
              body={T(
                "SPARK explains much of firm-level advantage. This session zooms in on the additional architecture that determines whether strategy can travel through the organization.",
                "SPARK 解釋了公司層級優勢的重要部分。這堂課則進一步放大那些決定策略能否穿過整個組織的額外架構。"
              )}
              mode={mode}
              icon="layers"
            />

            <div className="si-grid-3">
              {architectureClusters.map((item) => (
                <ArchitectureCard key={item.title.en} item={item} mode={mode} />
              ))}
            </div>

            <div style={{ marginTop: 16 }}>
              <BridgeDiagram mode={mode} />
            </div>
          
            <div className="si-mini-note" style={{ marginTop: 16 }}>
              <Icon name="bridge" size={18} stroke={theme.teal} />
              <div className="si-body">
                <LangText
                  mode={mode}
                  text={T(
                    "Strategy is also an integration problem. Internal alignment means activities, resources, knowledge, structure, and control fit each other. External alignment means what the firm offers fits what will succeed in the market.",
                    "策略同時也是整合問題。內部對齊，是活動、資源、知識、結構與控制彼此契合。外部對齊，則是企業提供物與市場上真正能成功的東西彼此契合。"
                  )}
                />
              </div>
            </div>
</section>
          <section className="si-section" id="leaders">
            <SectionTitle
              eyebrow="Leadership and judgment"
              title={T("Why leadership is not a decorative add-on", "為甚麼領導力不是裝飾性附加項") }
              body={T(
                "The source text did not treat CEO roles as filler. It treated them as part of implementation logic, because leadership decides direction, handles uncertainty, sets standards, and faces the public when execution is tested.",
                "原始備課稿並沒有把 CEO 角色當成填充內容，而是把它放進執行邏輯本體，因為領導者要決定方向、處理不確定性、設定標準，並在執行受考驗時面對公眾。"
              )}
              mode={mode}
              icon="compass"
            />

            <div className="si-grid-2">
              <ToneCard tone="teal">
                <Badge tone="teal">CEO roles from Chapter 3</Badge>
                <ul className="si-bullets si-tight-list" style={{ marginTop: 10 }}>
                  {ceoRoles.map((role) => (
                    <li key={role.en}><LangText text={role} mode={mode} /></li>
                  ))}
                </ul>
                <div className="si-mini-note" style={{ marginTop: 12 }}>
                  <Icon name="warning" size={18} stroke={theme.amber} />
                  <div className="si-body">
                    <LangText
                      mode={mode}
                      text={T(
                        "One of Enright’s sharpest lines belongs here: the first lemming off the cliff may be a great leader, but is a lousy strategist.",
                        "Enright 很尖銳的一句話就放在這裡理解：第一隻跳下懸崖的旅鼠也許是 great leader，但卻是 lousy strategist。"
                      )}
                    />
                  </div>
                </div>
              </ToneCard>

              <div className="si-grid-3">
                {leadershipExamples.map((item) => (
                  <ToneCard key={item.title.en} tone={item.tone}>
                    <h3 className="si-h4"><LangText text={item.title} mode={mode} /></h3>
                    <p className="si-body" style={{ marginTop: 8 }}><LangText text={item.body} mode={mode} /></p>
                  </ToneCard>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 16 }} className="si-grid-2">
              {leadershipMatrix.map((group) => (
                <ToneCard key={group.side.en} tone={group.tone}>
                  <div className="si-kpi-label"><LangText text={group.side} mode={mode} /></div>
                  <div className="si-name-cloud">
                    {group.names.map((name) => (
                      <span key={name} className="si-chip">{name}</span>
                    ))}
                  </div>
                </ToneCard>
              ))}
            </div></section>

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
              title={T("Where implementation becomes managerial reality", "執行變成管理現實的地方")}
              body={T(
                "The course’s most usable control idea is simple. Budgeting and control are the transmission mechanism that ties strategy to targets, routines, and review.",
                "課程中最好用的管控觀念其實很簡單。預算與管控，就是把策略連到目標、例行機制與檢討程序的傳導機制。"
              )}
              mode={mode}
              icon="checklist"
            />

            <ControlFlow mode={mode} />

            <div className="si-grid-3" style={{ marginTop: 16 }}>
              <ToneCard tone="amber">
                <Badge tone="amber">Why it matters</Badge>
                <ul className="si-bullets si-tight-list" style={{ marginTop: 10 }}>
                  <li><LangText mode={mode} text={T("Mechanical budgeting based only on last year’s numbers can sever strategy from action.", "若只按去年的數字機械編預算，strategy 與 action 的連結就可能被切斷。")}/></li>
                  <li><LangText mode={mode} text={T("A strong strategy with a weak control system is still operationally weak.", "再好的策略，如果控制系統很弱，營運上仍然是弱的。")}/></li>
                </ul>
              </ToneCard>

              <ToneCard tone="moss">
                <Badge tone="moss">What changes in practice</Badge>
                <ul className="si-bullets si-tight-list" style={{ marginTop: 10 }}>
                  <li><LangText mode={mode} text={T("Do not stop at the recommendation. Add owners, sequence, and review logic.", "不要停在建議本身，要補上負責人、順序與檢討邏輯。")}/></li>
                  <li><LangText mode={mode} text={T("Treat governance as performance-relevant, not as a separate compliance box.", "要把治理視為直接影響績效的條件，而不是獨立的合規方框。")}/></li>
                </ul>
              </ToneCard>

              <ToneCard tone="plum">
                <Badge tone="plum">Reader test</Badge>
                <p className="si-body" style={{ marginTop: 10 }}>
                  <LangText
                    mode={mode}
                    text={T(
                      "If targets, budgets, routines, and review meetings do not visibly change, has the strategy really been implemented?",
                      "如果目標、預算、例行機制與檢討會議都沒有明顯改變，那這個策略真的算已經被執行了嗎？"
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

            <div style={{ marginTop: 16 }}>
              <ToneCard tone="amber">
                <div className="si-kpi-label"><LangText text={T("Governance-failure caution set", "治理失敗警示集合")} mode={mode} /></div>
                <div className="si-name-cloud">
                  {governanceFailureSet.map((name) => (
                    <span key={name} className="si-chip">{name}</span>
                  ))}
                </div>
              </ToneCard>
            </div></section>

          <section className="si-section">
            <SectionTitle
              eyebrow="Additional recurring references"
              title={T("Other examples that the source text said still matter", "原始備課稿中仍應保留的其他反覆參照") }
              body={T(
                "These examples were not the first layer of the page, but they were explicitly retained in the source text as useful recurring references rather than disposable extras.",
                "這些例子不是頁面的第一層主體，但原始備課稿明確把它們保留下來，作為有用的反覆參照，而不是可隨意刪除的附加物。"
              )}
              mode={mode}
              icon="eye"
            />

            <div className="si-grid-3">
              {recurringExamples.map((item) => (
                <ToneCard key={item.name.en} tone="plum">
                  <h3 className="si-h4"><LangText text={item.name} mode={mode} /></h3>
                  <p className="si-body" style={{ marginTop: 8 }}><LangText text={item.use} mode={mode} /></p>
                </ToneCard>
              ))}
            </div>
          </section>

          <section className="si-section" id="application">
            <SectionTitle
              eyebrow="Long-case use"
              title={T("A cleaner blueprint for your own recommendations", "把自己的建議寫得更完整的藍圖")}
              body={T(
                "Instead of ending with one dense table, the cleaner move is to ask implementation questions in sequence. This makes gaps easier to see and easier to fix.",
                "與其用一張很密的表收尾，更好的方式是按順序問執行問題。這樣更容易看出缺口，也更容易補強。"
              )}
              mode={mode}
              icon="bridge"
            />

            <div className="si-blueprint-grid">
              {blueprintPhases.map((item, index) => (
                <BlueprintCard key={item.title.en} item={item} index={index} mode={mode} />
              ))}
            </div>
          
            <div style={{ marginTop: 16 }} className="si-table-wrap">
              <table className="si-table">
                <thead>
                  <tr>
                    <th><LangText text={T("Implementation field", "執行欄位")} mode={mode} /></th>
                    <th><LangText text={T("Question to answer", "必答問題")} mode={mode} /></th>
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
          
            <div style={{ marginTop: 16 }} className="si-table-wrap">
              <table className="si-table">
                <thead>
                  <tr>
                    <th><LangText text={T("Deepening source", "補強來源")} mode={mode} /></th>
                    <th><LangText text={T("What it adds", "補進甚麼")} mode={mode} /></th>
                    <th><LangText text={T("Use rule", "使用原則")} mode={mode} /></th>
                  </tr>
                </thead>
                <tbody>
                  {deepeningReferences.map((row) => (
                    <tr key={row.source}>
                      <td><strong>{row.source}</strong></td>
                      <td><LangText text={row.focus} mode={mode} /></td>
                      <td><LangText text={row.detail} mode={mode} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
</section>

          <section className="si-section">
            <SectionTitle
              eyebrow="Reader use and boundaries"
              title={T("How to use the page without flattening the course logic", "如何使用這一頁，同時不把課程邏輯壓扁") }
              body={T(
                "The source text also contained usage guidance and scope boundaries. They matter because they prevent this page from turning into generic advice or cross-course framework mixing.",
                "原始備課稿也包含使用指引與範圍界線。這些內容之所以重要，是因為它們能防止本頁滑向空泛建議，或混入其他課程框架。"
              )}
              mode={mode}
              icon="checklist"
            />

            <div className="si-guide-grid">
              {usageGuide.map((item) => (
                <ToneCard key={item.stage.en} tone={item.tone}>
                  <div className="si-kpi-label"><LangText text={item.stage} mode={mode} /></div>
                  <p className="si-body"><LangText text={item.body} mode={mode} /></p>
                </ToneCard>
              ))}
            </div>

            <div style={{ marginTop: 16 }}>
              <div className="si-micro-eyebrow"><LangText text={T("Out of scope", "不在範圍內")} mode={mode} /></div>
              <div className="si-grid-2">
                {outOfScope.map((item) => (
                  <ToneCard key={item.en} tone="amber">
                    <p className="si-body"><LangText text={item} mode={mode} /></p>
                  </ToneCard>
                ))}
              </div>
            </div></section>

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

        <footer className="si-source-foot">
          <div className="si-course-meta">Primary base: Session 1 · Ch.1 · Ch.2 · Ch.3 · current Session 13 prep draft · recurring case materials</div>
        </footer>
      </div>
    </div>
  );
}
