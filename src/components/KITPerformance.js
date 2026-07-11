import React, { useState } from 'react';
import {
  TrendingUp, TrendingDown, Activity, Brain, Zap, ChevronDown, ChevronUp, FileDown,
} from 'lucide-react';
import {
  KIT_SCORECARDS, EMERGING_THEMES,
} from '../config';

const STATUS_STYLE = {
  Active:    'bg-emerald-50 text-emerald-700 border-emerald-200',
  Monitor:   'bg-amber-50 text-amber-700 border-amber-200',
  Alert:     'bg-rose-50 text-rose-700 border-rose-200',
  Declining: 'bg-zinc-50 text-zinc-700 border-zinc-200',
};

function ExportButton() {
  return (
    <button
      onClick={() => window.alert('Export to PowerPoint — coming soon. Each KIT card and table will export as a formatted slide.')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border border-auri-border text-auri-muted hover:text-auri-text hover:border-auri-text/50 transition-all"
    >
      <FileDown size={13} />
      Export to PPT
    </button>
  );
}

function sentimentLabel(val) {
  if (typeof val !== 'number') return val;
  if (val >= 0.7) return 'Very Positive';
  if (val >= 0.5) return 'Positive';
  if (val >= 0.35) return 'Mixed';
  if (val >= 0.2) return 'Negative';
  return 'Very Negative';
}

function SentimentBadge({ value }) {
  const label = sentimentLabel(value);
  const tone = label === 'Very Positive' || label === 'Positive'
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : label === 'Mixed'
    ? 'bg-amber-50 text-amber-700 border-amber-200'
    : 'bg-rose-50 text-rose-700 border-rose-200';
  return <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${tone}`}>{label}</span>;
}

export default function KITPerformance() {
  const [expanded, setExpanded] = useState({});

  const toggle = (id) => setExpanded((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div className="space-y-6">
      {/* KIT Scorecard */}
      <div className="bg-auri-bg border border-auri-border rounded-xl p-5">
        <div className="flex items-end justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-auri-text" />
            <h3 className="text-sm font-semibold text-auri-text">KIT Scorecard</h3>
            <span className="text-xs text-auri-muted">month-on-month</span>
          </div>
          <ExportButton />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-auri-muted text-left text-xs border-b border-auri-border">
                <th className="py-2 pr-4 font-medium">KIT</th>
                <th className="py-2 pr-4 font-medium">Mentions</th>
                <th className="py-2 pr-4 font-medium">Δ</th>
                <th className="py-2 pr-4 font-medium">Sentiment</th>
                <th className="py-2 pr-4 font-medium">Relevance</th>
                <th className="py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-auri-border">
              {KIT_SCORECARDS.map((kit) => {
                const TrendIcon = kit.percentChange >= 0 ? TrendingUp : TrendingDown;
                const trendColor = kit.percentChange >= 0 ? 'text-emerald-600' : 'text-rose-600';
                return (
                  <tr key={kit.id}>
                    <td className="py-2 pr-4 text-auri-text font-medium">{kit.name}</td>
                    <td className="py-2 pr-4 text-auri-text">{kit.currentMentions}</td>
                    <td className={`py-2 pr-4 text-xs font-medium ${trendColor}`}>
                      <span className="flex items-center gap-0.5">
                        <TrendIcon size={12} />
                        {kit.percentChange >= 0 ? '+' : ''}{kit.percentChange.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-2 pr-4"><SentimentBadge value={kit.currentSentiment} /></td>
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-auri-card rounded-full overflow-hidden">
                          <div className="h-full bg-auri-text" style={{ width: `${kit.relevanceScore}%` }} />
                        </div>
                        <span className="text-xs text-auri-muted">{kit.relevanceScore}</span>
                      </div>
                    </td>
                    <td className="py-2">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${STATUS_STYLE[kit.status] || STATUS_STYLE.Active}`}>
                        {kit.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insight Analysis — expandable per KIT */}
      <div className="bg-auri-bg border border-auri-border rounded-xl p-5">
        <div className="flex items-end justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Brain size={16} className="text-auri-text" />
            <h3 className="text-sm font-semibold text-auri-text">KIT Insight Analysis</h3>
            <span className="text-xs text-auri-muted">current vs prior month</span>
          </div>
          <ExportButton />
        </div>
        <div className="space-y-2">
          {KIT_SCORECARDS.map((kit) => {
            const isOpen = !!expanded[kit.id];
            return (
              <div key={kit.id} className="rounded-lg border border-auri-border overflow-hidden">
                <button
                  onClick={() => toggle(kit.id)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-auri-card transition-all"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Zap size={14} className="text-auri-text shrink-0" />
                    <span className="text-sm font-medium text-auri-text truncate">{kit.name}</span>
                  </div>
                  {isOpen ? <ChevronUp size={16} className="text-auri-muted shrink-0" /> : <ChevronDown size={16} className="text-auri-muted shrink-0" />}
                </button>
                {isOpen && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 border-t border-auri-border bg-auri-card">
                    <div className="rounded-lg bg-auri-bg p-3 border border-auri-border">
                      <div className="text-[10px] uppercase tracking-wider text-auri-text font-semibold mb-1.5">Current Month</div>
                      <p className="text-xs text-auri-text leading-relaxed">{kit.aiSummaryCurrent}</p>
                    </div>
                    <div className="rounded-lg bg-auri-bg p-3 border border-auri-border">
                      <div className="text-[10px] uppercase tracking-wider text-auri-muted font-semibold mb-1.5">Prior Month</div>
                      <p className="text-xs text-auri-muted leading-relaxed">{kit.aiSummaryPrior}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Emerging Themes */}
      <div className="bg-auri-bg border border-auri-border rounded-xl p-5">
        <div className="flex items-end justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-auri-text" />
            <h3 className="text-sm font-semibold text-auri-text">Emerging Themes</h3>
            <span className="text-xs text-auri-muted">growth-ranked</span>
          </div>
          <ExportButton />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-auri-muted text-left text-xs border-b border-auri-border">
                <th className="py-2 pr-4 font-medium">Theme</th>
                <th className="py-2 pr-4 font-medium">Growth</th>
                <th className="py-2 pr-4 font-medium">First detected</th>
                <th className="py-2 pr-4 font-medium">Related KIT</th>
                <th className="py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-auri-border">
              {EMERGING_THEMES.map((t) => {
                const heat = t.growthRate > 50 ? 'text-emerald-700 font-semibold'
                  : t.growthRate > 20 ? 'text-emerald-600'
                  : 'text-auri-text';
                return (
                  <tr key={t.id}>
                    <td className="py-2 pr-4 text-auri-text font-medium">{t.theme}</td>
                    <td className={`py-2 pr-4 ${heat}`}>+{t.growthRate}%</td>
                    <td className="py-2 pr-4 text-auri-muted">{t.firstDetected}</td>
                    <td className="py-2 pr-4 text-auri-text">{t.relatedKIT}</td>
                    <td className="py-2 text-auri-muted text-xs leading-snug max-w-md">{t.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
