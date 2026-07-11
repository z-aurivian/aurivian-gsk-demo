import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, Activity, Users as UsersIcon, Microscope, BarChart3 } from 'lucide-react';
import { AGENTS, OUTCOME_VOLUME } from '../config';
import ExportPPTButton from './ExportPPTButton';

const ICONS = { aria: Activity, luca: UsersIcon, nova: Microscope, vega: BarChart3 };

export default function AgentSurfaceHeader({ agentId, children }) {
  const agent = AGENTS[agentId];
  if (!agent) return null;
  const Icon = ICONS[agentId];
  const volume = OUTCOME_VOLUME.byAgent?.[agentId];

  return (
    <div className="mb-6">
      {/* Breadcrumb + page-level export */}
      <div className="flex items-center justify-between mb-3">
        <NavLink
          to="/"
          className="inline-flex items-center gap-1 text-xs text-auri-muted hover:text-auri-text"
        >
          <ChevronLeft size={14} />
          <span>Command Center</span>
        </NavLink>
        <ExportPPTButton surface={`The ${agent.name} surface`} />
      </div>

      {/* Agent banner — monochrome: single ink top border, no per-agent color */}
      <div className="rounded-xl border border-auri-border bg-auri-card p-5 border-t-2 border-t-auri-text">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 min-w-0">
            <div className="w-12 h-12 rounded-lg bg-auri-bg border border-auri-border text-auri-text flex items-center justify-center shrink-0">
              <Icon size={22} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-michroma text-xl tracking-wider text-auri-text">{agent.name}</span>
                <span className="text-xs text-auri-muted">·</span>
                <span className="text-xs text-auri-muted">{agent.role}</span>
              </div>
              <div className="text-sm text-auri-text font-medium italic">{agent.tagline}</div>
              <p className="text-sm text-auri-muted mt-2 leading-relaxed max-w-3xl">{agent.description}</p>
            </div>
          </div>

          {volume && (
            <div className="shrink-0 rounded-lg px-3 py-2 bg-auri-bg border border-auri-border text-right">
              <div className="text-[10px] font-plex-mono uppercase tracking-wider text-auri-muted">Results this period</div>
              <div className="text-base font-semibold text-auri-text">{volume.consumed} / {volume.committed}</div>
            </div>
          )}
        </div>

        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
}
