import React, { useState, useEffect } from "react";
import { AppConfig, PresetTemplate, AuditResult } from "./types";
import { DEFAULT_CONFIG } from "./data/constants";
import { generateCompleteIndexHtml, generatePolicyHtml } from "./utils/policyGenerator";
import { Navbar } from "./components/Navbar";
import { AppConfigForm } from "./components/AppConfigForm";
import { PolicyPreview } from "./components/PolicyPreview";
import { HtmlOutputView } from "./components/HtmlOutputView";
import { PlayDataSafetyView } from "./components/PlayDataSafetyView";
import { ComplianceAuditPanel } from "./components/ComplianceAuditPanel";
import { ClauseGeneratorModal } from "./components/ClauseGeneratorModal";
import { VercelDeployGuideModal } from "./components/VercelDeployGuideModal";
import { CleanPolicyPageView } from "./components/CleanPolicyPageView";
import {
  ShieldCheck,
  Smartphone,
  Download,
  Copy,
  Sparkles,
  CheckCircle2,
  Lock,
  Globe,
  Users,
  Layers,
  FileText,
  Code2,
  ExternalLink,
  ArrowRight,
  Eye,
} from "lucide-react";

export default function App() {
  const [config, setConfig] = useState<AppConfig>(() => {
    try {
      const saved =
        localStorage.getItem("playguard_voltwise_config") ||
        localStorage.getItem("playguard_privacy_config");
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_CONFIG,
          ...parsed,
          effectiveDate: "18 سبتمبر 2026",
          supportWebsite: "https://volt-wise-privacy-policy.vercel.app/",
        };
      }
    } catch (e) {
      console.warn("Could not load stored config", e);
    }
    return DEFAULT_CONFIG;
  });

  // Default to clean public view for Vercel deployment
  const [viewMode, setViewMode] = useState<"public" | "builder">("public");

  const [activeTab, setActiveTab] = useState<
    "configure" | "preview" | "html" | "datasafety" | "audit"
  >("preview");

  const [copied, setCopied] = useState(false);
  const [isClauseModalOpen, setIsClauseModalOpen] = useState(false);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  // Persist configuration
  useEffect(() => {
    try {
      localStorage.setItem("playguard_voltwise_config", JSON.stringify(config));
    } catch (e) {
      console.warn("Failed to persist config", e);
    }
  }, [config]);

  const handleApplyPreset = (preset: PresetTemplate) => {
    setConfig((prev) => ({
      ...prev,
      ...preset.config,
    }));
    setAuditResult(null);
  };

  const handleCopyHtml = async () => {
    try {
      const html = generatePolicyHtml(config);
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownloadHtml = () => {
    const fullHtml = generateCompleteIndexHtml(config);
    const blob = new Blob([fullHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "voltwise-privacy-policy.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddClause = (clause: { id: string; title: string; content: string }) => {
    setConfig((prev) => ({
      ...prev,
      customClauses: [...prev.customClauses, clause],
    }));
    setAuditResult(null);
  };

  // If in clean public mode, show the official, clean website ready for Vercel & Play Store
  if (viewMode === "public") {
    return (
      <CleanPolicyPageView config={config} />
    );
  }

  // Otherwise, render the full Builder & Customizer UI
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#D1D1D1] flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        config={config}
        onApplyPreset={handleApplyPreset}
        onDownloadHtml={handleDownloadHtml}
        onCopyHtml={handleCopyHtml}
        copied={copied}
        onOpenClauseModal={() => setIsClauseModalOpen(true)}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        auditScore={auditResult?.score}
      />

      {/* Hero / Quick Context Header */}
      <section className="border-b border-white/5 bg-[#0F0F0F] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888]">
                Target App
              </span>
              <span className="text-white font-semibold">{config.appName}</span>
              <span className="text-white/20">&bull;</span>
              <span className="text-[#888888] font-mono text-[11px] bg-[#0A0A0A] px-2 py-0.5 rounded-sm border border-white/5">
                {config.packageName}
              </span>
              <span className="text-white/20">&bull;</span>
              <span className="text-emerald-400 font-medium text-xs bg-emerald-500/10 px-2 py-0.5 rounded-sm border border-emerald-500/20">
                {config.appType}
              </span>
            </div>
            <p className="text-[11px] text-[#666666]">
              Generating clean standard legal and privacy documents compliant with Google Play Store policies.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setViewMode("public")}
              className="flex items-center gap-1.5 text-xs font-bold text-black bg-white hover:bg-neutral-200 px-3.5 py-1.5 rounded-sm shadow-sm transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>عرض صفحة الخصوصية النظيفة (Public Page)</span>
            </button>

            <button
              onClick={() => setIsDeployGuideOpen(true)}
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-sm transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#888888]" />
              <span>Vercel Deploy Guide</span>
            </button>

            <button
              onClick={() => setActiveTab("audit")}
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 px-3 py-1.5 rounded-sm transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Audit Compliance</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:px-8">
        {activeTab === "configure" && (
          <AppConfigForm
            config={config}
            onChange={setConfig}
            onOpenClauseModal={() => setIsClauseModalOpen(true)}
          />
        )}

        {activeTab === "preview" && (
          <PolicyPreview
            config={config}
            onDownloadHtml={handleDownloadHtml}
            onCopyHtml={handleCopyHtml}
            copied={copied}
            onSwitchToHtml={() => setActiveTab("html")}
            onChangeLanguage={(lang) => setConfig((prev) => ({ ...prev, policyLanguage: lang }))}
          />
        )}

        {activeTab === "html" && (
          <HtmlOutputView
            config={config}
            onDownloadHtml={handleDownloadHtml}
            onCopyHtml={handleCopyHtml}
            copied={copied}
          />
        )}

        {activeTab === "datasafety" && <PlayDataSafetyView config={config} />}

        {activeTab === "audit" && (
          <ComplianceAuditPanel
            config={config}
            auditResult={auditResult}
            setAuditResult={setAuditResult}
            onOpenClauseModal={() => setIsClauseModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0F0F0F] py-6 text-center text-xs text-[#666666]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="uppercase tracking-[0.15em] text-[10px] font-bold text-[#888888]">
            PlayGuard &bull; Professional Android &amp; Google Play Policy Engine
          </div>
          <div className="text-[11px] text-[#666666]">
            Active Profile: <strong className="text-white">{config.appName}</strong> &bull; All changes saved in local persistence.
          </div>
        </div>
      </footer>

      {/* Clause Generator Modal */}
      <ClauseGeneratorModal
        isOpen={isClauseModalOpen}
        onClose={() => setIsClauseModalOpen(false)}
        config={config}
        onAddClause={handleAddClause}
      />

      {/* Vercel Deploy Guide Modal */}
      <VercelDeployGuideModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
        onDownloadHtml={handleDownloadHtml}
      />
    </div>
  );
}
