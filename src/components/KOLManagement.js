import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, MapPin, BookOpen, Calendar, Star, Users, Globe, Target } from 'lucide-react';
import { KOL_DATA, PRODUCT_OPTIONS } from '../config';
import { getMessagingAlignment } from '../config';
import AgentSurfaceHeader from './AgentSurfaceHeader';

function alignmentBarColor(score) {
  if (score >= 75) return 'bg-emerald-500';
  if (score >= 55) return 'bg-amber-500';
  return 'bg-rose-500';
}

function recommendationTone(avgScore) {
  if (avgScore >= 75) return 'bg-emerald-50 border-emerald-200 text-emerald-900';
  if (avgScore >= 55) return 'bg-amber-50 border-amber-200 text-amber-900';
  return 'bg-rose-50 border-rose-200 text-rose-900';
}

function KOLManagement({ selectedProduct }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [expandedKOL, setExpandedKOL] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const productName = PRODUCT_OPTIONS.find(p => p.id === selectedProduct)?.name;

  const filteredKOLs = useMemo(() => {
    return KOL_DATA.filter(kol => {
      const matchesSearch = !searchTerm ||
        kol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kol.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kol.focusAreas.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSpecialty = selectedSpecialty === 'all' || kol.specialty === selectedSpecialty;
      const matchesTier = selectedTier === 'all' || kol.engagementTier === selectedTier;
      const matchesRegion = selectedRegion === 'all' || kol.region === selectedRegion;
      const matchesProduct = kol.productAlignment.includes(selectedProduct);
      return matchesSearch && matchesSpecialty && matchesTier && matchesRegion && matchesProduct;
    });
  }, [searchTerm, selectedSpecialty, selectedTier, selectedRegion, selectedProduct]);

  const specialties = useMemo(() => [...new Set(KOL_DATA.map(k => k.specialty))], []);
  const regions = useMemo(() => [...new Set(KOL_DATA.map(k => k.region))], []);

  const stats = useMemo(() => {
    const aligned = KOL_DATA.filter(k => k.productAlignment.includes(selectedProduct));
    return {
      total: aligned.length,
      tier1: aligned.filter(k => k.engagementTier === 'Tier 1').length,
      tier2: aligned.filter(k => k.engagementTier === 'Tier 2').length,
      tier3: aligned.filter(k => k.engagementTier === 'Tier 3').length,
      regionCounts: regions.reduce((acc, r) => {
        acc[r] = aligned.filter(k => k.region === r).length;
        return acc;
      }, {}),
    };
  }, [selectedProduct, regions]);

  const tierColor = (tier) => {
    switch (tier) {
      case 'Tier 1': return 'bg-auri-text/10 text-auri-text';
      case 'Tier 2': return 'bg-emerald-50 text-emerald-600';
      case 'Tier 3': return 'bg-auri-card text-auri-muted';
      default: return 'bg-auri-card text-auri-muted';
    }
  };

  return (
    <>
      <AgentSurfaceHeader agentId="luca" />
    <div className="space-y-6 animate-fade-in">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-auri-card rounded-lg p-4 border border-auri-border">
          <div className="text-2xl font-bold text-auri-text">{stats.total}</div>
          <div className="text-xs text-auri-muted mt-1">KOLs Tracked ({productName})</div>
        </div>
        <div className="bg-auri-card rounded-lg p-4 border border-auri-border">
          <div className="text-2xl font-bold text-auri-text">{stats.tier1}</div>
          <div className="text-xs text-auri-muted mt-1">Tier 1 (Strategic)</div>
        </div>
        <div className="bg-auri-card rounded-lg p-4 border border-auri-border">
          <div className="text-2xl font-bold text-emerald-600">{stats.tier2}</div>
          <div className="text-xs text-auri-muted mt-1">Tier 2 (Engaged)</div>
        </div>
        <div className="bg-auri-card rounded-lg p-4 border border-auri-border">
          <div className="text-2xl font-bold text-auri-muted">{stats.tier3}</div>
          <div className="text-xs text-auri-muted mt-1">Tier 3 (Monitor)</div>
        </div>
        <div className="bg-auri-card rounded-lg p-4 border border-auri-border">
          <div className="text-2xl font-bold text-auri-text">{Object.keys(stats.regionCounts).length}</div>
          <div className="text-xs text-auri-muted mt-1">Regions</div>
        </div>
      </div>

      {/* Search & Filters + View Toggle */}
      <div className="bg-auri-card rounded-lg p-4 border border-auri-border space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-auri-muted" />
            <input
              type="text"
              placeholder="Search KOLs by name, institution, or focus area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-auri-bg border border-auri-border rounded-lg text-sm text-auri-text placeholder:text-auri-muted/60 focus:outline-none focus:border-auri-text/50"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition ${showFilters ? 'bg-auri-text border-auri-text text-auri-bg' : 'border-auri-border text-auri-muted hover:text-auri-text'}`}
          >
            <Filter size={16} /> Filters
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-4 pt-2 border-t border-auri-border">
            <select value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-3 py-2 bg-auri-bg border border-auri-border rounded-lg text-sm text-auri-text focus:outline-none focus:border-auri-text/50">
              <option value="all">All Specialties</option>
              {specialties.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={selectedTier} onChange={(e) => setSelectedTier(e.target.value)}
              className="px-3 py-2 bg-auri-bg border border-auri-border rounded-lg text-sm text-auri-text focus:outline-none focus:border-auri-text/50">
              <option value="all">All Tiers</option>
              <option value="Tier 1">Tier 1</option>
              <option value="Tier 2">Tier 2</option>
              <option value="Tier 3">Tier 3</option>
            </select>
            <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-2 bg-auri-bg border border-auri-border rounded-lg text-sm text-auri-text focus:outline-none focus:border-auri-text/50">
              <option value="all">All Regions</option>
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        )}
      </div>

      {/* KOL Table */}
          <div className="bg-auri-card rounded-lg border border-auri-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-auri-card text-auri-muted text-left">
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Institution</th>
                    <th className="px-4 py-3 font-medium">Country</th>
                    <th className="px-4 py-3 font-medium">Specialty</th>
                    <th className="px-4 py-3 font-medium text-center">Influence</th>
                    <th className="px-4 py-3 font-medium text-center">Tier</th>
                    <th className="px-4 py-3 font-medium text-center">Interactions</th>
                    <th className="px-4 py-3 font-medium text-center">Publications</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKOLs.map(kol => (
                    <React.Fragment key={kol.id}>
                      <tr
                        className={`border-t border-auri-border hover:bg-auri-card cursor-pointer transition ${expandedKOL === kol.id ? 'bg-auri-card' : ''}`}
                        onClick={() => setExpandedKOL(expandedKOL === kol.id ? null : kol.id)}
                      >
                        <td className="px-4 py-3 font-medium text-auri-text">{kol.name}</td>
                        <td className="px-4 py-3 text-auri-muted">{kol.institution}</td>
                        <td className="px-4 py-3 text-auri-muted">{kol.country}</td>
                        <td className="px-4 py-3 text-auri-muted">{kol.specialty}</td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star size={12} className="text-amber-500" />
                            <span className="text-auri-text">{kol.influenceScore}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${tierColor(kol.engagementTier)}`}>
                            {kol.engagementTier}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-auri-text">{kol.recentInteractions}</td>
                        <td className="px-4 py-3 text-center text-auri-text">{kol.publications}</td>
                        <td className="px-4 py-3 text-center">
                          {expandedKOL === kol.id ? <ChevronUp size={16} className="text-auri-muted" /> : <ChevronDown size={16} className="text-auri-muted" />}
                        </td>
                      </tr>

                      {expandedKOL === kol.id && (() => {
                        const alignment = getMessagingAlignment(kol);
                        return (
                          <tr>
                            <td colSpan={9} className="px-4 py-4 bg-auri-card">
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-fade-in">
                                <div className="space-y-3">
                                  <h4 className="text-xs font-semibold text-auri-text uppercase tracking-wider">Profile</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-auri-muted"><MapPin size={14} /> {kol.city}, {kol.country}</div>
                                    <div className="flex items-center gap-2 text-auri-muted"><Globe size={14} /> {kol.region}</div>
                                    <div className="flex items-center gap-2 text-auri-muted"><Calendar size={14} /> {kol.conferenceAppearances} conference appearances</div>
                                    <div className="flex items-center gap-2 text-auri-muted"><Users size={14} /> Products: {kol.productAlignment.map(p => PRODUCT_OPTIONS.find(o => o.id === p)?.name).join(', ')}</div>
                                    <div className="flex items-center gap-2 text-auri-muted"><BookOpen size={14} /> {kol.publications} peer-reviewed publications</div>
                                  </div>
                                  <h4 className="text-xs font-semibold text-auri-text uppercase tracking-wider mt-4">Focus Areas</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {kol.focusAreas.map((area, i) => (
                                      <span key={i} className="px-2 py-1 bg-auri-text/10 text-auri-text rounded text-xs">{area}</span>
                                    ))}
                                  </div>
                                </div>

                                {/* Medical Messaging Alignment — Vision Doc Module 3 */}
                                <div className="space-y-3 lg:col-span-2">
                                  <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-semibold text-auri-text uppercase tracking-wider flex items-center gap-2">
                                      <Target size={12} /> Medical Messaging Alignment
                                    </h4>
                                    {alignment && (
                                      <span className="text-xs text-auri-muted">avg <span className="text-auri-text font-semibold">{alignment.avgScore}%</span></span>
                                    )}
                                  </div>
                                  {alignment && (
                                    <>
                                      <div className="space-y-2">
                                        {alignment.pillars.map((p) => (
                                          <div key={p.id} className="flex items-center gap-3">
                                            <div className="w-48 shrink-0 text-sm text-auri-text truncate" title={p.name}>{p.name}</div>
                                            <div className="flex-1 min-w-0">
                                              <div className="h-2 bg-auri-bg rounded-full overflow-hidden border border-auri-border">
                                                <div className={`h-full ${alignmentBarColor(p.score)}`} style={{ width: `${p.score}%` }} />
                                              </div>
                                            </div>
                                            <div className="w-10 text-right text-xs text-auri-text font-medium">{p.score}%</div>
                                          </div>
                                        ))}
                                      </div>
                                      <div className={`mt-3 rounded-lg border p-3 text-xs leading-relaxed ${recommendationTone(alignment.avgScore)}`}>
                                        <span className="font-semibold">AI engagement recommendation. </span>
                                        {alignment.recommendation}
                                      </div>
                                    </>
                                  )}
                                  <h4 className="text-xs font-semibold text-auri-text uppercase tracking-wider mt-4">Engagement Strategy</h4>
                                  <p className="text-sm text-auri-muted leading-relaxed">{kol.recommendedStrategy}</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })()}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredKOLs.length === 0 && (
              <div className="text-center py-12 text-auri-muted">
                <Users size={32} className="mx-auto mb-3 opacity-50" />
                <p>No KOLs match your filters</p>
              </div>
            )}
          </div>

          <div className="text-xs text-auri-muted/60 text-right">
            Showing {filteredKOLs.length} of {KOL_DATA.filter(k => k.productAlignment.includes(selectedProduct)).length} KOLs aligned with {productName}
          </div>
    </div>
    </>
  );
}

export default KOLManagement;
