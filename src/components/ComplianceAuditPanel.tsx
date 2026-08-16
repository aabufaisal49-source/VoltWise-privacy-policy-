import React, { useState, useEffect } from "react";
import { AppConfig, AuditResult, AuditFinding } from "../types";
import { generatePolicyHtml } from "../utils/policyGenerator";
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Info,
  RefreshCw,
  Award,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface ComplianceAuditPanelProps {
  config: AppConfig;
  auditResult: AuditResult | null;
  setAuditResult: (res: AuditResult | null) => void;
  onOpenClauseModal: () => void;
}

export const ComplianceAuditPanel: React.FC<ComplianceAuditPanelProps> = ({
  config,
  auditResult,
  setAuditResult,
  onOpenClauseModal,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAudit = async () => {
    setLoading(true);
    setError(null);
    try {
      const policyHtml = generatePolicyHtml(config);
      const res = await fetch("/api/audit-policy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appDetails: {
            appName: config.appName,
            appType: config.appType,
            packageName: config.packageName,
            ageGroup: config.ageGroup,
            containsAds: config.containsAds,
            dataCollectedCount: config.personalDataCollected.length,
            permissionsCount: config.permissionsUsed.length,
            thirdPartyCount: config.thirdPartyServices.length,
            hasAccountCreation: config.allowsAccountCreation,
            hasAccountDeletionUrl: Boolean(config.accountDeletionUrl),
            backgroundLocationUsed: config.backgroundLocationUsed,
            includeGDPR: config.includeGDPR,
            includeCCPA: config.includeCCPA,
          },
          policyHtml,
        }),
      });

      if (!res.ok) {
        throw new Error("Audit request failed");
      }

      const data = await res.json();
      setAuditResult(data);
    } catch (err: any) {
      console.error("Audit error:", err);
      // Generate client-side fallback score
      const fallback = computeClientRuleAudit(config);
      setAuditResult(fallback);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!auditResult) {
      runAudit();
    }
  }, [config.appName, config.ageGroup, config.allowsAccountCreation]);

  const result = auditResult || computeClientRuleAudit(config);

  return (
    <div className="space-y-6 text-[#D1D1D1]">
      {/* Top Score Banner */}
      <div className="bg-[#0F0F0F] border border-white/10 rounded-sm p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Score Ring */}
            <div className="relative flex items-center justify-center">
              <div
                className={`w-20 h-20 rounded-sm flex flex-col items-center justify-center font-bold border ${
                  result.score >= 90
                    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                    : result.score >= 70
                    ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                    : "bg-rose-500/10 text-rose-300 border-rose-500/30"
                }`}
              >
                <span className="text-2xl leading-none font-mono">{result.score}</span>
                <span className="text-[10px] text-[#888888] mt-1 uppercase font-semibold">/ 100</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">
                  Google Play Store Legal Audit
                </span>
                {result.aiEnhanced && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[9px] uppercase font-bold tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    <Sparkles className="w-2.5 h-2.5" />
                    Gemini AI Powered
                  </span>
                )}
              </div>
              <h2 className="text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
                Verdict: {result.status || "Compliant"}
              </h2>
              <p className="text-xs text-[#888888] max-w-xl leading-relaxed">
                {result.summary ||
                  "Policy comprehensively covers Google Play Developer Guidelines, GDPR lawful basis, and Data Safety requirements."}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              onClick={runAudit}
              disabled={loading}
              className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider bg-white hover:bg-neutral-200 text-black px-4 py-2.5 rounded-sm shadow-sm transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>{loading ? "Auditing with AI..." : "Re-Scan Policy"}</span>
            </button>
          </div>
        </div>

        {result.googlePlayVerdict && (
          <div className="mt-5 pt-4 border-t border-white/10 text-xs text-[#D1D1D1] flex items-start gap-2.5 bg-[#0A0A0A] p-3.5 rounded-sm border border-white/5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Google Play Review Assessment: </strong>
              {result.googlePlayVerdict}
            </div>
          </div>
        )}
      </div>

      {/* Findings List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white px-1">
          Compliance Checklist Findings ({result.findings?.length || 0})
        </h3>

        <div className="space-y-2.5">
          {result.findings?.map((finding, idx) => {
            const isSuccess = finding.type === "success";
            const isWarning = finding.type === "warning";
            const isDanger = finding.type === "danger";

            return (
              <div
                key={idx}
                className={`p-4 rounded-sm border transition-all ${
                  isSuccess
                    ? "bg-emerald-500/5 border-emerald-500/20"
                    : isWarning
                    ? "bg-amber-500/5 border-amber-500/20"
                    : isDanger
                    ? "bg-rose-500/5 border-rose-500/20"
                    : "bg-[#0F0F0F] border-white/10"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {isWarning && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                    {isDanger && <XCircle className="w-4 h-4 text-rose-400" />}
                    {!isSuccess && !isWarning && !isDanger && (
                      <Info className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-white">{finding.title}</h4>
                    <p className="text-xs text-[#888888] mt-1 leading-relaxed">
                      {finding.description}
                    </p>
                    {finding.recommendation && (
                      <div className="mt-2 text-[11px] text-[#D1D1D1] bg-[#0A0A0A] p-2.5 rounded-sm border border-white/10">
                        <strong className="text-amber-300">Recommendation:</strong>{" "}
                        {finding.recommendation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Suggested Clauses Callout */}
      {result.suggestedCustomClauses && result.suggestedCustomClauses.length > 0 && (
        <div className="p-5 rounded-sm bg-[#0F0F0F] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Recommended Custom Clauses for Your App</span>
            </div>
            <button
              onClick={onOpenClauseModal}
              className="text-xs font-bold uppercase tracking-wider text-amber-300 hover:text-white underline"
            >
              Open Clause Generator &rarr;
            </button>
          </div>
          <ul className="space-y-1.5 text-xs text-[#888888] list-disc pl-5">
            {result.suggestedCustomClauses.map((clauseName, cIdx) => (
              <li key={cIdx}>{clauseName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

function computeClientRuleAudit(config: AppConfig): AuditResult {
  const findings: AuditFinding[] = [];
  let score = 100;

  // Rule 1: Developer Email
  if (!config.contactEmail || !config.contactEmail.includes("@")) {
    score -= 20;
    findings.push({
      type: "danger",
      title: "Missing Official Contact Email",
      description: "Google Play Store requires a valid developer contact email in your privacy policy.",
      recommendation: "Provide a working privacy or support email in the App Identity tab.",
    });
  } else {
    findings.push({
      type: "success",
      title: "Developer Email Disclosure Present",
      description: `Official contact email (${config.contactEmail}) is clearly published.`,
    });
  }

  // Rule 2: Account Deletion URL (Google Play Mandatory since Dec 2023)
  if (config.allowsAccountCreation) {
    if (!config.accountDeletionUrl || !config.accountDeletionUrl.startsWith("http")) {
      score -= 15;
      findings.push({
        type: "danger",
        title: "Account Deletion Web URL Required",
        description: "Google Play Developer Policy mandates a public web URL for account and data deletion requests when user accounts are supported.",
        recommendation: "Provide a public URL (e.g. https://yourdomain.com/delete-account) where users can request data deletion without having the app installed.",
      });
    } else {
      findings.push({
        type: "success",
        title: "Google Play Account Deletion URL Configured",
        description: `Dedicated web erasure link (${config.accountDeletionUrl}) is declared.`,
      });
    }
  }

  // Rule 3: Background Location Justification
  if (config.permissionsUsed.includes("location_background")) {
    if (!config.backgroundLocationPurpose) {
      score -= 10;
      findings.push({
        type: "warning",
        title: "Background Location Justification Needed",
        description: "Google Play audits background location aggressively. You must describe why location tracking is needed when the app is in the background.",
        recommendation: "Add a clear functional justification in the Permissions tab.",
      });
    } else {
      findings.push({
        type: "success",
        title: "Prominent Background Location Disclosure Active",
        description: "Explicit prominent disclosure clause has been injected into the privacy policy.",
      });
    }
  }

  // Rule 4: Children's Privacy / COPPA
  if (config.ageGroup.includes("Children under 13")) {
    if (config.usesTargetedAdvertising) {
      score -= 25;
      findings.push({
        type: "danger",
        title: "Targeted Advertising Incompatible with COPPA / Families Policy",
        description: "Apps directed at children under 13 must not use behavioral advertising identifiers or tracking.",
        recommendation: "Turn off targeted advertising in the Audience & COPPA tab.",
      });
    } else {
      findings.push({
        type: "success",
        title: "COPPA & Google Play Families Policy Compliant",
        description: "Children's privacy protections with zero PII harvesting and safe ads certification are fully configured.",
      });
    }
  }

  // Rule 5: Third-Party SDKs
  if (config.thirdPartyServices.length > 0) {
    findings.push({
      type: "info",
      title: `${config.thirdPartyServices.length} Third-Party SDK Disclosures Included`,
      description: "Direct links to third-party privacy policies (Google Play Services, Firebase, AdMob, etc.) are embedded for user transparency.",
    });
  }

  // Rule 6: Encryption
  if (config.dataEncryptionInTransit) {
    findings.push({
      type: "success",
      title: "Data Encryption in Transit Declared",
      description: "Meets Google Play Data Safety requirement for secure TLS transport.",
    });
  }

  return {
    score: Math.max(score, 40),
    status: score >= 90 ? "Google Play Ready (Pass)" : score >= 75 ? "Needs Minor Adjustments" : "Critical Fixes Required",
    summary:
      score >= 90
        ? "Your Android Privacy Policy meets all core Google Play Developer Program policies, GDPR requirements, and Play Console Data Safety standards."
        : "Some mandatory Google Play Store disclosures require attention before submission.",
    findings,
    googlePlayVerdict:
      score >= 90
        ? "High approval likelihood for Google Play Console submission."
        : "Address warning findings to prevent Play Store review delays.",
    aiEnhanced: false,
  };
}
