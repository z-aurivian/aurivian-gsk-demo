import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Send, Sparkles,
  Activity, Microscope, Users as UsersIcon, BarChart3,
  ArrowUpRight, TrendingUp, TrendingDown,
  ChevronDown, ChevronUp,
} from 'lucide-react';
import {
  CLIENT,
  PREDICTIVE_SIGNALS, KIT_SCORECARDS, EMERGING_THEMES, INSIGHT_TO_IMPACT,
  GAP_RADAR, OUTCOME_VOLUME,
} from '../config';

const AGENTS = [
  { id: 'aria', name: 'ARIA', tagline: 'Attends. Records. Interprets. Advises.', role: 'Congress Intelligence', icon: Activity,   path: '/congress' },
  { id: 'luca', name: 'LUCA', tagline: 'Knows who matters. Knows what they think.', role: 'KOL Intelligence',    icon: UsersIcon, path: '/kol' },
  { id: 'nova', name: 'NOVA', tagline: 'Transforms fragmented science into decisions.', role: 'Medical Insights', icon: Microscope, path: '/insights' },
  { id: 'vega', name: 'VEGA', tagline: 'Visualizes. Evaluates. Grounds. Analyzes.', role: 'Strategic Analytics', icon: BarChart3, path: '/vega' },
];

const KIT_STATUS_STYLE = {
  Active:    'bg-emerald-50 text-emerald-700 border-emerald-200',
  Monitor:   'bg-amber-50 text-amber-700 border-amber-200',
  Alert:     'bg-rose-50 text-rose-700 border-rose-200',
  Declining: 'bg-zinc-50 text-zinc-700 border-zinc-200',
};

const CONFIDENCE_STYLE = {
  high:   'bg-emerald-50 text-emerald-700 border-emerald-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  low:    'bg-zinc-50 text-zinc-700 border-zinc-200',
};

const AGENT_ACCENT = {
  ARIA: 'bg-sky-50 text-sky-700 border-sky-200',
  LUCA: 'bg-violet-50 text-violet-700 border-violet-200',
  NOVA: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  VEGA: 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function CommandCenter() {
  const [signalsExpanded, setSignalsExpanded] = useState(false);
  const [gapsExpanded, setGapsExpanded] = useState(false);
  const [themesExpanded, setThemesExpanded] = useState(false);
  const [directiveInput, setDirectiveInput] = useState('');
  // Tile open/closed state — each of the 4 dashboard tiles collapses to its
  // header so the landing page is breathable. All four start closed; users
  // open the ones they care about.
  const [openTiles, setOpenTiles] = useState({ predictive: false, kit: false, gaps: false, themes: false });
  const toggleTile = (id) => setOpenTiles((s) => ({ ...s, [id]: !s[id] }));

  const remaining = OUTCOME_VOLUME.committed - OUTCOME_VOLUME.consumed;
  const consumedPct = Math.round((OUTCOME_VOLUME.consumed / OUTCOME_VOLUME.committed) * 100);

  const visibleSignals = signalsExpanded ? PREDICTIVE_SIGNALS : PREDICTIVE_SIGNALS.slice(0, 3);
  const hiddenSignalsCount = Math.max(0, PREDICTIVE_SIGNALS.length - 3);

  const visibleGaps = gapsExpanded ? GAP_RADAR : GAP_RADAR.slice(0, 1);
  const hiddenGapsCount = Math.max(0, GAP_RADAR.length - 1);

  const visibleThemes = themesExpanded ? EMERGING_THEMES : EMERGING_THEMES.slice(0, 3);
  const hiddenThemesCount = Math.max(0, EMERGING_THEMES.length - 3);

  // KIT Metric tile shows the top KITs by relevance score (highest signal).
  const topKITs = [...KIT_SCORECARDS].sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 4);
  const featuredImpact = INSIGHT_TO_IMPACT[0];

  return (
    <div className="space-y-8">
      {/* Directive input — hero. The welcome header was pulled out; the
          input's own framing carries the intent without extra copy. */}
      <div className="bg-auri-bg border border-auri-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-auri-text" />
          <span className="text-sm font-medium text-auri-text">
            {CLIENT?.name ? `${CLIENT.name} — ` : ''}what would you like to direct?
          </span>
        </div>
        <form className="flex gap-2" onSubmit={(e) => {
          e.preventDefault();
          const text = directiveInput.trim();
          if (!text) return;
          window.dispatchEvent(new CustomEvent('auri:directive', { detail: text }));
          setDirectiveInput('');
        }}>
          <input
            type="text"
            value={directiveInput}
            onChange={(e) => setDirectiveInput(e.target.value)}
            placeholder='e.g. "Summarise the most important signals from the last congress cycle."'
            className="flex-1 px-4 py-3 rounded-lg border border-auri-border bg-auri-card text-sm text-auri-text focus:outline-none focus:border-auri-text"
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-3 rounded-lg bg-auri-text text-auri-bg text-sm font-medium hover:bg-auri-text/90 transition-all"
          >
            <Send size={16} />
            Direct
          </button>
        </form>
      </div>

      {/* Your Agents */}
      <div>
        <h2 className="text-sm font-semibold text-auri-text mb-3 uppercase tracking-wider">Your Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {AGENTS.map((a) => {
            const Icon = a.icon;
            const av = OUTCOME_VOLUME.byAgent?.[a.id];
            return (
              <NavLink
                key={a.id}
                to={a.path}
                className="bg-auri-bg border border-auri-border rounded-xl p-5 hover:border-auri-text/50 hover:shadow-sm transition-all block"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-auri-text/10 text-auri-text flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="font-michroma text-auri-text text-base tracking-wider">{a.name}</div>
                      <div className="text-xs text-auri-muted">{a.role}</div>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-auri-muted" />
                </div>
                <p className="text-sm text-auri-muted leading-relaxed mb-3">{a.tagline}</p>
                {av && (
                  <div className="flex items-center justify-between text-xs text-auri-muted pt-3 border-t border-auri-border">
                    <span>Results this period</span>
                    <span className="text-auri-text font-medium">{av.consumed} / {av.committed}</span>
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Top row — Predictive Signals + KIT Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {/* Predictive Signals */}
        <div className="bg-auri-bg border border-auri-border rounded-xl">
          <button
            type="button"
            onClick={() => toggleTile('predictive')}
            className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-auri-card/50 transition-all rounded-xl"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-s-new animate-pulse" />
              <h3 className="text-sm font-semibold text-auri-text">Predictive Signals</h3>
              <span className="text-xs text-auri-muted">always listening</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-auri-muted">{PREDICTIVE_SIGNALS.length} active</span>
              {openTiles.predictive ? <ChevronUp size={16} className="text-auri-muted" /> : <ChevronDown size={16} className="text-auri-muted" />}
            </div>
          </button>
          {openTiles.predictive && (
          <div className="px-5 pb-5">
          <div className="space-y-3">
            {visibleSignals.map((s) => {
              const Trend = s.trajectory === 'rising' ? TrendingUp
                : s.trajectory === 'declining' ? TrendingDown
                : Activity;
              const trendColor = s.trajectory === 'rising' ? 'text-emerald-600'
                : s.trajectory === 'declining' ? 'text-rose-600'
                : 'text-amber-600';
              return (
                <NavLink
                  key={s.id}
                  to={s.suggestedAction?.path || '/'}
                  className="block p-3 rounded-lg border border-auri-border hover:border-auri-text/40 hover:bg-auri-card transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`text-[10px] font-michroma tracking-wider px-1.5 py-0.5 rounded border ${AGENT_ACCENT[s.agent] || 'bg-auri-card text-auri-muted border-auri-border'}`}>
                        {s.agent}
                      </span>
                      <span className="text-sm font-medium text-auri-text truncate">{s.signal}</span>
                    </div>
                    <Trend size={14} className={`${trendColor} shrink-0`} />
                  </div>
                  <p className="text-xs text-auri-muted leading-relaxed mb-2 line-clamp-2">{s.currentState}</p>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-auri-muted">Time to impact: <span className="text-auri-text font-medium">{s.timeToImpact}</span></span>
                    <span className={`px-1.5 py-0.5 rounded border ${CONFIDENCE_STYLE[s.confidence] || CONFIDENCE_STYLE.medium}`}>
                      {s.confidence} confidence
                    </span>
                  </div>
                </NavLink>
              );
            })}
          </div>
          {hiddenSignalsCount > 0 && (
            <button
              onClick={() => setSignalsExpanded(!signalsExpanded)}
              className="mt-3 text-xs text-auri-text hover:underline"
            >
              {signalsExpanded ? 'Show less' : `View all (${PREDICTIVE_SIGNALS.length})`}
            </button>
          )}
          </div>
          )}
        </div>

        {/* KIT Metrics — top KITs by relevance + outcome volume + insight-to-impact */}
        <div className="bg-auri-bg border border-auri-border rounded-xl">
          <button
            type="button"
            onClick={() => toggleTile('kit')}
            className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-auri-card/50 transition-all rounded-xl"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-s-info" />
              <h3 className="text-sm font-semibold text-auri-text">KIT Metrics</h3>
              <span className="text-xs text-auri-muted">· Insight-to-Impact</span>
            </div>
            {openTiles.kit ? <ChevronUp size={16} className="text-auri-muted" /> : <ChevronDown size={16} className="text-auri-muted" />}
          </button>
          {openTiles.kit && (
          <div className="px-5 pb-5">
          <div className="mb-3 -mt-1">
            <NavLink to="/insights" className="text-xs text-auri-text hover:underline">
              Open NOVA →
            </NavLink>
          </div>

          {/* Outcome volume — kept as the top-line activity metric */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-auri-muted">Outcome Volume — {OUTCOME_VOLUME.period}</span>
              <span className="text-auri-text font-medium">{consumedPct}% consumed</span>
            </div>
            <div className="h-2 bg-auri-card rounded-full overflow-hidden">
              <div className="h-full bg-auri-text" style={{ width: `${consumedPct}%` }} />
            </div>
            <div className="flex items-center justify-between text-[11px] text-auri-muted mt-1">
              <span>{OUTCOME_VOLUME.consumed.toLocaleString()} results delivered</span>
              <span>{remaining.toLocaleString()} remaining</span>
            </div>
          </div>

          {/* Top KITs by relevance */}
          <div className="space-y-2 mb-4">
            <div className="text-[10px] uppercase tracking-wider text-auri-muted font-semibold">Top KITs by relevance</div>
            {topKITs.map((kit) => {
              const TrendIcon = kit.percentChange >= 0 ? TrendingUp : TrendingDown;
              const trendColor = kit.percentChange >= 0 ? 'text-emerald-600' : 'text-rose-600';
              return (
                <div key={kit.id} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-auri-text truncate">{kit.name}</div>
                    <div className="h-1.5 bg-auri-card rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-auri-text" style={{ width: `${kit.relevanceScore}%` }} />
                    </div>
                  </div>
                  <span className={`flex items-center gap-0.5 text-[11px] font-medium ${trendColor} shrink-0 w-12 justify-end`}>
                    <TrendIcon size={11} />
                    {kit.percentChange >= 0 ? '+' : ''}{kit.percentChange.toFixed(0)}%
                  </span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded border shrink-0 ${KIT_STATUS_STYLE[kit.status] || KIT_STATUS_STYLE.Active}`}>
                    {kit.status}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Insight-to-Impact — featured one */}
          {featuredImpact && (
            <div className="rounded-lg border border-auri-border bg-auri-card p-3">
              <div className="text-[10px] uppercase tracking-wider text-auri-text font-semibold mb-1.5 flex items-center gap-2">
                <span>Insight → Action → Outcome</span>
                <span className="text-auri-muted normal-case tracking-normal">· {featuredImpact.timeframe}</span>
                <span className="ml-auto text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">Impact {featuredImpact.impactScore}/10</span>
              </div>
              <div className="text-xs text-auri-text leading-relaxed">
                <span className="text-auri-muted">Insight:</span> {featuredImpact.insight}
              </div>
              <div className="text-xs text-auri-text leading-relaxed mt-1">
                <span className="text-auri-muted">Outcome:</span> {featuredImpact.outcome}
              </div>
            </div>
          )}
          </div>
          )}
        </div>
      </div>

      {/* Bottom row — Gap Radar + Emerging Themes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {/* Gap Radar */}
        {GAP_RADAR.length > 0 && (
          <div className="bg-auri-bg border border-auri-border rounded-xl">
            <button
              type="button"
              onClick={() => toggleTile('gaps')}
              className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-auri-card/50 transition-all rounded-xl"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-s-urgent" />
                <h3 className="text-sm font-semibold text-auri-text">Gap Radar</h3>
                <span className="text-xs text-auri-muted">agent-proposed</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-auri-muted">{GAP_RADAR.length} gaps</span>
                {openTiles.gaps ? <ChevronUp size={16} className="text-auri-muted" /> : <ChevronDown size={16} className="text-auri-muted" />}
              </div>
            </button>
            {openTiles.gaps && (
            <div className="px-5 pb-5">
              {hiddenGapsCount > 0 && (
                <div className="mb-3 -mt-1">
                  <button
                    onClick={() => setGapsExpanded(!gapsExpanded)}
                    className="text-xs text-auri-text hover:underline"
                  >
                    {gapsExpanded ? 'Show less' : `+${hiddenGapsCount} more`}
                  </button>
                </div>
              )}
              <div className="space-y-3">
                {visibleGaps.map((g, idx) => (
                  <div key={idx} className="p-4 rounded-lg border border-auri-border bg-auri-card">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-auri-text">{g.type}</span>
                      <span className="text-[10px] text-auri-muted">{g.moRef}</span>
                    </div>
                    <div className="text-sm text-auri-text font-medium mb-1.5 leading-snug">{g.suggestion}</div>
                    <p className="text-xs text-auri-muted leading-relaxed">{g.rationale}</p>
                  </div>
                ))}
              </div>
            </div>
            )}
          </div>
        )}

        {/* Emerging Themes */}
        {EMERGING_THEMES.length > 0 && (
          <div className="bg-auri-bg border border-auri-border rounded-xl">
            <button
              type="button"
              onClick={() => toggleTile('themes')}
              className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-auri-card/50 transition-all rounded-xl"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-s-emerging" />
                <h3 className="text-sm font-semibold text-auri-text">Emerging Themes</h3>
                <span className="text-xs text-auri-muted">growth-ranked</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-auri-muted">{EMERGING_THEMES.length} themes</span>
                {openTiles.themes ? <ChevronUp size={16} className="text-auri-muted" /> : <ChevronDown size={16} className="text-auri-muted" />}
              </div>
            </button>
            {openTiles.themes && (
            <div className="px-5 pb-5">
              {hiddenThemesCount > 0 && (
                <div className="mb-3 -mt-1">
                  <button
                    onClick={() => setThemesExpanded(!themesExpanded)}
                    className="text-xs text-auri-text hover:underline"
                  >
                    {themesExpanded ? 'Show less' : `+${hiddenThemesCount} more`}
                  </button>
                </div>
              )}
              <div className="space-y-3">
                {visibleThemes.map((t) => (
                <NavLink
                  key={t.id}
                  to="/insights"
                  className="block p-3 rounded-lg border border-auri-border hover:border-auri-text/40 bg-auri-card transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-sm font-medium text-auri-text leading-snug">{t.theme}</span>
                    <span className="text-xs font-semibold text-emerald-700 shrink-0">+{t.growthRate}%</span>
                  </div>
                  <p className="text-xs text-auri-muted leading-relaxed line-clamp-2 mb-1.5">{t.description}</p>
                  <div className="flex items-center gap-2 text-[10px] text-auri-muted">
                    <span>First detected {t.firstDetected}</span>
                    <span>·</span>
                    <span className="text-auri-text">{t.relatedKIT}</span>
                  </div>
                </NavLink>
              ))}
              </div>
            </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
