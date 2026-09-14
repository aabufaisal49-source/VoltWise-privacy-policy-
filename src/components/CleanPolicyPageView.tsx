import React from "react";
import { AppConfig } from "../types";
import { generatePolicyHtml } from "../utils/policyGenerator";
import {
  ShieldCheck,
  Printer,
  Lock,
  Smartphone,
  Mail,
  Download,
  ArrowDown,
  ArrowUp,
  Globe,
} from "lucide-react";

interface CleanPolicyPageViewProps {
  config: AppConfig;
  onOpenBuilder: () => void;
  onDownloadHtml: () => void;
}

export const CleanPolicyPageView: React.FC<CleanPolicyPageViewProps> = ({
  config,
  onOpenBuilder,
  onDownloadHtml,
}) => {
  // Always bilingual: Arabic on top, English below
  const policyHtml = generatePolicyHtml(config, "bilingual");

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (sectionId: "arabic-policy" | "english-policy") => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs print:hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Brand / App Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-xs font-bold text-base">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                  {config.appName}
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Google Play Certified
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                حزمة التطبيق: <code className="text-[11px] font-mono">{config.packageName}</code> &bull; تاريخ السريان: {config.effectiveDate}
              </p>
            </div>
          </div>

          {/* Bilingual Quick Navigation & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Language Jump Controls */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => scrollToSection("arabic-policy")}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md text-slate-800 hover:bg-white hover:shadow-xs transition-all"
                title="الانتقال إلى النسخة العربية في أعلى الصفحة"
              >
                <span>🇸🇦 العربية</span>
                <ArrowUp className="w-3 h-3 text-emerald-600" />
              </button>
              <span className="text-slate-300 font-normal">|</span>
              <button
                onClick={() => scrollToSection("english-policy")}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md text-slate-800 hover:bg-white hover:shadow-xs transition-all"
                title="Jump to the English version below"
              >
                <span>🇬🇧 English</span>
                <ArrowDown className="w-3 h-3 text-blue-600" />
              </button>
            </div>

            {/* Print / Save PDF Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
              title="طباعة أو تصدير كـ PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden md:inline">PDF / طباعة</span>
            </button>

            {/* Download HTML Button */}
            <button
              onClick={onDownloadHtml}
              className="flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
              title="تحميل ملف HTML مستقل ثنائي اللغة"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">تحميل HTML</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Document Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Bilingual Status Notice */}
        <div className="mb-6 flex items-center justify-between p-3.5 rounded-xl bg-slate-100/90 border border-slate-200 text-xs text-slate-700 print:hidden">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-bold text-slate-900">
              وثيقة سياسة خصوصية ثنائية اللغة معتمدة:
            </span>
            <span className="hidden sm:inline text-slate-600">
              النسخة العربية في الأعلى، تليها النسخة الإنجليزية بالأسفل لمتطلبات متجر Google Play.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0 text-[11px] font-semibold text-slate-500">
            <span>Bilingual Document</span>
          </div>
        </div>

        {/* Highlight Trust Badges */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs print:hidden">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">تخزين محلي آمن (Room DB)</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">
                بيانات الاستهلاك والفواتير مخزنة على هاتفك فقط دون أي خوادم خارجية.
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
                استخدام الكاميرا لمسح ملصقات الطاقة والفواتير دون حفظ الصور سحابياً.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">متوافق مع متجر Google Play</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">
                جاهز تماماً لقسم أمان البيانات (Data Safety) وإرشادات الخصوصية الصارمة.
              </p>
            </div>
          </div>
        </div>

        {/* The Paper Document */}
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
                للتواصل والاستفسارات / Contact:{" "}
                <a
                  href={`mailto:${config.contactEmail || "aabufaisal49@gmail.com"}`}
                  className="text-emerald-600 font-semibold underline"
                >
                  {config.contactEmail || "aabufaisal49@gmail.com"}
                </a>
              </span>
            </div>

            <div className="text-[11px] text-slate-400">
              {config.appName} &bull; جميع الحقوق محفوظة {new Date().getFullYear()} &bull; All Rights Reserved
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 print:hidden mt-12">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            📄 هذه الصفحة هي الوثيقة الرسمية المعتمدة لسياسة خصوصية تطبيق {config.appName} لمتجر Google Play Store (ثنائية اللغة دائماً).
          </p>
          <button
            onClick={onOpenBuilder}
            className="text-slate-400 hover:text-slate-700 text-[11px] font-medium transition-colors"
          >
            تعديل بنود السياسة (Builder Mode)
          </button>
        </div>
      </footer>
    </div>
  );
};
