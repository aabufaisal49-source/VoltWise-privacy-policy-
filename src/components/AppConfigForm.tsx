import React, { useState } from "react";
import {
  AppConfig,
  AppType,
  AgeGroup,
} from "../types";
import {
  DATA_ITEMS,
  PERMISSION_ITEMS,
  THIRD_PARTY_SERVICES,
} from "../data/constants";
import {
  Smartphone,
  Shield,
  Key,
  Users,
  Building,
  Server,
  AlertTriangle,
  Plus,
  Trash2,
  Check,
  HelpCircle,
  Lock,
  Globe,
  Sparkles,
  Info,
} from "lucide-react";

interface AppConfigFormProps {
  config: AppConfig;
  onChange: (newConfig: AppConfig) => void;
  onOpenClauseModal: () => void;
}

const APP_TYPES: AppType[] = [
  "Game",
  "Productivity",
  "Social Media",
  "E-Commerce & Shopping",
  "Health & Fitness",
  "Utility & Tools",
  "Education & Learning",
  "Entertainment & Streaming",
  "Finance & FinTech",
  "Navigation & Travel",
  "Lifestyle & Dating",
  "News & Magazines",
  "Other",
];

const AGE_GROUPS: AgeGroup[] = [
  "Everyone (General Audience)",
  "Children under 13 (COPPA & Families Policy Strict)",
  "Mixed Audience (Families Policy with Age Gate)",
  "Teens (13-17)",
  "Adults Only (18+)",
];

export const AppConfigForm: React.FC<AppConfigFormProps> = ({
  config,
  onChange,
  onOpenClauseModal,
}) => {
  const [activeSection, setActiveSection] = useState<
    "general" | "data" | "permissions" | "thirdparty" | "audience" | "retention" | "regional"
  >("general");

  const [newCustomData, setNewCustomData] = useState("");
  const [customSdkName, setCustomSdkName] = useState("");
  const [customSdkUrl, setCustomSdkUrl] = useState("");
  const [customSdkPurpose, setCustomSdkPurpose] = useState("");

  const updateField = <K extends keyof AppConfig>(field: K, value: AppConfig[K]) => {
    onChange({ ...config, [field]: value });
  };

  const toggleDataCollection = (id: string) => {
    const current = [...config.personalDataCollected];
    const exists = current.includes(id);
    const updated = exists ? current.filter((item) => item !== id) : [...current, id];
    onChange({
      ...config,
      personalDataCollected: updated,
      collectsNoData: updated.length === 0,
    });
  };

  const togglePermission = (id: string) => {
    const current = [...config.permissionsUsed];
    const exists = current.includes(id);
    const updated = exists ? current.filter((item) => item !== id) : [...current, id];
    onChange({
      ...config,
      permissionsUsed: updated,
      backgroundLocationUsed: updated.includes("location_background") ? config.backgroundLocationUsed : false,
    });
  };

  const toggleThirdParty = (id: string) => {
    const current = [...config.thirdPartyServices];
    const exists = current.includes(id);
    const updated = exists ? current.filter((item) => item !== id) : [...current, id];
    onChange({
      ...config,
      thirdPartyServices: updated,
    });
  };

  const handleAddCustomData = () => {
    if (!newCustomData.trim()) return;
    const updated = [...(config.customDataCollected || []), newCustomData.trim()];
    onChange({ ...config, customDataCollected: updated, collectsNoData: false });
    setNewCustomData("");
  };

  const handleRemoveCustomData = (index: number) => {
    const updated = [...(config.customDataCollected || [])];
    updated.splice(index, 1);
    onChange({ ...config, customDataCollected: updated });
  };

  const handleAddCustomSdk = () => {
    if (!customSdkName.trim()) return;
    const updated = [
      ...(config.customThirdParties || []),
      {
        name: customSdkName.trim(),
        url: customSdkUrl.trim(),
        purpose: customSdkPurpose.trim() || "Third-party service integration",
      },
    ];
    onChange({ ...config, customThirdParties: updated });
    setCustomSdkName("");
    setCustomSdkUrl("");
    setCustomSdkPurpose("");
  };

  const handleRemoveCustomSdk = (index: number) => {
    const updated = [...(config.customThirdParties || [])];
    updated.splice(index, 1);
    onChange({ ...config, customThirdParties: updated });
  };

  const handleRemoveClause = (id: string) => {
    onChange({
      ...config,
      customClauses: config.customClauses.filter((c) => c.id !== id),
    });
  };

  return (
    <div className="bg-[#0F0F0F] border border-white/10 rounded-sm shadow-2xl overflow-hidden text-[#D1D1D1]">
      {/* Subnav headers */}
      <div className="flex border-b border-white/10 bg-[#0A0A0A] overflow-x-auto text-[11px] font-semibold tracking-wider uppercase">
        <button
          onClick={() => setActiveSection("general")}
          className={`flex items-center gap-2 px-4 py-3.5 border-b-2 whitespace-nowrap transition-colors ${
            activeSection === "general"
              ? "border-white text-white bg-white/5"
              : "border-transparent text-[#888888] hover:text-white"
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          1. App Identity
        </button>
        <button
          onClick={() => setActiveSection("data")}
          className={`flex items-center gap-2 px-4 py-3.5 border-b-2 whitespace-nowrap transition-colors ${
            activeSection === "data"
              ? "border-white text-white bg-white/5"
              : "border-transparent text-[#888888] hover:text-white"
          }`}
        >
          <Server className="w-3.5 h-3.5" />
          2. Data Collected ({config.collectsNoData ? "0" : config.personalDataCollected.length})
        </button>
        <button
          onClick={() => setActiveSection("permissions")}
          className={`flex items-center gap-2 px-4 py-3.5 border-b-2 whitespace-nowrap transition-colors ${
            activeSection === "permissions"
              ? "border-white text-white bg-white/5"
              : "border-transparent text-[#888888] hover:text-white"
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          3. Permissions ({config.permissionsUsed.length})
        </button>
        <button
          onClick={() => setActiveSection("thirdparty")}
          className={`flex items-center gap-2 px-4 py-3.5 border-b-2 whitespace-nowrap transition-colors ${
            activeSection === "thirdparty"
              ? "border-white text-white bg-white/5"
              : "border-transparent text-[#888888] hover:text-white"
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          4. SDKs &amp; Ads ({config.thirdPartyServices.length})
        </button>
        <button
          onClick={() => setActiveSection("audience")}
          className={`flex items-center gap-2 px-4 py-3.5 border-b-2 whitespace-nowrap transition-colors ${
            activeSection === "audience"
              ? "border-white text-white bg-white/5"
              : "border-transparent text-[#888888] hover:text-white"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          5. Audience &amp; COPPA
        </button>
        <button
          onClick={() => setActiveSection("retention")}
          className={`flex items-center gap-2 px-4 py-3.5 border-b-2 whitespace-nowrap transition-colors ${
            activeSection === "retention"
              ? "border-white text-white bg-white/5"
              : "border-transparent text-[#888888] hover:text-white"
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          6. Account Deletion
        </button>
        <button
          onClick={() => setActiveSection("regional")}
          className={`flex items-center gap-2 px-4 py-3.5 border-b-2 whitespace-nowrap transition-colors ${
            activeSection === "regional"
              ? "border-white text-white bg-white/5"
              : "border-transparent text-[#888888] hover:text-white"
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          7. GDPR / CCPA / Custom
        </button>
      </div>

      {/* Content Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* SECTION 1: APP IDENTITY */}
        {activeSection === "general" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white flex items-center gap-2">
                <Smartphone className="w-3.5 h-3.5 text-white" />
                App &amp; Developer Details
              </h3>
              <p className="text-xs text-[#888888] mt-1">
                Enter your Android app identifiers and official contact details. Google Play Console requires clear developer email identification.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-1.5">
                  App Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={config.appName}
                  onChange={(e) => updateField("appName", e.target.value)}
                  placeholder="e.g. Pixel Runner 3D"
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-1.5">
                  App Type / Category <span className="text-rose-400">*</span>
                </label>
                <select
                  value={config.appType}
                  onChange={(e) => updateField("appType", e.target.value as AppType)}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white transition-colors"
                >
                  {APP_TYPES.map((type) => (
                    <option key={type} value={type} className="bg-[#0F0F0F] text-white">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-1.5">
                  Android Package Name (Application ID)
                </label>
                <input
                  type="text"
                  value={config.packageName}
                  onChange={(e) => updateField("packageName", e.target.value)}
                  placeholder="com.company.myapp"
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs font-mono text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors"
                />
                <p className="text-[11px] text-[#666666] mt-1">Useful for referencing your Play Store listing.</p>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-1.5">
                  Developer / Company Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={config.developerName}
                  onChange={(e) => updateField("developerName", e.target.value)}
                  placeholder="e.g. Apex Software LLC"
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-1.5">
                  Official Privacy / Support Email <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  value={config.contactEmail}
                  onChange={(e) => updateField("contactEmail", e.target.value)}
                  placeholder="privacy@yourcompany.com"
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors"
                />
                <p className="text-[11px] text-[#666666] mt-1">
                  Users and Google review teams will send inquiries to this email.
                </p>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-1.5">
                  Website / Support Portal URL
                </label>
                <input
                  type="url"
                  value={config.supportWebsite}
                  onChange={(e) => updateField("supportWebsite", e.target.value)}
                  placeholder="https://yourcompany.com/support"
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-1.5">
                  Developer Address / Legal Jurisdiction
                </label>
                <input
                  type="text"
                  value={config.developerAddress}
                  onChange={(e) => updateField("developerAddress", e.target.value)}
                  placeholder="e.g. London, United Kingdom or Delaware, USA"
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-1.5">
                  Policy Language / لغة الوثيقة
                </label>
                <select
                  value={config.policyLanguage || "bilingual"}
                  onChange={(e) => updateField("policyLanguage", e.target.value as "en" | "ar" | "bilingual")}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white transition-colors"
                >
                  <option value="bilingual" className="bg-[#0F0F0F] text-white">
                    🌐 ثنائي اللغة (العربية &amp; English) - Recommended
                  </option>
                  <option value="ar" className="bg-[#0F0F0F] text-white">
                    🇸🇦 العربية فقط (Arabic Only)
                  </option>
                  <option value="en" className="bg-[#0F0F0F] text-white">
                    🇬🇧 English Only
                  </option>
                </select>
                <p className="text-[11px] text-[#666666] mt-1">
                  اختر لغة إنشاء سياسة الخصوصية لمتجر Google Play وتطبيق ترشيد.
                </p>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-1.5">
                  Effective / Last Updated Date
                </label>
                <input
                  type="date"
                  value={config.effectiveDate}
                  onChange={(e) => updateField("effectiveDate", e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white transition-colors"
                />
                <p className="text-[11px] text-[#666666] mt-1">
                  Sets the date placeholder in both the header and the dedicated "Last Updated" section of your Privacy Policy.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => setActiveSection("data")}
                className="bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-sm transition-colors shadow-sm"
              >
                Next: Data Collection &rarr;
              </button>
            </div>
          </div>
        )}

        {/* SECTION 2: PERSONAL DATA COLLECTED */}
        {activeSection === "data" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white flex items-center gap-2">
                  <Server className="w-3.5 h-3.5 text-white" />
                  Personal Data Collected &amp; Processed
                </h3>
                <p className="text-xs text-[#888888] mt-1">
                  Select all user data types your app or its bundled SDKs (e.g. Firebase, AdMob) collect.
                </p>
              </div>

              {/* Zero data collection toggle */}
              <label className="inline-flex items-center gap-2 cursor-pointer bg-[#0A0A0A] px-3.5 py-2 rounded-sm border border-white/10 text-xs">
                <input
                  type="checkbox"
                  checked={config.collectsNoData}
                  onChange={(e) => {
                    const noData = e.target.checked;
                    onChange({
                      ...config,
                      collectsNoData: noData,
                      personalDataCollected: noData ? [] : ["email", "device_id"],
                    });
                  }}
                  className="rounded-sm border-white/20 text-white focus:ring-0"
                />
                <span className="font-semibold text-white text-xs">My App Collects Zero Data (Pure Offline)</span>
              </label>
            </div>

            {!config.collectsNoData ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {DATA_ITEMS.map((item) => {
                    const isSelected = config.personalDataCollected.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleDataCollection(item.id)}
                        className={`p-3.5 rounded-sm border cursor-pointer transition-all ${
                          isSelected
                            ? "bg-white/10 border-white text-white"
                            : "bg-[#0A0A0A] border-white/10 hover:border-white/20 text-[#D1D1D1]"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-4 h-4 rounded-sm flex items-center justify-center mt-0.5 text-[10px] font-bold ${
                              isSelected
                                ? "bg-white text-black"
                                : "border border-white/30 text-transparent"
                            }`}
                          >
                            <Check className="w-3 h-3" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-white">{item.name}</span>
                              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-white/5 border border-white/10 text-[#888888]">
                                {item.category}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#888888] mt-1 leading-relaxed">
                              {item.description}
                            </p>
                            <p className="text-[10px] text-white/60 font-mono mt-1">
                              Play Console: {item.playStoreDataType}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Custom data items */}
                <div className="bg-[#0A0A0A] border border-white/10 p-4 rounded-sm space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888]">
                    Add Custom App-Specific Data Item (Optional)
                  </h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCustomData}
                      onChange={(e) => setNewCustomData(e.target.value)}
                      placeholder="e.g. In-game player inventory, customized avatar preferences..."
                      className="flex-1 bg-[#0F0F0F] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddCustomData();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomData}
                      className="flex items-center gap-1 bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-sm transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add
                    </button>
                  </div>

                  {config.customDataCollected && config.customDataCollected.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {config.customDataCollected.map((custom, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-white/10 border border-white/20 text-white text-xs"
                        >
                          {custom}
                          <button
                            type="button"
                            onClick={() => handleRemoveCustomData(idx)}
                            className="hover:text-rose-400"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Security and encryption switches */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <label className="flex items-start gap-3 p-3.5 rounded-sm bg-[#0A0A0A] border border-white/10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.dataEncryptionInTransit}
                      onChange={(e) => updateField("dataEncryptionInTransit", e.target.checked)}
                      className="mt-0.5 rounded-sm border-white/20 text-white focus:ring-0"
                    />
                    <div>
                      <span className="text-xs font-semibold text-white block">
                        Encryption in Transit (HTTPS / TLS)
                      </span>
                      <span className="text-[11px] text-[#888888]">
                        Required for Google Play Store Data Safety approval.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 rounded-sm bg-[#0A0A0A] border border-white/10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.dataEncryptedAtRest}
                      onChange={(e) => updateField("dataEncryptedAtRest", e.target.checked)}
                      className="mt-0.5 rounded-sm border-white/20 text-white focus:ring-0"
                    />
                    <div>
                      <span className="text-xs font-semibold text-white block">
                        Encryption at Rest (AES-256)
                      </span>
                      <span className="text-[11px] text-[#888888]">
                        Databases and cloud storage buckets are cryptographically secured.
                      </span>
                    </div>
                  </label>
                </div>
              </>
            ) : (
              <div className="p-8 text-center bg-[#0A0A0A] border border-white/10 rounded-sm space-y-2">
                <Shield className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-semibold text-white">Zero Data Collection Declared</h4>
                <p className="text-xs text-[#888888] max-w-md mx-auto">
                  Your Privacy Policy will explicitly certify that the app works strictly on-device without remote data logging, analytics tracking, or account requirements.
                </p>
              </div>
            )}

            <div className="flex justify-between pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => setActiveSection("general")}
                className="text-[#888888] hover:text-white text-xs font-semibold uppercase tracking-wider px-3 py-2"
              >
                &larr; Back
              </button>
              <button
                type="button"
                onClick={() => setActiveSection("permissions")}
                className="bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-sm transition-colors shadow-sm"
              >
                Next: Device Permissions &rarr;
              </button>
            </div>
          </div>
        )}

        {/* SECTION 3: DEVICE PERMISSIONS */}
        {activeSection === "permissions" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white flex items-center gap-2">
                <Key className="w-3.5 h-3.5 text-white" />
                Android Runtime Permissions &amp; Hardware Access
              </h3>
              <p className="text-xs text-[#888888] mt-1">
                Select sensitive Android permissions declared in your <code>AndroidManifest.xml</code>. Google Play strictly audits these for prominent disclosure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PERMISSION_ITEMS.map((item) => {
                const isSelected = config.permissionsUsed.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => togglePermission(item.id)}
                    className={`p-3.5 rounded-sm border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-white/10 border-white text-white"
                        : "bg-[#0A0A0A] border-white/10 hover:border-white/20 text-[#D1D1D1]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-4 h-4 rounded-sm flex items-center justify-center mt-0.5 text-[10px] font-bold ${
                          isSelected
                            ? "bg-white text-black"
                            : "border border-white/30 text-transparent"
                        }`}
                      >
                        <Check className="w-3 h-3" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-white">{item.displayName}</span>
                          {item.playStoreRequiresDeclaration && (
                            <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-amber-500/10 text-amber-300 border border-amber-500/20">
                              Sensitive Play Declaration
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-mono text-[#888888] mt-0.5">
                          {item.permissionName}
                        </p>
                        <p className="text-[11px] text-[#888888] mt-1">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Background location prominent disclosure helper */}
            {config.permissionsUsed.includes("location_background") && (
              <div className="p-4 rounded-sm bg-amber-500/5 border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold uppercase tracking-wider text-xs">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Google Play Mandatory: Background Location Justification</span>
                </div>
                <p className="text-xs text-[#888888] leading-relaxed">
                  Google Play requires a dedicated prominent in-app disclosure and policy statement explaining why background location is essential to user-facing features:
                </p>
                <textarea
                  value={config.backgroundLocationPurpose}
                  onChange={(e) => updateField("backgroundLocationPurpose", e.target.value)}
                  placeholder="e.g. Tracking running routes when screen is locked, automated geofence alerts for safety..."
                  rows={2}
                  className="w-full bg-[#0A0A0A] border border-amber-500/30 rounded-sm p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            )}

            <div className="flex justify-between pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => setActiveSection("data")}
                className="text-[#888888] hover:text-white text-xs font-semibold uppercase tracking-wider px-3 py-2"
              >
                &larr; Back
              </button>
              <button
                type="button"
                onClick={() => setActiveSection("thirdparty")}
                className="bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-sm transition-colors shadow-sm"
              >
                Next: Third-Party SDKs &rarr;
              </button>
            </div>
          </div>
        )}

        {/* SECTION 4: THIRD PARTY SDKS */}
        {activeSection === "thirdparty" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-white" />
                Third-Party SDKs, Ads &amp; Analytics
              </h3>
              <p className="text-xs text-[#888888] mt-1">
                Google Play requires full disclosure of all third-party SDKs that collect or transmit device data.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {THIRD_PARTY_SERVICES.map((svc) => {
                const isSelected = config.thirdPartyServices.includes(svc.id);
                return (
                  <div
                    key={svc.id}
                    onClick={() => toggleThirdParty(svc.id)}
                    className={`p-3.5 rounded-sm border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-white/10 border-white text-white"
                        : "bg-[#0A0A0A] border-white/10 hover:border-white/20 text-[#D1D1D1]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-4 h-4 rounded-sm flex items-center justify-center mt-0.5 text-[10px] font-bold ${
                          isSelected
                            ? "bg-white text-black"
                            : "border border-white/30 text-transparent"
                        }`}
                      >
                        <Check className="w-3 h-3" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-white">{svc.name}</span>
                          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-white/5 border border-white/10 text-[#888888]">
                            {svc.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#888888] mt-1">{svc.description}</p>
                        <p className="text-[10px] text-white/50 mt-1 truncate">
                          Policy: {svc.privacyPolicyUrl}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom SDK addition */}
            <div className="bg-[#0A0A0A] border border-white/10 p-4 rounded-sm space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888]">
                Add Custom Third-Party Service / SDK
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={customSdkName}
                  onChange={(e) => setCustomSdkName(e.target.value)}
                  placeholder="SDK Name (e.g. Mixpanel)"
                  className="bg-[#0F0F0F] border border-white/10 rounded-sm px-3 py-2 text-xs text-white"
                />
                <input
                  type="url"
                  value={customSdkUrl}
                  onChange={(e) => setCustomSdkUrl(e.target.value)}
                  placeholder="Privacy Policy URL"
                  className="bg-[#0F0F0F] border border-white/10 rounded-sm px-3 py-2 text-xs text-white"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customSdkPurpose}
                    onChange={(e) => setCustomSdkPurpose(e.target.value)}
                    placeholder="Purpose (e.g. Product Analytics)"
                    className="flex-1 bg-[#0F0F0F] border border-white/10 rounded-sm px-3 py-2 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomSdk}
                    className="bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-sm"
                  >
                    Add
                  </button>
                </div>
              </div>

              {config.customThirdParties && config.customThirdParties.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  {config.customThirdParties.map((sdk, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-sm bg-[#0F0F0F] border border-white/10 text-xs"
                    >
                      <div>
                        <span className="font-semibold text-white">{sdk.name}</span>{" "}
                        <span className="text-[#888888]">({sdk.purpose})</span>
                        {sdk.url && (
                          <span className="text-[11px] text-white/50 block truncate max-w-sm">
                            {sdk.url}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomSdk(idx)}
                        className="text-[#888888] hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => setActiveSection("permissions")}
                className="text-[#888888] hover:text-white text-xs font-semibold uppercase tracking-wider px-3 py-2"
              >
                &larr; Back
              </button>
              <button
                type="button"
                onClick={() => setActiveSection("audience")}
                className="bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-sm transition-colors shadow-sm"
              >
                Next: Audience &amp; COPPA &rarr;
              </button>
            </div>
          </div>
        )}

        {/* SECTION 5: AUDIENCE & COPPA */}
        {activeSection === "audience" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-white" />
                Target Audience &amp; Children's Privacy (COPPA)
              </h3>
              <p className="text-xs text-[#888888] mt-1">
                Google Play has strict Families Policy requirements if children are part of your target demographic.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-1.5">
                  Target Audience Age Group <span className="text-rose-400">*</span>
                </label>
                <select
                  value={config.ageGroup}
                  onChange={(e) => updateField("ageGroup", e.target.value as AgeGroup)}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white transition-colors"
                >
                  {AGE_GROUPS.map((grp) => (
                    <option key={grp} value={grp} className="bg-[#0F0F0F] text-white">
                      {grp}
                    </option>
                  ))}
                </select>
              </div>

              {config.ageGroup.includes("Children under 13") && (
                <div className="p-4 rounded-sm bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold uppercase tracking-wider text-xs">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Google Play Families Policy Compliance Mode Activated</span>
                  </div>
                  <p className="text-xs text-[#888888] leading-relaxed">
                    Under Google Play's Families Policy, your app must not collect advertising IDs (GAID), must not serve personalized/behavioral ads, and must only use Google Play Self-Certified SDKs.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <label className="flex items-start gap-3 p-3.5 rounded-sm bg-[#0A0A0A] border border-white/10 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.containsAds}
                    onChange={(e) => updateField("containsAds", e.target.checked)}
                    className="mt-0.5 rounded-sm border-white/20 text-white focus:ring-0"
                  />
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      App Contains Advertisements
                    </span>
                    <span className="text-[11px] text-[#888888]">
                      Discloses banner, interstitial, or rewarded video ads.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded-sm bg-[#0A0A0A] border border-white/10 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.usesTargetedAdvertising}
                    onChange={(e) => updateField("usesTargetedAdvertising", e.target.checked)}
                    disabled={config.ageGroup.includes("Children")}
                    className="mt-0.5 rounded-sm border-white/20 text-white focus:ring-0 disabled:opacity-30"
                  />
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      Interest-Based / Targeted Advertising
                    </span>
                    <span className="text-[11px] text-[#888888]">
                      Uses GAID for personalized user targeting (Disabled for Children under 13).
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => setActiveSection("thirdparty")}
                className="text-[#888888] hover:text-white text-xs font-semibold uppercase tracking-wider px-3 py-2"
              >
                &larr; Back
              </button>
              <button
                type="button"
                onClick={() => setActiveSection("retention")}
                className="bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-sm transition-colors shadow-sm"
              >
                Next: Account Deletion &rarr;
              </button>
            </div>
          </div>
        )}

        {/* SECTION 6: ACCOUNT DELETION & DATA RETENTION */}
        {activeSection === "retention" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-white" />
                Account Deletion &amp; Data Retention Policy
              </h3>
              <p className="text-xs text-[#888888] mt-1">
                <strong>Google Play Mandatory Policy:</strong> If your app allows users to create an account, you MUST provide an in-app deletion option AND a public web deletion URL.
              </p>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3 p-3.5 rounded-sm bg-[#0A0A0A] border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.allowsAccountCreation}
                  onChange={(e) => updateField("allowsAccountCreation", e.target.checked)}
                  className="mt-0.5 rounded-sm border-white/20 text-white focus:ring-0"
                />
                <div>
                  <span className="text-xs font-semibold text-white block">
                    My App Allows User Account Creation / Login
                  </span>
                  <span className="text-[11px] text-[#888888]">
                    Includes email signup, phone login, Google Sign-In, or social logins.
                  </span>
                </div>
              </label>

              {config.allowsAccountCreation ? (
                <div className="space-y-4 p-4 rounded-sm bg-[#0A0A0A] border border-white/10">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-1.5">
                      Web-Based Account &amp; Data Deletion URL <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="url"
                      value={config.accountDeletionUrl}
                      onChange={(e) => updateField("accountDeletionUrl", e.target.value)}
                      placeholder="https://yourdomain.com/delete-account"
                      className="w-full bg-[#0F0F0F] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                    />
                    <p className="text-[11px] text-[#666666] mt-1">
                      Google Play Console requires this exact public link in the Data Safety form. Users must be able to request data erasure without keeping the app installed.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-1.5">
                      Data Deletion Mechanism Provided
                    </label>
                    <select
                      value={config.accountDeletionMethod}
                      onChange={(e) => updateField("accountDeletionMethod", e.target.value as any)}
                      className="w-full bg-[#0F0F0F] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-white"
                    >
                      <option value="In-App and Web URL">In-App Feature &amp; Public Web Deletion URL (Recommended)</option>
                      <option value="In-App Feature">In-App Feature Only</option>
                      <option value="Web Deletion URL">Public Web Deletion URL Only</option>
                      <option value="Email Request">Email Request Process</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-sm bg-[#0A0A0A] border border-white/10 text-xs text-[#888888]">
                  No accounts are created. Users can delete any locally stored cache by clearing app data or uninstalling the app.
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] mb-1.5">
                  Data Retention Schedule Statement
                </label>
                <input
                  type="text"
                  value={config.dataRetentionPeriod}
                  onChange={(e) => updateField("dataRetentionPeriod", e.target.value)}
                  placeholder="e.g. For duration of active account + 30 days post-deletion request"
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => setActiveSection("audience")}
                className="text-[#888888] hover:text-white text-xs font-semibold uppercase tracking-wider px-3 py-2"
              >
                &larr; Back
              </button>
              <button
                type="button"
                onClick={() => setActiveSection("regional")}
                className="bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-sm transition-colors shadow-sm"
              >
                Next: Regional &amp; Custom Clauses &rarr;
              </button>
            </div>
          </div>
        )}

        {/* SECTION 7: REGIONAL COMPLIANCE & CUSTOM CLAUSES */}
        {activeSection === "regional" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-white" />
                Regional Privacy Frameworks &amp; Custom Clauses
              </h3>
              <p className="text-xs text-[#888888] mt-1">
                Include mandatory legal disclosures for the EU/UK (GDPR) and California (CCPA/CPRA), or attach AI-generated clauses.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-start gap-3 p-3.5 rounded-sm bg-[#0A0A0A] border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.includeGDPR}
                  onChange={(e) => updateField("includeGDPR", e.target.checked)}
                  className="mt-0.5 rounded-sm border-white/20 text-white focus:ring-0"
                />
                <div>
                  <span className="text-xs font-semibold text-white block">
                    European Union &amp; UK (GDPR)
                  </span>
                  <span className="text-[11px] text-[#888888]">
                    Covers Lawful Basis, Data Subject Rights (Access, Portability, Erasure).
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-sm bg-[#0A0A0A] border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.includeCCPA}
                  onChange={(e) => updateField("includeCCPA", e.target.checked)}
                  className="mt-0.5 rounded-sm border-white/20 text-white focus:ring-0"
                />
                <div>
                  <span className="text-xs font-semibold text-white block">
                    California Consumer Privacy Act (CCPA / CPRA)
                  </span>
                  <span className="text-[11px] text-[#888888]">
                    Includes "Do Not Sell or Share My Info" and Notice at Collection.
                  </span>
                </div>
              </label>
            </div>

            {/* DPO Email */}
            <div className="p-4 rounded-sm bg-[#0A0A0A] border border-white/10 space-y-3">
              <label className="flex items-center gap-2 text-xs font-semibold text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.hasDPO}
                  onChange={(e) => updateField("hasDPO", e.target.checked)}
                  className="rounded-sm border-white/20 text-white focus:ring-0"
                />
                <span>We have a designated Data Protection Officer (DPO)</span>
              </label>
              {config.hasDPO && (
                <input
                  type="email"
                  value={config.dpoEmail}
                  onChange={(e) => updateField("dpoEmail", e.target.value)}
                  placeholder="dpo@yourcompany.com"
                  className="w-full bg-[#0F0F0F] border border-white/10 rounded-sm px-3 py-2 text-xs text-white"
                />
              )}
            </div>

            {/* Custom Clauses list */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888]">
                  Custom App-Specific Clauses ({config.customClauses.length})
                </h4>
                <button
                  type="button"
                  onClick={onOpenClauseModal}
                  className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 px-3 py-1.5 rounded-sm transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Draft with AI Consultant</span>
                </button>
              </div>

              {config.customClauses.length === 0 ? (
                <p className="text-xs text-[#888888] bg-[#0A0A0A] p-4 rounded-sm border border-white/10">
                  No custom clauses added yet. You can use the AI Consultant to generate specialized clauses (e.g. AI Content Generation, Subscriptions &amp; In-App Billing, User Generated Content moderation, Health Connect integration).
                </p>
              ) : (
                <div className="space-y-2">
                  {config.customClauses.map((clause) => (
                    <div
                      key={clause.id}
                      className="p-3.5 rounded-sm bg-[#0A0A0A] border border-white/10 flex items-start justify-between gap-3"
                    >
                      <div>
                        <span className="text-xs font-semibold text-white block">{clause.title}</span>
                        <div
                          className="text-[11px] text-[#888888] line-clamp-2 mt-1"
                          dangerouslySetInnerHTML={{ __html: clause.content }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveClause(clause.id)}
                        className="text-[#888888] hover:text-rose-400 p-1"
                        title="Remove clause"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => setActiveSection("retention")}
                className="text-[#888888] hover:text-white text-xs font-semibold uppercase tracking-wider px-3 py-2"
              >
                &larr; Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
