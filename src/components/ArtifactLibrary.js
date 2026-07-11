import React, { useState, useMemo } from 'react';
import {
  FileText, Presentation, Layers, Download, Share2, ShieldCheck, Calendar,
  Database, Search, Filter, FolderOpen,
} from 'lucide-react';
import { ARTIFACTS } from '../config';

const TYPE_META = {
  pdf:         { label: 'PDF report',       icon: FileText,     accent: 'bg-rose-50 text-rose-700 border-rose-200' },
  pptx:        { label: 'PPTX deck',        icon: Presentation, accent: 'bg-amber-50 text-amber-700 border-amber-200' },
  interactive: { label: 'Interactive view', icon: Layers,       accent: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
};

const AGENT_ACCENT = {
  ARIA: 'bg-sky-50 text-sky-700 border-sky-200',
  LUCA: 'bg-violet-50 text-violet-700 border-violet-200',
  NOVA: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

function ArtifactCard({ a }) {
  const meta = TYPE_META[a.type] || TYPE_META.pdf;
  const Icon = meta.icon;
  return (
    <div className="rounded-xl border border-auri-border bg-auri-bg p-5 hover:border-auri-text/40 hover:shadow-sm transition-all">
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg border ${meta.accent} flex items-center justify-center shrink-0`}>
          <Icon size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-auri-text leading-snug mb-1">{a.title}</div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`text-[10px] font-michroma tracking-wider px-1.5 py-0.5 rounded border ${AGENT_ACCENT[a.agent] || ''}`}>
              {a.agent}
            </span>
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded border bg-auri-card text-auri-muted border-auri-border">
              {meta.label}
            </span>
            <span className="text-[10px] text-auri-muted">{a.taskType}</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-auri-muted leading-relaxed mb-3">{a.summary}</p>

      <div className="space-y-1.5 text-[11px] text-auri-muted mb-4">
        <div className="flex items-center gap-1.5">
          <Calendar size={11} />
          <span>{a.dateCreated}</span>
          <span>·</span>
          <span>{a.sizeLabel}</span>
        </div>
        <div className="flex items-start gap-1.5">
          <Database size={11} className="mt-0.5 shrink-0" />
          <span className="leading-relaxed">{a.dataSources.join(' · ')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={11} />
          <span>{a.provenance}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-auri-border">
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-auri-text text-auri-bg text-xs font-medium hover:bg-auri-text/90 transition-all">
          <Download size={12} />
          {a.type === 'interactive' ? 'Open' : 'Download'}
        </button>
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-auri-border text-auri-muted text-xs hover:text-auri-text hover:border-auri-text/50 transition-all">
          <Share2 size={12} />
          Share
        </button>
      </div>
    </div>
  );
}

export default function ArtifactLibrary() {
  const [agentFilter, setAgentFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return ARTIFACTS.filter(a => {
      if (agentFilter !== 'all' && a.agent !== agentFilter) return false;
      if (typeFilter !== 'all' && a.type !== typeFilter) return false;
      if (query) {
        const q = query.toLowerCase();
        const hay = `${a.title} ${a.summary} ${a.taskType} ${a.dataSources.join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [agentFilter, typeFilter, query]);

  if (ARTIFACTS.length === 0) {
    return (
      <div className="rounded-xl border border-auri-border bg-auri-bg p-8 text-center">
        <FolderOpen size={24} className="text-auri-muted mx-auto mb-2" />
        <div className="text-sm text-auri-text font-medium">Your artifact library is empty.</div>
        <p className="text-xs text-auri-muted mt-1">Completed agent tasks will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-auri-text mb-1">Artifact Library</h1>
          <p className="text-sm text-auri-muted">
            Every completed task generates an exportable artifact. All outputs live here, traceable to the data that produced them.
          </p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[10px] uppercase tracking-wider text-auri-muted">Total artifacts</div>
          <div className="text-xl font-semibold text-auri-text">{ARTIFACTS.length}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-auri-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artifacts, sources, or task types…"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-auri-border bg-auri-bg text-sm text-auri-text placeholder:text-auri-muted/60 focus:outline-none focus:border-auri-text"
          />
        </div>

        <div className="flex items-center gap-1 bg-auri-bg border border-auri-border rounded-lg p-1">
          {['all', 'ARIA', 'LUCA', 'NOVA'].map(v => (
            <button
              key={v}
              onClick={() => setAgentFilter(v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                agentFilter === v ? 'bg-auri-text text-auri-bg' : 'text-auri-muted hover:text-auri-text'
              }`}
            >
              {v === 'all' ? 'All agents' : v}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-auri-bg border border-auri-border rounded-lg p-1">
          {[
            { id: 'all',         label: 'All types'    },
            { id: 'pdf',         label: 'PDF'          },
            { id: 'pptx',        label: 'PPTX'         },
            { id: 'interactive', label: 'Interactive'  },
          ].map(v => (
            <button
              key={v.id}
              onClick={() => setTypeFilter(v.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                typeFilter === v.id ? 'bg-auri-text text-auri-bg' : 'text-auri-muted hover:text-auri-text'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-auri-muted ml-auto flex items-center gap-1.5">
          <Filter size={12} />
          {filtered.length} of {ARTIFACTS.length}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-auri-border bg-auri-bg p-8 text-center">
          <div className="text-sm text-auri-text font-medium mb-1">No artifacts match those filters.</div>
          <p className="text-xs text-auri-muted">Try clearing the search or broadening the agent/type filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(a => <ArtifactCard key={a.id} a={a} />)}
        </div>
      )}
    </div>
  );
}
