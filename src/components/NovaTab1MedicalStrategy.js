import React, { useState } from 'react';
import {
  Layers, Target, Microscope, BookOpen, Users, FileText, BarChart2,
  Heart, TrendingUp, TrendingDown, ChevronDown, ChevronUp, FileDown,
  Sparkles, AlertCircle, MapPin, Calendar, MessageSquare, X,
  CheckCircle, ArrowRight, DollarSign, Brain, Zap, Activity,
} from 'lucide-react';
import {
  ISP_PILLARS, MEDICAL_OBJECTIVES, COVERAGE_TARGETS, EMERGING_THEMES,
  INSIGHT_SOURCES,
} from '../config';

// ─── Mock data (structural — override per demo via config when needed) ────

const TACTIC_POA = [
  { id: 'T1', name: 'Evidence Generation',      Icon: Microscope, budget: '$1.8M', pct: 28, moRefs: ['MO1','MO3','MO4'], signalCount: 3, signalStatus: 'Active',  deliverables: ['RWE sub-analysis protocol', 'Registry data submission', 'Pediatric outcomes abstract'], novaSummary: 'Signal volume is high. Three field signals this cycle point to evidence gaps in rare subpopulations as the #1 barrier to MO1 progress.' },
  { id: 'T2', name: 'Medical Education',         Icon: BookOpen,   budget: '$1.4M', pct: 22, moRefs: ['MO1','MO2'],       signalCount: 2, signalStatus: 'Monitor', deliverables: ['Switch education module', 'Community HCP webinar series', 'Switch FAQ co-creation'], novaSummary: 'Two signals: HCP-facing switch materials read as academic. Community-language adaptation is overdue.' },
  { id: 'T3', name: 'Field Medical Engagement',  Icon: Users,      budget: '$1.6M', pct: 25, moRefs: ['MO1','MO2','MO3'], signalCount: 5, signalStatus: 'Alert',   deliverables: ['MSL interaction quality programme', 'KOL engagement plan refresh', 'Congress debrief protocol'], novaSummary: 'Highest signal volume of any tactic. Five signals flagged — MO2 switching inertia and MO3 guideline positioning are both active.' },
  { id: 'T4', name: 'Scientific Communications', Icon: FileText,   budget: '$0.6M', pct:  9, moRefs: ['MO2','MO3','MO4'], signalCount: 1, signalStatus: 'Active',  deliverables: ['Peer-reviewed manuscript pipeline', 'Congress poster submissions', 'Scientific platform refresh'], novaSummary: 'One signal: NMOSD sequencing data gap. RWE sub-analysis scope would directly feed the manuscript pipeline.' },
  { id: 'T5', name: 'HEOR',                      Icon: BarChart2,  budget: '$0.5M', pct:  8, moRefs: ['MO3','MO4'],       signalCount: 0, signalStatus: 'Monitor', deliverables: ['Cost-effectiveness model update', 'Burden-of-disease publication'], novaSummary: 'No new signals this cycle. Budget allocation reviewed; no reallocation proposed.' },
  { id: 'T6', name: 'Patient Advocacy',          Icon: Heart,      budget: '$0.5M', pct:  8, moRefs: ['MO1','MO2'],       signalCount: 1, signalStatus: 'Active',  deliverables: ['Patient organisation engagement plan', 'Disease awareness co-creation'], novaSummary: 'One signal: community infusion centres requesting patient-facing materials. Aligns with MO2 switch education deliverable.' },
];

const INSIGHT_LOOPS = [
  {
    id: 'IL1', tactic: 'Evidence Generation', moRef: 'MO1',
    signals: [
      { source: 'MSL interaction', msl: 'J. Morgan', territory: 'NE Region', date: '2026-06-04', text: 'Community haematologists asking for pediatric 3-year retention data before enrolling. "We won\'t enrol without it."' },
      { source: 'Congress debrief', msl: 'A. Patel', territory: 'SE Region', date: '2026-05-28', text: 'AAN satellite symposium: 4 of 6 panellists cited NMOSD long-term RWE gap as the main sequencing barrier.' },
    ],
    novaSynthesis: 'Pattern across 2 source types: pediatric and NMOSD long-term evidence are the primary barriers to MO1 progress. Confidence: 82%.',
    insight: { id: 'AI2', confidence: 0.82, status: 'Validated', title: 'RWE gap — long-term NMOSD outcomes', summary: 'NMOSD specialists sequencing C5 vs IL-6 vs CD19 without head-to-head long-term data. Retention and relapse-free survival data requested.' },
    action: { title: 'Scope long-term NMOSD relapse-free RWE sub-analysis with HEOR', owner: 'HEOR', dueBy: '2026-Q4', moRef: 'MO1' },
    loopCondition: 'RWE sub-analysis protocol approved by HEOR',
    loopMet: false,
  },
  {
    id: 'IL2', tactic: 'Field Medical Engagement', moRef: 'MO2',
    signals: [
      { source: 'MSL interaction', msl: 'S. Chen', territory: 'MW Region', date: '2026-06-10', text: '"Patients who are stable are stable — I don\'t want to mess with it, even though the dosing interval would be easier."' },
      { source: 'Med Info query', msl: 'L. Torres', territory: 'SW Region', date: '2026-06-01', text: 'Infusion centre nurse asked for a switch protocol sheet she can hand to scheduling staff.' },
      { source: 'Ad board', msl: 'K. Davis', territory: 'National', date: '2026-05-20', text: '"Switching data convincing on paper but we need a cleaner community-facing algorithm."' },
    ],
    novaSynthesis: 'Switching inertia is framing-based, not knowledge-based. Community language adaptation is the critical lever. Confidence: 87%.',
    insight: { id: 'AI1', confidence: 0.87, status: 'Prioritised', title: 'Infusion-burden concern persists', summary: 'Community haematologists cite biweekly infusion burden as a decision point, but switching inertia remains high even where switching is appropriate.' },
    action: { title: 'Develop community-facing switch-stability narrative', owner: 'Field Medical', dueBy: '2026-Q3', moRef: 'MO2' },
    loopCondition: 'Switch-stability narrative reviewed, approved and deployed to MSL tablets',
    loopMet: true,
  },
  {
    id: 'IL3', tactic: 'Medical Education', moRef: 'MO2',
    signals: [
      { source: 'MSL interaction', msl: 'R. Kim', territory: 'NW Region', date: '2026-06-08', text: 'GP registrar asked for patient FAQs for switch discussion. "Something the patient can take home."' },
      { source: 'MSL interaction', msl: 'B. Walker', territory: 'NE Region', date: '2026-05-30', text: '"The switch FAQ on the portal is written for consultants, not patients."' },
      { source: 'MSL interaction', msl: 'T. Evans', territory: 'SE Region', date: '2026-05-22', text: 'Three infusion centres requested co-creation of patient-friendly switch materials. Offering to join review panel.' },
    ],
    novaSynthesis: 'Three independent signals from different territories, same gap: patient-facing switch language is absent. Co-creation opportunity with community HCPs. Confidence: 91%.',
    insight: { id: 'AI4', confidence: 0.91, status: 'Prioritised', title: 'Switch-stability concerns from community centres', summary: 'Community infusion centres want a patient-facing switch-stability narrative; current MSL materials read as academic.' },
    action: { title: 'Develop patient-facing switch FAQ (co-created with community HCPs)', owner: 'Medical Comms', dueBy: '2026-Q3', moRef: 'MO2' },
    loopCondition: 'Switch FAQ approved, deployed to community centres and MSL tablets',
    loopMet: false,
  },
  {
    id: 'IL4', tactic: 'Scientific Communications', moRef: 'MO3',
    signals: [
      { source: 'Congress debrief', msl: 'A. Patel', territory: 'SE Region', date: '2026-06-05', text: 'gMG guideline steering member: "Bring us the refractory subgroup data and we have something to work with. The current language is too hedged."' },
    ],
    novaSynthesis: 'Single high-credibility signal from a guideline steering member. Low volume but high strategic value — this is a gating signal for MO3 progress. Confidence: 71%.',
    insight: { id: 'AI3', confidence: 0.71, status: 'Triaged', title: 'gMG guideline positioning opportunity', summary: 'Current gMG guidelines position C5 inhibition neutrally. Steering-committee KOLs open to strengthening with additional refractory-subgroup evidence.' },
    action: { title: 'Engage gMG guideline steering KOLs for refractory-subgroup dossier', owner: 'Medical Affairs', dueBy: 'TBD', moRef: 'MO3' },
    loopCondition: 'Refractory-subgroup dossier submitted to guideline steering committee',
    loopMet: false,
  },
];

const MAO_METRICS = [
  { label: 'Total signals ingested',              value: '247', sub: 'this cycle',          alert: false },
  { label: 'Actionable insights generated',       value: '7',   sub: '+3 vs prior cycle',   alert: false },
  { label: 'Actions initiated',                   value: '5',   sub: '71% of insights',      alert: false },
  { label: 'Tactical POA areas reshaped by AI',   value: '3',   sub: 'of 6 tactics',         alert: false },
  { label: 'MOs with critical coverage gaps',     value: '1',   sub: 'MO4 · Gap',            alert: true  },
];

const MAO_TABLE = [
  { mo: 'MO1', name: 'Real-world evidence',    signalsIn: 62, breakdown: 'MSL 48% · Congress 31% · Lit 21%', insightIds: 'AI2, AI5', actionsCount: 2, actionsInitiated: 1, coverage: 'Low',       aiImpact: 'Partial',   impactDesc: 'RWE sub-analysis scoped; registry protocol in review.' },
  { mo: 'MO2', name: 'HCP switching education',signalsIn: 89, breakdown: 'MSL 62% · Med Info 21% · Ad board 17%', insightIds: 'AI1, AI4', actionsCount: 3, actionsInitiated: 3, coverage: 'Sufficient', aiImpact: 'Reshaped',  impactDesc: 'Switch-stability narrative reframed to community language following AI synthesis. Approved and deployed.' },
  { mo: 'MO3', name: 'Guideline alignment',    signalsIn: 54, breakdown: 'Congress 52% · KOL 28% · Lit 20%',  insightIds: 'AI3',       actionsCount: 1, actionsInitiated: 0, coverage: 'Low',       aiImpact: 'Partial',   impactDesc: 'KOL engagement plan updated to prioritise guideline steering members. Dossier scoping underway.' },
  { mo: 'MO4', name: 'Scientific exchange',    signalsIn: 42, breakdown: 'Congress 60% · KOL 40%',            insightIds: 'AI7',       actionsCount: 1, actionsInitiated: 1, coverage: 'Gap',       aiImpact: 'Not yet',   impactDesc: 'No plan change documented. Insight generated but not yet accepted by Medical Affairs leadership.' },
];

const AUDIT_TRAILS = {
  MO1: {
    rawSignals: [
      { source: 'MSL interaction', msl: 'J. Morgan', territory: 'NE Region', date: '2026-06-04', text: 'Community haematologists asking for pediatric 3-year retention data before enrolling.' },
      { source: 'Congress debrief', msl: 'A. Patel', territory: 'SE Region', date: '2026-05-28', text: 'AAN 2026: 4 of 6 panellists cited NMOSD long-term RWE gap as sequencing barrier.' },
    ],
    synthesis: { text: 'Pattern across MSL and congress sources: long-term evidence gaps in rare subpopulations are the primary barrier to MO1 progress.', confidence: 0.82, checks: ['MSL field reports', 'AAN congress abstracts', 'Prior-cycle literature scan'] },
    insight: { id: 'AI2', confidence: 0.82, status: 'Validated', title: 'RWE gap — long-term NMOSD outcomes', summary: 'NMOSD specialists making sequencing decisions without head-to-head long-term data.' },
    action: { title: 'Scope long-term NMOSD relapse-free RWE sub-analysis with HEOR', owner: 'HEOR', date: '2026-Q4', mos: ['MO1'] },
    planChange: { when: 'June 2026', effect: 'HEOR budget increased by 8% to support sub-analysis scope. New deliverable added: relapse-free survival registry analysis.', condition: 'Sub-analysis protocol approved' },
  },
  MO2: {
    rawSignals: [
      { source: 'MSL interaction', msl: 'S. Chen', territory: 'MW Region', date: '2026-06-10', text: '"Patients who are stable are stable — I don\'t want to mess with it."' },
      { source: 'Med Info query', msl: 'L. Torres', territory: 'SW Region', date: '2026-06-01', text: 'Infusion centre nurse asked for switch protocol she can hand to scheduling.' },
      { source: 'Ad board', msl: 'K. Davis', territory: 'National', date: '2026-05-20', text: '"Switching data convincing on paper but we need a cleaner community-facing algorithm."' },
    ],
    synthesis: { text: 'Switching inertia is framing-based, not knowledge-based. Community language adaptation is the critical lever.', confidence: 0.87, checks: ['MSL interaction corpus', 'Med Info query log', 'Ad board transcript'] },
    insight: { id: 'AI1', confidence: 0.87, status: 'Prioritised', title: 'Infusion-burden concern persists', summary: 'Community haematologists cite biweekly infusion burden as a decision point but switching inertia remains high.' },
    action: { title: 'Develop community-facing switch-stability narrative', owner: 'Field Medical', date: '2026-Q3', mos: ['MO2'] },
    planChange: { when: 'May 2026', effect: 'Switch-education module reframed from academic to community-HCP language. New deliverable: co-created patient FAQ. Budget reallocated from Scientific Comms (−$40K).', condition: 'Switch FAQ deployed to community centres' },
  },
};

const ROI_METRICS = [
  { label: 'Total ISP Budget', value: '$6.3M', sub: '2024–2026' },
  { label: 'Insight affirmation score', value: '72 / 100', sub: '+8 pts vs Q2 2025' },
  { label: 'AI-proposed reallocation', value: '$420K', sub: 'pending approval' },
  { label: 'Actions taken from insights', value: '5 / 7', sub: '71% actioned this cycle' },
];

const ROI_TACTICS = [
  { tactic: 'Field Medical Engagement', budget: '$1.6M', pct: 25, delta: 'up',     note: 'Increase by 5% — highest signal ROI this cycle' },
  { tactic: 'Evidence Generation',       budget: '$1.8M', pct: 28, delta: 'stable', note: 'Maintain allocation — signal volume steady' },
  { tactic: 'Medical Education',          budget: '$1.4M', pct: 22, delta: 'up',     note: 'Increase by 3% — community materials gap confirmed' },
  { tactic: 'Scientific Communications', budget: '$0.6M', pct:  9, delta: 'down',   note: 'Decrease by 3% — low signal return this cycle' },
  { tactic: 'HEOR',                       budget: '$0.5M', pct:  8, delta: 'up',     note: 'Increase by 2% — RWE sub-analysis approved' },
  { tactic: 'Patient Advocacy',           budget: '$0.5M', pct:  8, delta: 'stable', note: 'Maintain allocation' },
];

// ─── Shared helpers ────────────────────────────────────────────────────────

const COVERAGE_STYLE = {
  Sufficient: { chip: 'bg-emerald-50 text-emerald-700 border-emerald-200', bar: 'bg-emerald-500', pct: 100 },
  Low:        { chip: 'bg-amber-50 text-amber-700 border-amber-200',       bar: 'bg-amber-500',   pct: 55  },
  Gap:        { chip: 'bg-rose-50 text-rose-700 border-rose-200',          bar: 'bg-rose-500',    pct: 20  },
};

const SIGNAL_STYLE = {
  Alert:   'bg-rose-50 text-rose-700 border-rose-200',
  Active:  'bg-emerald-50 text-emerald-700 border-emerald-200',
  Monitor: 'bg-amber-50 text-amber-700 border-amber-200',
};

const IMPACT_STYLE = {
  Reshaped: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Partial:  'bg-amber-50 text-amber-700 border-amber-200',
  'Not yet':'bg-zinc-50 text-zinc-600 border-zinc-200',
};

function SectionHeader({ icon: Icon, label, sub, right }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-auri-text" />
        <h3 className="text-sm font-semibold text-auri-text uppercase tracking-wider">{label}</h3>
        {sub && <span className="text-xs text-auri-muted">{sub}</span>}
      </div>
      {right}
    </div>
  );
}

function ExportBtn({ label = 'Export to PPT' }) {
  return (
    <button
      onClick={() => window.alert('Export to PowerPoint — coming soon.')}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-auri-border text-auri-muted hover:text-auri-text hover:border-auri-text/50 transition-all shrink-0"
    >
      <FileDown size={12} />
      {label}
    </button>
  );
}

// ─── Section components ────────────────────────────────────────────────────

function NovaStrategicBrief() {
  return (
    <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={15} className="text-violet-600" />
        <span className="text-xs font-semibold uppercase tracking-wider text-violet-700">Nova Strategic Brief</span>
        <span className="text-[10px] text-violet-500 ml-1">AI-generated · on load</span>
      </div>
      <p className="text-sm text-auri-text leading-relaxed">
        The strategy-to-action score stands at <strong>72/100</strong>, up 8 points from last cycle.
        Switching inertia (MO2) remains the highest-signal theme — three independent MSL territories
        this cycle confirmed that the barrier is framing, not clinical knowledge. The RWE gap for
        long-term NMOSD outcomes (MO1) is emerging as the #2 priority. One critical coverage gap
        persists: MO4 (Scientific exchange) has received no new field signals this cycle.
      </p>
    </div>
  );
}

function ISPPillars() {
  return (
    <section>
      <SectionHeader icon={Layers} label="Tier 1 — Integrated Strategic Plan" sub="2024–2026" right={<ExportBtn />} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {ISP_PILLARS.map((p) => (
          <div key={p.id} className="rounded-xl border border-auri-border bg-auri-card p-4">
            <div className="text-[10px] uppercase tracking-wider text-auri-muted mb-1">Pillar · {p.id.toUpperCase()}</div>
            <div className="text-sm font-semibold text-auri-text leading-snug mb-1.5">{p.title}</div>
            <p className="text-xs text-auri-muted leading-relaxed">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MedicalObjectivesTier2() {
  return (
    <section>
      <SectionHeader icon={Target} label="Tier 2 — Medical Objectives" sub="Plan of Action · coverage status" right={<ExportBtn />} />
      <div className="rounded-xl border border-auri-border bg-auri-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-auri-offset text-xs uppercase tracking-wider text-auri-muted">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium w-16">ID</th>
              <th className="text-left px-4 py-2.5 font-medium">Objective</th>
              <th className="text-left px-4 py-2.5 font-medium w-32">Coverage</th>
              <th className="text-left px-4 py-2.5 font-medium w-40">Progress</th>
            </tr>
          </thead>
          <tbody>
            {MEDICAL_OBJECTIVES.map((mo) => {
              const score = COVERAGE_TARGETS[mo.id] || 'Low';
              const style = COVERAGE_STYLE[score];
              return (
                <tr key={mo.id} className="border-t border-auri-border">
                  <td className="px-4 py-3 font-medium text-auri-text">{mo.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-auri-text text-sm">{mo.name}</div>
                    <div className="text-xs text-auri-muted mt-0.5">{mo.description}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${style.chip}`}>{score}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-full h-1.5 bg-auri-border rounded-full overflow-hidden">
                      <div className={`h-full ${style.bar} transition-all`} style={{ width: `${style.pct}%` }} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function TacticalPOA() {
  return (
    <section>
      <SectionHeader icon={Activity} label="Tier 3 — Medical Affairs Tactical POA" sub="six tactic areas" right={<ExportBtn />} />
      {/* Pillar-to-MO mapping bar */}
      <div className="flex gap-1 mb-4 text-[10px] font-medium">
        {MEDICAL_OBJECTIVES.map((mo) => {
          const score = COVERAGE_TARGETS[mo.id] || 'Low';
          const style = COVERAGE_STYLE[score];
          return (
            <div key={mo.id} className={`flex-1 px-2 py-1.5 rounded text-center border ${style.chip}`}>
              {mo.id}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {TACTIC_POA.map((t) => {
          const { Icon } = t;
          return (
            <div key={t.id} className="rounded-xl border border-auri-border bg-auri-card p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Icon size={15} className="text-auri-muted shrink-0" />
                  <span className="text-sm font-semibold text-auri-text leading-snug">{t.name}</span>
                </div>
                <span className="text-[10px] font-semibold text-auri-muted bg-auri-offset border border-auri-border px-2 py-0.5 rounded shrink-0">{t.budget} · {t.pct}%</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-2.5">
                {t.moRefs.map((mo) => (
                  <span key={mo} className="text-[10px] font-medium px-1.5 py-0.5 rounded border bg-auri-text/5 text-auri-text border-auri-text/20">{mo}</span>
                ))}
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ml-auto ${SIGNAL_STYLE[t.signalStatus]}`}>
                  {t.signalCount} signal{t.signalCount !== 1 ? 's' : ''} · {t.signalStatus}
                </span>
              </div>
              <ul className="text-xs text-auri-muted space-y-0.5 mb-3">
                {t.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-1.5"><span className="text-auri-border mt-0.5">—</span>{d}</li>
                ))}
              </ul>
              <div className="border-l-2 border-violet-300 pl-2.5 text-xs text-auri-muted italic leading-relaxed">{t.novaSummary}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function InsightLoop() {
  const [openLoop, setOpenLoop] = useState(null);

  return (
    <section>
      <SectionHeader icon={Zap} label="Tier 4 — Insight Loop" sub="signal → insight → action → loop closure" right={<ExportBtn />} />
      <div className="space-y-2">
        {INSIGHT_LOOPS.map((loop) => {
          const isOpen = openLoop === loop.id;
          return (
            <div key={loop.id} className="rounded-xl border border-auri-border bg-auri-card overflow-hidden">
              <button
                className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-auri-offset transition-all"
                onClick={() => setOpenLoop(isOpen ? null : loop.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-auri-text">{loop.tactic}</span>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded border bg-auri-text/5 text-auri-text border-auri-text/20">{loop.moRef}</span>
                  <span className="text-xs text-auri-muted">{loop.signals.length} signal{loop.signals.length !== 1 ? 's' : ''} · AI{loop.insight.id.replace('AI','')} → {loop.action.owner || 'pending'}</span>
                </div>
                <div className="flex items-center gap-2">
                  {loop.loopMet && <CheckCircle size={14} className="text-emerald-600" />}
                  {isOpen ? <ChevronUp size={15} className="text-auri-muted" /> : <ChevronDown size={15} className="text-auri-muted" />}
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-auri-border p-4 space-y-4">
                  {/* Stage 1 — Incoming signals */}
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-auri-muted mb-2">Stage 1 — Incoming Signals</div>
                    <div className="space-y-2 mb-2">
                      {loop.signals.map((s, i) => (
                        <div key={i} className="rounded-lg border border-auri-border bg-auri-bg p-3">
                          <div className="flex items-center gap-2 text-[10px] text-auri-muted mb-1">
                            <span className="font-medium text-auri-text">{s.source}</span>
                            <span>·</span><MapPin size={10} /><span>{s.territory}</span>
                            <span>·</span><span>{s.msl}</span>
                            <span className="ml-auto">{s.date}</span>
                          </div>
                          <p className="text-xs text-auri-text italic leading-relaxed">"{s.text}"</p>
                        </div>
                      ))}
                    </div>
                    <div className="border-l-2 border-violet-300 pl-3 bg-violet-50/50 rounded-r-lg py-2 pr-3">
                      <span className="text-[10px] font-semibold text-violet-700 uppercase tracking-wider">Nova synthesis · </span>
                      <span className="text-xs text-auri-text">{loop.novaSynthesis}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-auri-muted"><ArrowRight size={14} /><span className="text-[10px] uppercase tracking-wider">Stage 2 — Actionable Insight</span></div>

                  {/* Stage 2 — Insight */}
                  <div className="rounded-lg border border-auri-border bg-auri-bg p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-semibold text-auri-muted">{loop.insight.id}</span>
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded border bg-violet-50 text-violet-700 border-violet-200">{loop.insight.status}</span>
                      <span className="text-[10px] text-auri-muted ml-auto">Confidence {Math.round(loop.insight.confidence * 100)}%</span>
                    </div>
                    <div className="text-sm font-semibold text-auri-text mb-1">{loop.insight.title}</div>
                    <p className="text-xs text-auri-muted leading-relaxed">{loop.insight.summary}</p>
                  </div>

                  <div className="flex items-center gap-2 text-auri-muted"><ArrowRight size={14} /><span className="text-[10px] uppercase tracking-wider">Stage 3 — Proposed Action</span></div>

                  {/* Stage 3 — Action */}
                  <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-3">
                    <div className="text-sm font-medium text-auri-text mb-1.5">{loop.action.title}</div>
                    <div className="flex items-center gap-3 text-[10px] text-auri-muted">
                      <span>{loop.action.owner || 'Owner TBD'}</span>
                      <span>·</span>
                      <Calendar size={10} />
                      <span>{loop.action.dueBy}</span>
                      <span>·</span>
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded border bg-auri-text/5 text-auri-text border-auri-text/20">{loop.action.moRef}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-auri-muted"><ArrowRight size={14} /><span className="text-[10px] uppercase tracking-wider">Stage 4 — Close the Loop</span></div>

                  {/* Stage 4 — Closure */}
                  <div className={`rounded-lg border p-3 flex items-center gap-3 ${loop.loopMet ? 'border-emerald-200 bg-emerald-50/50' : 'border-auri-border bg-auri-bg'}`}>
                    <div className={`w-2 h-2 rounded-full shrink-0 ${loop.loopMet ? 'bg-emerald-500' : 'bg-auri-muted'}`} />
                    <div>
                      <div className="text-xs text-auri-text">{loop.loopCondition}</div>
                      <div className={`text-[10px] font-medium mt-0.5 ${loop.loopMet ? 'text-emerald-600' : 'text-auri-muted'}`}>{loop.loopMet ? 'Condition met — loop closed' : 'In progress'}</div>
                    </div>
                    {loop.loopMet && <CheckCircle size={16} className="text-emerald-500 ml-auto" />}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MAODashboard() {
  const [openTrail, setOpenTrail] = useState(null);

  return (
    <section>
      <SectionHeader icon={Brain} label="MAO Intelligence Dashboard" sub="AI-driven impact on strategy" right={<ExportBtn />} />

      {/* Metric strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
        {MAO_METRICS.map((m) => (
          <div key={m.label} className={`rounded-xl border p-3 ${m.alert ? 'border-rose-200 bg-rose-50/60' : 'border-auri-border bg-auri-card'}`}>
            <div className={`text-xl font-bold mb-0.5 ${m.alert ? 'text-rose-600' : 'text-auri-text'}`}>{m.value}</div>
            <div className="text-[10px] text-auri-muted leading-snug">{m.label}</div>
            <div className={`text-[10px] font-medium mt-0.5 ${m.alert ? 'text-rose-500' : 'text-auri-muted'}`}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Per-MO table with audit trail */}
      <div className="rounded-xl border border-auri-border bg-auri-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-auri-offset text-xs uppercase tracking-wider text-auri-muted">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium w-48">Medical Objective</th>
              <th className="text-left px-4 py-2.5 font-medium w-28">Signals In</th>
              <th className="text-left px-4 py-2.5 font-medium w-28">Insights</th>
              <th className="text-left px-4 py-2.5 font-medium w-28">Actions</th>
              <th className="text-left px-4 py-2.5 font-medium w-28">Coverage</th>
              <th className="text-left px-4 py-2.5 font-medium">AI-Driven Impact</th>
            </tr>
          </thead>
          <tbody>
            {MAO_TABLE.map((row) => {
              const covStyle = COVERAGE_STYLE[row.coverage] || COVERAGE_STYLE.Low;
              const impStyle = IMPACT_STYLE[row.aiImpact] || IMPACT_STYLE['Not yet'];
              const trailData = AUDIT_TRAILS[row.mo];
              const isOpen = openTrail === row.mo;
              return (
                <React.Fragment key={row.mo}>
                  <tr
                    className={`border-t border-auri-border ${trailData ? 'cursor-pointer hover:bg-auri-offset' : ''} transition-colors`}
                    onClick={() => trailData && setOpenTrail(isOpen ? null : row.mo)}
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-auri-text">{row.mo}</div>
                      <div className="text-xs text-auri-muted">{row.name}</div>
                      {trailData && <div className="text-[10px] text-violet-600 mt-0.5">Click to view audit trail</div>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-auri-text">{row.signalsIn}</div>
                      <div className="text-[10px] text-auri-muted leading-snug mt-0.5">{row.breakdown}</div>
                    </td>
                    <td className="px-4 py-3 text-xs text-auri-muted">{row.insightIds}</td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-auri-text">{row.actionsInitiated}</span>
                      <span className="text-xs text-auri-muted"> / {row.actionsCount}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${covStyle.chip}`}>{row.coverage}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded border mr-2 ${impStyle}`}>{row.aiImpact}</span>
                      <span className="text-xs text-auri-muted">{row.impactDesc}</span>
                    </td>
                  </tr>

                  {/* Inline audit trail */}
                  {isOpen && trailData && (
                    <tr className="border-t border-violet-200 bg-violet-50/40">
                      <td colSpan={6} className="px-4 py-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-violet-600" />
                            <span className="text-xs font-semibold text-violet-700 uppercase tracking-wider">Insight-to-Change Audit Trail — {row.mo}</span>
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); setOpenTrail(null); }} className="text-auri-muted hover:text-auri-text transition-colors">
                            <X size={14} />
                          </button>
                        </div>

                        <div className="relative pl-6 space-y-4">
                          <div className="absolute left-2 top-0 bottom-0 w-px bg-violet-200" />

                          {/* Raw signals */}
                          <div>
                            <div className="absolute left-0 w-4 h-4 rounded-full bg-auri-muted flex items-center justify-center -translate-x-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            </div>
                            <div className="text-[10px] font-semibold uppercase tracking-wider text-auri-muted mb-2">Raw Signals</div>
                            <div className="space-y-1.5">
                              {trailData.rawSignals.map((s, i) => (
                                <div key={i} className="rounded-lg border border-auri-border bg-auri-bg p-2.5">
                                  <div className="flex items-center gap-2 text-[10px] text-auri-muted mb-1">
                                    <MessageSquare size={10} /><span className="font-medium">{s.source}</span>
                                    <span>·</span><span>{s.msl}</span><span>·</span><span>{s.territory}</span>
                                    <span className="ml-auto">{s.date}</span>
                                  </div>
                                  <p className="text-xs text-auri-text italic">"{s.text}"</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Nova synthesis */}
                          <div>
                            <div className="text-[10px] font-semibold uppercase tracking-wider text-violet-700 mb-2">Nova Synthesis</div>
                            <div className="border-l-2 border-violet-400 pl-3 bg-white/60 rounded-r-lg py-2 pr-3">
                              <p className="text-xs text-auri-text mb-1">{trailData.synthesis.text}</p>
                              <div className="flex items-center gap-3 text-[10px] text-auri-muted">
                                <span>Confidence: <strong className="text-violet-700">{Math.round(trailData.synthesis.confidence * 100)}%</strong></span>
                                <span>Cross-checks: {trailData.synthesis.checks.join(' · ')}</span>
                              </div>
                            </div>
                          </div>

                          {/* Actionable insight */}
                          <div>
                            <div className="text-[10px] font-semibold uppercase tracking-wider text-auri-muted mb-2">Actionable Insight</div>
                            <div className="rounded-lg border border-auri-border bg-auri-bg p-2.5">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-semibold text-auri-muted">{trailData.insight.id}</span>
                                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded border bg-violet-50 text-violet-700 border-violet-200">{trailData.insight.status}</span>
                                <span className="text-[10px] text-auri-muted ml-auto">{Math.round(trailData.insight.confidence * 100)}% confidence</span>
                              </div>
                              <div className="text-sm font-medium text-auri-text mb-0.5">{trailData.insight.title}</div>
                              <p className="text-xs text-auri-muted">{trailData.insight.summary}</p>
                            </div>
                          </div>

                          {/* Proposed action */}
                          <div>
                            <div className="text-[10px] font-semibold uppercase tracking-wider text-auri-muted mb-2">Proposed Action</div>
                            <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-2.5">
                              <div className="text-sm font-medium text-auri-text mb-1">{trailData.action.title}</div>
                              <div className="flex items-center gap-3 text-[10px] text-auri-muted">
                                <span>{trailData.action.owner}</span><span>·</span>
                                <Calendar size={10} /><span>{trailData.action.date}</span><span>·</span>
                                {trailData.action.mos.map((m) => <span key={m} className="text-[10px] font-medium px-1.5 py-0.5 rounded border bg-auri-text/5 text-auri-text border-auri-text/20">{m}</span>)}
                              </div>
                            </div>
                          </div>

                          {/* Plan change */}
                          <div>
                            <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 mb-2">Plan Change</div>
                            <div className="rounded-lg border-2 border-emerald-300 bg-emerald-50/60 p-2.5">
                              <div className="flex items-center gap-2 mb-1.5">
                                <CheckCircle size={13} className="text-emerald-600" />
                                <span className="text-[10px] font-semibold text-emerald-700">{trailData.planChange.when}</span>
                              </div>
                              <p className="text-xs text-auri-text mb-1.5">{trailData.planChange.effect}</p>
                              <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Loop closure: {trailData.planChange.condition}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function EmergingThemesSection() {
  if (!EMERGING_THEMES || EMERGING_THEMES.length === 0) return null;
  return (
    <section>
      <SectionHeader icon={TrendingUp} label="Emerging Themes" sub="growth-ranked · all source channels" right={<ExportBtn />} />
      <div className="rounded-xl border border-auri-border bg-auri-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-auri-offset text-xs uppercase tracking-wider text-auri-muted">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium">Theme</th>
              <th className="text-left px-4 py-2.5 font-medium w-20">Growth</th>
              <th className="text-left px-4 py-2.5 font-medium w-32">First detected</th>
              <th className="text-left px-4 py-2.5 font-medium w-40">Related KIT</th>
              <th className="text-left px-4 py-2.5 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {EMERGING_THEMES.map((t) => {
              const heat = t.growthRate > 50 ? 'text-emerald-700 font-semibold' : t.growthRate > 20 ? 'text-emerald-600' : 'text-auri-text';
              return (
                <tr key={t.id} className="border-t border-auri-border">
                  <td className="px-4 py-3 font-medium text-auri-text">{t.theme}</td>
                  <td className={`px-4 py-3 ${heat}`}>+{t.growthRate}%</td>
                  <td className="px-4 py-3 text-auri-muted">{t.firstDetected}</td>
                  <td className="px-4 py-3 text-auri-text">{t.relatedKIT}</td>
                  <td className="px-4 py-3 text-xs text-auri-muted leading-snug">{t.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function InsightSourceMatrix() {
  if (!INSIGHT_SOURCES || INSIGHT_SOURCES.length === 0) return null;
  return (
    <section>
      <SectionHeader icon={Target} label="Insight Source Value Matrix" sub="volume · quality · ROI" right={<ExportBtn />} />
      <div className="rounded-xl border border-auri-border bg-auri-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-auri-offset text-xs uppercase tracking-wider text-auri-muted">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium">Source</th>
              <th className="text-left px-4 py-2.5 font-medium w-24">Volume</th>
              <th className="text-left px-4 py-2.5 font-medium w-32">Quality</th>
              <th className="text-left px-4 py-2.5 font-medium w-28">Leads to action</th>
              <th className="text-left px-4 py-2.5 font-medium w-28">Cost / insight</th>
              <th className="text-left px-4 py-2.5 font-medium w-24">ROI score</th>
            </tr>
          </thead>
          <tbody>
            {INSIGHT_SOURCES.map((s) => {
              const qColor = s.qualityScore >= 80 ? 'bg-emerald-500' : s.qualityScore >= 60 ? 'bg-amber-500' : 'bg-rose-500';
              const roiColor = s.roiScore >= 8 ? 'text-emerald-600' : s.roiScore >= 5 ? 'text-amber-600' : 'text-rose-600';
              return (
                <tr key={s.id} className="border-t border-auri-border">
                  <td className="px-4 py-3 font-medium text-auri-text">{s.source}</td>
                  <td className="px-4 py-3 text-auri-text">{s.volume.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-auri-border rounded-full overflow-hidden">
                        <div className={`h-full ${qColor}`} style={{ width: `${s.qualityScore}%` }} />
                      </div>
                      <span className="text-xs text-auri-muted">{s.qualityScore}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-auri-text">{s.leadsToActionPct}%</td>
                  <td className="px-4 py-3 text-auri-muted">${s.costPerInsight.toLocaleString()}</td>
                  <td className={`px-4 py-3 font-semibold ${roiColor}`}>{s.roiScore.toFixed(1)}/10</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ROICalculator() {
  return (
    <section>
      <SectionHeader icon={DollarSign} label="Medical ROI Calculator" sub="budget allocation · insight affirmation" right={<ExportBtn />} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {ROI_METRICS.map((m) => (
          <div key={m.label} className="rounded-xl border border-auri-border bg-auri-card p-3">
            <div className="text-xl font-bold text-auri-text mb-0.5">{m.value}</div>
            <div className="text-xs text-auri-muted">{m.label}</div>
            <div className="text-[10px] text-auri-muted mt-0.5">{m.sub}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-auri-border bg-auri-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-auri-offset text-xs uppercase tracking-wider text-auri-muted">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium">Tactic</th>
              <th className="text-left px-4 py-2.5 font-medium w-24">Budget</th>
              <th className="text-left px-4 py-2.5 font-medium w-40">Allocation</th>
              <th className="text-left px-4 py-2.5 font-medium w-20">Signal</th>
              <th className="text-left px-4 py-2.5 font-medium">Nova reallocation note</th>
            </tr>
          </thead>
          <tbody>
            {ROI_TACTICS.map((t) => {
              const deltaEl = t.delta === 'up'
                ? <TrendingUp size={13} className="text-emerald-600" />
                : t.delta === 'down'
                ? <TrendingDown size={13} className="text-rose-600" />
                : <span className="w-3 h-px bg-auri-muted inline-block" />;
              return (
                <tr key={t.tactic} className="border-t border-auri-border">
                  <td className="px-4 py-3 font-medium text-auri-text">{t.tactic}</td>
                  <td className="px-4 py-3 text-auri-text">{t.budget}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-auri-border rounded-full overflow-hidden">
                        <div className="h-full bg-auri-text" style={{ width: `${(t.pct / 28) * 100}%` }} />
                      </div>
                      <span className="text-xs text-auri-muted">{t.pct}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{deltaEl}</td>
                  <td className="px-4 py-3 text-xs text-auri-muted">{t.note}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <AlertCircle size={14} className="text-amber-600" />
          <span className="text-xs font-semibold text-amber-700">Nova Reallocation Recommendation</span>
        </div>
        <p className="text-xs text-auri-text">
          Based on signal ROI analysis, Nova recommends reallocating <strong>$120K</strong> from Scientific Communications to Field Medical Engagement and <strong>$60K</strong> to Medical Education.
          Combined reallocation of <strong>$180K</strong> is projected to increase MO2 coverage from <strong>Sufficient → Confirmed</strong> within 2 cycles.
          Pending Medical Affairs leadership approval.
        </p>
      </div>
    </section>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────

export default function NovaTab1MedicalStrategy() {
  return (
    <div className="space-y-8">
      <NovaStrategicBrief />
      <ISPPillars />
      <MedicalObjectivesTier2 />
      <TacticalPOA />
      <InsightLoop />
      <MAODashboard />
      <EmergingThemesSection />
      <InsightSourceMatrix />
      <ROICalculator />
    </div>
  );
}
