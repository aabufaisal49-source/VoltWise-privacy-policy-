import React from "react";
import { AppConfig } from "../types";
import { generatePolicyHtml } from "../utils/policyGenerator";
import {
  ShieldCheck,
  Lock,
  Smartphone,
  Mail,
  Globe,
} from "lucide-react";

interface CleanPolicyPageViewProps {
  config: AppConfig;
}

export const CleanPolicyPageView: React.FC<CleanPolicyPageViewProps> = ({
  config,
}) => {
  // Always bilingual: Arabic on top, English below
  const policyHtml = generatePolicyHtml(config, "bilingual");

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased">
      {/* Top Header Bar (Read Only) */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs print:hidden">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between gap-3">
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
                  Official Policy
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                حزمة التطبيق: <code className="text-[11px] font-mono">{config.packageName}</code> &bull; تاريخ السريان: {config.effectiveDate}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Document Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-12">
        {/* Bilingual Status Notice */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-100/90 border border-slate-200 text-xs text-slate-700 print:hidden min-w-0">
          <div className="flex items-start sm:items-center gap-2 min-w-0">
            <Globe className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 break-normal">
              <span className="font-bold text-slate-900">
                وثيقة سياسة خصوصية ثنائية اللغة معتمدة:
              </span>
              <span className="text-slate-600">
                النسخة العربية في الأعلى، تليها النسخة الإنجليزية بالأسفل للمتطلبات الدولية لمتاجر التطبيقات.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 text-[11px] font-semibold text-slate-500">
            <span>Bilingual Document</span>
          </div>
        </div>

        {/* Highlight Trust Badges */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs print:hidden">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-900 truncate">تخزين محلي 100% (Room DB)</h4>
              <p className="text-[11px] text-slate-600 mt-1 break-normal">
                بيانات الاستهلاك وفواتير الكهرباء مخزنة على هاتفك فقط دون أي خوادم خارجية.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Smartphone className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-900 truncate">معالجة عابرة للذكاء الاصطناعي</h4>
              <p className="text-[11px] text-slate-600 mt-1 break-normal">
                تحليل فوري عبر Google Gemini API مع حذف الصور المؤقتة فور استخراج النصوص.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-900 truncate">أمان وتحكم كامل</h4>
              <p className="text-[11px] text-slate-600 mt-1 break-normal">
                اتصال مشفر (SSL/TLS)، حماية خصوصية الأطفال، وإمكانية حذف وتصدير البيانات في أي وقت.
              </p>
            </div>
          </div>
        </div>

        {/* The Paper Document */}
        <article className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-10 md:p-14 shadow-sm min-w-0">
          <div
            className="prose prose-slate max-w-none break-normal [word-break:keep-all] [overflow-wrap:break-word] [hyphens:none]
              prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-normal
              prose-h1:text-xl sm:prose-h1:text-2xl md:prose-h1:text-3xl prose-h1:font-extrabold prose-h1:text-slate-950 prose-h1:mb-4 prose-h1:leading-snug
              prose-h2:text-base sm:prose-h2:text-lg prose-h2:font-bold prose-h2:text-slate-900 prose-h2:mt-8 prose-h2:mb-3 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-200
              prose-h3:text-sm sm:prose-h3:text-base prose-h3:font-bold prose-h3:text-slate-800 prose-h3:mt-6 prose-h3:mb-2
              prose-p:text-xs sm:prose-p:text-sm prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-4
              prose-ul:text-xs sm:prose-ul:text-sm prose-ul:text-slate-700 prose-ul:my-3
              prose-li:my-1.5
              prose-a:text-emerald-600 prose-a:underline hover:prose-a:text-emerald-700 prose-a:font-semibold break-all
              prose-code:font-mono prose-code:text-xs prose-code:bg-slate-100 prose-code:text-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-slate-200
              prose-strong:text-slate-950 prose-strong:font-bold"
            dangerouslySetInnerHTML={{ __html: policyHtml }}
          />

          {/* Document Footer */}
          <div className="mt-14 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 gap-4 min-w-0">
            <div className="flex flex-col gap-1 min-w-0 break-words">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  البريد الإلكتروني:{" "}
                  <a
                    href={`mailto:${config.contactEmail || "aabufaisal49@gmail.com"}`}
                    className="text-emerald-600 font-semibold underline break-all sm:break-words"
                  >
                    {config.contactEmail || "aabufaisal49@gmail.com"}
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  الموقع الرسمي للسياسة:{" "}
                  <a
                    href={config.supportWebsite || "https://volt-wise-privacy-policy.vercel.app/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 font-semibold underline break-all sm:break-words"
                  >
                    {config.supportWebsite || "https://volt-wise-privacy-policy.vercel.app/"}
                  </a>
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 shrink-0 text-right">
              {config.appName} &bull; جميع الحقوق محفوظة {new Date().getFullYear()} &bull; All Rights Reserved
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 print:hidden mt-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
          <p className="break-words">
            📄 هذه الصفحة هي الوثيقة الرسمية المعتمدة لسياسة خصوصية تطبيق {config.appName} (ثنائية اللغة).
          </p>
        </div>
      </footer>
    </div>
  );
};
