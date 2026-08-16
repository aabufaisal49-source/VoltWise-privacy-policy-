export type AppType =
  | "Game"
  | "Productivity"
  | "Social Media"
  | "E-Commerce & Shopping"
  | "Health & Fitness"
  | "Utility & Tools"
  | "Education & Learning"
  | "Entertainment & Streaming"
  | "Finance & FinTech"
  | "Navigation & Travel"
  | "Lifestyle & Dating"
  | "News & Magazines"
  | "Other";

export type AgeGroup =
  | "Everyone (General Audience)"
  | "Children under 13 (COPPA & Families Policy Strict)"
  | "Mixed Audience (Families Policy with Age Gate)"
  | "Teens (13-17)"
  | "Adults Only (18+)";

export interface DataCategoryItem {
  id: string;
  name: string;
  category: "Personal Info" | "Financial" | "Location" | "Device & Identifiers" | "User Content" | "App Activity" | "Health";
  description: string;
  playStoreDataType: string;
  collectedByDefault?: boolean;
}

export interface PermissionItem {
  id: string;
  permissionName: string;
  displayName: string;
  category: "Hardware & Media" | "Location" | "Identity & Communication" | "System & Sensors";
  description: string;
  playStoreRequiresDeclaration: boolean;
  sensitiveReason?: string;
}

export interface ThirdPartyService {
  id: string;
  name: string;
  category: "Ads & Monetization" | "Analytics & Crash Reporting" | "Authentication & Cloud" | "Payments" | "Customer Support & Push";
  privacyPolicyUrl: string;
  commonDataCollected: string[];
  description: string;
}

export interface AppConfig {
  appName: string;
  packageName: string;
  appType: AppType;
  developerName: string;
  contactEmail: string;
  supportWebsite: string;
  developerAddress: string;
  effectiveDate: string;
  
  // Data Collection
  personalDataCollected: string[];
  customDataCollected: string[];
  collectsNoData: boolean;
  dataEncryptionInTransit: boolean;
  dataEncryptedAtRest: boolean;
  
  // Device Permissions
  permissionsUsed: string[];
  backgroundLocationUsed: boolean;
  backgroundLocationPurpose: string;
  
  // Third Party SDKs
  thirdPartyServices: string[];
  customThirdParties: { name: string; url: string; purpose: string }[];
  
  // Audience & Children (COPPA / Google Play Families)
  ageGroup: AgeGroup;
  containsAds: boolean;
  usesTargetedAdvertising: boolean;
  hasAdMobDesignedForFamilies: boolean;
  
  // Account & Data Retention (Google Play Mandatory 2023+ Deletion Policy)
  allowsAccountCreation: boolean;
  accountDeletionUrl: string;
  accountDeletionMethod: "In-App Feature" | "Web Deletion URL" | "Email Request" | "In-App and Web URL";
  dataRetentionPeriod: string;
  
  // Regional & Legal Governance
  includeGDPR: boolean;
  includeCCPA: boolean;
  includeLGPD: boolean;
  hasDPO: boolean;
  dpoEmail: string;
  policyLanguage?: "en" | "ar" | "bilingual";
  
  // Custom clauses
  customClauses: { id: string; title: string; content: string }[];
}

export interface PresetTemplate {
  id: string;
  name: string;
  description: string;
  badge: string;
  config: Partial<AppConfig>;
}

export interface AuditFinding {
  type: "success" | "warning" | "danger" | "info";
  title: string;
  description: string;
  recommendation?: string;
}

export interface AuditResult {
  score: number;
  status: string;
  summary: string;
  findings: AuditFinding[];
  googlePlayVerdict?: string;
  suggestedCustomClauses?: string[];
  aiEnhanced?: boolean;
}
