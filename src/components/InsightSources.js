import React from 'react';
import { Target, Zap, ChevronDown, FileDown } from 'lucide-react';
import { INSIGHT_SOURCES, INSIGHT_TO_IMPACT } from '../config';

function ExportButton() {
  return (
    <button
      onClick={() => window.alert('Export to PowerPoint — coming soon. Source value matrix and impact lineage will export as formatted slides.')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border border-auri-border text-auri-muted hover:text-auri-text hover:border-auri-text/50 transition-all"
    >
      <FileDown size={13} />
      Export to PPT
    </button>
  );
}

export default function InsightSources() {
  return (
    <div className="space-y-6">
      {/* Insight Source Value Matrix */}
      <div className="bg-auri-bg border border-auri-border rounded-xl p-5">
        <div className="flex items-end justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Target size={16} className="text-auri-text" />
            <h3 className="text-sm font-semibold text-auri-text">Insight Source Value Matrix</h3>
            <span className="text-xs text-auri-muted">volume · quality · ROI</span>
          </div>
          <ExportButton />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-auri-muted text-left text-xs border-b border-auri-border">
                <th className="py-2 pr-4 font-medium">Source</th>
                <th className="py-2 pr-4 font-medium">Volume</th>
                <th className="py-2 pr-4 font-medium">Quality</th>
                <th className="py-2 pr-4 font-medium">Leads to action</th>
                <th className="py-2 pr-4 font-medium">Cost / insight</th>
                <th className="py-2 font-medium">ROI score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-auri-border">
              {INSIGHT_SOURCES.map((s) => {
                const qualityColor = s.qualityScore >= 80 ? 'bg-emerald-500'
                  : s.qualityScore >= 60 ? 'bg-amber-500' : 'bg-rose-500';
                const roiColor = s.roiScore >= 8 ? 'text-emerald-600'
                  : s.roiScore >= 5 ? 'text-amber-600' : 'text-rose-600';
                return (
                  <tr key={s.id}>
                    <td className="py-2 pr-4 text-auri-text font-medium">{s.source}</td>
                    <td className="py-2 pr-4 text-auri-text">{s.volume.toLocaleString()}</td>
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-auri-card rounded-full overflow-hidden">
                          <div className={`h-full ${qualityColor}`} style={{ width: `${s.qualityScore}%` }} />
                        </div>
                        <span className="text-xs text-auri-muted">{s.qualityScore}</span>
                      </div>
                    </td>
                    <td className="py-2 pr-4 text-auri-text">{s.leadsToActionPct}%</td>
                    <td className="py-2 pr-4 text-auri-muted">${s.costPerInsight.toLocaleString()}</td>
                    <td className={`py-2 font-semibold ${roiColor}`}>{s.roiScore.toFixed(1)}/10</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insight-to-Impact Tracking */}
      <div className="bg-auri-bg border border-auri-border rounded-xl p-5">
        <div className="flex items-end justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-auri-text" />
            <h3 className="text-sm font-semibold text-auri-text">Insight-to-Impact Tracking</h3>
            <span className="text-xs text-auri-muted">insight → action → outcome</span>
          </div>
          <ExportButton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {INSIGHT_TO_IMPACT.map((item) => {
            const impactColor = item.impactScore >= 8 ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : item.impactScore >= 5 ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-rose-50 text-rose-700 border-rose-200';
            return (
              <div key={item.id} className="rounded-xl border border-auri-border p-4 space-y-3">
                <div className="rounded-lg bg-auri-text/5 border border-auri-text/20 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-auri-text font-semibold mb-1">Insight</div>
                  <p className="text-xs text-auri-text leading-relaxed">{item.insight}</p>
                </div>
                <div className="flex justify-center">
                  <ChevronDown size={14} className="text-auri-muted" />
                </div>
                <div className="rounded-lg bg-auri-card p-3">
                  <div className="text-[10px] uppercase tracking-wider text-amber-700 font-semibold mb-1">Action</div>
                  <p className="text-xs text-auri-text leading-relaxed">{item.action}</p>
                </div>
                <div className="flex justify-center">
                  <ChevronDown size={14} className="text-auri-muted" />
                </div>
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold mb-1">Outcome</div>
                  <p className="text-xs text-auri-text leading-relaxed">{item.outcome}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-auri-border">
                  <span className="text-[11px] text-auri-muted">{item.timeframe}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${impactColor}`}>
                    Impact {item.impactScore}/10
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
