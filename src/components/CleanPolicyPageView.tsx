import React, { useState } from "react";
import { AppConfig } from "../types";
import { generatePolicyHtml } from "../utils/policyGenerator";
import {
  ShieldCheck,
  Globe2,
  Printer,
  Copy,
  CheckCircle2,
  Download,
  Sliders,
  ExternalLink,
  Lock,
  Smartphone,
  Mail,
  FileCode,
} from "lucide-react";

interface CleanPolicyPageViewProps {
  config: AppConfig;
  onOpenConfig: () => void;
  onDownloadHtml: () => void;
  onCopyHtml: () => void;
  copied: boolean;
}

export const CleanPolicyPageView: React.FC<CleanPolicyPageViewProps> = ({
  config,
  onOpenConfig,
  onDownloadHtml,
  onCopyHtml,
  copied,
}) => {
  const [selectedLang, setSelectedLang] = useState<"ar" | "en" | "bilingual">(
    config.policyLanguage || "bilingual"
  );
  const [copiedLink, setCopiedLink] = useState(false);

  const policyHtml = generatePolicyHtml(config, selectedLang);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (e) {
      console.warn("Clipboard copy failed", e);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand / App Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-sm font-bold text-lg">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                  ترشيد <span className="text-emerald-600 font-semibold">(VoltWise)</span>
                </h1>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Official Privacy Policy
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Google Play Store Compliance &bull; Last Updated: {config.effectiveDate || "2026-08-16"}
              </p>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setSelectedLang("ar")}
              className={`px-3 py-1.5 rounded-md transition-all ${
                selectedLang === "ar"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🇸🇦 العربية
            </button>
            <button
              onClick={() => setSelectedLang("en")}
              className={`px-3 py-1.5 rounded-md transition-all ${
                selectedLang === "en"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🇬🇧 English
            </button>
            <button
              onClick={() => setSelectedLang("bilingual")}
              className={`px-3 py-1.5 rounded-md transition-all hidden md:block ${
                selectedLang === "bilingual"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🌐 ثنائي اللغة
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
              title="طباعة أو تصدير كـ PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PDF / طباعة</span>
            </button>

            <button
              onClick={onOpenConfig}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors"
              title="لوحة التحكم وتعديل البيانات"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">تعديل الإعدادات</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Compliance & Trust Summary Card */}
        <div className="mb-8 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs print:hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">تخزين محلي آمن (Room DB)</h4>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  جميع بيانات الفواتير والأجهزة مخزنة على جهازك فقط دون خوادم سحابية.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">أذونات محددة بدقة</h4>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  استخدام الكاميرا حصرياً لمسح الملصقات والفواتير (OCR) دون حفظ الصور.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">متوافق مع Google Play</h4>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  حذف كامل وسهل للبيانات بضغطة زر أو إعادة تعيين التطبيق.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Paper Document */}
        <article className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-12 shadow-sm">
          <div
            className="prose prose-slate max-w-none
              prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
              prose-h1:text-2xl sm:prose-h1:text-3xl prose-h1:font-extrabold prose-h1:text-slate-950 prose-h1:mb-4
              prose-h2:text-base sm:prose-h2:text-lg prose-h2:font-bold prose-h2:text-slate-900 prose-h2:mt-8 prose-h2:mb-3 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-200
              prose-h3:text-sm prose-h3:font-bold prose-h3:text-slate-800 prose-h3:mt-4 prose-h3:mb-2
              prose-p:text-xs sm:prose-p:text-sm prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-4
              prose-ul:text-xs sm:prose-ul:text-sm prose-ul:text-slate-700 prose-ul:my-3
              prose-li:my-1.5
              prose-a:text-emerald-600 prose-a:underline hover:prose-a:text-emerald-700 prose-a:font-semibold
              prose-code:font-mono prose-code:text-xs prose-code:bg-slate-100 prose-code:text-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-slate-200
              prose-strong:text-slate-950 prose-strong:font-bold"
            dangerouslySetInnerHTML={{ __html: policyHtml }}
          />

          {/* Document Footer */}
          <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>
                للتواصل والاستفسارات:{" "}
                <a
                  href={`mailto:${config.contactEmail || "aabufaisal49@gmail.com"}`}
                  className="text-emerald-600 font-semibold underline"
                >
                  {config.contactEmail || "aabufaisal49@gmail.com"}
                </a>
              </span>
            </div>

            <div className="text-[11px] text-slate-400">
              تطبيق ترشيد (VoltWise) &bull; جميع الحقوق محفوظة {new Date().getFullYear()}
            </div>
          </div>
        </article>

        {/* Action Tools for Developer at bottom */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 print:hidden">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg transition-all shadow-xs"
          >
            {copiedLink ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600">تم نسخ رابط الصفحة!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>نسخ رابط الصفحة لـ Google Play Console</span>
              </>
            )}
          </button>

          <button
            onClick={onDownloadHtml}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-lg transition-all shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>تحميل ملف index.html المستقل</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 print:hidden mt-12">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            📄 سياسة الخصوصية الرسمية لتطبيق <strong>ترشيد (VoltWise)</strong> على Google Play Store
          </p>
          <p className="text-slate-400 text-[11px]">
            تاريخ السريان: {config.effectiveDate || "16 أغسطس 2026"}
          </p>
        </div>
      </footer>
    </div>
  );
};
