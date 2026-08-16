import React, { useState } from "react";
import { AppConfig } from "../types";
import {
  Sparkles,
  X,
  Plus,
  Check,
  BookOpen,
  Bot,
  RefreshCw,
  FileText,
} from "lucide-react";

interface ClauseGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
  onAddClause: (clause: { id: string; title: string; content: string }) => void;
}

const COMMON_TOPICS = [
  {
    topic: "Artificial Intelligence & LLM Data Processing",
    context: "Our app uses Gemini or external AI models to generate text/images. We do not use user inputs to train foundation models.",
  },
  {
    topic: "In-App Subscriptions, Auto-Renewals & Refunds",
    context: "Subscriptions are billed through Google Play Billing. Cancellations must be managed via Google Play Subscriptions center.",
  },
  {
    topic: "User-Generated Content (UGC) & Safety Moderation",
    context: "Users can post media or text. Objectionable content is filtered, and accounts violating terms may be terminated.",
  },
  {
    topic: "Google Health Connect & Sensitive Sensor Telemetry",
    context: "Health and step data read from Health Connect is processed strictly locally for fitness charts and never transferred to ad brokers.",
  },
  {
    topic: "Biometric Authentication (Fingerprint / Face Unlock)",
    context: "Biometric authentication is handled on-device via Android BiometricPrompt API; our servers never receive or store biometric credentials.",
  },
  {
    topic: "Push Notifications & Marketing Opt-Out",
    context: "Push tokens are handled via FCM/OneSignal. Users can opt out anytime from Android notification channels settings.",
  },
];

export const ClauseGeneratorModal: React.FC<ClauseGeneratorModalProps> = ({
  isOpen,
  onClose,
  config,
  onAddClause,
}) => {
  const [selectedTopic, setSelectedTopic] = useState(COMMON_TOPICS[0].topic);
  const [customTopic, setCustomTopic] = useState("");
  const [context, setContext] = useState(COMMON_TOPICS[0].context);
  const [loading, setLoading] = useState(false);
  const [generatedClause, setGeneratedClause] = useState<{
    clauseTitle: string;
    clauseHtml: string;
    keyLegalNotes?: string[];
    aiEnhanced?: boolean;
  } | null>(null);

  if (!isOpen) return null;

  const handleSelectPreset = (item: { topic: string; context: string }) => {
    setSelectedTopic(item.topic);
    setCustomTopic("");
    setContext(item.context);
  };

  const handleGenerate = async () => {
    setLoading(true);
    const activeTopic = customTopic.trim() || selectedTopic;
    try {
      const res = await fetch("/api/generate-clause", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: activeTopic,
          context,
          appName: config.appName || "My Android App",
        }),
      });

      const data = await res.json();
      setGeneratedClause(data);
    } catch (err) {
      console.error("Clause generation error:", err);
      // Fallback
      setGeneratedClause({
        clauseTitle: activeTopic,
        clauseHtml: `<p>We are dedicated to transparent data practices regarding <strong>${activeTopic}</strong>. Any data processed in connection with these features is safeguarded using industry-standard security protocols and is never sold to third-party brokers.</p>`,
        keyLegalNotes: ["Ensures transparent disclosure for Google Play reviewers and end-users."],
        aiEnhanced: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInsert = () => {
    if (!generatedClause) return;
    onAddClause({
      id: "clause_" + Date.now(),
      title: generatedClause.clauseTitle,
      content: generatedClause.clauseHtml,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#0F0F0F] border border-white/10 w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#D1D1D1]">
        {/* Modal Header */}
        <div className="p-4 bg-[#0A0A0A] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white">AI Legal Clause Generator</h3>
              <p className="text-[11px] text-[#888888]">
                Draft app-specific legal provisions tailored for Google Play Store compliance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#888888] hover:text-white p-1 rounded-sm hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Preset Topics */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-2">
              Select a Common Android Clause Template
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {COMMON_TOPICS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(item)}
                  className={`p-3 rounded-sm text-left border transition-all ${
                    selectedTopic === item.topic && !customTopic
                      ? "bg-white/10 border-white text-white font-medium"
                      : "bg-[#0A0A0A] border-white/10 text-[#888888] hover:border-white/20 hover:text-white"
                  }`}
                >
                  <div className="font-semibold text-xs text-white">{item.topic}</div>
                  <div className="text-[11px] text-[#888888] line-clamp-1 mt-0.5">
                    {item.context}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Or Custom Topic */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-1.5">
              Or Custom Topic / Feature
            </label>
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="e.g. NFT &amp; Web3 wallet connections, HIPAA telemedicine compliance..."
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white"
            />
          </div>

          {/* Context Details */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-1.5">
              App Feature Context &amp; Operational Specifics
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={3}
              placeholder="Explain how your feature works, what data is processed, and whether third parties are involved..."
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm p-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white leading-relaxed"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex items-center gap-2 bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-sm transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Drafting with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Clause</span>
                </>
              )}
            </button>
          </div>

          {/* Preview Generated Result */}
          {generatedClause && (
            <div className="p-4 rounded-sm bg-[#0A0A0A] border border-white/10 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-bold text-white text-xs flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-white" />
                  {generatedClause.clauseTitle}
                </span>
                {generatedClause.aiEnhanced && (
                  <span className="text-[9px] uppercase font-bold tracking-wider text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-sm border border-amber-500/20">
                    AI Verified
                  </span>
                )}
              </div>

              <div
                className="text-xs text-[#D1D1D1] leading-relaxed max-h-48 overflow-y-auto space-y-2 font-serif"
                dangerouslySetInnerHTML={{ __html: generatedClause.clauseHtml }}
              />

              {generatedClause.keyLegalNotes && (
                <div className="pt-2 border-t border-white/10 text-[11px] text-[#888888]">
                  <strong className="text-white">Legal Purpose:</strong>{" "}
                  {generatedClause.keyLegalNotes.join(" ")}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0A0A0A] border-t border-white/10 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-[#888888] hover:text-white font-semibold text-xs uppercase tracking-wider px-3 py-1.5"
          >
            Cancel
          </button>

          {generatedClause && (
            <button
              onClick={handleInsert}
              className="flex items-center gap-1.5 bg-white hover:bg-neutral-200 text-black font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-sm transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Attach Clause to Privacy Policy</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
