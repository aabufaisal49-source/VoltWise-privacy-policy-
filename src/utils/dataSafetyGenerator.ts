import { AppConfig } from "../types";
import { DATA_ITEMS, THIRD_PARTY_SERVICES } from "../data/constants";

export interface PlayDataSafetyQuestion {
  question: string;
  answer: string;
  details: string;
  status: "yes" | "no" | "conditional";
}

export interface PlayDataSafetySection {
  title: string;
  items: {
    dataType: string;
    collected: boolean;
    shared: boolean;
    purposes: string[];
    ephemeral: boolean;
    optional: boolean;
  }[];
}

export function generatePlayDataSafetyReport(config: AppConfig) {
  const selectedData = DATA_ITEMS.filter((item) =>
    config.personalDataCollected.includes(item.id)
  );
  const selectedServices = THIRD_PARTY_SERVICES.filter((svc) =>
    config.thirdPartyServices.includes(svc.id)
  );

  const hasAds = config.containsAds || config.thirdPartyServices.some((s) => ["google_admob", "unity_ads", "applovin", "facebook_sdk"].includes(s));
  const hasAnalytics = config.thirdPartyServices.some((s) => ["firebase_analytics", "firebase_crashlytics", "sentry"].includes(s));

  const questions: PlayDataSafetyQuestion[] = [
    {
      question: "Does your app collect or share any of the required user data types?",
      answer: config.collectsNoData ? "No" : "Yes",
      details: config.collectsNoData
        ? "App operates completely on-device without remote data transfer."
        : `App collects ${selectedData.length} data types (e.g., ${selectedData.slice(0, 3).map((d) => d.name).join(", ")}).`,
      status: config.collectsNoData ? "no" : "yes",
    },
    {
      question: "Is all of the user data collected by your app encrypted in transit?",
      answer: config.dataEncryptionInTransit ? "Yes" : "No",
      details: config.dataEncryptionInTransit
        ? "All network calls are transmitted securely over TLS/HTTPS."
        : "Warning: Google Play recommends encrypting all data in transit.",
      status: config.dataEncryptionInTransit ? "yes" : "conditional",
    },
    {
      question: "Do you provide a way for users to request that their data be deleted?",
      answer: config.allowsAccountCreation ? "Yes (Required for apps with accounts)" : "Yes (Via Email / Web)",
      details: config.accountDeletionUrl
        ? `Web URL provided: ${config.accountDeletionUrl}`
        : "Provide a web URL in Play Console for account and data deletion requests.",
      status: "yes",
    },
    {
      question: "Does your app follow the Google Play Families Policy?",
      answer: config.ageGroup.includes("Children") || config.ageGroup.includes("Mixed") ? "Yes (Families Policy applies)" : "No (General Audience / 13+)",
      details: config.ageGroup.includes("Children")
        ? "Must only use Google Play Families Self-Certified Ads SDKs and collect zero personal data."
        : "Standard Play policy rules apply.",
      status: config.ageGroup.includes("Children") ? "yes" : "no",
    },
  ];

  const declaredDataTypes = selectedData.map((data) => {
    const purposes: string[] = ["App functionality"];
    if (data.id === "device_id" || data.id === "app_interactions") {
      if (hasAnalytics) purposes.push("Analytics");
      if (hasAds) purposes.push("Advertising or marketing", "Fraud prevention, security, and compliance");
    }
    if (data.id === "crash_logs") {
      purposes.push("Analytics", "Developer communications");
    }
    if (data.id === "payment_info") {
      purposes.push("Fraud prevention and security", "Account management");
    }

    const isShared = (hasAds && (data.id === "device_id" || data.id === "location_approximate")) ||
      (hasAnalytics && (data.id === "device_id" || data.id === "crash_logs"));

    return {
      dataType: data.playStoreDataType,
      name: data.name,
      category: data.category,
      collected: true,
      shared: isShared,
      purposes,
      ephemeral: false,
      optional: data.id === "photos_videos" || data.id === "phone" || data.id === "location_precise",
    };
  });

  return {
    questions,
    declaredDataTypes,
    hasAds,
    hasAnalytics,
    totalCollected: selectedData.length,
    thirdPartiesCount: selectedServices.length,
  };
}
