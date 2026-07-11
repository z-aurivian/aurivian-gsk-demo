import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import {
  ChevronDown, LogOut, Home, Activity, Users as UsersIcon, Microscope, BarChart3,
  GitBranch, FolderOpen, MessageSquare, ExternalLink, Sun, Moon,
} from 'lucide-react';
import CongressIngestion from './components/CongressIngestion';
import MedicalInsights from './components/MedicalInsights';
import KOLManagement from './components/KOLManagement';
import AuriChat from './components/AuriChat';
import Login from './components/Login';
import CommandCenter from './components/CommandCenter';
import AuriSidebar from './components/AuriSidebar';
import ArtifactLibrary from './components/ArtifactLibrary';
import InsightJourney from './components/InsightJourney';
import Vega from './components/Vega';
import { PRODUCT_OPTIONS, CONGRESS_OPTIONS, OUTCOME_VOLUME, CAPTURE_APP_URL, PULSE_BRIEF_URL } from './config';
import './App.css';

const THEME_KEY = 'aurivian.theme';

function isAuthed() {
  return sessionStorage.getItem('aurivian.authed') === '1';
}

function RequireAuth({ children }) {
  const location = useLocation();
  if (!isAuthed()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem(THEME_KEY) || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return [theme, () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))];
}

function Shell() {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCT_OPTIONS[0]?.id || 'soliris');
  const [selectedCongress, setSelectedCongress] = useState(
    CONGRESS_OPTIONS.find(c => c.available && !c.isTrend) || CONGRESS_OPTIONS[0]
  );
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();

  const currentProduct = PRODUCT_OPTIONS.find(p => p.id === selectedProduct);

  // Top nav: Command Center only — agents moved to left rail to declutter.
  const primaryNav = [
    { path: '/', label: 'Command Center', icon: Home },
  ];

  // Left rail: agents + workspaces.
  const agentRail = [
    { path: '/congress', label: 'ARIA', icon: Activity   },
    { path: '/kol',      label: 'LUCA', icon: UsersIcon  },
    { path: '/insights', label: 'NOVA', icon: Microscope },
    { path: '/vega',     label: 'VEGA', icon: BarChart3  },
  ];
  const railNav = [
    { path: '/journey',   label: 'Insight Journey', icon: GitBranch },
    { path: '/artifacts', label: 'Artifacts',       icon: FolderOpen },
    { path: '/auri',      label: 'Auri Chat',       icon: MessageSquare },
  ];

  const handleSignOut = () => {
    sessionStorage.removeItem('aurivian.authed');
    sessionStorage.removeItem('aurivian.user');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-auri-bg text-auri-text">
      {/* Header */}
      <header className="bg-auri-bg border-b border-auri-border px-6 py-3">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          {/* Logo + primary nav */}
          <div className="flex items-center gap-6 min-w-0">
            <span className="font-michroma text-auri-text text-lg tracking-wider shrink-0">AURIVIAN</span>

            <nav className="flex items-center gap-1">
              {primaryNav.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all shrink-0 ${
                      isActive
                        ? 'bg-auri-text text-auri-bg'
                        : 'text-auri-muted hover:text-auri-text hover:bg-auri-card'
                    }`
                  }
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right cluster: chip + selectors + theme + signout */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-auri-card border border-auri-border text-xs text-auri-muted">
              <span className="font-medium text-auri-text">Outcome Volume</span>
              <span>{OUTCOME_VOLUME.consumed.toLocaleString()} / {OUTCOME_VOLUME.committed.toLocaleString()}</span>
            </div>

            {/* Product Selector — scopes Auri's product context */}
            <div className="relative">
              <button
                onClick={() => setProductDropdownOpen(!productDropdownOpen)}
                title="Selecting a product scopes Auri's product context"
                className="flex items-center gap-3 px-4 py-2 bg-auri-card border border-auri-border rounded-lg hover:border-auri-text/50 transition-all"
              >
                <div className="text-left">
                  <div className="text-sm font-semibold text-auri-text">{currentProduct?.name}</div>
                  <div className="text-[10px] text-auri-muted">Auri scope · {currentProduct?.generic}</div>
                </div>
                <ChevronDown size={16} className={`text-auri-muted transition-transform ${productDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {productDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-auri-bg border border-auri-border rounded-lg shadow-xl z-50 overflow-hidden">
                  {PRODUCT_OPTIONS.map(product => (
                    <button
                      key={product.id}
                      onClick={() => {
                        setSelectedProduct(product.id);
                        setProductDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-auri-card transition-all ${
                        selectedProduct === product.id ? 'border-l-4 border-auri-text bg-auri-offset' : ''
                      }`}
                    >
                      <div className="font-semibold text-sm text-auri-text">{product.name}</div>
                      <div className="text-xs text-auri-muted">{product.generic} — {product.indications.join(', ')}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Congress Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-auri-muted hidden lg:inline">Congress:</span>
              <select
                value={selectedCongress.id}
                onChange={(e) => {
                  const c = CONGRESS_OPTIONS.find((x) => x.id === e.target.value);
                  if (c && (c.available || c.isTrend)) setSelectedCongress(c);
                }}
                className="px-3 py-2 rounded-lg text-sm font-medium bg-auri-card border border-auri-border text-auri-text focus:border-auri-text focus:outline-none"
              >
                {CONGRESS_OPTIONS.map((c) => (
                  <option key={c.id} value={c.id} disabled={!c.available && !c.isTrend}>
                    {c.name} {c.comingSoon ? '(Coming soon)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-lg text-auri-muted hover:text-auri-text hover:bg-auri-card transition-all"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={handleSignOut}
              title="Sign out"
              className="p-2 rounded-lg text-auri-muted hover:text-auri-text hover:bg-auri-card transition-all"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Body: left rail + main content */}
      <div className="max-w-[1600px] mx-auto flex gap-0">
        {/* Left rail */}
        <aside className="hidden md:block w-48 shrink-0 border-r border-auri-border min-h-[calc(100vh-65px)] py-4 px-2">
          <div className="sticky top-4 space-y-1">
            <div className="px-2 pb-2 text-[10px] uppercase tracking-wider text-auri-muted font-semibold">
              Agents
            </div>
            {agentRail.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all font-michroma tracking-wider ${
                    isActive
                      ? 'bg-auri-text text-auri-bg'
                      : 'text-auri-muted hover:text-auri-text hover:bg-auri-card'
                  }`
                }
              >
                <item.icon size={15} />
                <span>{item.label}</span>
              </NavLink>
            ))}

            <div className="px-2 pt-4 pb-2 text-[10px] uppercase tracking-wider text-auri-muted font-semibold">
              Workspaces
            </div>
            {railNav.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-auri-text text-auri-bg'
                      : 'text-auri-muted hover:text-auri-text hover:bg-auri-card'
                  }`
                }
              >
                <item.icon size={15} />
                <span>{item.label}</span>
              </NavLink>
            ))}
            {PULSE_BRIEF_URL && (
              <a
                href={PULSE_BRIEF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-auri-muted hover:text-auri-text hover:bg-auri-card transition-all"
              >
                <ExternalLink size={15} />
                <span>Pulse Brief</span>
              </a>
            )}
            {CAPTURE_APP_URL && (
              <a
                href={CAPTURE_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-auri-muted hover:text-auri-text hover:bg-auri-card transition-all"
              >
                <ExternalLink size={15} />
                <span>Congress Capture</span>
              </a>
            )}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 p-6">
          <Routes>
            <Route path="/" element={<CommandCenter />} />
            <Route path="/congress" element={<CongressIngestion selectedCongress={selectedCongress} />} />
            <Route path="/insights" element={<MedicalInsights selectedProduct={selectedProduct} />} />
            <Route path="/kol" element={<KOLManagement selectedProduct={selectedProduct} />} />
            <Route path="/vega" element={<Vega />} />
            <Route path="/auri" element={<AuriChat selectedProduct={selectedProduct} />} />
            <Route path="/journey" element={<InsightJourney />} />
            <Route path="/artifacts" element={<ArtifactLibrary />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Floating Auri chat — always available across authenticated surfaces */}
      <AuriSidebar selectedProduct={selectedProduct} />
    </div>
  );
}

function App() {
  const [, setAuthTick] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onAuthenticated={() => setAuthTick(t => t + 1)} />} />
        <Route
          path="/*"
          element={
            <RequireAuth>
              <Shell />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
