import React, { useState } from "react";
import { AppConfig } from "../types";
import { generatePolicyHtml } from "../utils/policyGenerator";
import {
  Download,
  Copy,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Globe2,
} from "lucide-react";

interface PolicyPreviewProps {
  config: AppConfig;
  onDownloadHtml: () => void;
  onCopyHtml: () => void;
  copied: boolean;
  onSwitchToHtml: () => void;
  onChangeLanguage?: (lang: "ar" | "en" | "bilingual") => void;
}

export const PolicyPreview: React.FC<PolicyPreviewProps> = ({
  config,
  onDownloadHtml,
  onCopyHtml,
  copied,
  onSwitchToHtml,
  onChangeLanguage,
}) => {
  const [activeLang, setActiveLang] = useState<"ar" | "en" | "bilingual">(
    config.policyLanguage || "bilingual"
  );

  const handleLanguageChange = (lang: "ar" | "en" | "bilingual") => {
    setActiveLang(lang);
    if (onChangeLanguage) {
      onChangeLanguage(lang);
    }
  };

  const policyHtml = generatePolicyHtml(config, activeLang);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action Banner */}
      <div className="bg-[#0F0F0F] border border-white/10 rounded-sm p-4 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white">
              وثيقة سياسة الخصوصية &bull; Live Policy Document
            </h3>
            <p className="text-[11px] text-[#888888]">
              Formatted for Google Play Store compliance &bull; Ready for Vercel &amp; Play Console
            </p>
          </div>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-1 bg-[#141414] p-1 rounded-sm border border-white/10">
          <Globe2 className="w-3.5 h-3.5 text-[#888888] mx-1.5" />
          <button
            onClick={() => handleLanguageChange("ar")}
            className={`text-xs px-3 py-1 rounded-sm font-semibold transition-colors ${
              activeLang === "ar"
                ? "bg-white text-black font-bold"
                : "text-[#888888] hover:text-white"
            }`}
          >
            🇸🇦 العربية
          </button>
          <button
            onClick={() => handleLanguageChange("en")}
            className={`text-xs px-3 py-1 rounded-sm font-semibold transition-colors ${
              activeLang === "en"
                ? "bg-white text-black font-bold"
                : "text-[#888888] hover:text-white"
            }`}
          >
            🇬🇧 English
          </button>
          <button
            onClick={() => handleLanguageChange("bilingual")}
            className={`text-xs px-3 py-1 rounded-sm font-semibold transition-colors ${
              activeLang === "bilingual"
                ? "bg-white text-black font-bold"
                : "text-[#888888] hover:text-white"
            }`}
          >
            🌐 ثنائي اللغة (Bilingual)
          </button>
        </div>

        <div className="flex items-center gap-2 w-full lg:w-auto justify-end flex-wrap">
          <button
            onClick={onSwitchToHtml}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-[#141414] hover:bg-[#1E1E1E] text-[#D1D1D1] hover:text-white px-3 py-1.5 rounded-sm border border-white/10 transition-colors"
          >
            <Code2 className="w-3.5 h-3.5 text-[#888888]" />
            <span>Clean HTML</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-[#141414] hover:bg-[#1E1E1E] text-[#D1D1D1] hover:text-white px-3 py-1.5 rounded-sm border border-white/10 transition-colors"
            title="Print or save as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-[#888888]" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>

          <button
            onClick={onCopyHtml}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-[#141414] hover:bg-[#1E1E1E] text-[#D1D1D1] hover:text-white px-3 py-1.5 rounded-sm border border-white/10 transition-colors"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#888888]" />
                <span>Copy HTML</span>
              </>
            )}
          </button>

          <button
            onClick={onDownloadHtml}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white hover:bg-neutral-200 text-black px-3.5 py-1.5 rounded-sm shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-black" />
            <span>Download .html</span>
          </button>
        </div>
      </div>

      {/* Main Document Paper Sheet */}
      <div className="bg-white text-black border border-neutral-200 shadow-2xl rounded-sm p-8 sm:p-14 max-w-4xl mx-auto font-sans leading-relaxed">
        {/* Rendered HTML content */}
        <article
          className="prose prose-neutral max-w-none 
            prose-headings:font-bold prose-headings:text-black prose-headings:tracking-tight
            prose-h2:text-sm prose-h2:font-bold prose-h2:tracking-wider prose-h2:mt-7 prose-h2:mb-2.5 prose-h2:pb-1.5 prose-h2:border-b prose-h2:border-neutral-200
            prose-h3:text-xs prose-h3:font-bold prose-h3:tracking-wide prose-h3:mt-4 prose-h3:mb-1.5 prose-h3:text-neutral-800
            prose-p:text-xs prose-p:text-neutral-700 prose-p:leading-relaxed prose-p:mb-3
            prose-ul:text-xs prose-ul:text-neutral-700 prose-ul:my-2.5
            prose-li:my-1
            prose-a:text-blue-600 prose-a:underline prose-a:font-semibold hover:prose-a:text-blue-800
            prose-code:font-mono prose-code:text-[11px] prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-black prose-code:border prose-code:border-neutral-200
            prose-strong:text-black prose-strong:font-bold"
          dangerouslySetInnerHTML={{ __html: policyHtml }}
        />

        <div className="mt-12 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-2">
          <div>
            &copy; {new Date().getFullYear()} {config.developerName || "إدارة تطبيق ترشيد (VoltWise Team)"}. Google Play Store Compliance.
          </div>
          <div className="font-mono text-[10px] text-neutral-400">
            Doc ID: PG-{Math.abs((config.packageName || "voltwise").split("").reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)).toString(16).toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};
