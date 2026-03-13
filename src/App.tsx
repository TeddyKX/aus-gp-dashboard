import { useState } from "react";

// ── THEME TOKENS ──────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    bg: "#080810",
    surface: "#0a0a16",
    surfaceHov: "#0f0f22",
    border: "#111120",
    text: "#ffffff",
    textSub: "#cccccc",
    muted: "#555555",
    faint: "#282838",
    veryfaint: "#1e1e2e",
    gridLine: "#111122",
    svgLabel: "#282840",
    svgFaint: "#1e1e2e",
    tabBar: "#0a0a14",
    tabActive: "#141428",
    tabBorder: "#2a2a50",
    tabText: "#cccccc",
    tabInactive: "#333333",
    tooltipBg: "#0d0d1a",
    noteText: "#1e1e2e",
    noteBorder: "#111120",
    noteBg: "#090912",
    trendLine1: "#60a5fa",
    trendLine2: "#94a3b8",
    trendLabel: "#555555",
    barTrend: "#ffffff10",
    statBg: "#0a0a16",
    statBorder: "#181828",
    toggleBg: "#141428",
    toggleBorder: "#2a2a50",
    toggleText: "#888888",
    sunMoon: "🌙",
    svgDotFill: "#080810",
    rowBandOp: 0.04,
    barOverlay: "#ffffff44",
  },
  light: {
    bg: "#f4f4f8",
    surface: "#ffffff",
    surfaceHov: "#f0f0f8",
    border: "#e0e0ee",
    text: "#111122",
    textSub: "#333344",
    muted: "#888899",
    faint: "#aaaabc",
    veryfaint: "#c8c8d8",
    gridLine: "#e8e8f4",
    svgLabel: "#aaaabc",
    svgFaint: "#c0c0d0",
    tabBar: "#e8e8f0",
    tabActive: "#ffffff",
    tabBorder: "#c0c0d8",
    tabText: "#222233",
    tabInactive: "#999aaa",
    tooltipBg: "#ffffff",
    noteText: "#9090a0",
    noteBorder: "#e0e0ee",
    noteBg: "#fafafe",
    trendLine1: "#3b82f6",
    trendLine2: "#94a3b8",
    trendLabel: "#999aaa",
    barTrend: "#00000010",
    statBg: "#ffffff",
    statBorder: "#e0e0ee",
    toggleBg: "#ffffff",
    toggleBorder: "#c0c0d8",
    toggleText: "#666677",
    sunMoon: "☀️",
    svgDotFill: "#f4f4f8",
    rowBandOp: 0.07,
    barOverlay: "#00000022",
  },
};

// ── SHARED DATA ───────────────────────────────────────────────────────────────
const ERA_DEFS = [
  {
    startYear: 1994,
    endYear: 1995,
    label: "V10 — Adelaide",
    color: "#e879f9",
    note: "Adelaide Street Circuit · last 2 Adelaide races",
  },
  {
    startYear: 1996,
    endYear: 1997,
    label: "V10 — Albert Park Early",
    color: "#c084fc",
    note: "Albert Park debut · single quali session",
  },
  {
    startYear: 1998,
    endYear: 1999,
    label: "V10 — Grooved Tyres",
    color: "#a78bfa",
    note: "Narrow cars, 4-groove tyres, McLaren dominant",
  },
  {
    startYear: 2000,
    endYear: 2005,
    label: "V10 Era (Peak)",
    color: "#818cf8",
    note: "NA V10 peak · refuelling · 1-lap quali 2003–05",
  },
  {
    startYear: 2006,
    endYear: 2013,
    label: "V8 Era (2.4L)",
    color: "#fb923c",
    note: "2.4L V8 · Bridgestone → Pirelli",
  },
  {
    startYear: 2014,
    endYear: 2019,
    label: "V6 Turbo Hybrid",
    color: "#34d399",
    note: "Power units · MGU-H · DRS",
  },
  {
    startYear: 2022,
    endYear: 2025,
    label: "New Layout + Ground Effect",
    color: "#60a5fa",
    note: "Circuit redesign + 2022 ground-effect regs",
  },
  {
    startYear: 2026,
    endYear: 2026,
    label: "2026 Regs",
    color: "#f472b6",
    note: "New PU · active aero · MGU-H removed",
  },
];

const allData = [
  // ── Adelaide Street Circuit (3.780 km) ───────────────────────────────────
  {
    year: 1994,
    driver: "Mansell",
    team: "Williams",
    time: 76.179,
    approx: false,
    note: "Adelaide · season finale · Mansell comeback race",
  },
  {
    year: 1995,
    driver: "Hill",
    team: "Williams",
    time: 75.505,
    approx: false,
    note: "Adelaide · last ever Adelaide F1 GP",
  },
  // ── Albert Park (5.303 km → 5.278 km from 2022) ──────────────────────────
  {
    year: 1996,
    driver: "Villeneuve",
    team: "Williams",
    time: 92.371,
    approx: false,
    note: "Albert Park debut · single quali session",
  },
  {
    year: 1997,
    driver: "Villeneuve",
    team: "Williams",
    time: 89.369,
    approx: false,
    note: "P2 Frentzen +1.752s — session red-flagged",
  },
  {
    year: 1998,
    driver: "Häkkinen",
    team: "McLaren",
    time: 90.01,
    approx: false,
    note: "Grooved tyre era begins · McLaren 1-2",
  },
  {
    year: 1999,
    driver: "Häkkinen",
    team: "McLaren",
    time: 90.462,
    approx: true,
  },
  {
    year: 2000,
    driver: "Häkkinen",
    team: "McLaren",
    time: 90.556,
    approx: false,
  },
  {
    year: 2001,
    driver: "M.Schumacher",
    team: "Ferrari",
    time: 86.892,
    approx: false,
  },
  {
    year: 2002,
    driver: "Barrichello",
    team: "Ferrari",
    time: 85.843,
    approx: false,
  },
  {
    year: 2003,
    driver: "M.Schumacher",
    team: "Ferrari",
    time: 87.173,
    approx: false,
  },
  {
    year: 2004,
    driver: "M.Schumacher",
    team: "Ferrari",
    time: 84.408,
    approx: false,
  },
  {
    year: 2005,
    driver: "Fisichella",
    team: "Renault",
    time: 85.672,
    approx: true,
    note: "Aggregate format ÷2",
  },
  { year: 2006, driver: "Alonso", team: "Renault", time: 85.905, approx: true },
  {
    year: 2007,
    driver: "Räikkönen",
    team: "Ferrari",
    time: 86.072,
    approx: true,
  },
  {
    year: 2008,
    driver: "Hamilton",
    team: "McLaren",
    time: 86.714,
    approx: true,
  },
  {
    year: 2009,
    driver: "Button",
    team: "Brawn GP",
    time: 86.202,
    approx: true,
  },
  {
    year: 2010,
    driver: "Vettel",
    team: "Red Bull",
    time: 83.919,
    approx: true,
  },
  {
    year: 2011,
    driver: "Vettel",
    team: "Red Bull",
    time: 83.529,
    approx: true,
  },
  {
    year: 2012,
    driver: "Hamilton",
    team: "McLaren",
    time: 84.922,
    approx: true,
  },
  {
    year: 2013,
    driver: "Räikkönen",
    team: "Lotus",
    time: 87.407,
    approx: true,
  },
  {
    year: 2014,
    driver: "Hamilton",
    team: "Mercedes",
    time: 86.6,
    approx: true,
    note: "Wet Q3",
  },
  {
    year: 2015,
    driver: "Hamilton",
    team: "Mercedes",
    time: 83.398,
    approx: true,
  },
  {
    year: 2016,
    driver: "Hamilton",
    team: "Mercedes",
    time: 82.188,
    approx: true,
  },
  {
    year: 2017,
    driver: "Hamilton",
    team: "Mercedes",
    time: 82.188,
    approx: true,
  },
  {
    year: 2018,
    driver: "Hamilton",
    team: "Mercedes",
    time: 81.164,
    approx: false,
  },
  {
    year: 2019,
    driver: "Hamilton",
    team: "Mercedes",
    time: 80.486,
    approx: false,
  },
  {
    year: 2022,
    driver: "Leclerc",
    team: "Ferrari",
    time: 77.868,
    approx: false,
  },
  {
    year: 2023,
    driver: "Verstappen",
    team: "Red Bull",
    time: 76.732,
    approx: false,
  },
  {
    year: 2024,
    driver: "Verstappen",
    team: "Red Bull",
    time: 75.915,
    approx: false,
  },
  {
    year: 2025,
    driver: "Norris",
    team: "McLaren",
    time: 75.096,
    approx: false,
  },
  {
    year: 2026,
    driver: "Russell",
    team: "Mercedes",
    time: 78.518,
    approx: false,
  },
];

const gapData = [
  // ── Adelaide Street Circuit (1994–1995) ─────────────────────────────────────
  {
    year: 1994,
    p2: { driver: "M.Schumacher", team: "Benetton", gap: 0.018 },
    p3: { driver: "Hill", team: "Williams", gap: 0.651 },
    note: "Adelaide · rain curtailed Schumacher's final run",
  },
  {
    year: 1995,
    p2: { driver: "Coulthard", team: "Williams", gap: 0.123 },
    p3: { driver: "M.Schumacher", team: "Benetton", gap: 0.334 },
    note: "Adelaide · last ever Adelaide F1 GP",
  },
  // ── Early V10 (standard tyres, Albert Park) ────────────────────────────────
  {
    year: 1996,
    p2: { driver: "Hill", team: "Williams", gap: 0.138 },
    p3: { driver: "Irvine", team: "Ferrari", gap: 0.5, approx: true },
  },
  {
    year: 1997,
    p2: { driver: "Frentzen", team: "Williams", gap: 1.752 },
    p3: { driver: "Schumacher", team: "Ferrari", gap: 1.9, approx: true },
    note: "Session red-flagged · only 6 cars within 3s of pole",
  },
  // ── Grooved tyres era ───────────────────────────────────────────────────────
  {
    year: 1998,
    p2: { driver: "Coulthard", team: "McLaren", gap: 0.043 },
    p3: { driver: "M.Schumacher", team: "Ferrari", gap: 0.757 },
  },
  {
    year: 1999,
    p2: { driver: "Coulthard", team: "McLaren", gap: 0.484 },
    p3: { driver: "M.Schumacher", team: "Ferrari", gap: 1.319 },
  },
  // ── V10 peak ────────────────────────────────────────────────────────────────
  {
    year: 2000,
    p2: { driver: "Coulthard", team: "McLaren", gap: 0.3, approx: true },
    p3: { driver: "M.Schumacher", team: "Ferrari", gap: 0.6, approx: true },
  },
  {
    year: 2001,
    p2: { driver: "Barrichello", team: "Ferrari", gap: 0.12, approx: true },
    p3: { driver: "Coulthard", team: "McLaren", gap: 0.49, approx: true },
  },
  {
    year: 2002,
    p2: { driver: "M.Schumacher", team: "Ferrari", gap: 0.005, approx: true },
    p3: { driver: "Montoya", team: "Williams", gap: 0.43, approx: true },
  },
  {
    year: 2003,
    p2: { driver: "Räikkönen", team: "McLaren", gap: 0.29, approx: true },
    p3: { driver: "Barrichello", team: "Ferrari", gap: 0.38, approx: true },
  },
  {
    year: 2004,
    p2: { driver: "Barrichello", team: "Ferrari", gap: 0.09, approx: true },
    p3: { driver: "Trulli", team: "Renault", gap: 0.62, approx: true },
  },
  {
    year: 2005,
    p2: { driver: "Alonso", team: "Renault", gap: 0.21, approx: true },
    p3: { driver: "Räikkönen", team: "McLaren", gap: 0.31, approx: true },
    note: "Aggregate format (sum of 2 sessions ÷2)",
  },
  // ── V8 era ──────────────────────────────────────────────────────────────────
  {
    year: 2006,
    p2: { driver: "Fisichella", team: "Renault", gap: 0.4, approx: true },
    p3: { driver: "Alonso", team: "Renault", gap: 0.5, approx: true },
  },
  {
    year: 2007,
    p2: { driver: "Hamilton", team: "McLaren", gap: 0.2, approx: true },
    p3: { driver: "Alonso", team: "McLaren", gap: 0.34, approx: true },
  },
  {
    year: 2008,
    p2: { driver: "Räikkönen", team: "Ferrari", gap: 0.22, approx: true },
    p3: { driver: "Massa", team: "Ferrari", gap: 0.38, approx: true },
  },
  {
    year: 2009,
    p2: { driver: "Barrichello", team: "Brawn GP", gap: 0.303 },
    p3: { driver: "Vettel", team: "Red Bull", gap: 0.628 },
  },
  {
    year: 2010,
    p2: { driver: "Button", team: "McLaren", gap: 0.2, approx: true },
    p3: { driver: "Hamilton", team: "McLaren", gap: 0.41, approx: true },
  },
  {
    year: 2011,
    p2: { driver: "Hamilton", team: "McLaren", gap: 0.32, approx: true },
    p3: { driver: "Webber", team: "Red Bull", gap: 0.5, approx: true },
  },
  {
    year: 2012,
    p2: { driver: "Rosberg", team: "Mercedes", gap: 0.15, approx: true },
    p3: { driver: "Räikkönen", team: "Lotus", gap: 0.42, approx: true },
  },
  {
    year: 2013,
    p2: { driver: "Vettel", team: "Red Bull", gap: 0.22, approx: true },
    p3: { driver: "Webber", team: "Red Bull", gap: 0.43, approx: true },
  },
  // ── V6 Hybrid era ───────────────────────────────────────────────────────────
  {
    year: 2014,
    p2: { driver: "Ricciardo", team: "Red Bull", gap: 0.317 },
    p3: { driver: "Rosberg", team: "Mercedes", gap: 0.364 },
    note: "Wet Q3",
  },
  {
    year: 2015,
    p2: { driver: "Rosberg", team: "Mercedes", gap: 0.2, approx: true },
    p3: { driver: "Vettel", team: "Ferrari", gap: 0.5, approx: true },
  },
  {
    year: 2016,
    p2: { driver: "Rosberg", team: "Mercedes", gap: 0.15, approx: true },
    p3: { driver: "Räikkönen", team: "Ferrari", gap: 0.57, approx: true },
  },
  {
    year: 2017,
    p2: { driver: "Vettel", team: "Ferrari", gap: 0.268 },
    p3: { driver: "Bottas", team: "Mercedes", gap: 0.293 },
  },
  {
    year: 2018,
    p2: { driver: "Räikkönen", team: "Ferrari", gap: 0.3, approx: true },
    p3: { driver: "Vettel", team: "Ferrari", gap: 0.35, approx: true },
  },
  {
    year: 2019,
    p2: { driver: "Vettel", team: "Ferrari", gap: 0.112 },
    p3: { driver: "Bottas", team: "Mercedes", gap: 0.35, approx: true },
  },
  // ── New layout (2022+) ───────────────────────────────────────────────────────
  {
    year: 2022,
    p2: { driver: "Verstappen", team: "Red Bull", gap: 0.286 },
    p3: { driver: "Perez", team: "Red Bull", gap: 0.372 },
  },
  {
    year: 2023,
    p2: { driver: "Russell", team: "Mercedes", gap: 0.236 },
    p3: { driver: "Hamilton", team: "Mercedes", gap: 0.305 },
  },
  {
    year: 2024,
    p2: { driver: "Sainz", team: "Ferrari", gap: 0.27 },
    p3: { driver: "Perez", team: "Red Bull", gap: 0.359, penalised: true },
  },
  {
    year: 2025,
    p2: { driver: "Piastri", team: "McLaren", gap: 0.084 },
    p3: { driver: "Verstappen", team: "Red Bull", gap: 0.284, approx: true },
  },
  {
    year: 2026,
    p2: { driver: "Antonelli", team: "Mercedes", gap: 0.293 },
    p3: { driver: "Hadjar", team: "Red Bull", gap: 0.785 },
  },
];

function fmtTime(s) {
  const m = Math.floor(s / 60);
  return `${m}:${(s - m * 60).toFixed(3).padStart(6, "0")}`;
}
function getEra(year) {
  let era = ERA_DEFS[0];
  for (const e of ERA_DEFS) {
    if (year >= e.startYear) era = e;
  }
  return era;
}
function buildEraStats() {
  return ERA_DEFS.map((era) => {
    const years = allData.filter(
      (d) => d.year >= era.startYear && d.year <= era.endYear
    );
    const startEntry = years[0],
      endEntry = years[years.length - 1];
    const best = years.reduce((a, b) => (a.time < b.time ? a : b));
    const worst = years.reduce((a, b) => (a.time > b.time ? a : b));
    return {
      ...era,
      startEntry,
      endEntry,
      startTime: startEntry.time,
      endTime: endEntry.time,
      delta: endEntry.time - startEntry.time,
      best,
      worst,
      years,
    };
  });
}
const eraStats = buildEraStats();

const TEAM_COLOR = {
  "Red Bull": "#3b82f6",
  Ferrari: "#ef4444",
  Mercedes: "#06b6d4",
  McLaren: "#f97316",
  Renault: "#facc15",
  "Brawn GP": "#a3e635",
  Lotus: "#4ade80",
  Williams: "#94a3b8",
  Alpine: "#ec4899",
  Honda: "#f87171",
  Benetton: "#22d3ee",
  BAR: "#fb923c",
  default: "#888",
};
function teamColor(team) {
  return TEAM_COLOR[team] || TEAM_COLOR.default;
}

// ── BAR CHART (TAB 1) ─────────────────────────────────────────────────────────
const BAR_W = 22,
  GAP = 6,
  STEP = BAR_W + GAP;
const PAD_L = 56,
  PAD_R = 20,
  PAD_T = 48,
  PAD_B = 68;
const CH = 290,
  N = allData.length;
const SW = PAD_L + N * STEP - GAP + PAD_R,
  SH = CH + PAD_T + PAD_B;
const MIN_T = 74,
  MAX_T = 94;
const GRIDLINES = [76, 78, 80, 82, 84, 86, 88, 90, 92];
function toY(t) {
  return PAD_T + ((t - MIN_T) / (MAX_T - MIN_T)) * CH;
}

function PoleHistoryTab({ T }) {
  const [hov, setHov] = useState(null);
  const hovEntry = hov !== null ? allData[hov] : null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          paddingLeft: 4,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            fontSize: 10,
            letterSpacing: ".2em",
            color: T.faint,
            textTransform: "uppercase",
            fontFamily: "'Barlow',sans-serif",
          }}
        >
          Pole times by year · 1994–2026 · Australian Grand Prix · hover for
          details
        </div>
      </div>

      <div style={{ overflowX: "auto", width: "100%", maxWidth: "100vw" }}>
        <svg width={SW} height={SH}>
          {GRIDLINES.map((t) => {
            const y = toY(t),
              m = Math.floor(t / 60),
              s = (t % 60).toFixed(0).padStart(2, "0");
            return (
              <g key={t}>
                <line
                  x1={PAD_L - 6}
                  y1={y}
                  x2={SW - PAD_R}
                  y2={y}
                  stroke={T.gridLine}
                  strokeWidth={1}
                />
                <text
                  x={PAD_L - 9}
                  y={y + 4}
                  textAnchor="end"
                  fill={T.svgLabel}
                  fontSize={9}
                  fontFamily="monospace"
                >
                  {m}:{s}
                </text>
              </g>
            );
          })}
          {eraStats.map((era) => {
            const si = allData.findIndex((d) => d.year === era.startYear);
            const ei = allData.findIndex((d) => d.year === era.endYear);
            if (si < 0 || ei < 0) return null;
            return (
              <rect
                key={era.startYear}
                x={PAD_L + si * STEP - GAP / 2}
                y={PAD_T - 18}
                width={
                  PAD_L +
                  ei * STEP +
                  BAR_W +
                  GAP / 2 -
                  (PAD_L + si * STEP - GAP / 2)
                }
                height={CH + 18}
                fill={era.color}
                opacity={T.rowBandOp}
                rx={2}
              />
            );
          })}
          {(() => {
            const idx96 = allData.findIndex((d) => d.year === 1996);
            const x96 = PAD_L + idx96 * STEP - GAP / 2 - 1;
            const idx22 = allData.findIndex((d) => d.year === 2022);
            const x22 = PAD_L + idx22 * STEP - GAP / 2 - 1;
            return (
              <g>
                <line
                  x1={x96}
                  y1={PAD_T - 32}
                  x2={x96}
                  y2={CH + PAD_T + 18}
                  stroke="#e879f940"
                  strokeWidth={1}
                  strokeDasharray="4,3"
                />
                <text
                  x={x96 + 4}
                  y={PAD_T - 18}
                  fill="#e879f960"
                  fontSize={7.5}
                  fontFamily="'Barlow',sans-serif"
                >
                  ALBERT PARK
                </text>
                <line
                  x1={x22}
                  y1={PAD_T - 32}
                  x2={x22}
                  y2={CH + PAD_T + 18}
                  stroke="#f472b840"
                  strokeWidth={1}
                  strokeDasharray="4,3"
                />
                <text
                  x={x22 + 4}
                  y={PAD_T - 18}
                  fill="#f472b860"
                  fontSize={7.5}
                  fontFamily="'Barlow',sans-serif"
                >
                  NEW LAYOUT
                </text>
              </g>
            );
          })()}
          <polyline
            points={allData
              .map((d, i) => `${PAD_L + i * STEP + BAR_W / 2},${toY(d.time)}`)
              .join(" ")}
            fill="none"
            stroke={T.barTrend}
            strokeWidth={1}
          />
          {eraStats.map((era) => {
            const si = allData.findIndex((d) => d.year === era.startYear);
            const ei = allData.findIndex((d) => d.year === era.endYear);
            if (si < 0 || ei < 0 || si === ei) return null;
            return (
              <g key={"conn" + era.startYear}>
                <line
                  x1={PAD_L + si * STEP + BAR_W / 2}
                  y1={toY(era.startTime) - 7}
                  x2={PAD_L + ei * STEP + BAR_W / 2}
                  y2={toY(era.endTime) - 7}
                  stroke={era.color}
                  strokeWidth={1}
                  strokeDasharray="3,2"
                  opacity={0.35}
                />
                <circle
                  cx={PAD_L + si * STEP + BAR_W / 2}
                  cy={toY(era.startTime) - 7}
                  r={2.5}
                  fill={era.color}
                  opacity={0.5}
                />
                <circle
                  cx={PAD_L + ei * STEP + BAR_W / 2}
                  cy={toY(era.endTime) - 7}
                  r={2.5}
                  fill={era.color}
                  opacity={0.5}
                />
              </g>
            );
          })}
          {allData.map((d, i) => {
            const era = getEra(d.year),
              x = PAD_L + i * STEP,
              y = toY(d.time),
              bH = CH + PAD_T - y,
              isHov = hov === i;
            return (
              <g
                key={d.year}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
              >
                <rect
                  x={x}
                  y={y}
                  width={BAR_W}
                  height={bH}
                  fill={era.color}
                  opacity={isHov ? 1 : 0.72}
                  rx={2}
                />
                {d.approx && (
                  <rect
                    x={x}
                    y={y}
                    width={BAR_W}
                    height={bH}
                    fill="none"
                    stroke={T.barOverlay}
                    strokeWidth={1}
                    strokeDasharray="3,2"
                    rx={2}
                  />
                )}
                {isHov && (
                  <rect
                    x={x - 2}
                    y={y - 2}
                    width={BAR_W + 4}
                    height={bH + 4}
                    fill="none"
                    stroke={era.color}
                    strokeWidth={1.5}
                    opacity={0.6}
                    rx={3}
                  />
                )}
                {isHov && (
                  <text
                    x={x + BAR_W / 2}
                    y={y - 8}
                    textAnchor="middle"
                    fill={T.text}
                    fontSize={8}
                    fontFamily="'Barlow Condensed',monospace"
                    fontWeight={600}
                  >
                    {fmtTime(d.time)}
                    {d.approx ? "~" : ""}
                  </text>
                )}
                <text
                  x={x + BAR_W / 2}
                  y={CH + PAD_T + 13}
                  textAnchor="middle"
                  fill={isHov ? T.text : T.svgFaint}
                  fontSize={8.5}
                  fontFamily="'Barlow Condensed',sans-serif"
                  fontWeight={600}
                >
                  {d.year}
                </text>
              </g>
            );
          })}
          <text
            x={12}
            y={PAD_T + CH / 2}
            textAnchor="middle"
            fill={T.svgFaint}
            fontSize={8}
            fontFamily="'Barlow',sans-serif"
            transform={`rotate(-90,12,${PAD_T + CH / 2})`}
          >
            Pole time · faster ↑
          </text>
        </svg>
      </div>

      {hovEntry && (
        <div
          style={{
            background: T.tooltipBg,
            border: `1px solid ${getEra(hovEntry.year).color}40`,
            borderRadius: 8,
            padding: "8px 18px",
            marginTop: 4,
            textAlign: "center",
            minWidth: 190,
          }}
        >
          <div
            style={{
              color: getEra(hovEntry.year).color,
              fontSize: 9,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              fontFamily: "'Barlow',sans-serif",
            }}
          >
            {hovEntry.year} · {getEra(hovEntry.year).label}
          </div>
          <div
            style={{
              color: T.text,
              fontSize: 21,
              fontWeight: 800,
              fontFamily: "'Barlow Condensed',monospace",
            }}
          >
            {fmtTime(hovEntry.time)}
            {hovEntry.approx && (
              <span style={{ fontSize: 10, color: T.muted }}> ~</span>
            )}
          </div>
          <div
            style={{
              color: T.muted,
              fontSize: 11,
              fontFamily: "'Barlow',sans-serif",
            }}
          >
            {hovEntry.driver} · {hovEntry.team}
          </div>
          {hovEntry.note && (
            <div style={{ color: "#f87171", fontSize: 9, marginTop: 2 }}>
              ⚠ {hovEntry.note}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── ERA ANALYSIS (TAB 2) ──────────────────────────────────────────────────────
function EraAnalysisTab({ T }) {
  const [hovEra, setHovEra] = useState(null);
  const [hovDB, setHovDB] = useState(null);
  const MAX_ABS = Math.max(...eraStats.map((e) => Math.abs(e.delta)));

  const DB_PAD_L = 172,
    DB_PAD_R = 76,
    DB_PAD_T = 38,
    DB_ROW_H = 62,
    DB_W = 760;
  const DB_USABLE = DB_W - DB_PAD_L - DB_PAD_R;
  const DB_H = DB_PAD_T + eraStats.length * DB_ROW_H + 28;
  const toX = (t) => DB_PAD_L + ((t - 74) / (94 - 74)) * DB_USABLE;
  const axisTicks = [75, 77, 79, 81, 83, 85, 87, 89, 91, 93];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        gap: 40,
      }}
    >
      {/* ── Gain/loss bars ── */}
      <div style={{ width: "100%", maxWidth: 860 }}>
        <div
          style={{
            fontSize: 10,
            letterSpacing: ".2em",
            color: T.faint,
            textTransform: "uppercase",
            fontFamily: "'Barlow',sans-serif",
            marginBottom: 2,
            paddingLeft: 4,
          }}
        >
          First → last pole time within each regulation era
        </div>

        {eraStats.map((era) => {
          const isHov = hovEra === era.startYear;
          const isSingle = era.startYear === era.endYear;
          const gain = era.delta,
            isGain = gain < 0;
          const barCol = isGain ? "#4ade80" : "#f87171";
          const pct = MAX_ABS > 0 ? (Math.abs(gain) / MAX_ABS) * 100 : 0;
          const numYrs = era.years ? era.years.length : 1;

          return (
            <div
              key={era.startYear}
              onMouseEnter={() => setHovEra(era.startYear)}
              onMouseLeave={() => setHovEra(null)}
              style={{
                marginBottom: 12,
                padding: "14px 18px",
                background: isHov ? T.surfaceHov : T.surface,
                border: `1px solid ${isHov ? era.color + "55" : T.border}`,
                borderRadius: 8,
                cursor: "default",
                transition: "border-color .15s, background .15s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 10,
                  flexWrap: "wrap",
                  gap: 6,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      background: era.color,
                      borderRadius: 2,
                    }}
                  />
                  <div>
                    <span
                      style={{
                        color: T.textSub,
                        fontSize: 15,
                        fontWeight: 700,
                        fontFamily: "'Barlow Condensed',sans-serif",
                        letterSpacing: ".05em",
                      }}
                    >
                      {era.label}
                    </span>
                    <span
                      style={{
                        color: T.veryfaint,
                        fontSize: 9,
                        marginLeft: 8,
                        fontFamily: "'Barlow',sans-serif",
                      }}
                    >
                      {era.note}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      color: barCol,
                      fontSize: 22,
                      fontWeight: 800,
                      fontFamily: "'Barlow Condensed',monospace",
                    }}
                  >
                    {isGain ? "" : "+"}
                    {gain.toFixed(3)}s
                  </div>
                  <div
                    style={{
                      color: T.faint,
                      fontSize: 9,
                      fontFamily: "'Barlow',sans-serif",
                    }}
                  >
                    {isSingle
                      ? "first year only"
                      : `over ${numYrs} years · ${era.startYear}–${era.endYear}`}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ minWidth: 70, textAlign: "right" }}>
                  <div
                    style={{
                      color: T.faint,
                      fontSize: 8,
                      textTransform: "uppercase",
                      fontFamily: "'Barlow',sans-serif",
                    }}
                  >
                    {era.startYear}
                  </div>
                  <div
                    style={{
                      color: T.muted,
                      fontSize: 12,
                      fontFamily: "'Barlow Condensed',monospace",
                      fontWeight: 600,
                    }}
                  >
                    {fmtTime(era.startTime)}
                  </div>
                </div>
                <div style={{ flex: 1, position: "relative", height: 20 }}>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: T.border,
                      borderRadius: 10,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 2,
                      bottom: 2,
                      borderRadius: 8,
                      background: barCol,
                      opacity: 0.8,
                      left: isGain ? `${50 - pct / 2}%` : "50%",
                      width: `${pct / 2}%`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "10%",
                      bottom: "10%",
                      left: "50%",
                      width: 1,
                      background: T.muted,
                      opacity: 0.3,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                      color: barCol,
                      fontSize: 7.5,
                      fontFamily: "'Barlow',sans-serif",
                      fontWeight: 700,
                      letterSpacing: ".1em",
                      whiteSpace: "nowrap",
                      opacity: 0.7,
                    }}
                  >
                    {isGain ? "← FASTER" : "SLOWER →"}
                  </div>
                </div>
                <div style={{ minWidth: 70 }}>
                  <div
                    style={{
                      color: T.faint,
                      fontSize: 8,
                      textTransform: "uppercase",
                      fontFamily: "'Barlow',sans-serif",
                    }}
                  >
                    {era.endYear}
                  </div>
                  <div
                    style={{
                      color: T.muted,
                      fontSize: 12,
                      fontFamily: "'Barlow Condensed',monospace",
                      fontWeight: 600,
                    }}
                  >
                    {fmtTime(era.endTime)}
                  </div>
                </div>
              </div>

              {isHov && era.years && era.years.length > 1 && (
                <div
                  style={{
                    marginTop: 10,
                    paddingTop: 8,
                    borderTop: `1px solid ${T.border}`,
                    display: "flex",
                    gap: 24,
                    flexWrap: "wrap",
                  }}
                >
                  {[
                    ["Fastest pole", era.best, era.color],
                    ["Slowest pole", era.worst, T.muted],
                  ].map(([label, entry, col]) => (
                    <div key={label}>
                      <div
                        style={{
                          color: T.faint,
                          fontSize: 8,
                          letterSpacing: ".1em",
                          textTransform: "uppercase",
                          fontFamily: "'Barlow',sans-serif",
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          color: col,
                          fontSize: 12,
                          fontWeight: 700,
                          fontFamily: "'Barlow Condensed',monospace",
                        }}
                      >
                        {fmtTime(entry.time)} · {entry.driver} ({entry.year})
                      </div>
                    </div>
                  ))}
                  <div>
                    <div
                      style={{
                        color: T.faint,
                        fontSize: 8,
                        letterSpacing: ".1em",
                        textTransform: "uppercase",
                        fontFamily: "'Barlow',sans-serif",
                      }}
                    >
                      Avg gain/yr
                    </div>
                    <div
                      style={{
                        color: T.muted,
                        fontSize: 12,
                        fontWeight: 700,
                        fontFamily: "'Barlow Condensed',monospace",
                      }}
                    >
                      {(gain / Math.max(numYrs - 1, 1)).toFixed(3)}s
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Dumbbell ── */}
      <div style={{ width: "100%", maxWidth: 860 }}>
        <div
          style={{
            fontSize: 10,
            letterSpacing: ".2em",
            color: T.faint,
            textTransform: "uppercase",
            fontFamily: "'Barlow',sans-serif",
            marginBottom: 2,
            paddingLeft: 4,
          }}
        >
          Era start → end dumbbell
        </div>
        <div
          style={{
            fontSize: 10,
            color: T.veryfaint,
            fontFamily: "'Barlow',sans-serif",
            marginBottom: 14,
            paddingLeft: 4,
          }}
        >
          Opening pole vs closing pole — gap = total shift across era
        </div>
        <div style={{ overflowX: "auto" }}>
          <svg width={DB_W} height={DB_H}>
            {axisTicks.map((t) => {
              const x = toX(t),
                m = Math.floor(t / 60),
                s = (t % 60).toFixed(0).padStart(2, "0");
              return (
                <g key={t}>
                  <line
                    x1={x}
                    y1={DB_PAD_T - 12}
                    x2={x}
                    y2={DB_PAD_T + eraStats.length * DB_ROW_H}
                    stroke={T.gridLine}
                    strokeWidth={1}
                  />
                  <text
                    x={x}
                    y={DB_PAD_T - 16}
                    textAnchor="middle"
                    fill={T.svgLabel}
                    fontSize={9}
                    fontFamily="monospace"
                  >
                    {m}:{s}
                  </text>
                </g>
              );
            })}
            <text
              x={DB_PAD_L + DB_USABLE / 2}
              y={14}
              textAnchor="middle"
              fill={T.svgFaint}
              fontSize={8}
              fontFamily="'Barlow',sans-serif"
              letterSpacing=".15em"
            >
              POLE TIME — FASTER →
            </text>

            {eraStats.map((era, i) => {
              const cy = DB_PAD_T + i * DB_ROW_H + DB_ROW_H / 2;
              const isSingle = era.startYear === era.endYear;
              const isGain = era.delta < 0,
                cc = isGain ? "#4ade80" : "#f87171";
              const xS = toX(era.startTime),
                xE = toX(era.endTime);
              const isHov = hovDB === i;
              return (
                <g
                  key={era.startYear}
                  onMouseEnter={() => setHovDB(i)}
                  onMouseLeave={() => setHovDB(null)}
                  style={{ cursor: "default" }}
                >
                  {isHov && (
                    <rect
                      x={0}
                      y={DB_PAD_T + i * DB_ROW_H + 4}
                      width={DB_W}
                      height={DB_ROW_H - 8}
                      fill={era.color}
                      opacity={T.rowBandOp}
                      rx={4}
                    />
                  )}
                  <text
                    x={DB_PAD_L - 12}
                    y={cy - 6}
                    textAnchor="end"
                    fill={isHov ? T.textSub : T.muted}
                    fontSize={12}
                    fontWeight={700}
                    fontFamily="'Barlow Condensed',sans-serif"
                  >
                    {era.label}
                  </text>
                  <text
                    x={DB_PAD_L - 12}
                    y={cy + 8}
                    textAnchor="end"
                    fill={T.svgLabel}
                    fontSize={8.5}
                    fontFamily="'Barlow',sans-serif"
                  >
                    {isSingle
                      ? `${era.startYear}`
                      : `${era.startYear}–${era.endYear}`}
                  </text>
                  <line
                    x1={DB_PAD_L}
                    y1={cy}
                    x2={DB_PAD_L + DB_USABLE}
                    y2={cy}
                    stroke={T.gridLine}
                    strokeWidth={1}
                  />
                  {!isSingle && (
                    <>
                      <rect
                        x={Math.min(xS, xE)}
                        y={cy - 3}
                        width={Math.abs(xE - xS)}
                        height={6}
                        fill={cc}
                        opacity={isHov ? 0.25 : 0.12}
                        rx={3}
                      />
                      <line
                        x1={xS}
                        y1={cy}
                        x2={xE}
                        y2={cy}
                        stroke={cc}
                        strokeWidth={isHov ? 2 : 1.5}
                        opacity={isHov ? 0.9 : 0.55}
                      />
                      {(() => {
                        const d = xE > xS ? 1 : -1,
                          ax = xE + d * 2;
                        return (
                          <polygon
                            points={`${ax},${cy} ${ax - d * 7},${cy - 4} ${
                              ax - d * 7
                            },${cy + 4}`}
                            fill={cc}
                            opacity={isHov ? 0.9 : 0.5}
                          />
                        );
                      })()}
                      <circle
                        cx={xE}
                        cy={cy}
                        r={isHov ? 8 : 6}
                        fill={T.svgDotFill}
                        stroke={cc}
                        strokeWidth={isHov ? 2.5 : 2}
                      />
                      <circle cx={xE} cy={cy} r={isHov ? 4 : 3} fill={cc} />
                      <text
                        x={xE}
                        y={cy + (isHov ? 20 : 18)}
                        textAnchor="middle"
                        fill={cc}
                        fontSize={isHov ? 9.5 : 8}
                        fontFamily="'Barlow Condensed',monospace"
                        fontWeight={600}
                        opacity={isHov ? 1 : 0.7}
                      >
                        {fmtTime(era.endTime)}
                      </text>
                      <text
                        x={DB_W - DB_PAD_R + 8}
                        y={cy + 5}
                        textAnchor="start"
                        fill={cc}
                        fontSize={13}
                        fontWeight={800}
                        fontFamily="'Barlow Condensed',monospace"
                      >
                        {isGain ? "" : "+"}
                        {era.delta.toFixed(2)}s
                      </text>
                    </>
                  )}
                  <circle
                    cx={xS}
                    cy={cy}
                    r={isHov ? 8 : 6}
                    fill={T.svgDotFill}
                    stroke={era.color}
                    strokeWidth={isHov ? 2 : 1.5}
                  />
                  <circle
                    cx={xS}
                    cy={cy}
                    r={isHov ? 3.5 : 2.5}
                    fill={era.color}
                    opacity={0.7}
                  />
                  <text
                    x={xS}
                    y={cy - (isHov ? 14 : 12)}
                    textAnchor="middle"
                    fill={era.color}
                    fontSize={isHov ? 9.5 : 8}
                    fontFamily="'Barlow Condensed',monospace"
                    fontWeight={600}
                    opacity={isHov ? 1 : 0.6}
                  >
                    {fmtTime(era.startTime)}
                  </text>
                  {isSingle && (
                    <text
                      x={DB_W - DB_PAD_R + 8}
                      y={cy + 5}
                      textAnchor="start"
                      fill={T.muted}
                      fontSize={9}
                      fontFamily="'Barlow Condensed',monospace"
                    >
                      year 1
                    </text>
                  )}
                </g>
              );
            })}

            <g
              transform={`translate(${DB_PAD_L}, ${
                DB_PAD_T + eraStats.length * DB_ROW_H + 10
              })`}
            >
              <circle
                cx={6}
                cy={6}
                r={5}
                fill={T.svgDotFill}
                stroke={T.muted}
                strokeWidth={1.5}
              />
              <circle cx={6} cy={6} r={2} fill={T.muted} opacity={0.7} />
              <text
                x={15}
                y={10}
                fill={T.muted}
                fontSize={8.5}
                fontFamily="'Barlow',sans-serif"
              >
                Opening year
              </text>
              <circle
                cx={112}
                cy={6}
                r={5}
                fill={T.svgDotFill}
                stroke="#4ade80"
                strokeWidth={2}
              />
              <circle cx={112} cy={6} r={3} fill="#4ade80" />
              <text
                x={122}
                y={10}
                fill={T.muted}
                fontSize={8.5}
                fontFamily="'Barlow',sans-serif"
              >
                Closing year (faster)
              </text>
              <circle
                cx={272}
                cy={6}
                r={5}
                fill={T.svgDotFill}
                stroke="#f87171"
                strokeWidth={2}
              />
              <circle cx={272} cy={6} r={3} fill="#f87171" />
              <text
                x={282}
                y={10}
                fill={T.muted}
                fontSize={8.5}
                fontFamily="'Barlow',sans-serif"
              >
                Closing year (slower)
              </text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ── P2/P3 GAP TAB (TAB 3) ────────────────────────────────────────────────────
function GapTab({ T }) {
  const [hov, setHov] = useState(null);

  // ── Timeline scatter chart ──────────────────────────────────────────────────
  const TW = 820,
    TH = 260;
  const PL = 44,
    PR = 20,
    PT = 24,
    PB = 36;
  const USABLE_W = TW - PL - PR,
    USABLE_H = TH - PT - PB;
  const years = gapData.map((d) => d.year);
  const minY = years[0],
    maxY = years[years.length - 1];
  const toTx = (yr) => PL + ((yr - minY) / (maxY - minY)) * USABLE_W;
  const MAX_DISP = 2.0; // cap display at 2.0s
  const toTy = (g) =>
    PT + USABLE_H - (Math.min(g, MAX_DISP) / MAX_DISP) * USABLE_H;
  const gTicks = [0, 0.25, 0.5, 0.75, 1.0, 1.5, 2.0];

  // Gap line points — skip null/absent years
  const p2Pts = gapData
    .map((d) => `${toTx(d.year)},${toTy(d.p2.gap)}`)
    .join(" ");
  const p3Pts = gapData
    .map((d) => `${toTx(d.year)},${toTy(d.p3.gap)}`)
    .join(" ");

  // Era dividers for the timeline
  const eraDividers = [1998, 2000, 2006, 2014, 2022, 2026];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        gap: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 860,
          paddingLeft: 4,
          marginBottom: 6,
        }}
      >
        <div
          style={{
            fontSize: 10,
            letterSpacing: ".2em",
            color: T.faint,
            textTransform: "uppercase",
            fontFamily: "'Barlow',sans-serif",
            marginBottom: 3,
          }}
        >
          P2 &amp; P3 gap to pole · Australian Grand Prix 1994–2026 · hover dots
          for details
        </div>
        <div
          style={{
            fontSize: 10,
            color: T.veryfaint,
            fontFamily: "'Barlow',sans-serif",
          }}
        >
          1994–95 at Adelaide (3.78 km) · 1996–2021 at Albert Park old layout
          (5.303 km) · 2022+ at Albert Park new layout (5.278 km). Gaps within
          each year are comparable; times across circuits are not. ~ =
          approximate.
        </div>
      </div>

      {/* Stat pills */}
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          width: "100%",
          maxWidth: 860,
          paddingLeft: 4,
          marginBottom: 18,
        }}
      >
        {[
          {
            label: "Tightest P2 (new layout)",
            val: "2025 · +0.084s",
            sub: "Piastri (McLaren)",
            col: "#4ade80",
          },
          {
            label: "Tightest P2 (old layout)",
            val: "1998 · +0.043s",
            sub: "Coulthard (McLaren 1-2)",
            col: "#a78bfa",
          },
          {
            label: "Widest P2 (old layout)",
            val: "1997 · +1.752s",
            sub: "Frentzen · red-flagged session",
            col: "#f87171",
          },
          {
            label: "2019 P2 gap",
            val: "+0.112s",
            sub: "Vettel · closest since 2004",
            col: "#fbbf24",
          },
        ].map((p) => (
          <div
            key={p.label}
            style={{
              background: T.statBg,
              border: `1px solid ${T.statBorder}`,
              borderRadius: 7,
              padding: "8px 14px",
              minWidth: 155,
            }}
          >
            <div
              style={{
                color: T.faint,
                fontSize: 8,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                fontFamily: "'Barlow',sans-serif",
                marginBottom: 2,
              }}
            >
              {p.label}
            </div>
            <div
              style={{
                color: p.col,
                fontSize: 14,
                fontWeight: 800,
                fontFamily: "'Barlow Condensed',monospace",
              }}
            >
              {p.val}
            </div>
            <div
              style={{
                color: T.muted,
                fontSize: 9,
                fontFamily: "'Barlow',sans-serif",
              }}
            >
              {p.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Main timeline chart */}
      <div style={{ overflowX: "auto", width: "100%", maxWidth: "100vw" }}>
        <svg width={TW} height={TH + 10}>
          {/* Era bands */}
          {ERA_DEFS.map((era) => {
            const x1 = toTx(Math.max(era.startYear, minY));
            const x2 =
              era.endYear >= maxY
                ? TW - PR
                : toTx(Math.min(era.endYear + 0.9, maxY));
            if (x2 < PL) return null;
            return (
              <rect
                key={era.startYear}
                x={Math.max(PL, x1)}
                y={PT}
                width={Math.max(0, Math.min(x2, TW - PR) - Math.max(PL, x1))}
                height={USABLE_H}
                fill={era.color}
                opacity={T.rowBandOp}
              />
            );
          })}

          {/* Circuit dividers */}
          {(() => {
            const x96 = toTx(1996),
              x22 = toTx(2022);
            return (
              <g>
                <line
                  x1={x96}
                  y1={PT - 8}
                  x2={x96}
                  y2={PT + USABLE_H}
                  stroke="#e879f9"
                  strokeWidth={1}
                  strokeDasharray="5,3"
                  opacity={0.25}
                />
                <text
                  x={x96 + 3}
                  y={PT + 8}
                  fill="#e879f940"
                  fontSize={7}
                  fontFamily="'Barlow',sans-serif"
                >
                  ALBERT PARK
                </text>
                <line
                  x1={x22}
                  y1={PT - 8}
                  x2={x22}
                  y2={PT + USABLE_H}
                  stroke="#60a5fa"
                  strokeWidth={1}
                  strokeDasharray="5,3"
                  opacity={0.25}
                />
                <text
                  x={x22 + 3}
                  y={PT + 8}
                  fill="#60a5fa50"
                  fontSize={7}
                  fontFamily="'Barlow',sans-serif"
                >
                  NEW LAYOUT
                </text>
              </g>
            );
          })()}

          {/* Grid lines */}
          {gTicks.map((g) => {
            const y = toTy(g);
            return (
              <g key={g}>
                <line
                  x1={PL}
                  y1={y}
                  x2={TW - PR}
                  y2={y}
                  stroke={T.gridLine}
                  strokeWidth={g === 0 ? 1.5 : 1}
                />
                <text
                  x={PL - 5}
                  y={y + 4}
                  textAnchor="end"
                  fill={T.svgLabel}
                  fontSize={8}
                  fontFamily="monospace"
                >
                  {g === 0 ? "0" : `+${g.toFixed(2)}s`}
                </text>
              </g>
            );
          })}

          {/* Year axis labels — every 2 years */}
          {gapData
            .filter((_, i) => i % 2 === 0)
            .map((d) => (
              <text
                key={d.year}
                x={toTx(d.year)}
                y={PT + USABLE_H + 14}
                textAnchor="middle"
                fill={T.svgLabel}
                fontSize={8}
                fontFamily="'Barlow Condensed',sans-serif"
              >
                {d.year}
              </text>
            ))}

          {/* P3 line */}
          <polyline
            points={p3Pts}
            fill="none"
            stroke={T.trendLine2}
            strokeWidth={1.5}
            strokeDasharray="5,2"
            opacity={0.5}
          />
          {/* P2 line */}
          <polyline
            points={p2Pts}
            fill="none"
            stroke={T.trendLine1}
            strokeWidth={2}
            opacity={0.7}
          />

          {/* Dots */}
          {gapData.map((d) => {
            const hovP2 = hov && hov.year === d.year && hov.pos === 2;
            const hovP3 = hov && hov.year === d.year && hov.pos === 3;
            const cx2 = toTx(d.year),
              cy2 = toTy(d.p2.gap);
            const cx3 = toTx(d.year),
              cy3 = toTy(d.p3.gap);
            const col2 = teamColor(d.p2.team),
              col3 = teamColor(d.p3.team);
            return (
              <g key={d.year}>
                {/* P3 dot */}
                <circle
                  cx={cx3}
                  cy={cy3}
                  r={hovP3 ? 8 : 4}
                  fill={T.svgDotFill}
                  stroke={col3}
                  strokeWidth={hovP3 ? 2 : 1.2}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHov({ year: d.year, pos: 3 })}
                  onMouseLeave={() => setHov(null)}
                />
                <circle
                  cx={cx3}
                  cy={cy3}
                  r={hovP3 ? 4 : 2}
                  fill={col3}
                  opacity={0.7}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHov({ year: d.year, pos: 3 })}
                  onMouseLeave={() => setHov(null)}
                />
                {/* P2 dot */}
                <circle
                  cx={cx2}
                  cy={cy2}
                  r={hovP2 ? 8 : 4}
                  fill={T.svgDotFill}
                  stroke={col2}
                  strokeWidth={hovP2 ? 2 : 1.2}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHov({ year: d.year, pos: 2 })}
                  onMouseLeave={() => setHov(null)}
                />
                <circle
                  cx={cx2}
                  cy={cy2}
                  r={hovP2 ? 4 : 2}
                  fill={col2}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHov({ year: d.year, pos: 2 })}
                  onMouseLeave={() => setHov(null)}
                />

                {/* Hover tooltip */}
                {(hovP2 || hovP3) &&
                  (() => {
                    const pos = hovP2 ? 2 : 3,
                      entry = hovP2 ? d.p2 : d.p3;
                    const cx = hovP2 ? cx2 : cx3,
                      cy = hovP2 ? cy2 : cy3;
                    const col = teamColor(entry.team);
                    const tipX = Math.min(cx + 10, TW - 185);
                    return (
                      <g>
                        <rect
                          x={tipX}
                          y={cy - 44}
                          width={175}
                          height={42}
                          fill={T.tooltipBg}
                          stroke={col}
                          strokeWidth={0.8}
                          strokeOpacity={0.6}
                          rx={4}
                          opacity={0.97}
                        />
                        <text
                          x={tipX + 8}
                          y={cy - 28}
                          fill={col}
                          fontSize={10}
                          fontWeight={700}
                          fontFamily="'Barlow Condensed',monospace"
                        >
                          {d.year} P{pos} · {entry.driver} · {entry.team}
                        </text>
                        <text
                          x={tipX + 8}
                          y={cy - 13}
                          fill={T.muted}
                          fontSize={9}
                          fontFamily="'Barlow Condensed',monospace"
                        >
                          +{entry.gap.toFixed(3)}s{entry.approx ? " ~" : ""}
                          {getEra(d.year).label
                            ? `  ·  ${getEra(d.year).label.split(" ")[0]}`
                            : ""}
                          {d.note ? "  ⚠" : ""}
                        </text>
                      </g>
                    );
                  })()}
              </g>
            );
          })}

          {/* Legend */}
          <line
            x1={PL}
            y1={TH - 4}
            x2={PL + 20}
            y2={TH - 4}
            stroke={T.trendLine1}
            strokeWidth={2}
          />
          <text
            x={PL + 24}
            y={TH}
            fill={T.trendLabel}
            fontSize={8.5}
            fontFamily="'Barlow',sans-serif"
          >
            P2 gap
          </text>
          <line
            x1={PL + 70}
            y1={TH - 4}
            x2={PL + 90}
            y2={TH - 4}
            stroke={T.trendLine2}
            strokeWidth={1.5}
            strokeDasharray="5,2"
          />
          <text
            x={PL + 94}
            y={TH}
            fill={T.trendLabel}
            fontSize={8.5}
            fontFamily="'Barlow',sans-serif"
          >
            P3 gap
          </text>
          <text
            x={PL + 145}
            y={TH}
            fill={T.faint}
            fontSize={8.5}
            fontFamily="'Barlow',sans-serif"
          >
            dot colour = team · ~ = approx · capped at 2.0s
          </text>
        </svg>
      </div>

      {/* Notes */}
      <div
        style={{
          width: "100%",
          maxWidth: 860,
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {[
          {
            col: "#e879f9",
            note: "1994–95 (Adelaide Street Circuit, 3.78 km): A completely different track from Albert Park — times are NOT comparable. 1994: Mansell pole with Schumacher just 0.018s back (rain on Saturday locked in Friday's times). 1995: Hill/Coulthard Williams 1-2 covered by 0.123s; Schumacher P3 +0.334s.",
          },
          {
            col: "#c084fc",
            note: "1996–97 (V10 standard tyres): Williams dominant. 1997 gap especially extreme — session was red-flagged late, denying rivals a final push. Frentzen P2 at +1.752s, Schumacher P3 near +1.9s.",
          },
          {
            col: "#a78bfa",
            note: "1998–99 (grooved tyres, narrow cars): McLaren utterly dominant in qualifying. Coulthard +0.043s in 1998 = closest front-row at Albert Park ever. Schumacher relegated to +0.757s and +1.319s.",
          },
          {
            col: "#818cf8",
            note: "2000–05 (V10 peak): Ferrari dominated the era. 2002 pole margin was just 0.005s (Barrichello/Schumacher Ferrari 1-2). 2003–05 P2/P3 values are approximate.",
          },
          {
            col: "#fb923c",
            note: "2006–13 (V8 era): More competitive field. P2 gaps generally 0.1–0.4s. 2009 Brawn's debut front-row lockout (+0.303s) and 2013 Lotus/Red Bull competitiveness stand out.",
          },
          {
            col: "#34d399",
            note: "2014–19 (V6 hybrid): Six straight Hamilton poles. P3 gap varied widely — 2014 wet Q3 compressed gaps; 2017 Ferrari genuinely competitive with Vettel just +0.268s. 2019 Vettel P2 +0.112s was closest Albert Park P2 in 15 years.",
          },
          {
            col: "#60a5fa",
            note: "2022+ (new layout): Circuit redesign made Albert Park faster and more spectacular. 2026 P3 gap of +0.785s stands out against the tightly-bunched 2022–25 era.",
          },
        ].map((n) => (
          <div
            key={n.col}
            style={{
              display: "flex",
              gap: 8,
              padding: "8px 12px",
              background: T.noteBg,
              border: `1px solid ${T.noteBorder}`,
              borderRadius: 6,
            }}
          >
            <div
              style={{
                width: 3,
                minWidth: 3,
                borderRadius: 2,
                background: n.col,
                alignSelf: "stretch",
              }}
            />
            <div
              style={{
                color: T.noteText,
                fontSize: 9,
                fontFamily: "'Barlow',sans-serif",
                lineHeight: 1.65,
              }}
            >
              {n.note}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ERA CHANGE P1/P2/P3 TAB ──────────────────────────────────────────────────
const ERA_CHANGE_DATA = [
  {
    year: 1994,
    era: "Driver Aids Banned",
    eraColor: "#e879f9",
    note: "Interlagos · 4.325 km · BRA Rd 1",
    p1: { driver: "Senna", team: "Williams", gap: 0, approx: false },
    p2: { driver: "Schumacher", team: "Benetton", gap: 0.328, approx: false },
    p3: { driver: "Alesi", team: "Ferrari", gap: 1.1, approx: true },
  },
  {
    year: 1998,
    era: "Grooved Tyres + Narrow Cars",
    eraColor: "#a78bfa",
    note: "Albert Park · 5.303 km · AUS Rd 1",
    p1: { driver: "Häkkinen", team: "McLaren", gap: 0, approx: false },
    p2: { driver: "Coulthard", team: "McLaren", gap: 0.043, approx: false },
    p3: { driver: "Schumacher", team: "Ferrari", gap: 0.757, approx: false },
  },
  {
    year: 2000,
    era: "V10 Peak Era",
    eraColor: "#818cf8",
    note: "Albert Park · 5.303 km · AUS Rd 1",
    p1: { driver: "Häkkinen", team: "McLaren", gap: 0, approx: false },
    p2: { driver: "Coulthard", team: "McLaren", gap: 0.3, approx: true },
    p3: {
      driver: "M.Schumacher",
      team: "Ferrari",
      gap: 0.6,
      approx: true,
      noteFlag: "Lap aborted by red flag",
    },
  },
  {
    year: 2006,
    era: "V8 Era (2.4L)",
    eraColor: "#fb923c",
    note: "Albert Park · 5.303 km · AUS Rd 1",
    p1: { driver: "Button", team: "Honda", gap: 0, approx: false },
    p2: { driver: "Fisichella", team: "Renault", gap: 0.4, approx: true },
    p3: { driver: "Alonso", team: "Renault", gap: 0.5, approx: true },
  },
  {
    year: 2009,
    era: "KERS + Slick Tyres",
    eraColor: "#4ade80",
    note: "Albert Park · 5.303 km · AUS Rd 1",
    p1: { driver: "Button", team: "Brawn", gap: 0, approx: false },
    p2: { driver: "Barrichello", team: "Brawn", gap: 0.303, approx: false },
    p3: { driver: "Vettel", team: "Red Bull", gap: 0.628, approx: false },
  },
  {
    year: 2014,
    era: "V6 Turbo Hybrid",
    eraColor: "#34d399",
    note: "Albert Park · 5.303 km · AUS Rd 1 · Wet Q3",
    wet: true,
    p1: { driver: "Hamilton", team: "Mercedes", gap: 0, approx: false },
    p2: { driver: "Ricciardo", team: "Red Bull", gap: 0.317, approx: false },
    p3: { driver: "Rosberg", team: "Mercedes", gap: 0.364, approx: false },
  },
  {
    year: 2017,
    era: "Wider Cars + Bigger Tyres",
    eraColor: "#fbbf24",
    note: "Albert Park · 5.303 km · AUS Rd 1",
    p1: { driver: "Hamilton", team: "Mercedes", gap: 0, approx: false },
    p2: { driver: "Vettel", team: "Ferrari", gap: 0.268, approx: false },
    p3: { driver: "Bottas", team: "Mercedes", gap: 0.293, approx: false },
  },
  {
    year: 2022,
    era: "Ground Effect Regs",
    eraColor: "#60a5fa",
    note: "Bahrain Int'l · 5.412 km · BHR Rd 1",
    p1: { driver: "Leclerc", team: "Ferrari", gap: 0, approx: false },
    p2: { driver: "Verstappen", team: "Red Bull", gap: 0.123, approx: false },
    p3: { driver: "Sainz", team: "Ferrari", gap: 0.129, approx: false },
  },
  {
    year: 2026,
    era: "2026 Regs (MGU-H out)",
    eraColor: "#f472b6",
    note: "Albert Park · 5.278 km · AUS Rd 1",
    p1: { driver: "Russell", team: "Mercedes", gap: 0, approx: false },
    p2: { driver: "Antonelli", team: "Mercedes", gap: 0.293, approx: false },
    p3: { driver: "Hadjar", team: "Red Bull", gap: 0.785, approx: false },
  },
];

function EraChangeTab({ T }) {
  const [hov, setHov] = useState(null);

  const PAD_L = 100,
    PAD_R = 32,
    PAD_T = 52,
    PAD_B = 40;
  const ROW_H = 80;
  const TRACK_W = 500;
  const SVG_W = PAD_L + TRACK_W + PAD_R + 160;
  const SVG_H = PAD_T + ERA_CHANGE_DATA.length * ROW_H + PAD_B;
  const MAX_G = 1.2;
  const toX = (g) => PAD_L + (g / MAX_G) * TRACK_W;
  const axisTicks = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
  const P_OFFSETS = [-14, 0, 14];
  const rowCY = (i) => PAD_T + i * ROW_H + ROW_H / 2;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 860,
          paddingLeft: 4,
          marginBottom: 4,
        }}
      >
        <div
          style={{
            fontSize: 10,
            letterSpacing: ".2em",
            color: T.faint,
            textTransform: "uppercase",
            fontFamily: "'Barlow',sans-serif",
          }}
        >
          P1 · P2 · P3 gaps at each regulation era opener
        </div>
        <div
          style={{
            fontSize: 10,
            color: T.veryfaint,
            fontFamily: "'Barlow',sans-serif",
            marginTop: 3,
            marginBottom: 12,
          }}
        >
          Nine major regulation changes, 1994–2026. Each plotted at its actual
          season-opening race — tracks vary. Gaps within each year are directly
          comparable; absolute lap times across rows are not.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          width: "100%",
          maxWidth: 860,
          paddingLeft: 4,
          marginBottom: 20,
        }}
      >
        {[
          {
            label: "Tightest P3 (confirmed)",
            val: "2022 BHR · +0.129s",
            sub: "Sainz · Ferrari 1–3",
            col: "#34d399",
          },
          {
            label: "Widest P3 (confirmed)",
            val: "2026 AUS · +0.785s",
            sub: "Hadjar · biggest modern gap",
            col: "#f87171",
          },
          {
            label: "Tightest P2 (all eras)",
            val: "1998 AUS · +0.043s",
            sub: "Coulthard · McLaren 1–2",
            col: "#a78bfa",
          },
          {
            label: "Same-team 1–2",
            val: "1998 · 2000 · 2009 · 2026",
            sub: "McLaren / McLaren / Brawn / Mercedes",
            col: "#fbbf24",
          },
        ].map((p) => (
          <div
            key={p.label}
            style={{
              background: T.statBg,
              border: `1px solid ${T.statBorder}`,
              borderRadius: 7,
              padding: "8px 14px",
              minWidth: 155,
            }}
          >
            <div
              style={{
                color: T.faint,
                fontSize: 8,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                fontFamily: "'Barlow',sans-serif",
                marginBottom: 2,
              }}
            >
              {p.label}
            </div>
            <div
              style={{
                color: p.col,
                fontSize: 14,
                fontWeight: 800,
                fontFamily: "'Barlow Condensed',monospace",
              }}
            >
              {p.val}
            </div>
            <div
              style={{
                color: T.muted,
                fontSize: 9,
                fontFamily: "'Barlow',sans-serif",
              }}
            >
              {p.sub}
            </div>
          </div>
        ))}
      </div>

      <div style={{ overflowX: "auto", width: "100%", maxWidth: "100vw" }}>
        <svg width={SVG_W} height={SVG_H}>
          {axisTicks.map((s) => {
            const x = toX(s);
            return (
              <g key={s}>
                <line
                  x1={x}
                  y1={PAD_T - 14}
                  x2={x}
                  y2={SVG_H - PAD_B}
                  stroke={T.gridLine}
                  strokeWidth={s === 0 ? 2 : 1}
                />
                <text
                  x={x}
                  y={PAD_T - 18}
                  textAnchor="middle"
                  fill={T.svgLabel}
                  fontSize={9}
                  fontFamily="monospace"
                >
                  {s === 0 ? "POLE" : `+${s.toFixed(1)}s`}
                </text>
              </g>
            );
          })}
          <text
            x={PAD_L + TRACK_W / 2}
            y={14}
            textAnchor="middle"
            fill={T.svgFaint}
            fontSize={8}
            fontFamily="'Barlow',sans-serif"
            letterSpacing=".15em"
          >
            QUALIFYING GAP TO POLE — LARGER GAP = MORE DOMINANT LEADER
          </text>

          {ERA_CHANGE_DATA.map((row, ri) => {
            const cy = rowCY(ri);
            const positions = [row.p1, row.p2, row.p3];
            const posLabels = ["P1", "P2", "P3"];

            return (
              <g key={row.year}>
                <rect
                  x={0}
                  y={PAD_T + ri * ROW_H + 2}
                  width={SVG_W}
                  height={ROW_H - 4}
                  fill={row.eraColor}
                  opacity={T.rowBandOp}
                  rx={3}
                />

                {ri === 7 && (
                  <g>
                    <line
                      x1={0}
                      y1={PAD_T + ri * ROW_H - 1}
                      x2={SVG_W}
                      y2={PAD_T + ri * ROW_H - 1}
                      stroke="#60a5fa"
                      strokeWidth={1}
                      strokeDasharray="6,3"
                      opacity={0.3}
                    />
                    <text
                      x={PAD_L + 4}
                      y={PAD_T + ri * ROW_H - 5}
                      fill="#60a5fa60"
                      fontSize={7.5}
                      fontFamily="'Barlow',sans-serif"
                    >
                      GROUND EFFECT ERA — BAHRAIN ↓
                    </text>
                  </g>
                )}

                <text
                  x={PAD_L - 10}
                  y={cy - 8}
                  textAnchor="end"
                  fill={row.eraColor}
                  fontSize={18}
                  fontWeight={800}
                  fontFamily="'Barlow Condensed',sans-serif"
                >
                  {row.year}
                </text>
                <text
                  x={PAD_L - 10}
                  y={cy + 6}
                  textAnchor="end"
                  fill={T.svgLabel}
                  fontSize={7.5}
                  fontFamily="'Barlow',sans-serif"
                >
                  {row.note}
                </text>
                {row.wet && (
                  <text
                    x={PAD_L - 10}
                    y={cy + 17}
                    textAnchor="end"
                    fill="#60a5fa"
                    fontSize={7}
                    fontFamily="'Barlow',sans-serif"
                  >
                    💧 wet
                  </text>
                )}

                <line
                  x1={toX(0)}
                  y1={cy + P_OFFSETS[0]}
                  x2={toX(0)}
                  y2={cy + P_OFFSETS[2]}
                  stroke={row.eraColor}
                  strokeWidth={1}
                  opacity={0.25}
                />

                {positions.map((pos, pi) => {
                  const x = toX(pos.gap);
                  const y = cy + P_OFFSETS[pi];
                  const isHovDot =
                    hov && hov.year === row.year && hov.pi === pi;
                  const col = pi === 0 ? row.eraColor : teamColor(pos.team);

                  return (
                    <g key={pi}>
                      {pos.gap > 0 && (
                        <line
                          x1={toX(0)}
                          y1={y}
                          x2={x}
                          y2={y}
                          stroke={col}
                          strokeWidth={isHovDot ? 2 : 1.5}
                          opacity={isHovDot ? 0.9 : 0.5}
                          strokeDasharray={pos.approx ? "3,2" : "0"}
                        />
                      )}
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovDot ? 9 : pi === 0 ? 7 : 5}
                        fill={T.svgDotFill}
                        stroke={col}
                        strokeWidth={isHovDot ? 2.5 : pi === 0 ? 2 : 1.5}
                        style={{ cursor: "pointer" }}
                        onMouseEnter={() => setHov({ year: row.year, pi })}
                        onMouseLeave={() => setHov(null)}
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovDot ? 5 : pi === 0 ? 3.5 : 2.5}
                        fill={col}
                        opacity={isHovDot ? 1 : 0.85}
                        style={{ cursor: "pointer" }}
                        onMouseEnter={() => setHov({ year: row.year, pi })}
                        onMouseLeave={() => setHov(null)}
                      />

                      <text
                        x={x - (pi === 0 ? 11 : 9)}
                        y={y + 4}
                        textAnchor="end"
                        fill={col}
                        fontSize={pi === 0 ? 9 : 8}
                        fontWeight={700}
                        fontFamily="'Barlow Condensed',sans-serif"
                        opacity={0.8}
                      >
                        {posLabels[pi]}
                      </text>

                      {pi > 0 && (
                        <text
                          x={x + 9}
                          y={y + 4}
                          fill={col}
                          fontSize={10}
                          fontWeight={700}
                          fontFamily="'Barlow Condensed',monospace"
                          opacity={isHovDot ? 1 : 0.7}
                        >
                          +{pos.gap.toFixed(3)}s{pos.approx ? "~" : ""}
                        </text>
                      )}

                      {isHovDot &&
                        (() => {
                          const tipX = x + (pi === 0 ? -130 : 10);
                          const safeX = Math.max(
                            PAD_L,
                            Math.min(tipX, SVG_W - 145)
                          );
                          const poleEntry = allData.find(
                            (d) => d.year === row.year
                          );
                          return (
                            <g>
                              <rect
                                x={safeX}
                                y={y - 30}
                                width={135}
                                height={28}
                                fill={T.tooltipBg}
                                stroke={col}
                                strokeWidth={0.8}
                                strokeOpacity={0.5}
                                rx={4}
                                opacity={0.96}
                              />
                              <text
                                x={safeX + 7}
                                y={y - 17}
                                fill={col}
                                fontSize={10}
                                fontWeight={700}
                                fontFamily="'Barlow Condensed',monospace"
                              >
                                {pos.driver} · {pos.team}
                              </text>
                              <text
                                x={safeX + 7}
                                y={y - 7}
                                fill={T.muted}
                                fontSize={8.5}
                                fontFamily="'Barlow Condensed',monospace"
                              >
                                {pi === 0 && poleEntry
                                  ? `POLE ${fmtTime(poleEntry.time)}`
                                  : `+${pos.gap.toFixed(3)}s${
                                      pos.approx ? " ~" : ""
                                    }${pos.noteFlag ? " ⚠" : ""}`}
                              </text>
                            </g>
                          );
                        })()}
                    </g>
                  );
                })}

                {row.p2.gap > 0 && row.p3.gap > 0 && (
                  <rect
                    x={toX(row.p2.gap)}
                    y={cy - 2}
                    width={Math.max(0, toX(row.p3.gap) - toX(row.p2.gap))}
                    height={4}
                    fill={row.eraColor}
                    opacity={0.12}
                    rx={2}
                  />
                )}
              </g>
            );
          })}

          <g transform={`translate(${PAD_L}, ${SVG_H - 24})`}>
            <circle
              cx={5}
              cy={5}
              r={5}
              fill={T.svgDotFill}
              stroke="#fbbf24"
              strokeWidth={2}
            />
            <circle cx={5} cy={5} r={2.5} fill="#fbbf24" />
            <text
              x={14}
              y={9}
              fill={T.muted}
              fontSize={8.5}
              fontFamily="'Barlow',sans-serif"
            >
              P1 pole
            </text>
            <circle
              cx={72}
              cy={5}
              r={4}
              fill={T.svgDotFill}
              stroke={T.muted}
              strokeWidth={1.5}
            />
            <circle cx={72} cy={5} r={2} fill={T.muted} />
            <text
              x={80}
              y={9}
              fill={T.muted}
              fontSize={8.5}
              fontFamily="'Barlow',sans-serif"
            >
              P2
            </text>
            <circle
              cx={108}
              cy={5}
              r={4}
              fill={T.svgDotFill}
              stroke={T.muted}
              strokeWidth={1.5}
            />
            <circle cx={108} cy={5} r={2} fill={T.muted} />
            <text
              x={116}
              y={9}
              fill={T.muted}
              fontSize={8.5}
              fontFamily="'Barlow',sans-serif"
            >
              P3
            </text>
            <text
              x={160}
              y={9}
              fill={T.faint}
              fontSize={8.5}
              fontFamily="'Barlow',sans-serif"
            >
              ~ = approx · dot colour = team · hover for details
            </text>
          </g>
        </svg>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: 860,
          marginTop: 16,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {[
          {
            col: "#e879f9",
            note: "1994 Brazil: Traction control, active suspension, ABS all banned. Senna's Williams pole at 1:15.962. Schumacher gap exact (+0.328s). Alesi P3 recorded as 'over a second slower than the leading two' — marked approximate at ~+1.1s. Hill P4 was +1.592s (exact).",
          },
          {
            col: "#a78bfa",
            note: "1998 Australia: New narrow-car + grooved tyre rules. McLaren MP4/13 utterly dominant — 0.757s clear of Ferrari in 3rd. Häkkinen beat Coulthard by just 0.043s in one of the closest same-team front rows in history.",
          },
          {
            col: "#818cf8",
            note: "2000 Australia: Peak V10 era. McLaren 1-2 again. Coulthard gap sourced as 'three tenths'. Schumacher's P3 lap was red-flagged mid-run after Coulthard's crash — time carried over, flagged as approximate.",
          },
          {
            col: "#fb923c",
            note: "2006 Australia: V10 → V8 2.4L engine switch. Button took pole on a heavier Honda fuel load. Fisichella/Alonso gaps approximately ±0.05s (reliable reference: 'four tenths' and 'five tenths').",
          },
          {
            col: "#4ade80",
            note: "2009 Australia: KERS introduced, slick tyres return, major aero cuts. Brawn GP's debut race — front-row lockout for a team that didn't exist three months earlier. Vettel P3 exact. Toyotas originally P6/P8 were excluded for illegal rear wings.",
          },
          {
            col: "#34d399",
            note: "2014 Australia: V6 turbo hybrid debut. Wet Q3 on full wets — gaps within the session are valid but absolute lap times not comparable (1:44.2 pole). Rosberg's +0.364s remains the tightest confirmed P3 gap across the old-layout era openers.",
          },
          {
            col: "#fbbf24",
            note: "2017 Australia: Wider cars, wider tyres — billed as 3–4s faster but delivered ~2s improvement. Hamilton pole 1:22.188. Ferrari split the Mercedes drivers in P2 with Vettel; Bottas just 0.025s back in P3 — Mercedes were strong but not dominant.",
          },
          {
            col: "#60a5fa",
            note: "2022 Bahrain: True season opener for the ground-effect era — Bahrain was Round 1, not Australia. Leclerc/Verstappen/Sainz covered by 0.129s; Ferrari teammates P1 and P3. The tightest confirmed top-3 spread of any era opener on this chart.",
          },
          {
            col: "#f472b6",
            note: "2026 Australia: MGU-H removed, MGU-K tripled (350 kW ≈ half total power), active aero with Straight/Overtake Modes. Energy super-clipping dominated. Russell pole 1:18.518 — slower than Leclerc's 2022 Albert Park pole. Mercedes 1-2 but Hadjar's +0.785s is the largest era-opener P3 gap since 1994.",
          },
        ].map((n) => (
          <div
            key={n.col}
            style={{
              display: "flex",
              gap: 8,
              padding: "8px 12px",
              background: T.noteBg,
              border: `1px solid ${T.noteBorder}`,
              borderRadius: 6,
            }}
          >
            <div
              style={{
                width: 3,
                minWidth: 3,
                borderRadius: 2,
                background: n.col,
                alignSelf: "stretch",
              }}
            />
            <div
              style={{
                color: T.noteText,
                fontSize: 9,
                fontFamily: "'Barlow',sans-serif",
                lineHeight: 1.65,
              }}
            >
              {n.note}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ROOT APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState(0);
  const [dark, setDark] = useState(true);
  const T = THEMES[dark ? "dark" : "light"];

  const TABS = [
    "01  Pole History",
    "02  Era Analysis",
    "03  Front Row Gaps",
    "04  Era Openers",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 12px 52px",
        fontFamily: "'Barlow Condensed','Arial Narrow',sans-serif",
        transition: "background .25s, color .25s",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;800&family=Barlow:wght@300;400;500&display=swap');
        *{box-sizing:border-box;}
      `}</style>

      {/* Header row */}
      <div
        style={{
          width: "100%",
          maxWidth: 920,
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 8,
        }}
      >
        <button
          onClick={() => setDark((d) => !d)}
          title="Toggle light / dark mode"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 12px",
            borderRadius: 20,
            background: T.toggleBg,
            border: `1px solid ${T.toggleBorder}`,
            color: T.toggleText,
            fontSize: 11,
            fontFamily: "'Barlow',sans-serif",
            cursor: "pointer",
            letterSpacing: ".05em",
            transition: "all .2s",
          }}
        >
          <span style={{ fontSize: 14 }}>{T.sunMoon}</span>
          <span>{dark ? "Light mode" : "Dark mode"}</span>
        </button>
      </div>

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div
          style={{
            fontSize: 10,
            letterSpacing: ".3em",
            color: T.faint,
            textTransform: "uppercase",
            fontFamily: "'Barlow',sans-serif",
            marginBottom: 3,
          }}
        >
          Adelaide 1994–95 · Albert Park 1996–2026
        </div>
        <h1
          style={{
            fontSize: "clamp(18px,5vw,30px)",
            fontWeight: 800,
            color: T.text,
            letterSpacing: ".05em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Australian GP · 32 Years of Qualifying
        </h1>
        <div
          style={{
            fontSize: 11,
            color: T.faint,
            marginTop: 3,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            fontFamily: "'Barlow',sans-serif",
          }}
        >
          Pole times · era gains · front row competition · era openers
        </div>
      </div>

      {/* Era legend */}
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        {ERA_DEFS.map((e) => (
          <div
            key={e.startYear}
            style={{ display: "flex", alignItems: "center", gap: 5 }}
          >
            <div
              style={{
                width: 9,
                height: 4,
                background: e.color,
                borderRadius: 2,
              }}
            />
            <span
              style={{
                color: T.muted,
                fontSize: 9.5,
                fontFamily: "'Barlow',sans-serif",
              }}
            >
              {e.label}
            </span>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          gap: 2,
          marginBottom: 24,
          background: T.tabBar,
          borderRadius: 8,
          padding: 3,
          width: "100%",
          maxWidth: 600,
        }}
      >
        {TABS.map((label, i) => (
          <button
            key={i}
            onClick={() => setTab(i)}
            style={{
              flex: 1,
              padding: "8px 6px",
              border: `1px solid ${tab === i ? T.tabBorder : "transparent"}`,
              borderRadius: 6,
              background: tab === i ? T.tabActive : "transparent",
              color: tab === i ? T.tabText : T.tabInactive,
              fontSize: "clamp(9px,2vw,11px)",
              fontFamily: "'Barlow Condensed',sans-serif",
              fontWeight: tab === i ? 700 : 400,
              letterSpacing: ".05em",
              cursor: "pointer",
              textTransform: "uppercase",
              transition: "all .15s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div style={{ width: "100%", maxWidth: 920 }}>
        {tab === 0 && <PoleHistoryTab T={T} />}
        {tab === 1 && <EraAnalysisTab T={T} />}
        {tab === 2 && <GapTab T={T} />}
        {tab === 3 && <EraChangeTab T={T} />}
      </div>
    </div>
  );
}
