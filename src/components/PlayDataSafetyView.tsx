import React from "react";
import { AppConfig } from "../types";
import { generatePlayDataSafetyReport } from "../utils/dataSafetyGenerator";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  Lock,
  Share2,
  Trash2,
  Info,
} from "lucide-react";

interface PlayDataSafetyViewProps {
  config: AppConfig;
}

export const PlayDataSafetyView: React.FC<PlayDataSafetyViewProps> = ({ config }) => {
  const report = generatePlayDataSafetyReport(config);

  return (
    <div className="space-y-6 text-[#D1D1D1]">
      {/* Header Info */}
      <div className="bg-[#0F0F0F] border border-white/10 rounded-sm p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] bg-white/10 text-white border border-white/20">
                Play Console Companion
              </span>
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Google Play Console: Data Safety Form Responses
            </h2>
            <p className="text-xs text-[#888888] max-w-2xl">
              When submitting or updating your app in Google Play Console (under <em>Policy &amp; Programs &gt; App Content &gt; Data safety</em>), complete the questionnaire using these responses.
            </p>
          </div>

          <a
            href="https://play.google.com/console"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white hover:bg-neutral-200 text-black px-4 py-2 rounded-sm transition-colors whitespace-nowrap"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Play Console</span>
          </a>
        </div>
      </div>

      {/* Primary Questionnaire Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {report.questions.map((q, idx) => (
          <div
            key={idx}
            className="bg-[#0F0F0F] border border-white/10 rounded-sm p-5 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888]">
                Console Question {idx + 1}
              </span>
              <h4 className="text-xs font-semibold text-white leading-snug">{q.question}</h4>
              <div className="pt-1">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs font-semibold ${
                    q.status === "yes"
                      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                      : q.status === "no"
                      ? "bg-white/5 text-[#D1D1D1] border border-white/10"
                      : "bg-amber-500/10 text-amber-300 border border-amber-500/30"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Your Answer: {q.answer}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-[#888888] mt-3 pt-3 border-t border-white/5">
              {q.details}
            </p>
          </div>
        ))}
      </div>

      {/* Specific Data Types Breakdown Table */}
      <div className="bg-[#0F0F0F] border border-white/10 rounded-sm overflow-hidden shadow-2xl">
        <div className="p-4 bg-[#141414] border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Data Types to Declare ({report.declaredDataTypes.length})
            </h3>
            <p className="text-[11px] text-[#888888]">
              Exact category selections matching Google Play's taxonomy.
            </p>
          </div>
          {report.declaredDataTypes.length === 0 && (
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded-sm border border-emerald-500/20">
              Zero Data Collection
            </span>
          )}
        </div>

        {report.declaredDataTypes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0A0A0A] text-[#888888] border-b border-white/10 uppercase text-[10px] tracking-[0.15em]">
                <tr>
                  <th className="p-3.5">Google Play Data Type</th>
                  <th className="p-3.5">Collected?</th>
                  <th className="p-3.5">Shared with 3rd Parties?</th>
                  <th className="p-3.5">Declared Purposes</th>
                  <th className="p-3.5">Ephemeral / Optional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#D1D1D1]">
                {report.declaredDataTypes.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-medium text-white">
                      <div>{item.name}</div>
                      <div className="text-[10px] font-mono text-[#888888] mt-0.5">
                        {item.dataType}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px] uppercase font-bold tracking-wider">
                        Yes
                      </span>
                    </td>
                    <td className="p-3.5">
                      {item.shared ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] uppercase font-bold tracking-wider">
                          Yes (Ad/Analytics)
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-white/5 text-[#888888] text-[10px] uppercase font-bold tracking-wider">
                          No (Internal)
                        </span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1">
                        {item.purposes.map((p, pIdx) => (
                          <span
                            key={pIdx}
                            className="px-2 py-0.5 rounded-sm bg-[#141414] text-[#D1D1D1] text-[10px] border border-white/10"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3.5 text-[#888888] text-[11px]">
                      {item.optional ? "Optional (User controls)" : "Required for feature"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-[#888888] text-xs">
            No data types collected. In the Play Console Data Safety questionnaire, answer <strong className="text-white">"No"</strong> to whether your app collects or shares user data.
          </div>
        )}
      </div>

      {/* Account Deletion Link Callout */}
      {config.allowsAccountCreation && (
        <div className="p-4 rounded-sm bg-[#0F0F0F] border border-white/10 flex items-start gap-3 text-xs text-[#D1D1D1]">
          <Info className="w-4 h-4 text-white shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-xs uppercase tracking-wider text-white block">
              Google Play Account Deletion URL Requirement
            </span>
            <p className="text-[#888888]">
              In Play Console, under <em>Data deletion URL</em>, provide:{" "}
              <code className="text-white font-mono bg-[#0A0A0A] px-1.5 py-0.5 rounded-sm border border-white/10">
                {config.accountDeletionUrl || "https://yourdomain.com/delete-account"}
              </code>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
