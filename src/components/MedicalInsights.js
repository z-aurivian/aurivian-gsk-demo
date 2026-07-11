import React, { useState } from 'react';
import { Stethoscope, Map, Brain } from 'lucide-react';
import AgentSurfaceHeader from './AgentSurfaceHeader';
import NovaTab1MedicalStrategy from './NovaTab1MedicalStrategy';
import NovaTab2FieldStrategy from './NovaTab2FieldStrategy';
import NovaTab3InsightIntelligence from './NovaTab3InsightIntelligence';

// NOVA surface — v3.0 (June 2026)
// Tab 1: Medical Strategy  — ISP pillars, MOs, Tactical POA, Insight Loop, MAO dashboard, ROI
// Tab 2: Field Strategy    — National / Territory / MSL view modes with HCP impact & KIT intel
// Tab 3: Insight Intelligence — KIQ matrix + actionable insights (moved from Tab 1 in v3)
const TABS = [
  { id: 'medical',  label: 'Medical Strategy',      Icon: Stethoscope },
  { id: 'field',    label: 'Field Strategy',         Icon: Map         },
  { id: 'insight',  label: 'Insight Intelligence',   Icon: Brain       },
];

export default function MedicalInsights() {
  const [activeTab, setActiveTab] = useState('medical');

  return (
    <>
      <AgentSurfaceHeader agentId="nova" />

      <div className="flex items-center gap-1 border-b border-auri-border mb-6">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
                isActive
                  ? 'border-auri-text text-auri-text'
                  : 'border-transparent text-auri-muted hover:text-auri-text'
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          );
        })}
      </div>

      {activeTab === 'medical' && <NovaTab1MedicalStrategy />}
      {activeTab === 'field'   && <NovaTab2FieldStrategy />}
      {activeTab === 'insight' && <NovaTab3InsightIntelligence />}
    </>
  );
}
