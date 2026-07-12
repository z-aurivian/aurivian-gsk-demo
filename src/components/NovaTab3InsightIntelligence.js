import React, { useState, useEffect } from 'react';
import {
  Brain, ChevronDown, ChevronUp, FileDown, Sparkles, MapPin,
  Calendar, GitBranch, Check, TrendingUp, ShieldCheck, MessageSquare,
  AlertCircle,
} from 'lucide-react';
import {
  LISTENING_PRIORITIES, INSIGHTS, ACTIONS,
} from '../config';
import { isPinned, pinInsight, unpinInsight, subscribePinned } from '../lib/journeyStore';

// ACTIONS.fromInsightRef is inconsistent across demo configs — a plain id
// ('AI1'), a '+'-joined compound id ('AI1+AI5'), or an array (['AI1','AI5'])
// where one action addresses multiple insights. Normalise before matching.
function actionCoversInsight(action, insightId) {
  const ref = action.fromInsightRef;
  if (Array.isArray(ref)) return ref.includes(insightId);
  if (typeof ref === 'string') return ref.split('+').includes(insightId);
  return false;
}

// ─── Mock KIQ period data (structural — override per demo) ─────────────────

const KIQ_PERIOD_DATA = {
  LP1: {
    status: 'new',
    thisPeriod: {
      summary: 'Four MSL and ad-board reports this cycle confirm pulmonologists and allergists know Nucala only for severe eosinophilic asthma — EGPA, HES, and CRSwNP approvals are not surfacing in the first 1–2 engagements even when the patient population would qualify.',
      novaSynthesis: 'The intelligence picture is consistent: awareness of individual indications exists in specialist literature but is not being led with in early conversations. The missing link is a structured multi-indication cascade, not more clinical data.',
      keyQuote: { text: 'I use Nucala for asthma. I had no idea it was approved for EGPA — I\'ve been using rituximab off-label.', msl: 'A. Brooks', territory: 'US Immunology Midwest', date: '2026-05-14' },
      actionPill: { insight: 'AI2', taken: true, label: 'Multi-indication guide deployed' },
    },
    cumulative: {
      summary: 'Awareness of Nucala\'s full T2 indication breadth has been a persistent gap since the multi-indication story was first flagged — the guide is now deployed, but early engagement patterns have not yet shifted.',
      runningInsight: 'The question has shifted from "does the differentiation story exist?" to "are MSLs actually leading with it in the first 1–2 calls?" — an execution question, not an evidence question.',
    },
  },
  LP2: {
    status: 'urgent',
    thisPeriod: {
      summary: 'Highest-engagement KIQ this period. MM oncologists are increasingly framing Blenrep keratopathy as a harder tolerability burden than bispecific CRS — three independent sources cite the post-KarMMa-3 shift in how community physicians weigh the two profiles.',
      novaSynthesis: 'This is a live perception shift, not a static knowledge gap — bispecific CRS management has genuinely improved, and Blenrep\'s value proposition needs to be re-anchored around DREAMM-7 OS data rather than assuming keratopathy is a settled trade-off.',
      keyQuote: { text: 'The keratopathy risk with Blenrep requires ophthalmology visits every 3 weeks during induction — my patients find that harder to manage than CRS in a monitored setting.', msl: 'C. Rivera', territory: 'US Oncology SW', date: '2026-06-04' },
      actionPill: { insight: 'AI1', taken: true, label: 'Keratopathy vs CRS guide deployed' },
    },
    cumulative: {
      summary: 'This perception gap has widened since KarMMa-3 reported — bispecific tolerability has improved faster than the field anticipated, eroding one of Blenrep\'s prior relative advantages.',
      runningInsight: 'The question is evolving from "is keratopathy manageable?" to "how does Blenrep\'s OS benefit change the tolerability trade-off calculation?" — the DREAMM-7 data is the lever, not more keratopathy management materials alone.',
    },
  },
  LP3: {
    status: 'new',
    thisPeriod: {
      summary: 'Three MSL and congress reports confirm GI oncologists are not reflexly testing dMMR/MSI-H outside colorectal, and when they do, pembrolizumab remains the automatic choice — Jemperli is not part of the pan-tumor conversation.',
      novaSynthesis: 'Pembrolizumab\'s tumor-agnostic approval has normalised the dMMR biomarker concept — Jemperli now needs targeted tumor-board engagement to insert itself into that conversation, rather than re-explaining the biomarker from scratch.',
      keyQuote: { text: 'We test MSI-H for colorectal, yes, but when it comes back positive my reflex is pembrolizumab — not dostarlimab. I haven\'t seen the data for GI tumors.', msl: 'M. Williams', territory: 'US Oncology NE', date: '2026-06-11' },
      actionPill: { insight: 'AI3', taken: false, label: 'GI tumor board partnership not yet initiated' },
    },
    cumulative: {
      summary: 'The pan-tumor dMMR opportunity has generated 1 consolidated insight this period — this remains an early-stage listening priority relative to the other MOs.',
      runningInsight: 'The question has narrowed from "is dMMR testing happening?" to "which specific tumor boards should be prioritised for Jemperli engagement first?"',
    },
  },
  LP4: {
    status: 'new',
    thisPeriod: {
      summary: 'Community GYN oncology sites lack an integrated CDx workflow for reflex BRCA/HRD testing at ovarian cancer diagnosis — testing is ordered ad hoc rather than built into the diagnostic protocol, delaying 1L niraparib eligibility determination.',
      novaSynthesis: 'This is a workflow gap, not an awareness gap — academic centres already have embedded testing pathways. The fix is operational (CDx access support), not educational.',
      keyQuote: { text: 'We order BRCA when we remember to, but it\'s not built into our diagnosis protocol. By the time results come back the patient is mid-chemotherapy.', msl: 'C. Rivera', territory: 'US Oncology SW', date: '2026-05-08' },
      actionPill: { insight: 'AI4', taken: true, label: 'CDx access programme initiated' },
    },
    cumulative: {
      summary: 'The CDx access gap has been consistent since LP4 was established — community sites lag academic centres, and the Market Access programme launched this period is the first workflow-level intervention.',
      runningInsight: 'The question has shifted from "is there a testing gap?" to "how quickly can the CDx access programme reach community GYN oncology sites?"',
    },
  },
  LP5: {
    status: 'new',
    thisPeriod: {
      summary: 'Dr. Elena Zamagni\'s public and published position — favouring bispecifics over Blenrep on tolerability grounds — has generated the most consequential single-KOL signal this period. Her alignment score has moved from 69 to 44 in 60 days.',
      novaSynthesis: 'A single high-influence KOL\'s public divergence can move faster than any materials-based intervention — the priority is direct scientific exchange addressing her specific framing before her position spreads further across the European MM network.',
      keyQuote: { text: 'The keratopathy burden of BCMA ADCs in the DREAMM-7 era requires honest comparison to grade 1–2 CRS events with bispecifics. The management landscape has changed.', msl: 'C. Rivera', territory: 'US Oncology SW', date: '2026-06-08' },
      actionPill: { insight: 'AI5', taken: true, label: 'Zamagni scientific exchange scheduled' },
    },
    cumulative: {
      summary: 'Zamagni\'s divergence has escalated over 2 periods from a single social post to a peer-reviewed publication — the trajectory is toward broader European KOL influence, not fading.',
      runningInsight: 'The question has moved from "does this KOL disagree?" to "how far will her published position spread before direct scientific exchange can be held?"',
    },
  },
  LP6: {
    status: 'new',
    thisPeriod: {
      summary: 'Two independent reports confirm rheumatologists are initiating Benlysta only after 2 or more lines of failure in lupus nephritis, missing the earlier-line window where renal protection is most impactful.',
      novaSynthesis: 'This is the one Medical Objective with zero listening-priority coverage in the current plan — Nova is flagging it directly rather than waiting for signal volume to build organically, since MO5 is already at Gap coverage status.',
      keyQuote: { text: 'I tend to try mycophenolate, then voclosporin, and then think about Benlysta. I hadn\'t considered it as a first-add-on.', msl: 'A. Brooks', territory: 'US Immunology Midwest', date: '2026-04-17' },
      actionPill: { insight: 'AI6', taken: false, label: 'MSL re-briefing proposed' },
    },
    cumulative: {
      summary: 'LP6 has no prior measurement periods — this is its first cycle with any signal coverage at all, reflecting MO5\'s Gap status.',
      runningInsight: 'The question is just beginning to generate intelligence — until MSL activation increases, this will remain the thinnest-covered priority in the plan.',
    },
  },
};

const LP6_MOCK = {
  id: 'LP6', name: 'Benlysta earlier-line initiation timing in lupus nephritis', moRef: 'MO5',
  kiq: 'Are rheumatologists initiating Benlysta early enough in the lupus nephritis treatment sequence to maximise renal protection, or waiting until after 2+ lines of failure?',
  kits: ['Earlier-line LN evidence card', 'Rheumatology MSL re-briefing deck'],
};

const STATUS_CONFIG = {
  new:    { badge: '● New this month',     style: 'bg-violet-50 text-violet-700 border-violet-200', rowBorder: '' },
  urgent: { badge: '● Urgent this month',  style: 'bg-rose-50 text-rose-700 border-rose-200',       rowBorder: 'border-l-2 border-l-rose-400' },
  none:   { badge: '○ No new insights',    style: 'bg-zinc-100 text-zinc-500 border-zinc-200',      rowBorder: 'opacity-80' },
  gap:    { badge: '0 insights · MO gap',  style: 'bg-rose-50 text-rose-700 border-rose-200',       rowBorder: 'border-l-2 border-l-rose-400' },
};

// ─── Insight card (inline — Tab 3 owns actionable insights) ───────────────

const PRIORITY_STYLE = {
  High:   'bg-rose-50 text-rose-700 border-rose-200',
  Medium: 'bg-amber-50 text-amber-700 border-amber-200',
  Low:    'bg-sky-50 text-sky-700 border-sky-200',
  Urgent: 'bg-rose-50 text-rose-700 border-rose-200',
  New:    'bg-sky-50 text-sky-700 border-sky-200',
};

const STATUS_STYLE = {
  Captured:    'bg-zinc-50 text-zinc-600 border-zinc-200',
  Triaged:     'bg-sky-50 text-sky-700 border-sky-200',
  Validated:   'bg-violet-50 text-violet-700 border-violet-200',
  Prioritised: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const BORDER_STYLE = {
  High:   'border-l-rose-400',
  Medium: 'border-l-amber-300',
  Low:    'border-l-sky-300',
  Urgent: 'border-l-rose-400',
  New:    'border-l-sky-300',
};

function InsightCard({ insight }) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(() => isPinned(insight.id));

  useEffect(() => {
    return subscribePinned((ids) => setPinned(ids.includes(insight.id)));
  }, [insight.id]);

  const handlePin = (e) => {
    e.stopPropagation();
    if (pinned) unpinInsight(insight.id);
    else pinInsight(insight.id);
  };

  return (
    <div className={`rounded-xl border-l-2 border border-auri-border bg-auri-card overflow-hidden ${BORDER_STYLE[insight.priority] || 'border-l-auri-border'} ${pinned ? 'ring-1 ring-auri-text/20' : ''}`}>
      <button className="w-full text-left p-4 hover:bg-auri-offset transition-colors" onClick={() => setOpen(!open)}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <span className="text-[10px] font-medium text-auri-muted">{insight.id}</span>
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${PRIORITY_STYLE[insight.priority] || ''}`}>{insight.priority}</span>
              {insight.lpRefs?.map((lp) => (
                <span key={lp} className="text-[10px] font-medium px-1.5 py-0.5 rounded border bg-auri-offset text-auri-muted border-auri-border">{lp}</span>
              ))}
              {insight.moRefs?.map((mo) => (
                <span key={mo} className="text-[10px] font-medium px-1.5 py-0.5 rounded border bg-auri-text/5 text-auri-text border-auri-text/20">{mo}</span>
              ))}
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${STATUS_STYLE[insight.status] || ''}`}>{insight.status}</span>
              {pinned && (
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded border bg-auri-text/10 text-auri-text border-auri-text/30 inline-flex items-center gap-1">
                  <GitBranch size={10} /> On Journey
                </span>
              )}
            </div>
            <div className="text-sm font-semibold text-auri-text mb-1 leading-snug">{insight.title}</div>
            <p className="text-sm text-auri-muted leading-relaxed">{insight.summary}</p>
          </div>
          <div className="text-right shrink-0 flex flex-col items-end gap-2">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-auri-muted mb-0.5">Confidence</div>
              <div className="text-lg font-bold text-auri-text">{Math.round(insight.confidenceScore * 100)}%</div>
            </div>
            <span
              role="button"
              tabIndex={0}
              onClick={handlePin}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handlePin(e); }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all cursor-pointer ${pinned ? 'bg-auri-text text-auri-bg border-auri-text' : 'bg-auri-bg text-auri-muted border-auri-border hover:text-auri-text hover:border-auri-text/50'}`}
            >
              {pinned ? <><Check size={11} /> Added to Journey</> : <><GitBranch size={11} /> Add to Journey</>}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-2.5 text-[11px] text-auri-muted">
          <span className="flex items-center gap-1"><TrendingUp size={11} /> Recurs {insight.recurrence}×</span>
          <span className="flex items-center gap-1"><Calendar size={11} /> {insight.recency}</span>
          <span className="flex items-center gap-1"><ShieldCheck size={11} /> {insight.provenance}</span>
          <ChevronDown size={13} className={`ml-auto transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {open && (
        <div className="border-t border-auri-border bg-auri-bg p-4">
          {(() => {
            const action = ACTIONS.find((a) => actionCoversInsight(a, insight.id));
            if (!action) return null;
            const STATUS_PILL = {
              Proposed: 'bg-auri-offset text-auri-muted border-auri-border',
              Started:  'bg-sky-50 text-sky-700 border-sky-200',
              Accepted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            };
            return (
              <div className="rounded-lg border-l-2 border-l-amber-300 border border-auri-border bg-amber-50/30 p-3 mb-4">
                <div className="text-[10px] uppercase tracking-wider text-amber-700 font-semibold mb-1.5">Proposed action · {action.id}</div>
                <p className="text-sm text-auri-text leading-relaxed mb-2">{action.title}</p>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-auri-muted">
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${STATUS_PILL[action.status] || STATUS_PILL.Proposed}`}>{action.status}</span>
                  <span>{action.owner || 'Owner not yet assigned'}</span>
                  {action.dueBy && <span className="flex items-center gap-1"><Calendar size={11} /> {action.dueBy}</span>}
                  {action.moRef && <span className="px-1.5 py-0.5 rounded border bg-auri-text/5 text-auri-text border-auri-text/20">{action.moRef}</span>}
                </div>
              </div>
            );
          })()}

          <div className="text-[10px] uppercase tracking-wider text-auri-muted mb-2">Source signals ({insight.sourceInsights?.length || 0})</div>
          <div className="space-y-2">
            {insight.sourceInsights?.map((s, i) => (
              <div key={i} className="rounded-lg border border-auri-border bg-auri-card p-3">
                <div className="flex items-center gap-2 text-[10px] text-auri-muted mb-1.5">
                  <MessageSquare size={10} />
                  <span className="font-medium">{s.type}</span><span>·</span>
                  <span>{s.role}</span><span>·</span>
                  <MapPin size={10} /><span>{s.location}</span>
                  <span className="ml-auto">{s.date}</span>
                </div>
                <p className="text-sm text-auri-text italic leading-relaxed">"{s.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── KIQ Matrix ────────────────────────────────────────────────────────────

function KIQMatrix() {
  const [openRow, setOpenRow] = useState(null);

  const allLPs = [...LISTENING_PRIORITIES, LP6_MOCK];

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain size={16} className="text-auri-text" />
          <h3 className="text-sm font-semibold text-auri-text uppercase tracking-wider">KIQ Intelligence Matrix</h3>
          <span className="text-xs text-auri-muted">{allLPs.length} listening priorities</span>
        </div>
        <button
          onClick={() => window.alert('Export to PowerPoint — coming soon.')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-auri-border text-auri-muted hover:text-auri-text hover:border-auri-text/50 transition-all"
        >
          <FileDown size={12} /> Export to PPT
        </button>
      </div>

      <div className="space-y-2">
        {allLPs.map((lp) => {
          const period = KIQ_PERIOD_DATA[lp.id];
          const statusKey = period?.status || 'gap';
          const cfg = STATUS_CONFIG[statusKey];
          const isOpen = openRow === lp.id;

          return (
            <div key={lp.id} className={`rounded-xl border border-auri-border bg-auri-card overflow-hidden ${cfg.rowBorder}`}>
              {/* Row header */}
              <button
                className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-auri-offset transition-all"
                onClick={() => setOpenRow(isOpen ? null : lp.id)}
              >
                <div className="flex items-center gap-3 flex-wrap flex-1 min-w-0">
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded border bg-auri-text/5 text-auri-text border-auri-text/20 shrink-0">{lp.id}</span>
                  <span className="text-[10px] text-auri-muted shrink-0">{lp.moRef}</span>
                  <span className="text-sm font-medium text-auri-text truncate">{lp.name}</span>
                  <span className="text-xs text-auri-muted italic hidden md:block truncate max-w-xs">"{lp.kiq}"</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${cfg.style}`}>{cfg.badge}</span>
                  {isOpen ? <ChevronUp size={15} className="text-auri-muted" /> : <ChevronDown size={15} className="text-auri-muted" />}
                </div>
              </button>

              {/* Expanded two-column panel */}
              {isOpen && period && (
                <div className="border-t border-auri-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-auri-border">
                    {/* Left — this period */}
                    <div className="p-4">
                      <div className="text-[10px] uppercase tracking-wider font-semibold text-auri-text mb-3">
                        This Period — <span className="text-auri-muted">June 2026</span>
                      </div>

                      {period.thisPeriod.summary ? (
                        <>
                          <p className="text-sm text-auri-text leading-relaxed mb-3">{period.thisPeriod.summary}</p>

                          {period.thisPeriod.novaSynthesis && (
                            <div className="border-l-2 border-violet-300 pl-3 bg-violet-50/40 rounded-r-lg py-2 pr-3 mb-3">
                              <span className="text-[10px] font-semibold text-violet-700 uppercase tracking-wider">Nova synthesis · </span>
                              <span className="text-xs text-auri-text">{period.thisPeriod.novaSynthesis}</span>
                            </div>
                          )}

                          {period.thisPeriod.keyQuote && (
                            <div className="rounded-lg border border-auri-border bg-auri-bg p-3 mb-3">
                              <div className="flex items-center gap-2 text-[10px] text-auri-muted mb-1.5">
                                <MessageSquare size={10} />
                                <span>{period.thisPeriod.keyQuote.msl}</span>
                                <span>·</span>
                                <MapPin size={10} />
                                <span>{period.thisPeriod.keyQuote.territory}</span>
                                <span className="ml-auto">{period.thisPeriod.keyQuote.date}</span>
                              </div>
                              <p className="text-sm text-auri-text italic leading-relaxed">"{period.thisPeriod.keyQuote.text}"</p>
                            </div>
                          )}

                          {period.thisPeriod.actionPill && (
                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${period.thisPeriod.actionPill.taken ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-auri-offset text-auri-muted border-auri-border'}`}>
                              {period.thisPeriod.actionPill.taken && <Check size={12} />}
                              <span>{period.thisPeriod.actionPill.insight}</span>
                              <span>→</span>
                              <span>{period.thisPeriod.actionPill.label}</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="rounded-lg border border-auri-border bg-auri-bg p-4">
                          <AlertCircle size={14} className="text-auri-muted mb-2" />
                          <p className="text-sm text-auri-muted leading-relaxed">{period.thisPeriod.emptyReason}</p>
                        </div>
                      )}
                    </div>

                    {/* Right — cumulative picture */}
                    <div className="p-4">
                      <div className="text-[10px] uppercase tracking-wider font-semibold text-auri-muted mb-3">Cumulative Picture</div>

                      {period.cumulative.summary ? (
                        <>
                          <p className="text-sm text-auri-text leading-relaxed mb-3">{period.cumulative.summary}</p>
                          {period.cumulative.runningInsight && (
                            <div className="rounded-lg border border-auri-border bg-auri-bg p-3">
                              <div className="text-[10px] uppercase tracking-wider text-auri-muted font-semibold mb-1.5">Running Insight</div>
                              <p className="text-xs text-auri-text italic leading-relaxed">{period.cumulative.runningInsight}</p>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="rounded-lg border border-auri-border bg-auri-bg p-4">
                          <p className="text-sm text-auri-muted leading-relaxed">{period.cumulative.emptyReason || 'No cumulative intelligence to display.'}</p>
                        </div>
                      )}
                    </div>
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

// ─── Main export ───────────────────────────────────────────────────────────

export default function NovaTab3InsightIntelligence() {
  return (
    <div className="space-y-8">
      {/* Nova intelligence brief */}
      <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={15} className="text-violet-600" />
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-700">Nova Intelligence Brief</span>
          <span className="text-[10px] text-violet-500 ml-1">AI-generated · on load</span>
        </div>
        <p className="text-sm text-auri-text leading-relaxed">
          This period, <strong>all 6 KIQs</strong> generated new insights — including LP6, newly activated
          against MO5's Gap coverage. LP2 (Blenrep ocular toxicity perception) is flagged
          <strong> Urgent</strong> — Dr. Elena Zamagni's public divergence is actively spreading her
          keratopathy-vs-CRS framing across the European MM community and requires direct scientific exchange.
          LP6 (Benlysta earlier-line initiation) remains the thinnest-covered question in the plan, consistent
          with MO5's Gap status. The highest-confidence insight this period is <strong>AI5</strong> (93% confidence,
          LP5) — the Zamagni divergence signal.
        </p>
      </div>

      {/* KIQ Matrix */}
      <KIQMatrix />

      {/* Actionable Insights */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-auri-text" />
            <h3 className="text-sm font-semibold text-auri-text uppercase tracking-wider">Actionable Insights</h3>
            <span className="text-xs text-auri-muted">{INSIGHTS.length} prioritised · refreshes every 6 hours</span>
          </div>
          <button
            onClick={() => window.alert('Export to PowerPoint — coming soon.')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-auri-border text-auri-muted hover:text-auri-text hover:border-auri-text/50 transition-all"
          >
            <FileDown size={12} /> Export to PPT
          </button>
        </div>
        <div className="space-y-3">
          {INSIGHTS.map((i) => <InsightCard key={i.id} insight={i} />)}
        </div>
      </section>
    </div>
  );
}
