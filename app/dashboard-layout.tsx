"use client";

import React, { useState, useEffect } from 'react';
import { Server, Shield, Network, Terminal, MapPin, Mail, ExternalLink, Download } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

// ==========================================
// 1. DATA CONFIGURATION
// ==========================================
const skillsData = [
  {
    category: "Virtualization & Compute",
    icon: <Server className="w-5 h-5 text-emerald-400" />,
    metrics: [
      { subject: 'vSphere', A: 90 },
      { subject: 'ESXi', A: 95 },
      { subject: 'Hyper-V', A: 85 },
      { subject: 'Compute', A: 80 }
    ],
    list: ["VMware vSphere & ESXi", "Hyper-V", "Bare-metal provisioning"]
  },
  {
    category: "Networking & Security",
    icon: <Network className="w-5 h-5 text-cyan-400" />,
    metrics: [
      { subject: 'Trunking', A: 90 },
      { subject: 'VLANs', A: 95 },
      { subject: 'OPNsense', A: 85 },
      { subject: 'Segregation', A: 90 }
    ],
    list: ["Cisco Switches (802.1Q)", "OPNsense Firewall", "Zone-based ACLs"]
  },
  {
    category: "Systems & Directory",
    icon: <Terminal className="w-5 h-5 text-indigo-400" />,
    metrics: [
      { subject: 'AD DS', A: 95 },
      { subject: 'GPO', A: 90 },
      { subject: 'DNS/DHCP', A: 95 },
      { subject: 'WSUS', A: 80 }
    ],
    list: ["Windows Server Ecosystem", "OU Restructuring & Resiliency", "Core Network Services"]
  },
  {
    category: "Cybersecurity & Monitoring",
    icon: <Shield className="w-5 h-5 text-amber-400" />,
    metrics: [
      { subject: 'CrowdStrike', A: 95 },
      { subject: 'EDR', A: 90 },
      { subject: 'LogicMonitor', A: 85 },
      { subject: 'Hardening', A: 85 }
    ],
    list: ["CrowdStrike EDR Deployment", "LogicMonitor Dashboards", "System Hardening Protocols"]
  }
];

const mockLogs = [
  "SEC_ENG: Active Directory topology verified.",
  "BCDR: Synology NAS health nominal (100%).",
  "SYS_MON: Portfolio site delivery optimized via Cloudflare edge.",
  "NET_ENG: OPNsense zone-based ACLs enforcing strict isolation.",
  "SEC_ENG: CrowdStrike telemetry sync successful.",
  "SYS_MON: Edge node latency averaging 12ms.",
  "BCDR: AWS S3 snapshot verification passed."
];

// TopoJSON URL for the World Map
const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

// ==========================================
// 2. SUB-COMPONENTS 
// ==========================================
function GlobalMap({ onNodeClick }: { onNodeClick: (data: any) => void }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const nodes = [
    {
      coordinates: [8.68, 50.11] as [number, number],
      label: 'EU_CORE',
      data: {
        title: "CRITICAL_INCIDENT: CROWDSTRIKE",
        origin: "Global Threat-Engine Failure",
        scope: "150 Distributed Endpoints Matrixed",
        result: "100% Plant Remediation Achieved in < 3 Hrs",
        path: "Manual safe-mode intervention applied directly to endpoint nodes. Hardening protocols updated post-incident."
      }
    },
    {
      coordinates: [-77.03, 38.90] as [number, number],
      label: 'US_EAST',
      data: {
        title: "SYS_UPGRADE: ACTIVE DIRECTORY",
        origin: "Corporate Topology Degradation",
        scope: "Global Replication Framework",
        result: "Eliminated replication latency",
        path: "Redesigned organizational unit parameters and rectified core DNS anomalies to enforce resilience."
      }
    },
    {
      coordinates: [103.81, 1.35] as [number, number],
      label: 'APAC_SYNC',
      data: {
        title: "BCDR_PROTOCOL: AWS_S3",
        origin: "Disaster Recovery Strategy Review",
        scope: "Multi-tier Storage Configurations",
        result: "Robust fault-tolerant availability loops established",
        path: "Engineered local Synology infrastructure mirrored securely to offsite AWS S3 repositories."
      }
    }
  ];

  return (
    <div className="bg-[#090D16] border border-slate-800/60 rounded-lg flex flex-col items-center justify-center relative w-full h-full min-h-[280px] p-2 overflow-hidden">
      <div className="absolute top-3 left-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest z-10">Global Asset Framework</div>
      
      <div className="w-full h-full mt-4 flex items-center justify-center">
        {isMounted && (
          <ComposableMap 
            projection="geoMercator" 
            projectionConfig={{ scale: 110, center: [10, 25] }} 
            className="w-full h-full opacity-80"
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#1E293B"
                    stroke="#334155"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "#334155" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {nodes.map((node, i) => (
              <Marker 
                key={i} 
                coordinates={node.coordinates} 
                onClick={() => onNodeClick(node.data)} 
                className="cursor-pointer group"
              >
                <circle r={6} fill="#34D399" className="animate-ping opacity-40" />
                <circle r={3} fill="#34D399" className="group-hover:fill-amber-400 transition-colors shadow-lg" />
                <text
                  textAnchor="middle"
                  y={14}
                  style={{ fontFamily: "monospace", fontSize: "7px", fill: "#34D399" }}
                  className="group-hover:fill-amber-400 transition-colors drop-shadow-md"
                >
                  {node.label}
                </text>
              </Marker>
            ))}
          </ComposableMap>
        )}
      </div>
      
      <div className="absolute bottom-3 right-4 text-[9px] font-mono text-slate-500 z-10">Select node for telemetry</div>
    </div>
  );
}

// ==========================================
// 3. MAIN WORKSPACE ENGINE
// ==========================================
export default function DashboardLayout() {
  const [activeSection, setActiveSection] = useState('overview');
  const [currentLogs, setCurrentLogs] = useState<string[]>([]);
  const [modalData, setModalData] = useState<{title: string, origin: string, scope: string, result: string, path: string} | null>(null);

  // Stretched Terminal Log Engine
  useEffect(() => {
    setCurrentLogs(mockLogs.slice(0, 3));
    let currentIndex = 2;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % mockLogs.length;
      setCurrentLogs((prevLogs) => {
        const newLogs = [...prevLogs, mockLogs[currentIndex]];
        return newLogs.slice(-5); // Keep terminal looking full with 5 lines
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sections = ['overview', 'experience', 'skills', 'projects'];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveSection(id);
      }, { threshold: 0.3 });
      observer.observe(el);
      return { observer, el };
    });
    return () => observers.forEach(obj => obj?.observer.unobserve(obj.el));
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-400">
      
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0B0F19]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollTo('overview')}>
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono font-bold tracking-wider text-sm uppercase">DALEEL SHAHBAN</span>
          </div>
          <nav className="hidden md:flex space-x-8 text-xs font-mono uppercase tracking-widest">
            {['overview', 'experience', 'skills', 'projects'].map((sec) => (
              <button
                key={sec}
                onClick={() => scrollTo(sec)}
                className={`transition-colors duration-200 ${activeSection === sec ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
              >
                // {sec}
              </button>
            ))}
          </nav>
          <div>
            <a 
              href="/daleel_shahban_cv.pdf" 
              download="Daleel_Shahban_IT_Infrastructure_CV.pdf"
              className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-xs text-emerald-400 font-mono px-3 py-2 rounded border border-slate-700 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CV.PDF</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
          <div className="bg-[#111625] border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
            <h1 className="text-2xl font-bold tracking-tight text-white">Daleel Shahban</h1>
            <p className="text-emerald-400 font-mono text-xs mt-1 uppercase tracking-wider">IT/OT Infrastructure Engineer</p>
            <p className="text-slate-400 text-sm mt-4 leading-relaxed">
              Experience designing, deploying, and managing critical infrastructure systems in multi-site industrial environments. Operating within lean teams with rapid domain ownership.
            </p>
            <div className="mt-6 space-y-3 font-mono text-xs text-slate-400 border-t border-slate-800/60 pt-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>Ilford, London, UK</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-slate-500" />
                <a href="mailto:daleel.shahban@gmail.com" className="hover:text-emerald-400 transition-colors">daleel.shahban@gmail.com</a>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <a href="https://linkedin.com/in/daleel-shahban-35a5ba252" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors flex items-center space-x-1">
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Stretched Terminal Window */}
          <div className="bg-[#090D16] border border-slate-900 rounded-xl p-4 font-mono text-[11px] shadow-inner relative flex flex-col min-h-[220px]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-900 mb-3 text-slate-500 shrink-0">
              <span className="flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                <span>MONITORING_DAEMON</span>
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded uppercase tracking-widest animate-pulse">LIVE</span>
            </div>
            
            <div className="space-y-2 text-slate-400 flex-1 flex flex-col justify-end overflow-hidden">
              {currentLogs.map((log, idx) => (
                <div key={idx} className="truncate tracking-wide animate-fadeIn opacity-80 hover:opacity-100 transition-opacity">
                  <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span> {log}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="lg:col-span-8 space-y-12">
          <section id="overview" className="scroll-mt-24 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">01 / System Overview</h2>
            
            <div className="bg-[#111625] border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Global Plant Topology</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Lifecycle architecture of core industrial operational platforms spanning diverse geographical regions.
                  </p>
                  <div className="inline-flex space-x-4 border-t border-slate-800/80 pt-4 w-full">
                    <div>
                      <span className="block text-xl font-bold text-white">150+</span>
                      <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Endpoints</span>
                    </div>
                    <div className="border-l border-slate-800 px-4">
                      <span className="block text-xl font-bold text-emerald-400">100%</span>
                      <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Plant Availability</span>
                    </div>
                  </div>
                </div>
                <GlobalMap onNodeClick={setModalData} />
              </div>
            </div>
          </section>

          <section id="experience" className="scroll-mt-24 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">02 / Production Infrastructure History</h2>
            <div className="bg-[#111625] border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/60 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">IT/OT Infrastructure Engineer</h3>
                  <p className="text-sm text-emerald-400 font-mono">Plastic Energy Ltd.</p>
                </div>
                <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700 h-fit w-fit mt-2 sm:mt-0">
                  OCT 2023 - PRESENT
                </span>
              </div>
              <div className="space-y-4 text-sm text-slate-400 leading-relaxed">
                <p>• <strong>Incident Response:</strong> Restored 150 critical distributed system nodes during the 2024 global CrowdStrike outage; reclaimed 100% plant telemetry within 3 hours.</p>
                <p>• <strong>Security Architecture:</strong> Managed the end-to-end implementation of CrowdStrike EDR layers across multi-site production frameworks.</p>
                <p>• <strong>Remediation:</strong> Restructured corporate Active Directory configurations after fatal communication errors; rectified core DNS anomalies.</p>
                <p>• <strong>BCDR Operations:</strong> Designed multi-tier data security structures using on-prem Synology blocks mapped to offsite AWS S3 repositories.</p>
              </div>
            </div>
          </section>

          <section id="skills" className="scroll-mt-24 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">03 / Technical Metrics Matrix</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillsData.map((cat, index) => (
                <div key={index} className="bg-[#111625] border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col justify-between">
                  <div className="flex items-center space-x-2.5 border-b border-slate-800/60 pb-3 mb-4">
                    {cat.icon}
                    <h3 className="text-sm font-semibold text-white font-mono">{cat.category}</h3>
                  </div>
                  <div className="w-full h-44 flex items-center justify-center my-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={cat.metrics}>
                        <PolarGrid stroke="#1E293B" />
                        <PolarAngleAxis dataKey="subject" stroke="#94A3B8" tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} stroke="#1E293B" />
                        <Radar name="Proficiency" dataKey="A" stroke="#10B981" fill="#10B981" fillOpacity={0.15} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 pt-3 border-t border-slate-800/60">
                    <ul className="text-xs text-slate-400 font-mono space-y-1">
                      {cat.list.map((item, idx) => (
                        <li key={idx} className="truncate"><span className="text-emerald-500">//</span> {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="projects" className="scroll-mt-24 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">04 / Lab Sandboxes & Academic Foundations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#111625] border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 rounded uppercase tracking-wider">Lab Isolation</span>
                  <h3 className="text-base font-bold text-white mt-3">Infrastructure Security Sandboxing</h3>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    Maintained dedicated bare-metal VMware ESXi clusters to execute pre-production layout modeling, routing matrices, and zone-based OPNsense configurations.
                  </p>
                </div>
              </div>
              <div className="bg-[#111625] border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 border border-indigo-500/30 bg-indigo-950/40 px-2 py-0.5 rounded uppercase tracking-wider">Academic</span>
                  <h3 className="text-base font-bold text-white mt-3">BSc Computer Science (2:1)</h3>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed font-sans">
                    <strong>London South Bank University</strong> — Developed edge sensor analysis programs running on Linux architecture to trigger emergency communication lines.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070B]/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#111625] border border-slate-800 max-w-md w-full rounded-xl p-6 relative shadow-2xl font-mono text-xs text-slate-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-bold text-amber-400">{modalData.title}</span>
              <button onClick={() => setModalData(null)} className="text-slate-500 hover:text-slate-200">[CLOSE]</button>
            </div>
            <div className="mt-4 space-y-2 bg-[#090D16] p-3 rounded border border-slate-900 text-[11px]">
              <div><span className="text-slate-500">EVENT_ORIGIN:</span> {modalData.origin}</div>
              <div><span className="text-slate-500">TARGET_SCOPE:</span> {modalData.scope}</div>
              <div><span className="text-slate-500">SYS_STABILITY:</span> {modalData.result}</div>
            </div>
            <p className="mt-4 font-sans text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-4">
              <strong>Remediation Path:</strong> {modalData.path}
            </p>
          </div>
        </div>
      )}

      <footer className="border-t border-slate-900 mt-20 bg-[#090D16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between text-[11px] font-mono text-slate-600">
          <span>&copy; {new Date().getFullYear()} DALEEL SHAHBAN</span>
          <span>STABLE_BUILD_V2.2</span>
        </div>
      </footer>
    </div>
  );
}