import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Inbox, Filter, ShieldCheck, Rocket, CheckCircle2, Radio,
  Calendar, TrendingUp, ExternalLink, GitBranch, X,
} from 'lucide-react';
import { INSIGHTS, ACTIONS, SIGNALS } from '../config';
import { getPinnedIds, subscribePinned, unpinInsight } from '../lib/journeyStore';

// ─── Derivation ─────────────────────────────────────────────────────────
//
// Each insight's lane is derived from its own status + the most-advanced
// linked action. One card per insight. Signals without a formal insight
// show up in the Captured lane as "fresh from the field" entries.

const LANES = [
  { id: 'captured',     label: 'Captured',                sub: 'Raw signal',                 icon: Inbox,        accent: 'bg-slate-50 text-slate-700 border-slate-200',       dot: 'bg-slate-400' },
  { id: 'triaged',      label: 'Triaged',                 sub: 'Being assessed',             icon: Filter,       accent: 'bg-sky-50 text-sky-700 border-sky-200',             dot: 'bg-sky-500' },
  { id: 'validated',    label: 'Validated / Prioritised', sub: 'Ready for action',           icon: ShieldCheck,  accent: 'bg-violet-50 text-violet-700 border-violet-200',    dot: 'bg-violet-500' },
  { id: 'in-flight',    label: 'Action in Flight',        sub: 'Strategy in motion',         icon: Rocket,       accent: 'bg-amber-50 text-amber-700 border-amber-200',       dot: 'bg-amber-500' },
  { id: 'closed',       label: 'Closed & Integrated',     sub: 'Strategy impact recorded',   icon: CheckCircle2, accent: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
];

const PRIORITY_STYLE = {
  High:   'bg-rose-50 text-rose-700 border-rose-200',
  Medium: 'bg-amber-50 text-amber-700 border-amber-200',
  Low:    'bg-sky-50 text-sky-700 border-sky-200',
};

const IMPACT_STYLE = {
  Confirmed:  'bg-emerald-100 text-emerald-800 border-emerald-300',
  Challenged: 'bg-amber-100 text-amber-800 border-amber-300',
  Changed:    'bg-violet-100 text-violet-800 border-violet-300',
};

const ACTION_STATUS_STYLE = {
  Proposed: 'text-slate-600',
  Started:  'text-amber-700',
  Accepted: 'text-emerald-700',
  Declined: 'text-rose-700',
};

const AGENT_STYLE = {
  ARIA: 'bg-sky-50 text-sky-700 border-sky-200',
  LUCA: 'bg-violet-50 text-violet-700 border-violet-200',
  NOVA: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

// ─── Helpers ────────────────────────────────────────────────────────────

function laneForInsight(insight) {
  const related = ACTIONS.filter(a => a.fromInsightRef === insight.id);
  const hasClosed   = related.some(a => a.status === 'Accepted' || a.status === 'Declined');
  const hasStarted  = related.some(a => a.status === 'Started');
  const hasProposed = related.some(a => a.status === 'Proposed');

  if (hasClosed)  return 'closed';
  if (hasStarted) return 'in-flight';

  // No closed/started action. Lane follows insight's own status, with a
  // bump to validated/prioritised if there's at least a proposed action.
  if (insight.status === 'Prioritised' || insight.status === 'Validated' || hasProposed) return 'validated';
  if (insight.status === 'Triaged')  return 'triaged';
  return 'captured';
}

function dominantImpactFor(insight) {
  const related = ACTIONS.filter(a => a.fromInsightRef === insight.id && a.strategyImpact);
  // Rank: Changed > Challenged > Confirmed (show the most strategically
  // interesting one first).
  const rank = { Changed: 3, Challenged: 2, Confirmed: 1 };
  return related.sort((a, b) => (rank[b.strategyImpact] || 0) - (rank[a.strategyImpact] || 0))[0]?.strategyImpact || null;
}

// ─── Cards ──────────────────────────────────────────────────────────────

function InsightCard({ insight, pinned }) {
  const navigate = useNavigate();
  const related = ACTIONS.filter(a => a.fromInsightRef === insight.id);
  const impact = dominantImpactFor(insight);

  const handleUnpin = (e) => {
    e.stopPropagation();
    unpinInsight(insight.id);
  };

  return (
    <button
      onClick={() => navigate('/insights')}
      title="Open in NOVA · Strategy-to-Action"
      className={`w-full text-left rounded-lg border bg-auri-bg p-3 hover:shadow-sm transition-all group ${pinned ? 'border-auri-text/60 ring-1 ring-auri-text/30 hover:border-auri-text' : 'border-auri-border hover:border-auri-text/50'}`}
    >
      {/* Pinned-from-NOVA pill */}
      {pinned && (
        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-auri-text/20">
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-auri-text">
            <GitBranch size={11} /> Just added from NOVA
          </span>
          <span
            role="button"
            tabIndex={0}
            onClick={handleUnpin}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleUnpin(e); }}
            className="text-auri-muted hover:text-auri-text"
            title="Remove from journey"
          >
            <X size={12} />
          </span>
        </div>
      )}

      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-medium text-auri-muted uppercase tracking-wider">{insight.id}</span>
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${PRIORITY_STYLE[insight.priority] || ''}`}>
            {insight.priority}
          </span>
        </div>
        <ExternalLink size={12} className="text-auri-muted opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Title */}
      <div className="text-sm font-semibold text-auri-text leading-snug mb-2">{insight.title}</div>

      {/* Refs */}
      <div className="flex flex-wrap gap-1 mb-2">
        {insight.lpRefs?.map(lp => (
          <span key={lp} className="text-[9px] font-medium px-1.5 py-0.5 rounded border bg-auri-card text-auri-muted border-auri-border">{lp}</span>
        ))}
        {insight.moRefs?.map(mo => (
          <span key={mo} className="text-[9px] font-medium px-1.5 py-0.5 rounded border bg-auri-text/5 text-auri-text border-auri-text/20">{mo}</span>
        ))}
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-3 text-[10px] text-auri-muted mb-2">
        <span className="flex items-center gap-1"><TrendingUp size={10} /> {insight.recurrence}×</span>
        <span className="flex items-center gap-1"><Calendar size={10} /> {insight.recency}</span>
        <span className="ml-auto font-medium text-auri-text">{Math.round(insight.confidenceScore * 100)}%</span>
      </div>

      {/* Linked actions */}
      {related.length > 0 && (
        <div className="pt-2 border-t border-auri-border space-y-0.5">
          {related.map(a => (
            <div key={a.id} className="flex items-center justify-between gap-2 text-[10px]">
              <span className="text-auri-muted truncate" title={a.title}>{a.id} · {a.title}</span>
              <span className={`font-medium shrink-0 ${ACTION_STATUS_STYLE[a.status] || ''}`}>{a.status}</span>
            </div>
          ))}
        </div>
      )}

      {/* Strategy impact badge */}
      {impact && (
        <div className="mt-2 pt-2 border-t border-auri-border">
          <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded border ${IMPACT_STYLE[impact] || ''}`}>
            Strategy {impact}
          </span>
        </div>
      )}
    </button>
  );
}

function SignalCard({ signal }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(signal.suggestedAction?.path || '/')}
      className="w-full text-left rounded-lg border border-dashed border-auri-border bg-auri-bg p-3 hover:border-auri-text/50 hover:shadow-sm transition-all"
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Radio size={11} className="text-auri-muted" />
        <span className={`text-[9px] font-michroma tracking-wider px-1.5 py-0.5 rounded border ${AGENT_STYLE[signal.agent] || ''}`}>
          {signal.agent}
        </span>
        <span className="text-[9px] text-auri-muted ml-auto">new signal</span>
      </div>
      <div className="text-xs font-medium text-auri-text leading-snug mb-1">{signal.headline}</div>
      <p className="text-[10px] text-auri-muted leading-relaxed line-clamp-3">{signal.context}</p>
    </button>
  );
}

// ─── Board ──────────────────────────────────────────────────────────────

export default function InsightJourney() {
  const [pinnedIds, setPinnedIds] = useState(() => getPinnedIds());

  useEffect(() => subscribePinned(setPinnedIds), []);
  const pinnedSet = new Set(pinnedIds);

  // Bucket insights into lanes. Pinned-from-NOVA insights are forced
  // into the Captured lane (treated as "just promoted to the journey")
  // and placed first so they're easy to spot during a demo.
  const byLane = Object.fromEntries(LANES.map(l => [l.id, []]));
  INSIGHTS.forEach(i => {
    const lane = pinnedSet.has(i.id) ? 'captured' : laneForInsight(i);
    byLane[lane].push(i);
  });
  // Keep pinned items at the top of Captured.
  byLane.captured.sort((a, b) => Number(pinnedSet.has(b.id)) - Number(pinnedSet.has(a.id)));

  // Top 3 signals populate the Captured lane as "not-yet-formalised" entries.
  const signalsInCaptured = SIGNALS.slice(0, 3);

  // Count total "items" in play across the board.
  const totalItems = INSIGHTS.length + signalsInCaptured.length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-auri-text mb-1">Insight Journey</h1>
          <p className="text-sm text-auri-muted max-w-3xl">
            Every insight travels from raw signal to strategic impact. This board tracks the journey — what was heard, what was validated, what drove action, and what actually shaped the plan.
          </p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[10px] uppercase tracking-wider text-auri-muted">Items in flight</div>
          <div className="text-xl font-semibold text-auri-text">{totalItems}</div>
        </div>
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {LANES.map(lane => {
          const Icon = lane.icon;
          const items = byLane[lane.id];
          const extras = lane.id === 'captured' ? signalsInCaptured : [];
          const total = items.length + extras.length;

          return (
            <div key={lane.id} className="rounded-xl border border-auri-border bg-auri-card/60 p-3 flex flex-col min-h-[200px]">
              {/* Lane header */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-auri-border">
                <div className={`w-7 h-7 rounded-md border flex items-center justify-center ${lane.accent}`}>
                  <Icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-auri-text leading-tight">{lane.label}</div>
                  <div className="text-[10px] text-auri-muted">{lane.sub}</div>
                </div>
                <span className="text-[10px] font-medium text-auri-muted shrink-0">{total}</span>
              </div>

              {/* Cards */}
              <div className="space-y-2">
                {extras.map((s, i) => <SignalCard key={`s-${i}`} signal={s} />)}
                {items.map(i => <InsightCard key={i.id} insight={i} pinned={pinnedSet.has(i.id)} />)}
                {total === 0 && (
                  <div className="text-[11px] text-auri-muted italic text-center py-4">—</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 text-[11px] text-auri-muted pt-2">
        <span className="font-medium text-auri-text">Strategy impact:</span>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border ${IMPACT_STYLE.Confirmed}`}>Confirmed</span>
        <span className="text-auri-muted">validates current plan</span>
        <span>·</span>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border ${IMPACT_STYLE.Challenged}`}>Challenged</span>
        <span className="text-auri-muted">questions approach</span>
        <span>·</span>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border ${IMPACT_STYLE.Changed}`}>Changed</span>
        <span className="text-auri-muted">shifted the strategy</span>
      </div>
    </div>
  );
}
