import React from "react";
import { X, Globe, ExternalLink, Download, CheckCircle2, ArrowRight } from "lucide-react";

interface VercelDeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadHtml: () => void;
}

export const VercelDeployGuideModal: React.FC<VercelDeployGuideModalProps> = ({
  isOpen,
  onClose,
  onDownloadHtml,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#0F0F0F] border border-white/10 w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden flex flex-col text-[#D1D1D1] max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-[#0A0A0A] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white">Vercel &amp; Google Play Deployment Guide</h3>
              <p className="text-[11px] text-[#888888]">
                How to get a 100% free live HTTPS URL for Google Play Console in 3 steps
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#D1D1D1]">
          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <div className="w-6 h-6 rounded-sm bg-white/10 border border-white/20 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 font-mono">
              1
            </div>
            <div className="space-y-1.5 flex-1">
              <h4 className="font-bold text-white text-xs uppercase tracking-wide">Download your standalone index.html</h4>
              <p className="text-[#888888] leading-relaxed">
                Click the button below to download the single, self-contained HTML file containing your entire Privacy Policy and responsive styling.
              </p>
              <button
                onClick={onDownloadHtml}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-neutral-200 text-black font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-sm text-xs transition-colors mt-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download index.html</span>
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <div className="w-6 h-6 rounded-sm bg-white/10 border border-white/20 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 font-mono">
              2
            </div>
            <div className="space-y-1.5 flex-1">
              <h4 className="font-bold text-white text-xs uppercase tracking-wide">Deploy to Vercel (Free &amp; Instant)</h4>
              <p className="text-[#888888] leading-relaxed">
                You can host this file in seconds with no credit card required:
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-[#D1D1D1]">
                <li>Create a free account at <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-white underline font-semibold">Vercel.com</a>.</li>
                <li>Create a GitHub repository containing just <code className="text-white bg-[#0A0A0A] border border-white/10 px-1 py-0.5 rounded-sm">index.html</code> (or use Vercel CLI <code className="text-white bg-[#0A0A0A] border border-white/10 px-1 py-0.5 rounded-sm">vercel deploy</code>).</li>
                <li>Import the project in Vercel. It will automatically detect static HTML and publish it to an instant domain like <code className="text-emerald-400 font-mono">https://your-app-privacy.vercel.app</code>.</li>
              </ol>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4">
            <div className="w-6 h-6 rounded-sm bg-white/10 border border-white/20 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 font-mono">
              3
            </div>
            <div className="space-y-1.5 flex-1">
              <h4 className="font-bold text-white text-xs uppercase tracking-wide">Add to Google Play Console</h4>
              <p className="text-[#888888] leading-relaxed">
                Copy your live Vercel URL and paste it into Google Play Console in two places:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[#D1D1D1]">
                <li><strong>Main Store Listing &gt; Privacy Policy URL:</strong> Allows users in the Play Store app to read your policy before installing.</li>
                <li><strong>App Content &gt; Privacy Policy:</strong> Mandatory requirement for app review and Data Safety questionnaire validation.</li>
              </ul>
            </div>
          </div>

          {/* Alternative hosting note */}
          <div className="p-3.5 rounded-sm bg-[#0A0A0A] border border-white/10 text-[#888888]">
            <strong className="text-white">Alternative Free Hosts:</strong> This exact <code className="text-white">index.html</code> file also works out-of-the-box on GitHub Pages, Netlify, Firebase Hosting, Cloudflare Pages, or AWS S3.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0A0A0A] border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="bg-white hover:bg-neutral-200 text-black font-bold uppercase tracking-wider px-4 py-2 rounded-sm text-xs transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
