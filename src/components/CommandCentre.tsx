import React, { useState, useEffect } from 'react';
import {
  PersonaType,
  KPICardData,
  StoreNode,
} from '../types';
import { PERSONA_DATA } from '../data/personaData';
import {
  STORES_HIERARCHY,
  getNodeSubKPIs,
  getStoreImageForNode,
  getNodeDetailedKPICard,
} from '../data/storesHierarchy';
import { KPIDetailModal } from './KPIDetailModal';
import { MidDashboardModal, MidDashboardDetail } from './MidDashboardModal';
import {
  TrendingUp,
  TrendingDown,
  Building2,
  ChevronRight,
  ChevronDown,
  Activity,
  Search,
  Sparkles,
  Bot,
  Cpu,
  Layers,
  ArrowUpRight,
  Target,
  RefreshCw,
} from 'lucide-react';

interface CommandCentreProps {
  currentPersona: PersonaType;
}

// Google 4-color palette accents
const GOOGLE_COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#4285F4'];

// Detailed breakdowns for right-side index cards across personas
const MID_INDEX_DRILLDOWNS: Record<string, MidDashboardDetail> = {
  'Stores beating target': {
    categoryTitle: 'Company Operational Health Index',
    itemLabel: 'Stores beating target',
    itemValue: '68% (193 stores)',
    itemColor: '#34A853',
    breakdownTitle: '193 stores generating 108% to 124% of planned festive sales run-rate.',
    breakdownItems: [
      { label: 'Delhi NCR Flagships (28 stores)', value: '118% of Target', subtext: 'High demand for 65" OLED TVs & Split ACs' },
      { label: 'Mumbai & Pune Metros (36 stores)', value: '114% of Target', subtext: 'Zero-cost EMI appliance promotions' },
      { label: 'Bengaluru & Hyderabad Tech Stores (34 stores)', value: '112% of Target', subtext: 'Premium smartphone & laptop upgrades' },
      { label: 'Tier-2 High Street Hubs (95 stores)', value: '109% of Target', subtext: 'Festive kitchen appliance bundles' },
    ],
    contactPerson: {
      name: 'Arjun Das',
      role: 'Head of National Store Operations',
      department: 'Store Retail Network',
      email: 'arjun.das@thearkitects.in',
      phone: '+91 98400 34567',
    },
  },
  'Stores on target': {
    categoryTitle: 'Company Operational Health Index',
    itemLabel: 'Stores on target',
    itemValue: '25% (71 stores)',
    itemColor: '#4285F4',
    breakdownTitle: '71 stores tracking between 98% and 102% of assigned monthly targets.',
    breakdownItems: [
      { label: 'Gujarat Commercial Zone (16 stores)', value: '101% of Target', subtext: 'Steady walk-in traffic on weekends' },
      { label: 'Punjab & Chandigarh Hubs (22 stores)', value: '99% of Target', subtext: 'AC season transitioning to water heaters' },
      { label: 'Tamil Nadu Coimbatore Hubs (18 stores)', value: '100% of Target', subtext: 'Comfortable 18 days of stock cover' },
      { label: 'Rajasthan Retail Stores (15 stores)', value: '99% of Target', subtext: 'Solid festive pre-orders booked' },
    ],
    contactPerson: {
      name: 'Kavita Menon',
      role: 'VP Retail Operations & Strategy',
      department: 'Executive Store Operations',
      email: 'kavita.menon@thearkitects.in',
      phone: '+91 98300 23456',
    },
  },
  'Stores needing stock support': {
    categoryTitle: 'Company Operational Health Index',
    itemLabel: 'Stores needing stock support',
    itemValue: '7% (20 stores)',
    itemColor: '#EA4335',
    breakdownTitle: '20 stores tracking at 92% to 94% due to delayed TV and appliance shipments.',
    breakdownItems: [
      { label: 'Kolkata Central & Salt Lake (12 stores)', value: 'Short 240 units', subtext: 'Highway culvert repairs delayed trucks' },
      { label: 'North East Guwahati Hubs (6 stores)', value: 'Short 180 units', subtext: 'Fast-moving 55" OLED TVs out of stock' },
      { label: 'Bihar Patna Hub (2 stores)', value: 'Short 90 units', subtext: 'Refrigerator display units depleted' },
    ],
    contactPerson: {
      name: 'Tapan Mukherjee',
      role: 'Regional Director - East & North East',
      department: 'Regional Supply Operations',
      email: 'tapan.m@thearkitects.in',
      phone: '+91 98500 45678',
    },
  },
  'Auto-settled within 2 hrs': {
    categoryTitle: 'Payment Reconciliation Health',
    itemLabel: 'Auto-settled within 2 hrs',
    itemValue: '98.4%',
    itemColor: '#34A853',
    breakdownTitle: 'Real-time UPI, debit card, and credit card gateway clearance.',
    breakdownItems: [
      { label: 'Store Card Swipes (284 stores)', value: '₹410 Cr Cleared', subtext: 'Settled directly with primary acquiring bank' },
      { label: 'Instant UPI Dynamic QR Terminals', value: '₹142 Cr Cleared', subtext: '100% matched to billing receipts' },
      { label: 'Zero-Cost EMI Bank Payouts', value: '₹88 Cr Cleared', subtext: 'Verified within 90 minutes of customer swipe' },
    ],
    contactPerson: {
      name: 'Anita Desai',
      role: 'Head of Treasury & Banking',
      department: 'Corporate Finance',
      email: 'anita.desai@thearkitects.in',
      phone: '+91 98210 55192',
    },
  },
  'Pending bank verification': {
    categoryTitle: 'Payment Reconciliation Health',
    itemLabel: 'Pending bank verification',
    itemValue: '1.2%',
    itemColor: '#FBBC05',
    breakdownTitle: 'Transactions in queue awaiting bank weekend batch clearance.',
    breakdownItems: [
      { label: 'Sunday Night Card Authorizations', value: '₹4.8 Cr Pending', subtext: 'Normal clearing window: 4 business hours' },
      { label: 'Regional Co-operative Bank UPI Drops', value: '₹1.1 Cr Pending', subtext: 'Re-sync scheduled for 10:00 AM' },
    ],
    contactPerson: {
      name: 'Sunita Rao',
      role: 'Controller Accounts Payable & Cash Recon',
      department: 'Treasury Operations',
      email: 'sunita.rao@thearkitects.in',
      phone: '+91 98404 11290',
    },
  },
  'Vendor mismatch flags': {
    categoryTitle: 'Payment Reconciliation Health',
    itemLabel: 'Vendor mismatch flags',
    itemValue: '0.4%',
    itemColor: '#EA4335',
    breakdownTitle: 'Invoices held due to tax rate or delivery voucher discrepancies.',
    breakdownItems: [
      { label: 'National Appliances Ltd Invoice #88291', value: '₹1.08 Cr Held', subtext: '18% GST billed instead of agreed 12%' },
      { label: 'Audio Tech Logistics Bill #4410', value: '₹42 L Held', subtext: 'Short delivery of 24 soundbar cartons' },
    ],
    contactPerson: {
      name: 'Rohan Varma',
      role: 'VP Merchandising & Gross Margins',
      department: 'Commercial Finance',
      email: 'rohan.varma@thearkitects.in',
      phone: '+91 98201 44210',
    },
  },
};

export const CommandCentre: React.FC<CommandCentreProps> = ({ currentPersona }) => {
  const dataBundle = PERSONA_DATA[currentPersona];
  const [selectedKPICard, setSelectedKPICard] = useState<KPICardData | null>(null);
  const [midModalDetail, setMidModalDetail] = useState<MidDashboardDetail | null>(null);

  // Live micro-movement ticker for cards
  const [liveTick, setLiveTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTick((prev) => (prev + 1) % 100);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Selected store node in Part A/B
  const [selectedNode, setSelectedNode] = useState<StoreNode>(STORES_HIERARCHY);
  const [zoneOffset, setZoneOffset] = useState<number>(0);

  // Directly link image to store chosen showing inside showroom view
  const storeImage = getStoreImageForNode(selectedNode, zoneOffset);
  const [imgSrc, setImgSrc] = useState<string>(storeImage.src);

  useEffect(() => {
    setImgSrc(storeImage.src);
  }, [storeImage.src]);

  useEffect(() => {
    setZoneOffset(0);
  }, [selectedNode.id]);

  // Tree expanded nodes state
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'company-root': true,
    'reg-north': true,
    'clu-delhi-ncr': true,
  });

  const toggleExpand = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const handleSelectNode = (node: StoreNode) => {
    setSelectedNode(node);
  };

  // Search filter for stores tree
  const [treeSearch, setTreeSearch] = useState('');

  // Sub-KPI values for Part B
  const nodeSubKPIs = getNodeSubKPIs(selectedNode, currentPersona);

  // Handle clicking on store-specific sub-KPI card (Requirement 2)
  const handleSubKPIClick = (subKpi: (typeof nodeSubKPIs)[0]) => {
    const cardData = getNodeDetailedKPICard(subKpi, selectedNode, currentPersona);
    setSelectedKPICard(cardData);
  };

  // Handle clicking on right-side index item (Requirement 3)
  const handleRightIndexClick = (item: { label: string; value: string | number; color?: string }, dashTitle: string) => {
    const detail = MID_INDEX_DRILLDOWNS[item.label] || {
      categoryTitle: dashTitle,
      itemLabel: item.label,
      itemValue: String(item.value),
      itemColor: item.color || '#4285F4',
      breakdownTitle: `Detailed live metrics and store status for ${item.label}.`,
      breakdownItems: [
        { label: 'National Operational Impact', value: String(item.value), subtext: 'Confirmed across 284 stores' },
        { label: 'Highest Performing Cluster', value: 'Delhi NCR & Mumbai Hubs', subtext: 'Running at optimal efficiency' },
        { label: 'Regional Focus Cluster', value: 'East Regional Stores', subtext: 'Active monitoring and daily review' },
      ],
      contactPerson: {
        name: 'Arjun Das',
        role: 'Operations Director',
        department: 'National Operations',
        email: 'operations.lead@thearkitects.in',
        phone: '+91 98200 12345',
      },
    };
    setMidModalDetail(detail);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* AI Futuristic Telemetry Ribbon (Requirement 4) */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-emerald-50/40 border border-blue-200/90 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-white shadow-xs text-[#4285F4] border border-blue-100">
            <Cpu className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-900">
                GemInsight Neural Engine
              </span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-[#34A853] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-ping"></span>
                Autopilot Active
              </span>
            </div>
            <p className="text-[11px] text-slate-600 font-medium">
              Correlating 284 store POS lines, warehouse sensors, and supply chain telemetry in real time.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 shrink-0">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]"></span>
            Latency: 1.2ms
          </span>
          <span className="hidden md:inline text-slate-300">•</span>
          <span className="hidden md:flex items-center gap-1 text-[#34A853] font-bold">
            <Bot className="w-3.5 h-3.5" />
            42 Autonomous Agents Live
          </span>
        </div>
      </div>

      {/* Module Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Command Centre
            </h1>
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-[#4285F4] border border-blue-200">
              Company-Wide Aggregate
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Leader-level metrics updating continuously. Click any card for detailed breakdown and direct executive contact.
          </p>
        </div>

        {/* Live micro status with Google Green */}
        <div className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs text-slate-700">
          <Activity className="w-3.5 h-3.5 text-[#4285F4] animate-pulse" />
          <span>Real-time numbers moving live</span>
          <span className="w-2 h-2 rounded-full bg-[#34A853] live-pulse"></span>
        </div>
      </div>

      {/* 6a. TOP SECTION: 5 OVERALL KPI CARDS (NO TEXT CUTOFFS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {dataBundle.kpiCards.map((card, idx) => {
          const accentColor = GOOGLE_COLORS[idx % GOOGLE_COLORS.length];
          const isJitter = liveTick % 2 === 1 && idx === (liveTick % 5);

          return (
            <div
              key={card.id}
              onClick={() => setSelectedKPICard(card)}
              className="group cursor-pointer p-4 rounded-2xl bg-white/95 border border-slate-200 shadow-xs hover:shadow-md hover:border-[#4285F4]/50 transition-all duration-200 relative overflow-hidden flex flex-col justify-between min-h-[175px]"
              style={{ borderTopColor: accentColor, borderTopWidth: '3px' }}
            >
              <div>
                {/* Title area: NO TRUNCATE - natural wrap so nothing is cut off */}
                <div className="flex items-start justify-between gap-1.5 min-h-[38px] mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 leading-snug break-words">
                    {card.title}
                  </span>
                  <Sparkles
                    className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: accentColor }}
                  />
                </div>

                {/* Big number + unit */}
                <div className="flex items-baseline gap-1.5 flex-wrap mt-1">
                  <span className="text-2xl font-black text-slate-900 tracking-tight transition-transform duration-300">
                    {card.value}
                  </span>
                  {card.unit && (
                    <span className="text-[11px] text-slate-500 font-semibold break-words">
                      {card.unit}
                    </span>
                  )}
                  {isJitter && (
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-ping"
                      style={{ backgroundColor: accentColor }}
                    ></span>
                  )}
                </div>

                {/* Trend indicator */}
                <div className="flex items-center gap-1 mt-1.5 text-[11px] font-bold">
                  {card.trendPositive ? (
                    <TrendingUp className="w-3.5 h-3.5 text-[#34A853]" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-[#EA4335]" />
                  )}
                  <span
                    className={
                      card.trendPositive ? 'text-[#34A853]' : 'text-[#EA4335]'
                    }
                  >
                    {card.trend}
                  </span>
                </div>
              </div>

              {/* Industry Benchmark (Substituted for small graph as requested) */}
              <div className="mt-3 pt-2 border-t border-slate-100 flex flex-col justify-between">
                {card.industryBenchmark ? (
                  <div className="bg-slate-50/90 hover:bg-blue-50/30 rounded-xl p-2.5 border border-slate-200/80 transition-colors">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-[#4285F4] shrink-0" />
                      <span>Industry Benchmark</span>
                    </div>
                    <div className="mt-1 text-base sm:text-lg font-black text-slate-900 tracking-tight font-mono">
                      {card.industryBenchmark.value}
                    </div>
                  </div>
                ) : (
                  <div className="h-14 bg-slate-50 rounded-xl"></div>
                )}

                <div
                  className="mt-2 text-[10px] font-extrabold flex items-center justify-between"
                  style={{ color: accentColor }}
                >
                  <span>Click for detail & contact</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 6b. MID DASHBOARDS: CRYSTAL CLEAR ACTUAL VS TARGET & CLICKABLE RIGHT SIDE (Requirement 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {dataBundle.extraDashboards.map((dash, idx) => (
          <div
            key={idx}
            className="p-5 rounded-3xl bg-white/95 border border-slate-200 shadow-xs relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-black text-slate-900 tracking-tight">
                    {dash.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">{dash.subtitle}</p>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {dash.type === 'bar' ? 'Target vs Actual' : 'Click to inspect'}
                </span>
              </div>

              {/* CRYSTAL CLEAR COMPARATIVE BAR CHART (Requirement 3) */}
              {dash.type === 'bar' ? (
                <div className="space-y-3.5 mt-2">
                  {dash.items.map((item, bIdx) => {
                    // Calculate intuitive percentage: if item.value is ~108, it means 108% of target!
                    const numVal = typeof item.value === 'number' ? item.value : parseFloat(String(item.value)) || 100;
                    const percentOfTarget = numVal > 300 ? Math.round((numVal / 380) * 100) : numVal;
                    const isOverTarget = percentOfTarget >= 100;

                    return (
                      <div key={bIdx} className="space-y-1.5">
                        <div className="flex justify-between items-baseline text-xs font-bold text-slate-800 flex-wrap gap-1">
                          <span className="font-extrabold">{item.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-600 font-semibold text-[11px]">
                              {item.secondary || `${numVal} achieved`}
                            </span>
                            <span
                              className={`text-[10px] font-black px-1.5 py-0.2 rounded-md ${
                                isOverTarget
                                  ? 'bg-emerald-100 text-[#34A853]'
                                  : 'bg-amber-100 text-[#FBBC05]'
                              }`}
                            >
                              {percentOfTarget}% of plan
                            </span>
                          </div>
                        </div>

                        {/* Clear full-width comparative bar with 100% threshold */}
                        <div className="relative w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                          {/* 100% Target marker line */}
                          <div
                            className="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10"
                            style={{ left: '80%' }}
                            title="100% Target Threshold"
                          ></div>

                          {/* Actual progress bar */}
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${Math.min(100, (percentOfTarget / 125) * 100)}%`,
                              backgroundColor: isOverTarget ? '#34A853' : '#4285F4',
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* CLICKABLE RIGHT-SIDE DONUT/INDEX DASHBOARD (Requirement 3) */
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-2">
                  {dash.items.map((item, dIdx) => (
                    <div
                      key={dIdx}
                      onClick={() => handleRightIndexClick(item, dash.title)}
                      className="cursor-pointer p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/40 border border-slate-200 hover:border-[#4285F4] transition-all text-center flex flex-col justify-between group shadow-xs hover:shadow-sm"
                      title="Click to view detailed breakdown & lead contact"
                    >
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
                        <span>Segment #{dIdx + 1}</span>
                        <ArrowUpRight className="w-3 h-3 text-[#4285F4] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      <span className="text-xs font-bold text-slate-700 break-words leading-tight">
                        {item.label}
                      </span>

                      <span
                        className="text-lg font-black mt-2 tracking-tight"
                        style={{ color: item.color || '#4285F4' }}
                      >
                        {item.value}
                      </span>

                      <span className="text-[10px] font-extrabold text-[#4285F4] mt-2 group-hover:underline">
                        View breakdown →
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Enterprise telemetry stream: Synchronized</span>
              <span className="font-semibold text-slate-600">Updated 2m ago</span>
            </div>
          </div>
        ))}
      </div>

      {/* 6c. BOTTOM SECTION: SPLIT INTO 2 PARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
        {/* PART A: Interactive Tree Diagram of ALL 284 stores (Left 7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-4 sm:p-5 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#4285F4]" />
                <h3 className="text-base font-black text-slate-900 tracking-tight">
                  All 284 Retail Stores Hierarchy
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Stores → Zones → Clusters → Regions → Company. Click any node to link directly to its live store view.
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-blue-50 text-[#4285F4] border border-blue-200">
              284 Stores Live
            </span>
          </div>

          {/* Quick Filter Search */}
          <div className="relative mt-3 mb-2">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={treeSearch}
              onChange={(e) => setTreeSearch(e.target.value)}
              placeholder="Search store number, city or cluster (e.g. #101, Delhi, Bandra)..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#4285F4]/50"
            />
            {treeSearch && (
              <button
                onClick={() => setTreeSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Tree Scroll Container */}
          <div className="flex-1 overflow-y-auto max-h-[420px] pr-1 space-y-1 mt-1 text-xs">
            <TreeNodeItem
              node={STORES_HIERARCHY}
              selectedNode={selectedNode}
              expandedNodes={expandedNodes}
              onToggle={toggleExpand}
              onSelect={handleSelectNode}
              searchTerm={treeSearch.toLowerCase()}
              depth={0}
            />
          </div>
        </div>

        {/* PART B: Real Store Image directly linked + Clickable Sub-KPI Cards (Right 5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-4 sm:p-5 flex flex-col justify-between">
          <div>
            {/* Header with selected node info */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="min-w-0 pr-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-[#4285F4] border border-blue-200">
                  {selectedNode.type.toUpperCase()} VIEW
                </span>
                <h4 className="text-base font-black text-slate-900 mt-1 break-words">
                  {selectedNode.name}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {selectedNode.storeCount === 1
                    ? 'Individual Physical Store'
                    : `Aggregating ${selectedNode.storeCount} physical stores`}
                </p>
              </div>

              {/* Status pill */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 text-[11px] text-[#34A853] font-bold border border-emerald-200 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse"></span>
                <span>Store Linked</span>
              </div>
            </div>

            {/* REAL PHYSICAL STORE IMAGE: Directly linked to store chosen showing inside showroom view */}
            <div className="relative mt-3 rounded-2xl overflow-hidden aspect-video bg-slate-900 border border-slate-200 shadow-sm group">
              <img
                src={imgSrc}
                alt={`${selectedNode.name} - ${storeImage.title}`}
                referrerPolicy="no-referrer"
                onError={() => {
                  if (imgSrc !== storeImage.fallbackSrc) {
                    setImgSrc(storeImage.fallbackSrc);
                  } else {
                    setImgSrc('/stores/store-flagship-floor.jpg');
                  }
                }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />

              {/* Top Left: Live Showroom Interior Zone Indicator */}
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/65 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#34A853] animate-ping"></span>
                <span>Inside Showroom: {storeImage.title}</span>
              </div>

              {/* Top Right: Cycle Showroom Departments */}
              <button
                type="button"
                onClick={() => setZoneOffset((prev) => prev + 1)}
                className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/65 hover:bg-black/85 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 shadow-md transition-colors cursor-pointer"
                title="Click to view next showroom department inside the store"
              >
                <RefreshCw className="w-3 h-3 text-[#4285F4]" />
                <span>Next Zone ({((zoneOffset % 8) + 1)}/8)</span>
              </button>

              {/* Bottom Subtle Bar: Department Zone tag */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 px-2.5 py-1.5 rounded-xl bg-black/70 backdrop-blur-md text-white text-[10px] flex items-center justify-between shadow-md">
                <span className="font-extrabold text-slate-100 truncate">
                  {storeImage.zone}
                </span>
                <span className="text-[9px] text-slate-300 font-medium hidden sm:inline truncate pl-2">
                  {storeImage.description}
                </span>
              </div>
            </div>

            {/* Sub-KPI Metrics for Selected Node (Requirement 2: CLICKABLE like main KPI cards) */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {selectedNode.name} Sub-Metrics (Click to Inspect)
                </span>
                <span className="text-[10px] text-[#4285F4] font-extrabold">Click card for breakdown</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {nodeSubKPIs.map((sub, sIdx) => (
                  <div
                    key={sIdx}
                    onClick={() => handleSubKPIClick(sub)}
                    className={`cursor-pointer p-2.5 rounded-xl border transition-all hover:shadow-sm hover:border-[#4285F4] group ${
                      sIdx === 0 ? 'sm:col-span-2 bg-blue-50/40 border-blue-200' : 'bg-white border-slate-200'
                    }`}
                    title="Click to view detailed breakdown & store lead contact"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 font-bold break-words">
                        {sub.label}
                      </span>
                      <ChevronRight className="w-3 h-3 text-[#4285F4] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>

                    <div className="flex items-baseline justify-between mt-1 gap-2">
                      <span className="text-base font-black text-slate-900 group-hover:text-[#4285F4] transition-colors">
                        {sub.value}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ${
                          sub.isPositive
                            ? 'bg-emerald-100 text-[#34A853]'
                            : 'bg-rose-100 text-[#EA4335]'
                        }`}
                      >
                        {sub.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Node ID: {selectedNode.id}</span>
            <span className="font-mono text-[#4285F4] font-bold">Store Camera Sync: Active</span>
          </div>
        </div>
      </div>

      {/* KPI Detail Modal with Full Contact Info and Calling/Emailing */}
      <KPIDetailModal
        card={selectedKPICard}
        onClose={() => setSelectedKPICard(null)}
      />

      {/* Mid-Section Dashboard Index Detail Modal (Requirement 3) */}
      <MidDashboardModal
        detail={midModalDetail}
        onClose={() => setMidModalDetail(null)}
      />
    </div>
  );
};

// Recursive Tree Node Item component
interface TreeNodeItemProps {
  node: StoreNode;
  selectedNode: StoreNode;
  expandedNodes: Record<string, boolean>;
  onToggle: (id: string, e: React.MouseEvent) => void;
  onSelect: (node: StoreNode) => void;
  searchTerm: string;
  depth: number;
}

const TreeNodeItem: React.FC<TreeNodeItemProps> = ({
  node,
  selectedNode,
  expandedNodes,
  onToggle,
  onSelect,
  searchTerm,
  depth,
}) => {
  const isExpanded = !!expandedNodes[node.id];
  const isSelected = selectedNode.id === node.id;
  const hasChildren = node.children && node.children.length > 0;

  // Filter logic
  const matchesSelf = searchTerm
    ? node.name.toLowerCase().includes(searchTerm) ||
      (node.city && node.city.toLowerCase().includes(searchTerm))
    : true;

  const hasMatchingChild = (n: StoreNode): boolean => {
    if (!searchTerm) return true;
    if (
      n.name.toLowerCase().includes(searchTerm) ||
      (n.city && n.city.toLowerCase().includes(searchTerm))
    )
      return true;
    return n.children ? n.children.some(hasMatchingChild) : false;
  };

  if (searchTerm && !matchesSelf && !hasMatchingChild(node)) {
    return null;
  }

  // Type badge colors
  const typeBadgeColors: Record<string, string> = {
    company: 'bg-blue-100 text-[#4285F4]',
    region: 'bg-indigo-100 text-indigo-700',
    cluster: 'bg-teal-100 text-teal-800',
    zone: 'bg-amber-100 text-amber-800',
    store: 'bg-slate-100 text-slate-700',
  };

  return (
    <div className="select-none">
      <div
        onClick={() => onSelect(node)}
        style={{ paddingLeft: `${Math.min(depth * 14 + 6, 90)}px` }}
        className={`group cursor-pointer py-1.5 pr-2 rounded-xl flex items-center justify-between transition-all ${
          isSelected
            ? 'bg-[#4285F4] text-white font-bold shadow-xs'
            : 'hover:bg-slate-100/80 text-slate-700'
        }`}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          {hasChildren ? (
            <button
              onClick={(e) => onToggle(node.id, e)}
              className={`p-1 rounded-md transition-colors ${
                isSelected ? 'hover:bg-blue-600' : 'hover:bg-slate-200'
              }`}
            >
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>
          ) : (
            <div className="w-5 flex justify-center">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isSelected ? 'bg-white' : 'bg-slate-300'
                }`}
              ></span>
            </div>
          )}

          <span className="truncate text-xs">{node.name}</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          <span
            className={`text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded-md ${
              isSelected ? 'bg-white/20 text-white' : typeBadgeColors[node.type]
            }`}
          >
            {node.type}
          </span>
          {node.type !== 'store' && (
            <span
              className={`text-[10px] font-semibold ${
                isSelected ? 'text-blue-100' : 'text-slate-400'
              }`}
            >
              {node.storeCount}s
            </span>
          )}
        </div>
      </div>

      {hasChildren && (isExpanded || searchTerm.length > 0) && (
        <div className="relative">
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              selectedNode={selectedNode}
              expandedNodes={expandedNodes}
              onToggle={onToggle}
              onSelect={onSelect}
              searchTerm={searchTerm}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
