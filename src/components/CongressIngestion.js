import React, { useState } from 'react';
import {
  Users, BarChart3, FileText, Database, Globe, TrendingUp,
  LayoutGrid, MessageCircle, Activity, CheckCircle, ChevronDown,
} from 'lucide-react';
import {
  getIngestionForCongress, MOCK_THEMES, MOCK_COMPETITOR_VISIBILITY,
  DATA_MODULES as DATA_MODULES_RAW, MOCK_TRIALS, MOCK_SOCIAL,
  MOCK_TREND_SENTIMENT, MOCK_SCIENTIFIC_ARTICLES, MOCK_SOCIAL_TREND_SOURCES,
} from '../data/congressData';
import { PRODUCT_OPTIONS } from '../config';
import AgentSurfaceHeader from './AgentSurfaceHeader';

const ICON_MAP = { FileText, Activity, MessageCircle };
const DATA_MODULES = DATA_MODULES_RAW.map((m) => ({ ...m, icon: ICON_MAP[m.iconId] || FileText }));

const productNames = PRODUCT_OPTIONS.map(p => p.name);

function CongressIngestion({ selectedCongress }) {
  const [activeStep, setActiveStep] = useState('ingestion');
  const [insightTab, setInsightTab] = useState('themes');
  const [expandedModule, setExpandedModule] = useState(null);
  const [sourcesPanel, setSourcesPanel] = useState(null);
  const [expandedTheme, setExpandedTheme] = useState(null);

  const ingestion = getIngestionForCongress(selectedCongress.id);

  const steps = [
    { id: 'ingestion', label: 'Congress & Data Ingestion', icon: Database },
    { id: 'insights', label: 'Insight Outputs', icon: BarChart3 },
  ];

  // Trend view keys (dynamic from MOCK_TREND_SENTIMENT)
  const trendKeys = MOCK_TREND_SENTIMENT.scientific.length > 0
    ? Object.keys(MOCK_TREND_SENTIMENT.scientific[0]).filter(k => k !== 'period')
    : productNames;

  return (
    <>
      <AgentSurfaceHeader agentId="aria" />
    <div className="space-y-6 animate-fade-in">
      {/* Trend view */}
      {selectedCongress.isTrend && (
        <div className="space-y-6">
          <div className="bg-auri-card rounded-xl p-6 border border-auri-border">
            <h3 className="text-xl font-bold mb-3 text-auri-text">Sentiment trend: {selectedCongress.fullName}</h3>
            <p className="text-auri-muted mb-2">
              Trends derived from scientific literature and social signals between congresses. Product visibility over time.
            </p>
          </div>
          <div className="bg-auri-card rounded-xl p-6 border border-auri-border">
            <h4 className="font-semibold mb-4 text-auri-text">Scientific sentiment over time</h4>
            <div className="space-y-4">
              {MOCK_TREND_SENTIMENT.scientific.map((row, i) => (
                <div key={i} className="space-y-2">
                  <div className="text-sm text-auri-muted">{row.period}</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    {trendKeys.map((product) => (
                      <div key={product} className="flex items-center gap-2">
                        <span className="w-20 text-auri-muted truncate">{product}</span>
                        <div className="flex-1 h-2 bg-auri-card rounded-full overflow-hidden">
                          <div className="h-full bg-auri-text rounded-full" style={{ width: `${row[product] || 0}%` }} />
                        </div>
                        <span className="text-auri-text w-8 font-medium">{row[product] ?? 0}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-auri-card rounded-xl p-6 border border-auri-border">
            <h4 className="font-semibold mb-4 text-auri-text">Social sentiment over time</h4>
            <div className="space-y-4">
              {MOCK_TREND_SENTIMENT.social.map((row, i) => (
                <div key={i} className="space-y-2">
                  <div className="text-sm text-auri-muted">{row.period}</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    {trendKeys.map((product) => (
                      <div key={product} className="flex items-center gap-2">
                        <span className="w-20 text-auri-muted truncate">{product}</span>
                        <div className="flex-1 h-2 bg-auri-card rounded-full overflow-hidden">
                          <div className="h-full bg-s-info rounded-full" style={{ width: `${row[product] || 0}%` }} />
                        </div>
                        <span className="text-auri-text w-8 font-medium">{row[product] ?? 0}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Sources */}
          <div className="bg-auri-card rounded-xl p-6 border border-auri-border">
            <h4 className="font-semibold mb-3 text-auri-text">Sources (trend drivers)</h4>
            <div className="flex gap-2 mb-4">
              <button onClick={() => setSourcesPanel(sourcesPanel === 'scientific' ? null : 'scientific')}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${sourcesPanel === 'scientific' ? 'bg-auri-text text-auri-bg' : 'bg-auri-card text-auri-muted hover:text-auri-text'}`}>
                Sample scientific articles
              </button>
              <button onClick={() => setSourcesPanel(sourcesPanel === 'social' ? null : 'social')}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${sourcesPanel === 'social' ? 'bg-auri-text text-auri-bg' : 'bg-auri-card text-auri-muted hover:text-auri-text'}`}>
                Sample social posts
              </button>
            </div>
            {sourcesPanel === 'scientific' && (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-auri-border text-auri-muted">
                    <th className="text-left py-2 pr-2">Title</th><th className="text-left py-2 pr-2">Journal / Congress</th>
                    <th className="text-left py-2 pr-2">Date</th><th className="text-left py-2 pr-2">Product</th><th className="text-left py-2">Sentiment</th>
                  </tr></thead>
                  <tbody>
                    {MOCK_SCIENTIFIC_ARTICLES.map((a, i) => (
                      <tr key={i} className="border-b border-auri-border">
                        <td className="py-2 pr-2 text-auri-text max-w-[240px] truncate" title={a.title}>{a.title}</td>
                        <td className="py-2 pr-2 text-auri-muted">{a.journalOrCongress}</td>
                        <td className="py-2 pr-2 text-auri-muted">{a.date}</td>
                        <td className="py-2 pr-2"><span className="px-1.5 py-0.5 rounded bg-auri-text/10 text-auri-text">{a.product}</span></td>
                        <td className="py-2"><span className={`px-1.5 py-0.5 rounded ${a.sentiment === 'positive' ? 'bg-emerald-50 text-emerald-700' : 'bg-auri-card text-auri-muted'}`}>{a.sentiment}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {sourcesPanel === 'social' && (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-auri-border text-auri-muted">
                    <th className="text-left py-2 pr-2">Platform</th><th className="text-left py-2 pr-2">Author</th>
                    <th className="text-left py-2 pr-2">Topic</th><th className="text-left py-2 pr-2">Date</th>
                    <th className="text-left py-2 pr-2">Product</th><th className="text-left py-2">Sentiment</th>
                  </tr></thead>
                  <tbody>
                    {MOCK_SOCIAL_TREND_SOURCES.map((s, i) => (
                      <tr key={i} className="border-b border-auri-border">
                        <td className="py-2 pr-2 text-auri-text">{s.platform}</td>
                        <td className="py-2 pr-2 text-auri-muted">{s.author}</td>
                        <td className="py-2 pr-2 text-auri-muted max-w-[180px] truncate" title={s.topic}>{s.topic}</td>
                        <td className="py-2 pr-2 text-auri-muted">{s.date}</td>
                        <td className="py-2 pr-2"><span className="px-1.5 py-0.5 rounded bg-auri-text/10 text-auri-text">{s.product}</span></td>
                        <td className="py-2"><span className={`px-1.5 py-0.5 rounded ${s.sentiment === 'positive' ? 'bg-emerald-50 text-emerald-700' : 'bg-auri-card text-auri-muted'}`}>{s.sentiment}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pipeline steps (hidden for Trend) */}
      {!selectedCongress.isTrend && (
        <>
          <div className="flex justify-center mb-6">
            <div className="flex items-center">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = step.id === activeStep;
                const isPast = steps.findIndex((s) => s.id === activeStep) > index;
                return (
                  <div key={step.id} className="flex items-center">
                    <button onClick={() => setActiveStep(step.id)}
                      className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all ${
                        isActive ? 'bg-auri-text text-auri-bg' : isPast ? 'bg-emerald-50 text-emerald-700' : 'bg-auri-card text-auri-muted'
                      }`}>
                      <Icon className="w-4 h-4" /><span className="text-sm font-medium">{step.label}</span>
                    </button>
                    {index < steps.length - 1 && <div className={`w-8 h-0.5 mx-1 ${isPast ? 'bg-emerald-500' : 'bg-gray-200'}`} />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 1: Ingestion */}
          {activeStep === 'ingestion' && (
            <div className="space-y-6">
              <div className="bg-auri-card rounded-xl p-6 border border-auri-border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-auri-text">
                  <Database className="w-5 h-5" /> Congress & Publication Data Ingestion
                </h3>
                <p className="text-auri-muted mb-4">
                  Selected: <strong className="text-auri-text">{selectedCongress.fullName}</strong> · {selectedCongress.location} · {selectedCongress.date}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  {[
                    { label: 'Agendas', count: ingestion.agendas, icon: FileText },
                    { label: 'Abstracts', count: ingestion.abstracts, icon: FileText },
                    { label: 'Posters', count: ingestion.posters, icon: FileText },
                    { label: 'Speakers', count: ingestion.speakers, icon: Users },
                    { label: 'Publications linked', count: ingestion.publicationsLinked, icon: Globe },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="bg-auri-offset rounded-lg p-4 text-center border border-auri-border">
                        <Icon className="w-6 h-6 mx-auto mb-2 text-auri-text" />
                        <div className="text-2xl font-bold text-auri-text">{item.count.toLocaleString()}</div>
                        <div className="text-sm text-auri-muted">{item.label}</div>
                      </div>
                    );
                  })}
                </div>
                <h4 className="font-semibold mb-2 text-auri-text">Sample sessions (tagged to products)</h4>
                <div className="space-y-2">
                  {ingestion.sessions.map((s, i) => (
                    <div key={i} className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="text-auri-text">{s.title}</span>
                      <span className="text-auri-muted">· {s.track}</span>
                      <div className="flex gap-1 flex-wrap">
                        {s.products.map((p) => (
                          <span key={p} className="px-2 py-0.5 rounded bg-auri-text/10 text-auri-text text-xs">{p}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data modules */}
              <div className="bg-auri-card rounded-xl p-6 border border-auri-border">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-auri-text">
                  <LayoutGrid className="w-5 h-5" /> Data Modules
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {DATA_MODULES.map((m) => {
                    const Icon = m.icon;
                    const isExpanded = expandedModule === m.id;
                    const count = m.id === 'congress' ? ingestion.abstracts + ' abstracts' :
                      m.id === 'trials' ? MOCK_TRIALS.total + ' trials' : MOCK_SOCIAL.totalSignals + ' signals';
                    return (
                      <button key={m.id} type="button" onClick={() => setExpandedModule(isExpanded ? null : m.id)}
                        className={`rounded-lg p-4 border text-left transition-all ${
                          m.status === 'connected' ? 'border-auri-text bg-auri-text/5' : 'border-auri-border bg-auri-offset'
                        } ${isExpanded ? 'ring-2 ring-auri-text' : ''}`}>
                        <div className="flex items-center justify-between mb-2">
                          <Icon className="w-5 h-5 text-auri-text" />
                          {m.status === 'connected' ? (
                            <span className="text-xs text-auri-text flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Connected</span>
                          ) : (
                            <span className="text-xs text-auri-muted">Available</span>
                          )}
                        </div>
                        <div className="font-medium text-sm text-auri-text">{m.label}</div>
                        <div className="text-xs text-auri-muted mt-1">{m.description}</div>
                        <div className="text-xs text-auri-text mt-2 font-medium">{count}</div>
                      </button>
                    );
                  })}
                </div>

                {expandedModule && (
                  <div className="mt-6 rounded-xl border border-auri-border bg-auri-offset p-6">
                    {expandedModule === 'congress' && (
                      <div className="text-sm text-auri-muted space-y-2">
                        <p><strong className="text-auri-text">Congress & Publications</strong> (connected)</p>
                        <p>{ingestion.abstracts} abstracts, {ingestion.speakers} speakers, {ingestion.publicationsLinked} publications linked.</p>
                      </div>
                    )}
                    {expandedModule === 'trials' && (
                      <div className="text-sm">
                        <p className="text-auri-text font-medium mb-3">{MOCK_TRIALS.total} trials · {MOCK_TRIALS.linkedToKOLs} linked to KOLs</p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead><tr className="border-b border-auri-border text-auri-muted">
                              <th className="text-left py-2 pr-2">NCT ID</th><th className="text-left py-2 pr-2">Title</th>
                              <th className="text-left py-2 pr-2">Phase</th><th className="text-left py-2 pr-2">Product</th>
                              <th className="text-left py-2 pr-2">Indication</th><th className="text-left py-2 pr-2">Status</th>
                            </tr></thead>
                            <tbody>
                              {MOCK_TRIALS.sample.map((t, i) => (
                                <tr key={i} className="border-b border-auri-border">
                                  <td className="py-2 pr-2 text-auri-text">{t.nctId}</td>
                                  <td className="py-2 pr-2 text-auri-text max-w-[200px] truncate" title={t.title}>{t.title}</td>
                                  <td className="py-2 pr-2 text-auri-muted">{t.phase}</td>
                                  <td className="py-2 pr-2"><span className="px-1.5 py-0.5 rounded bg-auri-text/10 text-auri-text">{t.product}</span></td>
                                  <td className="py-2 pr-2 text-auri-muted">{t.indication}</td>
                                  <td className="py-2 pr-2 text-auri-muted">{t.status}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    {expandedModule === 'social' && (
                      <div className="text-sm">
                        <p className="text-auri-text font-medium mb-3">{MOCK_SOCIAL.totalSignals.toLocaleString()} signals · {MOCK_SOCIAL.period}</p>
                        <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                          {MOCK_SOCIAL.byPlatform.map((p, i) => (
                            <div key={i} className="bg-auri-card rounded-lg p-2 text-xs">
                              <div className="text-auri-muted">{p.platform}</div>
                              <div className="text-auri-text font-medium">{p.mentions} mentions</div>
                              <div className="text-auri-muted">{p.kolsTracked} KOLs tracked</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="mt-4 pt-3 border-t border-auri-border">
                      <button type="button" onClick={() => setExpandedModule(null)} className="text-xs text-auri-muted hover:text-auri-text">Close panel</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Insights */}
          {activeStep === 'insights' && (
            <div className="space-y-6">
              <div className="flex gap-2 flex-wrap">
                {[
                  { id: 'themes', label: 'Scientific themes', icon: TrendingUp },
                  { id: 'competitors', label: 'Competitor visibility', icon: BarChart3 },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button key={tab.id} onClick={() => setInsightTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                        insightTab === tab.id ? 'bg-auri-text text-auri-bg' : 'bg-auri-card text-auri-muted hover:text-auri-text'
                      }`}>
                      <Icon className="w-4 h-4" />{tab.label}
                    </button>
                  );
                })}
              </div>

              {insightTab === 'themes' && (
                <div className="bg-auri-card rounded-xl p-6 border border-auri-border">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-auri-text">
                    <TrendingUp className="w-5 h-5" /> Key scientific themes and emerging opportunities
                  </h3>
                  <div className="space-y-4">
                    {MOCK_THEMES.map((t, i) => (
                      <div
                        key={i}
                        className="bg-auri-offset rounded-lg border border-auri-border cursor-pointer hover:border-auri-text/40 transition-all"
                        onClick={() => setExpandedTheme(expandedTheme === i ? null : i)}
                      >
                        <div className="flex items-center gap-4 p-4">
                          <div className="flex-1">
                            <div className="font-medium text-auri-text flex items-center gap-2">
                              {t.theme}
                              <ChevronDown size={16} className={`text-auri-muted transition-transform ${expandedTheme === i ? 'rotate-180' : ''}`} />
                            </div>
                            <div className="text-sm text-auri-muted">{t.mentions} mentions at congress</div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-auri-text">{t.momentum}</div>
                            <div className="text-xs text-auri-muted">Momentum score</div>
                          </div>
                          <div className="w-24 h-2 bg-auri-card rounded-full overflow-hidden">
                            <div className="h-full bg-auri-text rounded-full" style={{ width: `${t.momentum}%` }} />
                          </div>
                        </div>
                        {expandedTheme === i && (
                          <div className="px-4 pb-4 border-t border-auri-border mt-0 pt-3 space-y-3">
                            <div>
                              <div className="text-xs font-semibold text-auri-muted uppercase tracking-wider mb-1">Summary</div>
                              <div className="text-sm text-auri-text leading-relaxed">{t.summary}</div>
                            </div>
                            <div className="bg-auri-text/5 rounded-lg p-3 border border-auri-text/20">
                              <div className="text-xs font-semibold text-auri-text uppercase tracking-wider mb-1">Recommended Action</div>
                              <div className="text-sm text-auri-text leading-relaxed">{t.action}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {insightTab === 'competitors' && (
                <div className="bg-auri-card rounded-xl p-6 border border-auri-border">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-auri-text">
                    <BarChart3 className="w-5 h-5" /> Competitor product visibility at congress
                  </h3>
                  <div className="space-y-4">
                    {MOCK_COMPETITOR_VISIBILITY.map((c, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-48 text-sm text-auri-text truncate">{c.product}</div>
                        <div className="flex-1 h-6 bg-auri-card rounded-full overflow-hidden flex">
                          <div className="h-full bg-auri-text rounded-l" style={{ width: `${c.share}%` }} title={`${c.share}%`} />
                        </div>
                        <div className="text-sm font-medium text-auri-text w-20 text-right">{c.share}%</div>
                        <div className="text-sm text-auri-muted w-20 text-right">{c.mentions} mentions</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
    </>
  );
}

export default CongressIngestion;
