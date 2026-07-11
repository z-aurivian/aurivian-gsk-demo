import React, { useState } from 'react';
import {
  TrendingUp, TrendingDown, Activity, Users, Target, Award,
  AlertTriangle, FileDown, Gauge, BarChart3,
} from 'lucide-react';
import AgentSurfaceHeader from './AgentSurfaceHeader';
import {
  VEGA_AWARENESS_PROGRESSION, VEGA_INTERACTION_QUALITY, VEGA_ENGAGEMENT_GAPS,
  VEGA_SHARE_OF_VOICE, VEGA_SENTIMENT_VELOCITY,
  VEGA_CARE_GAP_CLOSURE, VEGA_ROMI, VEGA_IMPACT_INDEX,
} from '../config';

const TABS = [
  { id: 'field',     label: 'Field Engagement',    icon: Users },
  { id: 'alignment', label: 'Scientific Alignment', icon: Target },
  { id: 'impact',    label: 'Impact & Outcomes',   icon: Award },
];

function ExportButton() {
  return (
    <button
      onClick={() => window.alert('Export to PowerPoint — coming soon. The published deck will mirror this view with formatted slides per measure.')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border border-auri-border text-auri-muted hover:text-auri-text hover:border-auri-text/50 transition-all"
    >
      <FileDown size={13} />
      Export to PPT
    </button>
  );
}

function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-end justify-between gap-3 mb-3">
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-auri-text" />
        <h3 className="text-sm font-semibold text-auri-text">{title}</h3>
        {subtitle && <span className="text-xs text-auri-muted">{subtitle}</span>}
      </div>
      <ExportButton />
    </div>
  );
}

function Insight({ children, tone = 'info' }) {
  const tones = {
    info:    'bg-auri-text/5 border-auri-text/30 text-auri-text',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  };
  return (
    <div className={`mt-3 rounded-lg border p-3 text-xs leading-relaxed ${tones[tone]}`}>
      {children}
    </div>
  );
}

function FieldEngagement() {
  const ap = VEGA_AWARENESS_PROGRESSION;
  const iq = VEGA_INTERACTION_QUALITY;

  return (
    <div className="space-y-6">
      {/* HCP Awareness Progression */}
      <div className="bg-auri-bg border border-auri-border rounded-xl p-5">
        <SectionHeader icon={Activity} title="HCP Awareness Progression" subtitle="movement along the awareness ladder" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-auri-muted text-left text-xs border-b border-auri-border">
                <th className="py-2 pr-4 font-medium">Stage</th>
                <th className="py-2 pr-4 font-medium">HCPs</th>
                <th className="py-2 pr-4 font-medium">% of total</th>
                <th className="py-2 font-medium">vs Q4</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-auri-border">
              {ap.stages.map((row) => {
                const positive = row.vsQ4.startsWith('+');
                return (
                  <tr key={row.stage}>
                    <td className="py-2 pr-4 text-auri-text font-medium">{row.stage}</td>
                    <td className="py-2 pr-4 text-auri-text">{row.hcps.toLocaleString()}</td>
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-auri-card rounded-full overflow-hidden">
                          <div className="h-full bg-auri-text" style={{ width: `${row.pctTotal}%` }} />
                        </div>
                        <span className="text-xs text-auri-muted">{row.pctTotal}%</span>
                      </div>
                    </td>
                    <td className={`py-2 text-xs font-medium ${positive ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {row.vsQ4}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Insight tone="success">
          <span className="font-semibold">Benchmark.</span> {ap.benchmark}
        </Insight>
      </div>

      {/* Interaction Quality vs Quantity */}
      <div className="bg-auri-bg border border-auri-border rounded-xl p-5">
        <SectionHeader icon={Gauge} title="Interaction Quality vs Quantity" subtitle="MSL-level performance" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-auri-muted text-left text-xs border-b border-auri-border">
                <th className="py-2 pr-4 font-medium">MSL — Region</th>
                <th className="py-2 pr-4 font-medium">Interactions</th>
                <th className="py-2 pr-4 font-medium">vs target</th>
                <th className="py-2 pr-4 font-medium">Quality</th>
                <th className="py-2 pr-4 font-medium">Insight rate</th>
                <th className="py-2 font-medium">Overall</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-auri-border">
              {iq.rows.map((row) => {
                const positive = row.vsTarget.startsWith('+');
                const overallTone = row.overall === 'Excellent' || row.overall === 'On track'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : row.overall.includes('gap') || row.overall === 'Needs support'
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200';
                return (
                  <tr key={row.msl}>
                    <td className="py-2 pr-4 text-auri-text font-medium">{row.msl} <span className="text-auri-muted font-normal">— {row.region}</span></td>
                    <td className="py-2 pr-4 text-auri-text">{row.interactions}</td>
                    <td className={`py-2 pr-4 text-xs font-medium ${positive ? 'text-emerald-600' : 'text-rose-600'}`}>{row.vsTarget}</td>
                    <td className="py-2 pr-4 text-auri-text">{row.quality}/10</td>
                    <td className="py-2 pr-4 text-auri-text">{row.insightRate}%</td>
                    <td className="py-2">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${overallTone}`}>
                        {row.overall}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Insight tone="warning">
          <span className="font-semibold">AI insight.</span> {iq.insight}
        </Insight>
      </div>

      {/* Engagement Gap Tracker */}
      <div className="bg-auri-bg border border-auri-border rounded-xl p-5">
        <SectionHeader icon={AlertTriangle} title="Engagement Gap Tracker" subtitle="Tier 1/2 KOLs at risk of going cold" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-auri-muted text-left text-xs border-b border-auri-border">
                <th className="py-2 pr-4 font-medium">KOL</th>
                <th className="py-2 pr-4 font-medium">Tier</th>
                <th className="py-2 pr-4 font-medium">Last contact</th>
                <th className="py-2 pr-4 font-medium">Gap</th>
                <th className="py-2 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-auri-border">
              {VEGA_ENGAGEMENT_GAPS.map((row) => {
                const urgent = row.action.toLowerCase().includes('urgent');
                const onTrack = row.action.toLowerCase().includes('on track');
                const tone = urgent
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : onTrack
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200';
                return (
                  <tr key={row.kol}>
                    <td className="py-2 pr-4 text-auri-text font-medium">{row.kol}</td>
                    <td className="py-2 pr-4 text-auri-text">{row.tier}</td>
                    <td className="py-2 pr-4 text-auri-muted">{row.lastContact}</td>
                    <td className="py-2 pr-4 text-auri-text">{row.gap}</td>
                    <td className="py-2">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${tone}`}>
                        {row.action}
                      </span>
                    </td>
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

function ScientificAlignment() {
  const sov = VEGA_SHARE_OF_VOICE;

  return (
    <div className="space-y-6">
      {/* Share of Scientific Voice */}
      <div className="bg-auri-bg border border-auri-border rounded-xl p-5">
        <SectionHeader icon={BarChart3} title="Share of Scientific Voice" subtitle="vs competitors" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-auri-muted text-left text-xs border-b border-auri-border">
                <th className="py-2 pr-4 font-medium">Source</th>
                <th className="py-2 pr-4 font-medium">Us</th>
                <th className="py-2 pr-4 font-medium">Comp A</th>
                <th className="py-2 pr-4 font-medium">Comp B</th>
                <th className="py-2 pr-4 font-medium">Comp C</th>
                <th className="py-2 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-auri-border">
              {sov.rows.map((row) => {
                const Trend = row.trend === 'up' ? TrendingUp : row.trend === 'down' ? TrendingDown : Activity;
                const trendColor = row.trend === 'up' ? 'text-emerald-600' : row.trend === 'down' ? 'text-rose-600' : 'text-amber-600';
                return (
                  <tr key={row.source}>
                    <td className="py-2 pr-4 text-auri-text font-medium">{row.source}</td>
                    <td className="py-2 pr-4 text-auri-text font-semibold">{row.us}</td>
                    <td className="py-2 pr-4 text-auri-text">{row.compA}</td>
                    <td className="py-2 pr-4 text-auri-text">{row.compB}</td>
                    <td className="py-2 pr-4 text-auri-text">{row.compC}</td>
                    <td className="py-2"><Trend size={14} className={trendColor} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Insight tone="warning">
          <span className="font-semibold">Watch area.</span> {sov.watchArea}
        </Insight>
      </div>

      {/* KOL Sentiment Velocity */}
      <div className="bg-auri-bg border border-auri-border rounded-xl p-5">
        <SectionHeader icon={Activity} title="KOL Sentiment Velocity" subtitle="rate of alignment change — leading indicator" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-auri-muted text-left text-xs border-b border-auri-border">
                <th className="py-2 pr-4 font-medium">KOL</th>
                <th className="py-2 pr-4 font-medium">Score</th>
                <th className="py-2 pr-4 font-medium">30d change</th>
                <th className="py-2 pr-4 font-medium">Velocity</th>
                <th className="py-2 font-medium">Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-auri-border">
              {VEGA_SENTIMENT_VELOCITY.map((row) => {
                const positive = row.change30d.startsWith('+');
                return (
                  <tr key={row.kol}>
                    <td className="py-2 pr-4 text-auri-text font-medium">{row.kol}</td>
                    <td className="py-2 pr-4 text-auri-text">{row.score}/100</td>
                    <td className={`py-2 pr-4 text-xs font-medium ${positive ? 'text-emerald-600' : 'text-rose-600'}`}>{row.change30d}</td>
                    <td className="py-2 pr-4 text-auri-text font-medium">{row.velocity}</td>
                    <td className="py-2 text-auri-muted">{row.interpretation}</td>
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

function ImpactOutcomes() {
  const romi = VEGA_ROMI;
  const idx = VEGA_IMPACT_INDEX;

  return (
    <div className="space-y-6">
      {/* MA Impact Index — headline */}
      <div className="bg-auri-bg border border-auri-border rounded-xl p-5">
        <SectionHeader icon={Award} title="Medical Affairs Impact Index" subtitle="composite executive headline" />
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="rounded-lg border border-auri-border bg-auri-card p-4 text-center">
            <div className="text-3xl font-semibold text-auri-text">{idx.overall}<span className="text-base text-auri-muted">/100</span></div>
            <div className="text-[11px] text-auri-muted mt-1">Overall Impact</div>
          </div>
          <div className="rounded-lg border border-auri-border bg-auri-card p-4 text-center">
            <div className="text-3xl font-semibold text-emerald-600">{idx.vsQ4}</div>
            <div className="text-[11px] text-auri-muted mt-1">vs Q4</div>
          </div>
          <div className="rounded-lg border border-auri-border bg-auri-card p-4 text-center">
            <div className="text-3xl font-semibold text-auri-text">{idx.target}+</div>
            <div className="text-[11px] text-auri-muted mt-1">Target threshold</div>
          </div>
        </div>
        <div className="space-y-2">
          {idx.dimensions.map((d) => (
            <div key={d.dim} className="flex items-center gap-3">
              <div className="w-44 shrink-0 text-sm text-auri-text">{d.dim}</div>
              <div className="flex-1 min-w-0">
                <div className="h-1.5 bg-auri-card rounded-full overflow-hidden">
                  <div className="h-full bg-auri-text" style={{ width: `${d.score}%` }} />
                </div>
                <div className="text-[11px] text-auri-muted mt-1 leading-snug">{d.commentary}</div>
              </div>
              <div className="w-12 shrink-0 text-right text-sm font-semibold text-auri-text">{d.score}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Care Gap Closure */}
      <div className="bg-auri-bg border border-auri-border rounded-xl p-5">
        <SectionHeader icon={Target} title="Care Gap Closure" subtitle="patient-level outcome of MA activity" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-auri-muted text-left text-xs border-b border-auri-border">
                <th className="py-2 pr-4 font-medium">Care gap</th>
                <th className="py-2 pr-4 font-medium">Linked MO</th>
                <th className="py-2 pr-4 font-medium">Baseline</th>
                <th className="py-2 pr-4 font-medium">Current</th>
                <th className="py-2 font-medium">Patients impacted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-auri-border">
              {VEGA_CARE_GAP_CLOSURE.map((row) => (
                <tr key={row.gap}>
                  <td className="py-2 pr-4 text-auri-text font-medium">{row.gap}</td>
                  <td className="py-2 pr-4 text-auri-text text-xs font-medium">{row.linkedMO}</td>
                  <td className="py-2 pr-4 text-auri-muted">{row.baseline}</td>
                  <td className="py-2 pr-4 text-auri-text font-medium">{row.current}</td>
                  <td className="py-2 text-auri-muted">{row.patientsImpacted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROMI */}
      <div className="bg-auri-bg border border-auri-border rounded-xl p-5">
        <SectionHeader icon={TrendingUp} title="Return on Medical Investment (ROMI)" subtitle="quarterly business-review framing" />
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="rounded-lg border border-auri-border bg-auri-card p-4 text-center">
            <div className="text-2xl font-semibold text-auri-text">{romi.netValueCreated}</div>
            <div className="text-[11px] text-auri-muted mt-1">Net value created</div>
          </div>
          <div className="rounded-lg border border-auri-border bg-auri-card p-4 text-center">
            <div className="text-2xl font-semibold text-emerald-600">{romi.roiPct}</div>
            <div className="text-[11px] text-auri-muted mt-1">ROI</div>
          </div>
          <div className="rounded-lg border border-auri-border bg-auri-card p-4 text-center">
            <div className="text-2xl font-semibold text-auri-text">{romi.returnPerPound}</div>
            <div className="text-[11px] text-auri-muted mt-1">Return per £1 invested</div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-auri-muted text-left text-xs border-b border-auri-border">
                <th className="py-2 pr-4 font-medium">Value category</th>
                <th className="py-2 pr-4 font-medium">Value</th>
                <th className="py-2 font-medium">Methodology</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-auri-border">
              {romi.rows.map((row) => (
                <tr key={row.category}>
                  <td className="py-2 pr-4 text-auri-text font-medium">{row.category}</td>
                  <td className={`py-2 pr-4 font-semibold ${row.value.startsWith('-') ? 'text-rose-600' : 'text-auri-text'}`}>{row.value}</td>
                  <td className="py-2 text-auri-muted text-xs leading-snug">{row.methodology}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function Vega() {
  const [activeTab, setActiveTab] = useState('field');

  return (
    <div className="space-y-6">
      <AgentSurfaceHeader agentId="vega" />

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-auri-border">
        {TABS.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
                isActive
                  ? 'border-auri-text text-auri-text'
                  : 'border-transparent text-auri-muted hover:text-auri-text'
              }`}
            >
              <Icon size={15} />
              {t.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'field'     && <FieldEngagement />}
      {activeTab === 'alignment' && <ScientificAlignment />}
      {activeTab === 'impact'    && <ImpactOutcomes />}
    </div>
  );
}
