import { AppConfig } from "../types";
import { DATA_ITEMS, PERMISSION_ITEMS, THIRD_PARTY_SERVICES } from "../data/constants";

export function generatePolicyHtml(config: AppConfig, languageOverride?: "en" | "ar" | "bilingual"): string {
  const lang = languageOverride || config.policyLanguage || "bilingual";

  if (lang === "ar") {
    return generateArabicPolicyHtml(config);
  }
  if (lang === "en") {
    return generateEnglishPolicyHtml(config);
  }
  return generateBilingualPolicyHtml(config);
}

export function generateArabicPolicyHtml(config: AppConfig): string {
  const effectiveDateStr = config.effectiveDate || "2026-08-16";
  const appName = config.appName || "ترشيد (VoltWise)";
  const devName = config.developerName || "إدارة تطبيق ترشيد (VoltWise Team)";
  const contactEmail = config.contactEmail || "aabufaisal49@gmail.com";

  let html = "";
  html += `<div dir="rtl" class="policy-arabic space-y-6 text-right" style="direction: rtl; text-align: right;">\n`;
  html += `  <div class="border-b-2 border-black pb-4 mb-6">\n`;
  html += `    <h1 class="text-2xl sm:text-3xl font-bold text-black mb-2">📄 سياسة الخصوصية لتطبيق ${escapeHtml(appName)}</h1>\n`;
  html += `    <div class="flex flex-wrap gap-4 text-xs font-semibold text-neutral-600">\n`;
  html += `      <p><strong>تاريخ السريان:</strong> ${escapeHtml(effectiveDateStr)}</p>\n`;
  html += `      <p><strong>آخر تحديث:</strong> ${escapeHtml(effectiveDateStr)}</p>\n`;
  html += `    </div>\n`;
  html += `  </div>\n\n`;

  html += `  <p class="text-xs sm:text-sm leading-relaxed text-neutral-800 font-medium bg-neutral-50 p-4 rounded-md border border-neutral-200">\n`;
  html += `    تلتزم ${escapeHtml(devName)} بحماية خصوصية المستخدمين وضمان أمان بياناتهم. توضح هذه الوثيقة ماهية البيانات التي يتعامل معها التطبيق، وكيفية معالجتها، ولماذا نطلب أذونات معينة على جهازك.\n`;
  html += `  </p>\n\n`;

  let sectionNum = 1;

  // Section 1: App Info
  html += `  <h2 class="text-base sm:text-lg font-bold text-black border-b border-neutral-300 pb-2 mt-6">${sectionNum++}. معلومات عن التطبيق</h2>\n`;
  html += `  <ul class="list-disc list-inside space-y-2 text-xs sm:text-sm text-neutral-700 pr-2">\n`;
  html += `    <li><strong>اسم التطبيق:</strong> ${escapeHtml(appName)}</li>\n`;
  html += `    <li><strong>طبيعة التطبيق:</strong> أداة ذكية لإدارة الطاقة، وتدقيق استهلاك الأجهزة المنزلية، وتحليل فواتير الكهرباء والمياه.</li>\n`;
  html += `  </ul>\n\n`;

  // Section 2: Local Data & Privacy
  html += `  <h2 class="text-base sm:text-lg font-bold text-black border-b border-neutral-300 pb-2 mt-6">${sectionNum++}. جمع واستخدام البيانات والخصوصية المحلية (Local Data & Privacy)</h2>\n`;
  html += `  <ul class="list-disc list-inside space-y-2.5 text-xs sm:text-sm text-neutral-700 pr-2">\n`;
  html += `    <li><strong>التخزين المحلي الآمن:</strong> يتم تخزين جميع بيانات الأجهزة المنزلية، وحسابات الاستهلاك، وسجلات الفواتير التي يدخلها المستخدم محلياً على ذاكرة الجهاز باستخدام قاعدة بيانات آمنة (Room Database).</li>\n`;
  html += `    <li><strong>عدم مشاركة البيانات الشخصية:</strong> نحن لا نجمع ولا نشارك ولا نبيع أي بيانات شخصية، أو بيانات فواتيرك، أو استهلاكك مع أي جهات أو خوادم خارجية.</li>\n`;
  html += `    <li><strong>معالجة الصور والمسح الضوئي (OCR):</strong> عند مسح ملصقات كفاءة الطاقة أو الفواتير عبر الكاميرا، تتم معالجة الصور واستخراج النصوص داخل التطبيق دون حفظ صورك الشخصية في أي خوادم سحابية خارجية مجهولة.</li>\n`;
  html += `  </ul>\n\n`;

  // Section 3: Permissions
  html += `  <h2 class="text-base sm:text-lg font-bold text-black border-b border-neutral-300 pb-2 mt-6">${sectionNum++}. أذونات وصلاحيات الجهاز المستخدمة (Device Permissions)</h2>\n`;
  html += `  <p class="text-xs sm:text-sm text-neutral-700 mb-3">يطلب التطبيق بعض الأذونات الأساسية فقط لتقديم الوظائف المطلوبة:</p>\n`;
  html += `  <ul class="list-disc list-inside space-y-3 text-xs sm:text-sm text-neutral-700 pr-2">\n`;
  html += `    <li>\n`;
  html += `      <strong>الكاميرا (<code>android.permission.CAMERA</code>):</strong><br>\n`;
  html += `      <span class="mr-4 text-neutral-600"><strong>الغرض:</strong> تُستخدم الكاميرا حصرياً لمسح ملصقات كفاءة الطاقة للأجهزة وقراءة بيانات الفواتير وعدادات الكهرباء بشكل ذكي وفوري. لا يتم استخدامها لأي غرض آخر أو في الخلفية.</span>\n`;
  html += `    </li>\n`;
  html += `    <li>\n`;
  html += `      <strong>الإنترنت والشبكة (<code>android.permission.INTERNET</code> &amp; <code>android.permission.ACCESS_NETWORK_STATE</code>):</strong><br>\n`;
  html += `      <span class="mr-4 text-neutral-600"><strong>الغرض:</strong> التحقق من الاتصال وتحديث شرائح التعرفة الجمركية والكهربائية بصورة دورية، بالإضافة إلى متطلبات تشغيل واجهات النظام الأساسية.</span>\n`;
  html += `    </li>\n`;
  html += `    <li>\n`;
  html += `      <strong>الاهتزاز (<code>android.permission.VIBRATE</code>):</strong><br>\n`;
  html += `      <span class="mr-4 text-neutral-600"><strong>الغرض:</strong> تقديم استجابة لمسية (Haptic Feedback) تفاعلية ومريحة أثناء استخدام التطبيق وعند إتمام العمليات بنجاح.</span>\n`;
  html += `    </li>\n`;
  html += `  </ul>\n\n`;

  // Section 4: Third-Party Services
  html += `  <h2 class="text-base sm:text-lg font-bold text-black border-b border-neutral-300 pb-2 mt-6">${sectionNum++}. خدمات الأطراف الثالثة (Third-Party Services)</h2>\n`;
  html += `  <p class="text-xs sm:text-sm text-neutral-700 mb-2">يعتمد التطبيق على بنية تحتية برمجية قياسية لضمان استقرار التطبيق وأمانه:</p>\n`;
  html += `  <ul class="list-disc list-inside space-y-2 text-xs sm:text-sm text-neutral-700 pr-2">\n`;
  html += `    <li><strong>Google Play Services:</strong> لضمان الأمان وتقديم التحديثات وتوافق بيئة التشغيل.</li>\n`;
  html += `  </ul>\n\n`;

  // Section 5: Children's Privacy
  html += `  <h2 class="text-base sm:text-lg font-bold text-black border-b border-neutral-300 pb-2 mt-6">${sectionNum++}. الفئة العمرية وحماية خصوصية الأطفال (Children's Privacy)</h2>\n`;
  html += `  <p class="text-xs sm:text-sm text-neutral-700 leading-relaxed">\n`;
  html += `    تطبيق "${escapeHtml(appName)}" موجه للجمهور العام والأسر (الفئة العمرية +13). التطبيق لا يستهدف ولا يجمع عمداً أي معلومات تعريفية شخصية من الأطفال دون سن 13 عاماً.\n`;
  html += `  </p>\n\n`;

  // Section 6: Data Deletion & Rights
  html += `  <h2 class="text-base sm:text-lg font-bold text-black border-b border-neutral-300 pb-2 mt-6">${sectionNum++}. حقوق المستخدم والتحكم في البيانات (Data Deletion)</h2>\n`;
  html += `  <ul class="list-disc list-inside space-y-2 text-xs sm:text-sm text-neutral-700 pr-2">\n`;
  html += `    <li>للمستخدم كامل الحرية في حذف أي فاتورة أو جهاز مضاف بنقرة زر واحدة من داخل التطبيق.</li>\n`;
  html += `    <li>عند رغبة المستخدم في حذف جميع البيانات، يمكنه ببساطة استخدام خيار <strong>"إعادة تعيين التطبيق"</strong> من صفحة الإعدادات أو مسح بيانات التطبيق وإلغاء تثبيته، وسيتم حذف جميع السجلات من جهازه نهائياً وفوراً دون بقاء أي نسخة احتياطية.</li>\n`;
  html += `  </ul>\n\n`;

  // Section 7: Changes & Last Updated
  html += `  <h2 class="text-base sm:text-lg font-bold text-black border-b border-neutral-300 pb-2 mt-6">${sectionNum++}. التغييرات على سياسة الخصوصية وآخر تحديث</h2>\n`;
  html += `  <p class="text-xs sm:text-sm text-neutral-700 leading-relaxed mb-2">\n`;
  html += `    <strong>تاريخ آخر مراجعة:</strong> ${escapeHtml(effectiveDateStr)}\n`;
  html += `  </p>\n`;
  html += `  <p class="text-xs sm:text-sm text-neutral-700 leading-relaxed">\n`;
  html += `    قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر لتعكس أي تحسينات في ميزات التطبيق. يُنصح بمراجعة هذه الصفحة بشكل دوري. استمرارك في استخدام التطبيق بعد نشر أي تعديل يُعتبر موافقة وقبولاً للبنود المحدثة.\n`;
  html += `  </p>\n\n`;

  // Section 8: Contact Us
  html += `  <h2 class="text-base sm:text-lg font-bold text-black border-b border-neutral-300 pb-2 mt-6">${sectionNum++}. التواصل معنا (Contact Information)</h2>\n`;
  html += `  <p class="text-xs sm:text-sm text-neutral-700 mb-2">إذا كانت لديك أي أسئلة أو استفسارات حول سياسة الخصوصية هذه، يمكنك التواصل معنا عبر البريد الإلكتروني:</p>\n`;
  html += `  <ul class="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-neutral-700 pr-2">\n`;
  html += `    <li><strong>📧 البريد الإلكتروني:</strong> <a href="mailto:${escapeHtml(contactEmail)}" class="text-blue-600 underline font-semibold">${escapeHtml(contactEmail)}</a></li>\n`;
  html += `  </ul>\n`;
  html += `</div>\n`;

  return html;
}

export function generateEnglishPolicyHtml(config: AppConfig): string {
  const effectiveDateStr = config.effectiveDate || "August 16, 2026";
  const appName = config.appName || "VoltWise (ترشيد)";
  const devName = config.developerName || "VoltWise Team";
  const contactEmail = config.contactEmail || "aabufaisal49@gmail.com";

  let html = "";
  html += `<div class="policy-english space-y-6 text-left" style="direction: ltr; text-align: left;">\n`;
  html += `  <div class="border-b-2 border-black pb-4 mb-6">\n`;
  html += `    <h1 class="text-2xl sm:text-3xl font-bold text-black mb-2">📄 Privacy Policy for ${escapeHtml(appName)}</h1>\n`;
  html += `    <div class="flex flex-wrap gap-4 text-xs font-semibold text-neutral-600">\n`;
  html += `      <p><strong>Effective Date:</strong> ${escapeHtml(effectiveDateStr)}</p>\n`;
  html += `      <p><strong>Last Updated:</strong> ${escapeHtml(effectiveDateStr)}</p>\n`;
  html += `    </div>\n`;
  html += `  </div>\n\n`;

  html += `  <p class="text-xs sm:text-sm leading-relaxed text-neutral-800 font-medium bg-neutral-50 p-4 rounded-md border border-neutral-200">\n`;
  html += `    <strong>${escapeHtml(appName)}</strong> is committed to protecting your privacy and ensuring data security. This Privacy Policy outlines what information the app processes, how it is handled, and why specific device permissions are requested.\n`;
  html += `  </p>\n\n`;

  let sectionNum = 1;

  // Section 1: App Info
  html += `  <h2 class="text-base sm:text-lg font-bold text-black border-b border-neutral-300 pb-2 mt-6">${sectionNum++}. App Information</h2>\n`;
  html += `  <ul class="list-disc list-inside space-y-2 text-xs sm:text-sm text-neutral-700 pl-2">\n`;
  html += `    <li><strong>App Name:</strong> ${escapeHtml(appName)}</li>\n`;
  html += `    <li><strong>App Nature:</strong> Smart energy management, home appliance power auditing, and utility bill tracking utility.</li>\n`;
  html += `  </ul>\n\n`;

  // Section 2: Data Collection & Local Processing
  html += `  <h2 class="text-base sm:text-lg font-bold text-black border-b border-neutral-300 pb-2 mt-6">${sectionNum++}. Data Collection and Local Processing (Local Data & Privacy)</h2>\n`;
  html += `  <ul class="list-disc list-inside space-y-2.5 text-xs sm:text-sm text-neutral-700 pl-2">\n`;
  html += `    <li><strong>Local Storage:</strong> All appliance specifications, power consumption logs, and utility bills entered by the user are stored locally and securely on your device using an internal database (Room Database).</li>\n`;
  html += `    <li><strong>No Data Selling or Sharing:</strong> We do not collect, share, or sell your personal consumption metrics, bills, or home audit data with third parties or external servers.</li>\n`;
  html += `    <li><strong>Image Processing &amp; OCR:</strong> When scanning energy rating labels or bills, images are processed directly within the app workflow to extract text parameters. No user photos are uploaded or stored externally.</li>\n`;
  html += `  </ul>\n\n`;

  // Section 3: Device Permissions Used
  html += `  <h2 class="text-base sm:text-lg font-bold text-black border-b border-neutral-300 pb-2 mt-6">${sectionNum++}. Device Permissions Used</h2>\n`;
  html += `  <p class="text-xs sm:text-sm text-neutral-700 mb-3">${escapeHtml(appName)} requests minimal permissions strictly necessary for its functionality:</p>\n`;
  html += `  <ul class="list-disc list-inside space-y-3 text-xs sm:text-sm text-neutral-700 pl-2">\n`;
  html += `    <li>\n`;
  html += `      <strong>Camera (<code>android.permission.CAMERA</code>):</strong><br>\n`;
  html += `      <span class="ml-4 text-neutral-600"><strong>Purpose:</strong> Used exclusively for scanning appliance energy efficiency tags, utility bills, and meter readings. It is never used in the background or for any secondary purpose.</span>\n`;
  html += `    </li>\n`;
  html += `    <li>\n`;
  html += `      <strong>Internet &amp; Network (<code>android.permission.INTERNET</code> &amp; <code>android.permission.ACCESS_NETWORK_STATE</code>):</strong><br>\n`;
  html += `      <span class="ml-4 text-neutral-600"><strong>Purpose:</strong> Required for general network verification and periodically fetching standard tariff tier updates.</span>\n`;
  html += `    </li>\n`;
  html += `    <li>\n`;
  html += `      <strong>Vibration (<code>android.permission.VIBRATE</code>):</strong><br>\n`;
  html += `      <span class="ml-4 text-neutral-600"><strong>Purpose:</strong> Provides haptic feedback during interactive user actions and successful completion of tasks.</span>\n`;
  html += `    </li>\n`;
  html += `  </ul>\n\n`;

  // Section 4: Third-Party Services
  html += `  <h2 class="text-base sm:text-lg font-bold text-black border-b border-neutral-300 pb-2 mt-6">${sectionNum++}. Third-Party Services</h2>\n`;
  html += `  <p class="text-xs sm:text-sm text-neutral-700 mb-2">The app relies on standard Google and Android infrastructure for stability and security:</p>\n`;
  html += `  <ul class="list-disc list-inside space-y-2 text-xs sm:text-sm text-neutral-700 pl-2">\n`;
  html += `    <li><strong>Google Play Services:</strong> For core runtime stability, app security, and distribution integrity.</li>\n`;
  html += `  </ul>\n\n`;

  // Section 5: Children's Privacy
  html += `  <h2 class="text-base sm:text-lg font-bold text-black border-b border-neutral-300 pb-2 mt-6">${sectionNum++}. Children’s Privacy</h2>\n`;
  html += `  <p class="text-xs sm:text-sm text-neutral-700 leading-relaxed">\n`;
  html += `    ${escapeHtml(appName)} is intended for a general audience (ages 13 and above). We do not knowingly collect personal identifiable information from children under 13 years of age.\n`;
  html += `  </p>\n\n`;

  // Section 6: User Data Control & Deletion
  html += `  <h2 class="text-base sm:text-lg font-bold text-black border-b border-neutral-300 pb-2 mt-6">${sectionNum++}. User Data Control &amp; Deletion</h2>\n`;
  html += `  <ul class="list-disc list-inside space-y-2 text-xs sm:text-sm text-neutral-700 pl-2">\n`;
  html += `    <li>Users can delete any individual bill, device, or record directly within the app interface at any time.</li>\n`;
  html += `    <li>Users can delete all stored app data at once using the <strong>"Reset Application"</strong> option in Settings or by clearing app data / uninstalling the app from their device, which wipes all local records permanently and instantly.</li>\n`;
  html += `  </ul>\n\n`;

  // Section 7: Changes to This Privacy Policy & Last Updated
  html += `  <h2 class="text-base sm:text-lg font-bold text-black border-b border-neutral-300 pb-2 mt-6">${sectionNum++}. Changes to This Privacy Policy &amp; Last Updated</h2>\n`;
  html += `  <p class="text-xs sm:text-sm text-neutral-700 leading-relaxed mb-2">\n`;
  html += `    <strong>Date of Last Revision:</strong> ${escapeHtml(effectiveDateStr)}\n`;
  html += `  </p>\n`;
  html += `  <p class="text-xs sm:text-sm text-neutral-700 leading-relaxed">\n`;
  html += `    We may update our Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Users are encouraged to review this policy periodically. Continued use of the application following any posted modifications indicates acceptance of the updated policy.\n`;
  html += `  </p>\n\n`;

  // Section 8: Contact Us
  html += `  <h2 class="text-base sm:text-lg font-bold text-black border-b border-neutral-300 pb-2 mt-6">${sectionNum++}. Contact Us</h2>\n`;
  html += `  <p class="text-xs sm:text-sm text-neutral-700 mb-2">If you have any questions or feedback regarding this Privacy Policy, please reach out to us at:</p>\n`;
  html += `  <ul class="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-neutral-700 pl-2">\n`;
  html += `    <li><strong>📧 Email:</strong> <a href="mailto:${escapeHtml(contactEmail)}" class="text-blue-600 underline font-semibold">${escapeHtml(contactEmail)}</a></li>\n`;
  html += `  </ul>\n`;
  html += `</div>\n`;

  return html;
}

export function generateBilingualPolicyHtml(config: AppConfig): string {
  let html = "";
  html += `<div class="bilingual-policy space-y-12">\n`;
  html += `  <!-- 1. Arabic Version Section (Top / أعلى الصفحة) -->\n`;
  html += `  <section id="arabic-policy" class="bg-white rounded-xl">\n`;
  html += `    <div class="mb-5 inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold" dir="rtl">\n`;
  html += `      <span>🇸🇦</span>\n`;
  html += `      <span>النسخة العربية (الرسمية المعتمدة)</span>\n`;
  html += `    </div>\n`;
  html += generateArabicPolicyHtml(config);
  html += `  </section>\n\n`;
  html += `  <!-- Bilingual Separation Banner -->\n`;
  html += `  <div class="my-12 py-6 border-y-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 text-center bg-slate-50/80 rounded-xl" dir="ltr">\n`;
  html += `    <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-600">\n`;
  html += `      <span>🌐</span>\n`;
  html += `      <span>Official English Translation Follows Below &bull; الترجمة الإنجليزية بالأسفل</span>\n`;
  html += `    </div>\n`;
  html += `    <p class="text-xs text-slate-500 max-w-lg">This English translation is provided for official compliance with international developer policies and users.</p>\n`;
  html += `  </div>\n\n`;
  html += `  <!-- 2. English Version Section (Below / أسفل الصفحة) -->\n`;
  html += `  <section id="english-policy" class="bg-white rounded-xl">\n`;
  html += `    <div class="mb-5 inline-flex items-center gap-2 bg-blue-50 text-blue-800 border border-blue-200 px-3.5 py-1.5 rounded-full text-xs font-bold" dir="ltr">\n`;
  html += `      <span>🇬🇧</span>\n`;
  html += `      <span>Official English Version (International Compliance)</span>\n`;
  html += `    </div>\n`;
  html += generateEnglishPolicyHtml(config);
  html += `  </section>\n`;
  html += `</div>\n`;
  return html;
}

export function generateCompleteIndexHtml(config: AppConfig): string {
  const bodyContent = generatePolicyHtml(config);
  const appName = escapeHtml(config.appName || "ترشيد (VoltWise)");
  const effectiveDate = escapeHtml(config.effectiveDate || "2026-08-16");

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>سياسة الخصوصية - ${appName} | Privacy Policy</title>
  <meta name="description" content="سياسة الخصوصية لتطبيق ${appName} على متجر Google Play - Privacy Policy for ${appName} Android Application.">
  <meta name="robots" content="index, follow">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-color: #f8fafc;
      --card-bg: #ffffff;
      --text-main: #0f172a;
      --text-muted: #475569;
      --primary: #0284c7;
      --primary-hover: #0369a1;
      --border-color: #e2e8f0;
      --code-bg: #f1f5f9;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg-color: #0f172a;
        --card-bg: #1e293b;
        --text-main: #f8fafc;
        --text-muted: #94a3b8;
        --primary: #38bdf8;
        --primary-hover: #7dd3fc;
        --border-color: #334155;
        --code-bg: #0f172a;
      }
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Cairo', 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: var(--bg-color);
      color: var(--text-main);
      line-height: 1.8;
      padding: 40px 20px;
    }
    .container {
      max-width: 880px;
      margin: 0 auto;
      background: var(--card-bg);
      padding: 48px;
      border-radius: 16px;
      border: 1px solid var(--border-color);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    }
    .lang-switcher {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-color);
    }
    .lang-btn {
      padding: 6px 14px;
      font-size: 0.85rem;
      font-weight: 700;
      border-radius: 6px;
      text-decoration: none;
      background: var(--code-bg);
      color: var(--text-main);
      border: 1px solid var(--border-color);
      transition: all 0.2s;
    }
    .lang-btn:hover {
      background: var(--primary);
      color: #ffffff;
    }
    h1 {
      font-size: 2rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 16px;
      line-height: 1.3;
    }
    h2 {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--text-main);
      margin-top: 32px;
      margin-bottom: 14px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border-color);
    }
    p {
      margin-bottom: 16px;
      color: var(--text-muted);
    }
    p strong {
      color: var(--text-main);
    }
    ul, ol {
      margin-bottom: 20px;
      padding-inline-start: 24px;
      color: var(--text-muted);
    }
    li {
      margin-bottom: 10px;
    }
    li strong {
      color: var(--text-main);
    }
    a {
      color: var(--primary);
      text-decoration: underline;
      text-underline-offset: 3px;
      transition: color 0.15s ease;
    }
    a:hover {
      color: var(--primary-hover);
    }
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      background-color: var(--code-bg);
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.88em;
      border: 1px solid var(--border-color);
      direction: ltr;
      display: inline-block;
    }
    .footer {
      margin-top: 48px;
      padding-top: 24px;
      border-top: 1px solid var(--border-color);
      text-align: center;
      font-size: 0.875rem;
      color: var(--text-muted);
    }
    @media (max-width: 640px) {
      body {
        padding: 16px 12px;
      }
      .container {
        padding: 24px 18px;
        border-radius: 12px;
      }
      h1 {
        font-size: 1.5rem;
      }
      h2 {
        font-size: 1.15rem;
        margin-top: 24px;
      }
    }
  </style>
</head>
<body>
  <main class="container">
    <div class="lang-switcher">
      <a href="#arabic-policy" class="lang-btn">العربية (Arabic)</a>
      <a href="#english-policy" class="lang-btn">English</a>
    </div>
${bodyContent}
    <footer class="footer">
      <p>&copy; ${new Date().getFullYear()} ${escapeHtml(config.developerName || "إدارة تطبيق ترشيد (VoltWise)")}. جميع الحقوق محفوظة &bull; All rights reserved.</p>
    </footer>
  </main>
</body>
</html>`;
}

export function generateMarkdown(config: AppConfig): string {
  const html = generatePolicyHtml(config);
  return html
    .replace(/<h1>(.*?)<\/h1>/gi, "# $1\n\n")
    .replace(/<h2>(.*?)<\/h2>/gi, "## $1\n\n")
    .replace(/<h3>(.*?)<\/h3>/gi, "### $1\n\n")
    .replace(/<p><strong>(.*?)<\/strong>(.*?)<\/p>/gi, "**$1**$2\n\n")
    .replace(/<p>(.*?)<\/p>/gi, "$1\n\n")
    .replace(/<ul>/gi, "")
    .replace(/<\/ul>/gi, "\n")
    .replace(/<li>(.*?)<\/li>/gi, "- $1\n")
    .replace(/<code>(.*?)<\/code>/gi, "`$1`")
    .replace(/<strong>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<em>(.*?)<\/em>/gi, "*$1*")
    .replace(/<a href="(.*?)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)")
    .replace(/<br\s*\/?>/gi, "  \n");
}

function escapeHtml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
