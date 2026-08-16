import React from "react";
import {
  ShieldCheck,
  Code2,
  FileText,
  Sparkles,
  Download,
  Copy,
  Layers,
  CheckCircle2,
  ExternalLink,
  Shield,
  HelpCircle,
} from "lucide-react";
import { AppConfig, PresetTemplate } from "../types";
import { PRESET_TEMPLATES } from "../data/constants";

interface NavbarProps {
  activeTab: "configure" | "preview" | "html" | "datasafety" | "audit";
  setActiveTab: (tab: "configure" | "preview" | "html" | "datasafety" | "audit") => void;
  config: AppConfig;
  onApplyPreset: (preset: PresetTemplate) => void;
  onDownloadHtml: () => void;
  onCopyHtml: () => void;
  copied: boolean;
  onOpenClauseModal: () => void;
  onOpenDeployGuide: () => void;
  auditScore?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  config,
  onApplyPreset,
  onDownloadHtml,
  onCopyHtml,
  copied,
  onOpenClauseModal,
  onOpenDeployGuide,
  auditScore,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#0F0F0F] border-b border-white/10 shadow-2xl text-[#D1D1D1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm shadow-sm">
              <span className="text-black font-bold text-xs tracking-tight">PG</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base text-white tracking-tight">PlayGuard</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/50 border border-white/10 px-2 py-0.5 rounded-sm bg-white/5">
                  Play Store Ready
                </span>
              </div>
              <p className="text-[11px] text-[#888888] font-sans">Android Policy &amp; Data Safety Engine</p>
            </div>
          </div>

          {/* Center Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-[#0A0A0A] p-1 rounded-sm border border-white/10">
            <button
              id="tab-btn-configure"
              onClick={() => setActiveTab("configure")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm text-[11px] uppercase tracking-[0.15em] font-semibold transition-all ${
                activeTab === "configure"
                  ? "bg-white text-black shadow-sm"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              App Config
            </button>
            <button
              id="tab-btn-preview"
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm text-[11px] uppercase tracking-[0.15em] font-semibold transition-all ${
                activeTab === "preview"
                  ? "bg-white text-black shadow-sm"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Policy Document
            </button>
            <button
              id="tab-btn-html"
              onClick={() => setActiveTab("html")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm text-[11px] uppercase tracking-[0.15em] font-semibold transition-all ${
                activeTab === "html"
                  ? "bg-white text-black shadow-sm"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              HTML / Vercel
            </button>
            <button
              id="tab-btn-datasafety"
              onClick={() => setActiveTab("datasafety")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm text-[11px] uppercase tracking-[0.15em] font-semibold transition-all ${
                activeTab === "datasafety"
                  ? "bg-white text-black shadow-sm"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Data Safety
            </button>
            <button
              id="tab-btn-audit"
              onClick={() => setActiveTab("audit")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm text-[11px] uppercase tracking-[0.15em] font-semibold transition-all ${
                activeTab === "audit"
                  ? "bg-white text-black shadow-sm"
                  : "text-amber-400/80 hover:text-amber-300 hover:bg-white/5"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              AI Audit
              {auditScore !== undefined && (
                <span className="ml-1 px-1.5 py-0.2 rounded-sm text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {auditScore}%
                </span>
              )}
            </button>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Presets dropdown */}
            <div className="relative group">
              <button
                id="btn-presets-menu"
                className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-[#141414] hover:bg-[#1E1E1E] text-[#D1D1D1] hover:text-white px-3 py-1.5 rounded-sm border border-white/10 transition-colors"
              >
                <span>Presets</span>
                <span className="text-[10px] text-white/40">▾</span>
              </button>
              <div className="absolute right-0 mt-1.5 w-64 bg-[#0F0F0F] border border-white/10 rounded-sm shadow-2xl p-1.5 hidden group-hover:block z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] border-b border-white/5 mb-1">
                  Quick Industry Templates
                </div>
                {PRESET_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => onApplyPreset(tmpl)}
                    className="w-full text-left px-2.5 py-2 rounded-sm hover:bg-white/5 transition-colors group/item"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#D1D1D1] group-hover/item:text-white">
                        {tmpl.name}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#666666] line-clamp-1 mt-0.5">
                      {tmpl.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Clause Generator */}
            <button
              id="btn-add-clause"
              onClick={onOpenClauseModal}
              title="Draft custom clause with AI Legal Assistant"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white border border-white/10 px-3 py-1.5 rounded-sm transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Clause</span>
            </button>

            {/* Copy HTML */}
            <button
              id="btn-copy-html"
              onClick={onCopyHtml}
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-[#141414] hover:bg-[#1E1E1E] text-[#D1D1D1] hover:text-white px-3 py-1.5 rounded-sm border border-white/10 transition-colors"
              title="Copy clean standard HTML"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#888888]" />
                  <span className="hidden sm:inline">Copy HTML</span>
                </>
              )}
            </button>

            {/* Download index.html */}
            <button
              id="btn-download-html"
              onClick={onDownloadHtml}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white hover:bg-neutral-200 text-black px-3.5 py-1.5 rounded-sm shadow-sm transition-colors"
              title="Download index.html for Vercel / GitHub Pages"
            >
              <Download className="w-3.5 h-3.5 text-black" />
              <span>Get index.html</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile subnav */}
      <div className="md:hidden flex items-center justify-around border-t border-white/10 py-2 px-2 bg-[#0A0A0A] overflow-x-auto">
        <button
          onClick={() => setActiveTab("configure")}
          className={`px-3 py-1 text-xs uppercase tracking-wider rounded-sm ${
            activeTab === "configure" ? "bg-white text-black font-semibold" : "text-[#888888]"
          }`}
        >
          Config
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`px-3 py-1 text-xs uppercase tracking-wider rounded-sm ${
            activeTab === "preview" ? "bg-white text-black font-semibold" : "text-[#888888]"
          }`}
        >
          Preview
        </button>
        <button
          onClick={() => setActiveTab("html")}
          className={`px-3 py-1 text-xs uppercase tracking-wider rounded-sm ${
            activeTab === "html" ? "bg-white text-black font-semibold" : "text-[#888888]"
          }`}
        >
          HTML / Vercel
        </button>
        <button
          onClick={() => setActiveTab("datasafety")}
          className={`px-3 py-1 text-xs uppercase tracking-wider rounded-sm ${
            activeTab === "datasafety" ? "bg-white text-black font-semibold" : "text-[#888888]"
          }`}
        >
          Data Safety
        </button>
        <button
          onClick={() => setActiveTab("audit")}
          className={`px-3 py-1 text-xs uppercase tracking-wider rounded-sm ${
            activeTab === "audit" ? "bg-white text-black font-semibold" : "text-amber-400"
          }`}
        >
          AI Audit
        </button>
      </div>
    </header>
  );
};
