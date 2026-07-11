import React, { useState, useEffect } from 'react';
import {
  Target, Layers, Eye, FileText, TrendingUp, Radar, ShieldCheck,
  ChevronDown, MessageSquare, Calendar, MapPin, AlertCircle,
  GitBranch, Check,
} from 'lucide-react';
import {
  ISP_PILLARS, MEDICAL_OBJECTIVES, LISTENING_PRIORITIES, COVERAGE_TARGETS,
  INSIGHTS, ACTIONS, GAP_RADAR,
} from '../config';
import { isPinned, pinInsight, unpinInsight, subscribePinned } from '../lib/journeyStore';

// ─── Shared style maps ──────────────────────────────────────────────────

const COVERAGE_STYLE = {
  Sufficient: { bar: 'bg-emerald-500',  chip: 'bg-emerald-50 text-emerald-700 border-emerald-200', pct: 100 },
  Low:        { bar: 'bg-amber-500',    chip: 'bg-amber-50 text-amber-700 border-amber-200',        pct: 55  },
  Gap:        { bar: 'bg-rose-500',     chip: 'bg-rose-50 text-rose-700 border-rose-200',           pct: 20  },
};

const PRIORITY_STYLE = {
  High:   'bg-rose-50 text-rose-700 border-rose-200',
  Medium: 'bg-amber-50 text-amber-700 border-amber-200',
  Low:    'bg-sky-50 text-sky-700 border-sky-200',
};

const STATUS_STYLE = {
  Captured:    'bg-slate-50 text-slate-700 border-slate-200',
  Triaged:     'bg-sky-50 text-sky-700 border-sky-200',
  Validated:   'bg-violet-50 text-violet-700 border-violet-200',
  Prioritised: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const ACTION_STATUS_STYLE = {
  Proposed: 'bg-slate-50 text-slate-700 border-slate-200',
  Started:  'bg-amber-50 text-amber-700 border-amber-200',
  Accepted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Declined: 'bg-rose-50 text-rose-700 border-rose-200',
};

const IMPACT_STYLE = {
  Confirmed:  'bg-emerald-50 text-emerald-700 border-emerald-200',
  Challenged: 'bg-amber-50 text-amber-700 border-amber-200',
  Changed:    'bg-violet-50 text-violet-700 border-violet-200',
};

const SOURCE_TYPE_STYLE = {
  'MSL interaction':  'text-sky-700',
  'Ad board':         'text-violet-700',
  'Med Info query':   'text-emerald-700',
  'Congress debrief': 'text-amber-700',
};

// ─── Helpers ────────────────────────────────────────────────────────────

function countInsightsByMO(moId) {
  return INSIGHTS.filter(i => i.moRefs?.includes(moId)).length;
}

function countInsightsByLP(lpId) {
  return INSIGHTS.filter(i => i.lpRefs?.includes(lpId)).length;
}

function getMOById(id) { return MEDICAL_OBJECTIVES.find(m => m.id === id); }
function getLPById(id) { return LISTENING_PRIORITIES.find(l => l.id === id); }
function getInsightById(id) { return INSIGHTS.find(i => i.id === id); }

// ─── Sub-components ─────────────────────────────────────────────────────

function SectionHeader({ icon: Icon, label, sub, right }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-auri-text" />
        <h3 className="text-sm font-semibold text-auri-text uppercase tracking-wider">{label}</h3>
        {sub && <span className="text-xs text-auri-muted">{sub}</span>}
      </div>
      {right}
    </div>
  );
}

function ISPPillars() {
  return (
    <section>
      <SectionHeader icon={Layers} label="Integrated Strategic Plan" sub="2024–2026" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {ISP_PILLARS.map((p) => (
          <div key={p.id} className="rounded-xl border border-auri-border bg-auri-bg p-4">
            <div className="text-[10px] uppercase tracking-wider text-auri-muted mb-1">Pillar · {p.id}</div>
            <div className="text-sm font-semibold text-auri-text leading-snug mb-1.5">{p.title}</div>
            <p className="text-xs text-auri-muted leading-relaxed">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MedicalObjectives() {
  return (
    <section>
      <SectionHeader icon={Target} label="Plan of Action" sub="Medical Objectives" />
      <div className="rounded-xl border border-auri-border bg-auri-bg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-auri-card text-xs uppercase tracking-wider text-auri-muted">
            <tr>
              <th className="text-left px-4 py-2 font-medium w-16">ID</th>
              <th className="text-left px-4 py-2 font-medium w-48">Objective</th>
              <th className="text-left px-4 py-2 font-medium">Description</th>
              <th className="text-left px-4 py-2 font-medium w-24">Insights</th>
              <th className="text-left px-4 py-2 font-medium w-28">Coverage</th>
            </tr>
          </thead>
          <tbody>
            {MEDICAL_OBJECTIVES.map((mo) => {
              const score = COVERAGE_TARGETS[mo.id] || 'Low';
              const style = COVERAGE_STYLE[score];
              const count = countInsightsByMO(mo.id);
              return (
                <tr key={mo.id} className="border-t border-auri-border">
                  <td className="px-4 py-3 font-medium text-auri-text">{mo.id}</td>
                  <td className="px-4 py-3 font-medium text-auri-text">{mo.name}</td>
                  <td className="px-4 py-3 text-auri-muted">{mo.description}</td>
                  <td className="px-4 py-3 text-auri-text">{count}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${style.chip}`}>{score}</span>
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

function ListeningPrioritiesTable() {
  return (
    <section>
      <SectionHeader icon={Eye} label="Listening Priorities" sub="KIQs & KITs" />
      <div className="rounded-xl border border-auri-border bg-auri-bg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-auri-card text-xs uppercase tracking-wider text-auri-muted">
            <tr>
              <th className="text-left px-4 py-2 font-medium w-16">LP</th>
              <th className="text-left px-4 py-2 font-medium w-48">Priority</th>
              <th className="text-left px-4 py-2 font-medium w-16">MO</th>
              <th className="text-left px-4 py-2 font-medium">Key Insight Question</th>
              <th className="text-left px-4 py-2 font-medium w-48">KITs</th>
              <th className="text-left px-4 py-2 font-medium w-20">Insights</th>
            </tr>
          </thead>
          <tbody>
            {LISTENING_PRIORITIES.map((lp) => {
              const count = countInsightsByLP(lp.id);
              return (
                <tr key={lp.id} className="border-t border-auri-border">
                  <td className="px-4 py-3 font-medium text-auri-text">{lp.id}</td>
                  <td className="px-4 py-3 font-medium text-auri-text">{lp.name}</td>
                  <td className="px-4 py-3 text-auri-muted">{lp.moRef}</td>
                  <td className="px-4 py-3 text-auri-text italic">“{lp.kiq}”</td>
                  <td className="px-4 py-3 text-auri-muted">{lp.kits?.join(' · ')}</td>
                  <td className="px-4 py-3 text-auri-text">{count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function InsightCard({ insight }) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(() => isPinned(insight.id));

  useEffect(() => {
    return subscribePinned((ids) => setPinned(ids.includes(insight.id)));
  }, [insight.id]);

  const handlePinClick = (e) => {
    e.stopPropagation();
    if (pinned) unpinInsight(insight.id);
    else        pinInsight(insight.id);
  };

  return (
    <div className={`rounded-xl border bg-auri-bg overflow-hidden transition-all ${pinned ? 'border-auri-text/60 ring-1 ring-auri-text/30' : 'border-auri-border'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-4 hover:bg-auri-card transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[10px] font-medium text-auri-muted uppercase tracking-wider">{insight.id}</span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${PRIORITY_STYLE[insight.priority] || ''}`}>
                {insight.priority} priority
              </span>
              {insight.lpRefs?.map(lp => (
                <span key={lp} className="text-[10px] font-medium px-2 py-0.5 rounded border bg-auri-card text-auri-muted border-auri-border">{lp}</span>
              ))}
              {insight.moRefs?.map(mo => (
                <span key={mo} className="text-[10px] font-medium px-2 py-0.5 rounded border bg-auri-text/5 text-auri-text border-auri-text/20">{mo}</span>
              ))}
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${STATUS_STYLE[insight.status] || ''}`}>{insight.status}</span>
              {pinned && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded border bg-auri-text/10 text-auri-text border-auri-text/30 inline-flex items-center gap-1">
                  <GitBranch size={10} /> On Insight Journey
                </span>
              )}
            </div>
            <div className="text-sm font-semibold text-auri-text mb-1.5 leading-snug">{insight.title}</div>
            <p className="text-sm text-auri-muted leading-relaxed">{insight.summary}</p>
          </div>
          <div className="text-right shrink-0 flex flex-col items-end gap-2">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-auri-muted mb-1">Confidence</div>
              <div className="text-lg font-semibold text-auri-text">{Math.round(insight.confidenceScore * 100)}%</div>
            </div>
            <span
              role="button"
              tabIndex={0}
              onClick={handlePinClick}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handlePinClick(e); }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all cursor-pointer ${
                pinned
                  ? 'bg-auri-text text-auri-bg border-auri-text'
                  : 'bg-auri-bg text-auri-muted border-auri-border hover:text-auri-text hover:border-auri-text/50'
              }`}
            >
              {pinned ? <><Check size={12} /> Added to Journey</> : <><GitBranch size={12} /> Add to Insight Journey</>}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-3 text-[11px] text-auri-muted">
          <span className="flex items-center gap-1"><TrendingUp size={12} /> Recurs {insight.recurrence}×</span>
          <span className="flex items-center gap-1"><Calendar size={12} /> {insight.recency}</span>
          <span className="flex items-center gap-1"><ShieldCheck size={12} /> {insight.provenance}</span>
          <ChevronDown size={14} className={`ml-auto transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {open && (
        <div className="border-t border-auri-border bg-auri-card p-4">
          <div className="text-[10px] uppercase tracking-wider text-auri-muted mb-2">Source insights ({insight.sourceInsights?.length || 0})</div>
          <div className="space-y-2">
            {insight.sourceInsights?.map((s, i) => (
              <div key={i} className="bg-auri-bg rounded-lg border border-auri-border p-3">
                <div className="flex items-center gap-2 text-[11px] text-auri-muted mb-1.5">
                  <MessageSquare size={11} className={SOURCE_TYPE_STYLE[s.type] || ''} />
                  <span className={`font-medium ${SOURCE_TYPE_STYLE[s.type] || ''}`}>{s.type}</span>
                  <span>·</span>
                  <span>{s.role}</span>
                  <span>·</span>
                  <MapPin size={11} />
                  <span>{s.location}</span>
                  <span className="ml-auto">{s.date}</span>
                </div>
                <p className="text-sm text-auri-text italic leading-relaxed">“{s.quote}”</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InsightsBoard() {
  return (
    <section>
      <SectionHeader icon={FileText} label="Actionable Insights" sub={`${INSIGHTS.length} prioritised`} />
      <div className="space-y-3">
        {INSIGHTS.map((i) => <InsightCard key={i.id} insight={i} />)}
      </div>
    </section>
  );
}

function ActionsBoard() {
  const [groupBy, setGroupBy] = useState('mo'); // 'mo' | 'status'

  const groupedByMO = MEDICAL_OBJECTIVES.map((mo) => ({
    key: mo.id,
    label: `${mo.id} · ${mo.name}`,
    actions: ACTIONS.filter(a => a.moRef === mo.id),
  }));

  const STATUS_ORDER = ['Proposed', 'Started', 'Accepted', 'Declined'];
  const groupedByStatus = STATUS_ORDER.map((status) => ({
    key: status,
    label: status,
    actions: ACTIONS.filter(a => a.status === status),
  }));

  const groups = groupBy === 'mo' ? groupedByMO : groupedByStatus;

  const toggle = (
    <div className="flex items-center gap-1 text-xs">
      <button
        onClick={() => setGroupBy('mo')}
        className={`px-2.5 py-1 rounded-md transition-all ${groupBy === 'mo' ? 'bg-auri-text text-auri-bg font-medium' : 'text-auri-muted hover:text-auri-text'}`}
      >
        by MO
      </button>
      <button
        onClick={() => setGroupBy('status')}
        className={`px-2.5 py-1 rounded-md transition-all ${groupBy === 'status' ? 'bg-auri-text text-auri-bg font-medium' : 'text-auri-muted hover:text-auri-text'}`}
      >
        by status
      </button>
    </div>
  );

  return (
    <section>
      <SectionHeader
        icon={TrendingUp}
        label="Proposed Actions"
        sub={`${ACTIONS.length} total`}
        right={toggle}
      />
      <div className={`grid gap-3 ${groupBy === 'status' ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1'}`}>
        {groups.map((g) => (
          <div key={g.key} className={groupBy === 'status' ? 'rounded-xl border border-auri-border bg-auri-card p-3' : ''}>
            <div className={`flex items-center gap-2 mb-2 ${groupBy === 'status' ? '' : 'mt-2'}`}>
              <span className="text-xs font-semibold text-auri-text uppercase tracking-wider">{g.label}</span>
              <span className="text-[10px] text-auri-muted">{g.actions.length}</span>
            </div>
            <div className="space-y-2">
              {g.actions.length === 0 && (
                <div className="text-xs text-auri-muted italic px-1">No actions.</div>
              )}
              {g.actions.map((a) => {
                const insight = getInsightById(a.fromInsightRef);
                return (
                  <div key={a.id} className="rounded-lg border border-auri-border bg-auri-bg p-3">
                    <div className="text-sm text-auri-text font-medium leading-snug mb-2">{a.title}</div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${ACTION_STATUS_STYLE[a.status] || ''}`}>{a.status}</span>
                      {a.strategyImpact && (
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${IMPACT_STYLE[a.strategyImpact] || ''}`}>
                          {a.strategyImpact}
                        </span>
                      )}
                      {groupBy !== 'mo' && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded border bg-auri-text/5 text-auri-text border-auri-text/20">{a.moRef}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-auri-muted">
                      <span title={insight?.title}>from {a.fromInsightRef}</span>
                      <span>{a.owner || '—'} · {a.dueBy || '—'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function GapRadarSection() {
  if (!GAP_RADAR || GAP_RADAR.length === 0) return null;
  return (
    <section>
      <SectionHeader icon={Radar} label="Gap Radar" sub="agent-proposed" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {GAP_RADAR.map((g, idx) => (
          <div key={idx} className="rounded-xl border border-auri-border bg-auri-bg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-auri-text">{g.type}</span>
              {g.moRef && (
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded border bg-auri-text/5 text-auri-text border-auri-text/20">{g.moRef}</span>
              )}
            </div>
            <div className="text-sm text-auri-text font-medium mb-1.5 leading-snug">{g.suggestion}</div>
            <p className="text-xs text-auri-muted leading-relaxed">{g.rationale}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────

export default function StrategyToAction() {
  if (!MEDICAL_OBJECTIVES || MEDICAL_OBJECTIVES.length === 0) {
    return (
      <div className="rounded-xl border border-auri-border bg-auri-bg p-8 text-center">
        <AlertCircle size={24} className="text-auri-muted mx-auto mb-2" />
        <div className="text-sm text-auri-text font-medium">Strategy-to-Action needs a strategic framework.</div>
        <p className="text-xs text-auri-muted mt-1">
          Populate <code className="bg-auri-card px-1.5 py-0.5 rounded">config/strategy.js</code> (ISP pillars, Medical Objectives, Listening Priorities) to activate this view.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ISPPillars />
      <MedicalObjectives />
      <ListeningPrioritiesTable />
      <InsightsBoard />
      <ActionsBoard />
      <GapRadarSection />
    </div>
  );
}
