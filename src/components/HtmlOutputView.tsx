import React, { useState } from "react";
import { AppConfig } from "../types";
import {
  generatePolicyHtml,
  generateCompleteIndexHtml,
  generateMarkdown,
} from "../utils/policyGenerator";
import {
  Copy,
  Download,
  CheckCircle2,
  Code2,
  FileCode,
  Globe,
  Terminal,
  ExternalLink,
  ChevronRight,
  Info,
} from "lucide-react";

interface HtmlOutputViewProps {
  config: AppConfig;
  onDownloadHtml: () => void;
  onCopyHtml: () => void;
  copied: boolean;
}

export const HtmlOutputView: React.FC<HtmlOutputViewProps> = ({
  config,
  onDownloadHtml,
  onCopyHtml,
  copied,
}) => {
  const [outputFormat, setOutputFormat] = useState<"standalone" | "body" | "markdown">("standalone");
  const [copiedSpecific, setCopiedSpecific] = useState(false);

  const cleanBodyHtml = generatePolicyHtml(config);
  const completeIndexHtml = generateCompleteIndexHtml(config);
  const markdownText = generateMarkdown(config);

  const currentContent =
    outputFormat === "standalone"
      ? completeIndexHtml
      : outputFormat === "body"
      ? cleanBodyHtml
      : markdownText;

  const handleCopyCurrent = async () => {
    try {
      await navigator.clipboard.writeText(currentContent);
      setCopiedSpecific(true);
      setTimeout(() => setCopiedSpecific(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownloadFile = () => {
    const filename = outputFormat === "markdown" ? "PRIVACY_POLICY.md" : "index.html";
    const mimeType = outputFormat === "markdown" ? "text/markdown" : "text/html";
    const blob = new Blob([currentContent], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Vercel 1-Minute Deployment Box */}
      <div className="bg-[#0F0F0F] border border-white/10 rounded-sm p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888]">
                Google Play Store Public URL Mandate
              </span>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Host your Privacy Policy on Vercel for Free in 30 Seconds
            </h3>
            <p className="text-xs text-[#888888] max-w-2xl leading-relaxed">
              Google Play requires a live, publicly accessible website URL for your Privacy Policy. Save this file as <code className="text-white bg-white/10 px-1 py-0.5 rounded-sm font-mono text-[11px]">index.html</code> and deploy it to Vercel with zero server maintenance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadFile}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white hover:bg-neutral-200 text-black px-4 py-2 rounded-sm shadow-sm transition-colors whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 text-black" />
              <span>Download index.html</span>
            </button>
            <a
              href="https://vercel.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-[#141414] hover:bg-[#1E1E1E] text-white border border-white/10 px-3.5 py-2 rounded-sm transition-colors whitespace-nowrap"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#888888]" />
              <span>Open Vercel.com</span>
            </a>
          </div>
        </div>

        {/* Quick Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-5 border-t border-white/5 text-xs">
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-sm bg-white/10 border border-white/20 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
              1
            </span>
            <span className="text-[#888888]">
              Click <strong className="text-white">"Download index.html"</strong> to save the ready standalone file.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-sm bg-white/10 border border-white/20 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
              2
            </span>
            <span className="text-[#888888]">
              Create a new folder or GitHub repo, place <code className="text-white font-mono">index.html</code> inside, and push to Vercel.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-sm bg-white/10 border border-white/20 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
              3
            </span>
            <span className="text-[#888888]">
              Paste your live <code className="text-emerald-400 font-mono text-[11px]">https://your-app.vercel.app</code> URL into Google Play Console!
            </span>
          </div>
        </div>
      </div>

      {/* Code Viewer Box */}
      <div className="bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden shadow-2xl">
        {/* Format Selector Bar */}
        <div className="flex flex-wrap items-center justify-between p-3 bg-[#0F0F0F] border-b border-white/10 gap-2">
          <div className="flex items-center gap-1 bg-[#0A0A0A] p-1 rounded-sm border border-white/10">
            <button
              onClick={() => setOutputFormat("standalone")}
              className={`px-3 py-1 rounded-sm text-[11px] uppercase tracking-wider font-semibold transition-colors ${
                outputFormat === "standalone"
                  ? "bg-white text-black shadow-sm"
                  : "text-[#888888] hover:text-white"
              }`}
            >
              Standalone index.html
            </button>
            <button
              onClick={() => setOutputFormat("body")}
              className={`px-3 py-1 rounded-sm text-[11px] uppercase tracking-wider font-semibold transition-colors ${
                outputFormat === "body"
                  ? "bg-white text-black shadow-sm"
                  : "text-[#888888] hover:text-white"
              }`}
            >
              Body Tags Only
            </button>
            <button
              onClick={() => setOutputFormat("markdown")}
              className={`px-3 py-1 rounded-sm text-[11px] uppercase tracking-wider font-semibold transition-colors ${
                outputFormat === "markdown"
                  ? "bg-white text-black shadow-sm"
                  : "text-[#888888] hover:text-white"
              }`}
            >
              Markdown (.md)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCurrent}
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-[#141414] hover:bg-[#1E1E1E] text-[#D1D1D1] hover:text-white px-3 py-1.5 rounded-sm border border-white/10 transition-colors"
            >
              {copiedSpecific ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#888888]" />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadFile}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white hover:bg-neutral-200 text-black px-3 py-1.5 rounded-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-black" />
              <span>Save File</span>
            </button>
          </div>
        </div>

        {/* Code Content Area */}
        <div className="relative">
          <pre className="p-6 text-xs font-mono text-[#D1D1D1] bg-[#0A0A0A] overflow-x-auto max-h-[600px] leading-relaxed select-all">
            <code>{currentContent}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
