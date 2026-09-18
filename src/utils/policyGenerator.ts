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
  const effectiveDateStr = "18 سبتمبر 2026";
  const lastUpdatedStr = "سبتمبر 2026";
  const appName = config.appName || "ترشيد (VoltWise)";
  const contactEmail = config.contactEmail || "aabufaisal49@gmail.com";
  const privacyUrl = config.supportWebsite || "https://volt-wise-privacy-policy.vercel.app/";

  let html = "";
  html += `<div dir="rtl" class="policy-arabic space-y-7 text-right break-normal [word-break:keep-all] [overflow-wrap:break-word] [hyphens:none]" style="direction: rtl; text-align: right; word-break: keep-all; overflow-wrap: break-word; hyphens: none; -webkit-hyphens: none;">\n`;
  
  // Header / Title & Dates
  html += `  <div class="border-b-2 border-slate-900 pb-5 mb-6">\n`;
  html += `    <h1 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-950 tracking-normal leading-snug mb-3 [word-break:keep-all]">سياسة الخصوصية لتطبيق ${escapeHtml(appName)}</h1>\n`;
  html += `    <div class="flex flex-wrap gap-2.5 sm:gap-4 text-xs font-semibold text-slate-600">\n`;
  html += `      <span class="bg-slate-100 px-3 py-1 rounded-md border border-slate-200 whitespace-nowrap"><strong>تاريخ السريان:</strong> ${effectiveDateStr}</span>\n`;
  html += `      <span class="bg-slate-100 px-3 py-1 rounded-md border border-slate-200 whitespace-nowrap"><strong>آخر تحديث:</strong> ${lastUpdatedStr}</span>\n`;
  html += `    </div>\n`;
  html += `  </div>\n\n`;

  // Introduction
  html += `  <div class="text-xs sm:text-sm leading-relaxed text-slate-800 bg-slate-50/90 p-4 sm:p-5 rounded-xl border border-slate-200 space-y-2">\n`;
  html += `    <p>أهلاً بكم في تطبيق <strong>${escapeHtml(appName)}</strong>، الأداة المتخصصة في تدقيق وإدارة استهلاك الطاقة الكهربائية ومسح فواتير الكهرباء والتعرف على كفاءة الأجهزة المنزلية.</p>\n`;
  html += `    <p>نحن نضع خصوصيتك وأمان بياناتك في قمة أولوياتنا، ونلتزم التزاماً تاماً بالشفافية حول كيفية التعامل مع المعلومات والصلاحيات التي يطلبها التطبيق.</p>\n`;
  html += `  </div>\n\n`;

  // Section 1
  html += `  <section class="space-y-3">\n`;
  html += `    <h3 class="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">\n`;
  html += `      <span>1. مبدأ التخزين المحلي (Offline-First Local Storage)</span>\n`;
  html += `    </h3>\n`;
  html += `    <ul class="list-disc list-inside space-y-2.5 text-xs sm:text-sm text-slate-700 pr-1 leading-relaxed">\n`;
  html += `      <li><strong>تخزين محلي 100%:</strong> تُخزَّن جميع بياناتك المتعلقة بسجلات فواتير الكهرباء، وتفاصيل الأجهزة المنزلية، وحسابات الطاقة، ومخصصات الاستهلاك محلياً داخل ذاكرة جهازك فقط عبر قاعدة بيانات محلية مشفرة وآمنة (<code class="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-xs">Android Room Database</code>).</li>\n`;
  html += `      <li><strong>لا توجد خوادم تخزين خارجية:</strong> نحن لا نقوم بإنشاء حسابات مستخدمين، ولا نملك خوادم سحابية لتخزين أو تتبع فواتيرك، ولا نقوم بجمع أو بيع أو مشاركة بيانات استهلاكك مع أي طرف ثالث على الإطلاق.</li>\n`;
  html += `      <li><strong>التحكم الكامل ببياناتك:</strong> يمكنك في أي وقت ومن خلال شاشة الإعدادات داخل التطبيق تصدير بياناتك أو حذفها بالكامل وبشكل فوري ونهائي من جهازك.</li>\n`;
  html += `    </ul>\n`;
  html += `  </section>\n\n`;

  // Section 2
  html += `  <section class="space-y-3">\n`;
  html += `    <h3 class="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">\n`;
  html += `      <span>2. الصلاحيات المطلوبة والغرض منها (Device Permissions)</span>\n`;
  html += `    </h3>\n`;
  html += `    <p class="text-xs sm:text-sm text-slate-700 mb-2">يطلب التطبيق فقط الحد الأدنى الضروري من الصلاحيات لأداء وظائفه الأساسية وفق سياسات Google Play:</p>\n`;
  html += `    <div class="space-y-3.5 pr-1 text-xs sm:text-sm text-slate-700 leading-relaxed">\n`;
  html += `      <div class="bg-slate-50/60 p-3.5 rounded-lg border border-slate-200">\n`;
  html += `        <p class="font-bold text-slate-900 mb-1">1. صلاحية الكاميرا (<code class="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-xs">CAMERA</code>):</p>\n`;
  html += `        <ul class="list-disc list-inside space-y-1 mr-3 text-slate-700">\n`;
  html += `          <li><strong>الغرض:</strong> تفعيل المعاينة الحية المباشرة (Live Viewfinder عبر CameraX) لالتقاط صور فواتير الكهرباء وملصقات كفاءة الطاقة للأجهزة المنزلية بوضوح وسرعة.</li>\n`;
  html += `          <li><strong>الاستخدام:</strong> تُستخدم الكاميرا فقط عند فتحك لشاشات المسح الضوئي، مع توفير أزرار تحكم مباشرة (الفلاش والتبديل بين الكاميرات). لا يتم تسجيل أي فيديو أو تشغيل الكاميرا في الخلفية.</li>\n`;
  html += `        </ul>\n`;
  html += `      </div>\n`;

  html += `      <div class="bg-slate-50/60 p-3.5 rounded-lg border border-slate-200">\n`;
  html += `        <p class="font-bold text-slate-900 mb-1">2. معرض الصور والمستندات (Photo Picker / File Storage):</p>\n`;
  html += `        <ul class="list-disc list-inside space-y-1 mr-3 text-slate-700">\n`;
  html += `          <li><strong>الغرض:</strong> تمكينك من رفع صور الفواتير أو ملفات فواتير الكهرباء بصيغة PDF المخزنة على هاتفك لتحليلها.</li>\n`;
  html += `          <li><strong>الأمان:</strong> نعتمد تقنية منتقي الصور الآمن (Android Photo Picker) الذي يضمن قراءة الملف المحدد فقط دون الوصول إلى باقي ملفات أو صور جهازك.</li>\n`;
  html += `        </ul>\n`;
  html += `      </div>\n`;

  html += `      <div class="bg-slate-50/60 p-3.5 rounded-lg border border-slate-200">\n`;
  html += `        <p class="font-bold text-slate-900 mb-1">3. صلاحية الإنترنت (<code class="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-xs">INTERNET</code> &amp; <code class="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-xs">ACCESS_NETWORK_STATE</code>):</p>\n`;
  html += `        <ul class="list-disc list-inside space-y-1 mr-3 text-slate-700">\n`;
  html += `          <li><strong>الغرض:</strong> إجراء الاتصال المشفر الآمن بواجهة الذكاء الاصطناعي (Google Gemini AI) لاستخراج نصوص وأرقام الفاتورة، وجلب التحديثات الرسمية لشرائح وتعريفات الكهرباء في منطقتك (السعودية، سلطنة عُمان، الإمارات، إلخ).</li>\n`;
  html += `        </ul>\n`;
  html += `      </div>\n`;

  html += `      <div class="bg-slate-50/60 p-3.5 rounded-lg border border-slate-200">\n`;
  html += `        <p class="font-bold text-slate-900 mb-1">4. صلاحية الاهتزاز (<code class="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-xs">VIBRATE</code>):</p>\n`;
  html += `        <ul class="list-disc list-inside space-y-1 mr-3 text-slate-700">\n`;
  html += `          <li><strong>الغرض:</strong> تقديم استجابة لمسية (Haptic Feedback) تفاعلية عند التقاط الصورة أو اكتمال الفحص لتأكيد العملية للمستخدم.</li>\n`;
  html += `        </ul>\n`;
  html += `      </div>\n`;
  html += `    </div>\n`;
  html += `  </section>\n\n`;

  // Section 3
  html += `  <section class="space-y-3">\n`;
  html += `    <h3 class="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">\n`;
  html += `      <span>3. معالجة الذكاء الاصطناعي والصور (AI &amp; Cloud Processing)</span>\n`;
  html += `    </h3>\n`;
  html += `    <ul class="list-disc list-inside space-y-2.5 text-xs sm:text-sm text-slate-700 pr-1 leading-relaxed">\n`;
  html += `      <li><strong>المعالجة العابرة فقط (Transient Processing):</strong> عند التقاط صورة للفاتورة أو ملصق كفاءة الطاقة، يتم إرسال الصورة عبر اتصال مشفر (HTTPS/TLS) إلى واجهة البرمجة الرسمية <strong>Google Gemini API</strong> لتحليل النص واستخراج قراءات العداد والمبالغ وتفاصيل الاستهلاك.</li>\n`;
  html += `      <li><strong>عدم حفظ الصور:</strong> تتم معالجة الصور واستخراج البيانات لحظياً ودون الاحتفاظ بها في خوادم خارجية أو استخدامها في تدريب نماذج الذكاء الاصطناعي أو ربطها بهويتك.</li>\n`;
  html += `      <li><strong>حفظ النتائج محلياً:</strong> تعود النتائج المحللة إلى جهازك مباشرة لتُحفظ في قاعدة البيانات المحلية بهاتفك، وتُحذف الصورة المؤقتة فوراً.</li>\n`;
  html += `    </ul>\n`;
  html += `  </section>\n\n`;

  // Section 4
  html += `  <section class="space-y-3">\n`;
  html += `    <h3 class="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">\n`;
  html += `      <span>4. خدمات الأطراف الثالثة (Third-Party Services)</span>\n`;
  html += `    </h3>\n`;
  html += `    <p class="text-xs sm:text-sm text-slate-700 leading-relaxed mb-2">يعتمد التطبيق على مكتبات وخدمات تقنية معتمدة من Google لضمان أعلى مستويات الأداء والأمان:</p>\n`;
  html += `    <ul class="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-700 pr-1 leading-relaxed">\n`;
  html += `      <li><strong>Google Play Services:</strong> لضمان سلامة تشغيل بيئة أندرويد.</li>\n`;
  html += `      <li><strong>Google Gemini API:</strong> لمعالجة الرؤية الحاسوبية واستخراج نصوص الفواتير بدقة.</li>\n`;
  html += `      <li>تخضع هذه الخدمات لسياسات خصوصية شركة Google الرسمية: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="text-emerald-600 underline font-semibold">سياسة خصوصية Google</a>.</li>\n`;
  html += `    </ul>\n`;
  html += `  </section>\n\n`;

  // Section 5
  html += `  <section class="space-y-3">\n`;
  html += `    <h3 class="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">\n`;
  html += `      <span>5. خصوصية الأطفال (Children's Privacy)</span>\n`;
  html += `    </h3>\n`;
  html += `    <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">\n`;
  html += `      تطبيق <strong>${escapeHtml(appName)}</strong> مخصص للجمهور العام والأفراد المهتمين بإدارة استهلاك الطاقة المنزلية (+13 عاماً). لا نجمع أو نطلب عن قصد أي معلومات أو بيانات شخصية من الأطفال.\n`;
  html += `    </p>\n`;
  html += `  </section>\n\n`;

  // Section 6
  html += `  <section class="space-y-3">\n`;
  html += `    <h3 class="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">\n`;
  html += `      <span>6. الأمان وحماية البيانات (Data Security)</span>\n`;
  html += `    </h3>\n`;
  html += `    <ul class="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-700 pr-1 leading-relaxed">\n`;
  html += `      <li>جميع الاتصالات الشبكية مشفرة بأحدث بروتوكولات التشفير القياسية (SSL/TLS).</li>\n`;
  html += `      <li>البيانات المخزنة محلياً محمية بواسطة نظام العزل والتشفير القياسي المدمج في نظام التشغيل Android.</li>\n`;
  html += `    </ul>\n`;
  html += `  </section>\n\n`;

  // Section 7
  html += `  <section class="space-y-3">\n`;
  html += `    <h3 class="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">\n`;
  html += `      <span>7. التعديلات على سياسة الخصوصية</span>\n`;
  html += `    </h3>\n`;
  html += `    <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">\n`;
  html += `      قد نقوم بتحديث سياسة الخصوصية من وقت لآخر لمواكبة التحديثات البرمجية أو المتطلبات القانونية. سيتم نشر أي تعديلات على هذه الصفحة مع تحديث "تاريخ السريان" في الأعلى، وسيكون ذلك متاحاً دائماً للمعاينة من داخل إعدادات التطبيق.\n`;
  html += `    </p>\n`;
  html += `  </section>\n\n`;

  // Section 8
  html += `  <section class="space-y-3">\n`;
  html += `    <h3 class="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">\n`;
  html += `      <span>8. التواصل والاستفسارات (Contact Us)</span>\n`;
  html += `    </h3>\n`;
  html += `    <p class="text-xs sm:text-sm text-slate-700 leading-relaxed mb-2">\n`;
  html += `      إذا كانت لديك أي استفسارات أو ملاحظات بخصوص سياسة الخصوصية أو إدارة بياناتك، يسعدنا تواصلك معنا:\n`;
  html += `    </p>\n`;
  html += `    <ul class="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-700 pr-1">\n`;
  html += `      <li><strong>اسم التطبيق:</strong> ${escapeHtml(appName)}</li>\n`;
  html += `      <li><strong>البريد الإلكتروني:</strong> <a href="mailto:${escapeHtml(contactEmail)}" class="text-emerald-600 font-semibold underline break-all">${escapeHtml(contactEmail)}</a></li>\n`;
  html += `      <li><strong>الموقع الإلكتروني لسياسة الخصوصية:</strong> <a href="${escapeHtml(privacyUrl)}" target="_blank" rel="noopener noreferrer" class="text-emerald-600 font-semibold underline break-all">${escapeHtml(privacyUrl)}</a></li>\n`;
  html += `    </ul>\n`;
  html += `  </section>\n`;

  html += `</div>\n`;
  return html;
}

export function generateEnglishPolicyHtml(config: AppConfig): string {
  const effectiveDateStr = "September 18, 2026";
  const lastUpdatedStr = "September 2026";
  const appName = config.appName || "VoltWise (ترشيد)";
  const contactEmail = config.contactEmail || "aabufaisal49@gmail.com";
  const privacyUrl = config.supportWebsite || "https://volt-wise-privacy-policy.vercel.app/";

  let html = "";
  html += `<div class="policy-english space-y-7 text-left" style="direction: ltr; text-align: left;">\n`;
  
  // Header / Title & Dates
  html += `  <div class="border-b-2 border-slate-900 pb-5 mb-6">\n`;
  html += `    <h1 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-950 tracking-normal leading-snug mb-3">Privacy Policy for ${escapeHtml(appName)}</h1>\n`;
  html += `    <div class="flex flex-wrap gap-2.5 sm:gap-4 text-xs font-semibold text-slate-600">\n`;
  html += `      <span class="bg-slate-100 px-3 py-1 rounded-md border border-slate-200 whitespace-nowrap"><strong>Effective Date:</strong> ${effectiveDateStr}</span>\n`;
  html += `      <span class="bg-slate-100 px-3 py-1 rounded-md border border-slate-200 whitespace-nowrap"><strong>Last Updated:</strong> ${lastUpdatedStr}</span>\n`;
  html += `    </div>\n`;
  html += `  </div>\n\n`;

  // Introduction
  html += `  <div class="text-xs sm:text-sm leading-relaxed text-slate-800 bg-slate-50/90 p-4 sm:p-5 rounded-xl border border-slate-200 space-y-2">\n`;
  html += `    <p>Welcome to <strong>${escapeHtml(appName)}</strong>, the specialized tool for auditing and managing electrical energy consumption, scanning electricity bills, and evaluating household appliance efficiency.</p>\n`;
  html += `    <p>We place your privacy and data security at the very top of our priorities, and we are fully committed to complete transparency regarding how information and requested device permissions are handled by the application.</p>\n`;
  html += `  </div>\n\n`;

  // Section 1
  html += `  <section class="space-y-3">\n`;
  html += `    <h3 class="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">\n`;
  html += `      <span>1. Offline-First Local Storage Principle</span>\n`;
  html += `    </h3>\n`;
  html += `    <ul class="list-disc list-inside space-y-2.5 text-xs sm:text-sm text-slate-700 pl-1 leading-relaxed">\n`;
  html += `      <li><strong>100% Local Storage:</strong> All your data regarding electricity bill records, household appliance specifications, power calculations, and consumption allocations are stored locally inside your device’s memory via a secure and encrypted local database (<code class="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-xs">Android Room Database</code>).</li>\n`;
  html += `      <li><strong>No External Storage Servers:</strong> We do not create user accounts, maintain cloud servers to store or track your bills, nor do we collect, sell, or share your consumption metrics with any third parties whatsoever.</li>\n`;
  html += `      <li><strong>Full Control Over Your Data:</strong> You can at any time, directly through the in-app Settings screen, export your data or delete it entirely, immediately, and permanently from your device.</li>\n`;
  html += `    </ul>\n`;
  html += `  </section>\n\n`;

  // Section 2
  html += `  <section class="space-y-3">\n`;
  html += `    <h3 class="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">\n`;
  html += `      <span>2. Required Device Permissions &amp; Purposes (Device Permissions)</span>\n`;
  html += `    </h3>\n`;
  html += `    <p class="text-xs sm:text-sm text-slate-700 mb-2">The application requests only the minimum necessary permissions required to perform its core functions in compliance with Google Play policies:</p>\n`;
  html += `    <div class="space-y-3.5 pl-1 text-xs sm:text-sm text-slate-700 leading-relaxed">\n`;
  html += `      <div class="bg-slate-50/60 p-3.5 rounded-lg border border-slate-200">\n`;
  html += `        <p class="font-bold text-slate-900 mb-1">1. Camera Permission (<code class="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-xs">CAMERA</code>):</p>\n`;
  html += `        <ul class="list-disc list-inside space-y-1 ml-3 text-slate-700">\n`;
  html += `          <li><strong>Purpose:</strong> Enables live viewfinder preview (via CameraX) to quickly and clearly capture photos of electricity bills and appliance energy efficiency labels.</li>\n`;
  html += `          <li><strong>Usage:</strong> The camera is accessed strictly when you navigate to scanning screens, offering direct controls (flash toggle and camera switching). No video is ever recorded, and the camera is never operated in the background.</li>\n`;
  html += `        </ul>\n`;
  html += `      </div>\n`;

  html += `      <div class="bg-slate-50/60 p-3.5 rounded-lg border border-slate-200">\n`;
  html += `        <p class="font-bold text-slate-900 mb-1">2. Photo Picker &amp; Document Storage (Photo Picker / File Storage):</p>\n`;
  html += `        <ul class="list-disc list-inside space-y-1 ml-3 text-slate-700">\n`;
  html += `          <li><strong>Purpose:</strong> Enables you to upload bill photos or PDF electricity bill documents stored on your phone for analysis.</li>\n`;
  html += `          <li><strong>Security:</strong> We utilize the secure Android Photo Picker, ensuring the app only reads the specific file you select without accessing your broader photos or storage files.</li>\n`;
  html += `        </ul>\n`;
  html += `      </div>\n`;

  html += `      <div class="bg-slate-50/60 p-3.5 rounded-lg border border-slate-200">\n`;
  html += `        <p class="font-bold text-slate-900 mb-1">3. Internet &amp; Network Connectivity (<code class="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-xs">INTERNET</code> &amp; <code class="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-xs">ACCESS_NETWORK_STATE</code>):</p>\n`;
  html += `        <ul class="list-disc list-inside space-y-1 ml-3 text-slate-700">\n`;
  html += `          <li><strong>Purpose:</strong> Establishes a secure, encrypted connection to Google Gemini AI to extract bill text and numerical figures, and fetches official updates for electricity tariff tiers and utility rates in your region (Saudi Arabia, Oman, UAE, etc.).</li>\n`;
  html += `        </ul>\n`;
  html += `      </div>\n`;

  html += `      <div class="bg-slate-50/60 p-3.5 rounded-lg border border-slate-200">\n`;
  html += `        <p class="font-bold text-slate-900 mb-1">4. Vibration (<code class="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-xs">VIBRATE</code>):</p>\n`;
  html += `        <ul class="list-disc list-inside space-y-1 ml-3 text-slate-700">\n`;
  html += `          <li><strong>Purpose:</strong> Delivers interactive haptic feedback when capturing a photo or completing a scan to confirm the action to the user.</li>\n`;
  html += `        </ul>\n`;
  html += `      </div>\n`;
  html += `    </div>\n`;
  html += `  </section>\n\n`;

  // Section 3
  html += `  <section class="space-y-3">\n`;
  html += `    <h3 class="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">\n`;
  html += `      <span>3. AI &amp; Cloud Processing (AI &amp; Image Processing)</span>\n`;
  html += `    </h3>\n`;
  html += `    <ul class="list-disc list-inside space-y-2.5 text-xs sm:text-sm text-slate-700 pl-1 leading-relaxed">\n`;
  html += `      <li><strong>Transient Processing Only:</strong> When you capture a bill or energy efficiency label, the image is transmitted over an encrypted connection (HTTPS/TLS) to the official <strong>Google Gemini API</strong> to analyze text and extract meter readings, amounts, and consumption details.</li>\n`;
  html += `      <li><strong>No Image Retention:</strong> Images are processed and data is extracted instantaneously without being retained on external servers, used to train AI models, or linked to your personal identity.</li>\n`;
  html += `      <li><strong>Local Result Storage:</strong> Analyzed results are returned directly to your device and saved into your on-device local database; temporary image files are deleted immediately.</li>\n`;
  html += `    </ul>\n`;
  html += `  </section>\n\n`;

  // Section 4
  html += `  <section class="space-y-3">\n`;
  html += `    <h3 class="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">\n`;
  html += `      <span>4. Third-Party Services</span>\n`;
  html += `    </h3>\n`;
  html += `    <p class="text-xs sm:text-sm text-slate-700 leading-relaxed mb-2">The application relies on trusted, official Google technical libraries and services to guarantee optimal performance, reliability, and security:</p>\n`;
  html += `    <ul class="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-700 pl-1 leading-relaxed">\n`;
  html += `      <li><strong>Google Play Services:</strong> To ensure the stability and integrity of the Android runtime environment.</li>\n`;
  html += `      <li><strong>Google Gemini API:</strong> For computer vision processing and precise utility bill text extraction.</li>\n`;
  html += `      <li>These services are governed by Google's official privacy policies: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="text-emerald-600 underline font-semibold">Google Privacy Policy</a>.</li>\n`;
  html += `    </ul>\n`;
  html += `  </section>\n\n`;

  // Section 5
  html += `  <section class="space-y-3">\n`;
  html += `    <h3 class="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">\n`;
  html += `      <span>5. Children's Privacy</span>\n`;
  html += `    </h3>\n`;
  html += `    <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">\n`;
  html += `      <strong>${escapeHtml(appName)}</strong> is intended for a general audience and individuals interested in managing household energy consumption (ages 13 and above). We do not knowingly collect or solicit personal information from children under 13.</li>\n`;
  html += `    </p>\n`;
  html += `  </section>\n\n`;

  // Section 6
  html += `  <section class="space-y-3">\n`;
  html += `    <h3 class="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">\n`;
  html += `      <span>6. Data Security &amp; Protection</span>\n`;
  html += `    </h3>\n`;
  html += `    <ul class="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-700 pl-1 leading-relaxed">\n`;
  html += `      <li>All network communications are encrypted using modern standard encryption protocols (SSL/TLS).</li>\n`;
  html += `      <li>Data stored locally is shielded and isolated by standard Android sandboxing and system-level encryption mechanisms.</li>\n`;
  html += `    </ul>\n`;
  html += `  </section>\n\n`;

  // Section 7
  html += `  <section class="space-y-3">\n`;
  html += `    <h3 class="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">\n`;
  html += `      <span>7. Changes to This Privacy Policy</span>\n`;
  html += `    </h3>\n`;
  html += `    <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">\n`;
  html += `      We may update our Privacy Policy from time to time to keep pace with software enhancements or legal requirements. Any modifications will be posted on this page with an updated "Effective Date" at the top, and will always remain available for review within the application settings.\n`;
  html += `    </p>\n`;
  html += `  </section>\n\n`;

  // Section 8
  html += `  <section class="space-y-3">\n`;
  html += `    <h3 class="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">\n`;
  html += `      <span>8. Contact Us &amp; Inquiries (Contact Us)</span>\n`;
  html += `    </h3>\n`;
  html += `    <p class="text-xs sm:text-sm text-slate-700 leading-relaxed mb-2">\n`;
  html += `      If you have any questions or feedback regarding this Privacy Policy or managing your data, please contact us:\n`;
  html += `    </p>\n`;
  html += `    <ul class="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-700 pl-1">\n`;
  html += `      <li><strong>Application Name:</strong> ${escapeHtml(appName)}</li>\n`;
  html += `      <li><strong>Email:</strong> <a href="mailto:${escapeHtml(contactEmail)}" class="text-emerald-600 font-semibold underline break-all">${escapeHtml(contactEmail)}</a></li>\n`;
  html += `      <li><strong>Privacy Policy Website:</strong> <a href="${escapeHtml(privacyUrl)}" target="_blank" rel="noopener noreferrer" class="text-emerald-600 font-semibold underline break-all">${escapeHtml(privacyUrl)}</a></li>\n`;
  html += `    </ul>\n`;
  html += `  </section>\n`;

  html += `</div>\n`;
  return html;
}

export function generateBilingualPolicyHtml(config: AppConfig): string {
  let html = "";
  html += `<div class="bilingual-policy space-y-12">\n`;
  html += `  <!-- 1. Arabic Version Section (Top / أعلى الصفحة) -->\n`;
  html += `  <section id="arabic-policy" class="bg-white rounded-xl">\n`;
  html += generateArabicPolicyHtml(config);
  html += `  </section>\n\n`;
  html += `  <!-- Divider -->\n`;
  html += `  <hr class="my-12 sm:my-16 border-t-2 border-slate-200" />\n\n`;
  html += `  <!-- 2. English Version Section (Below / أسفل الصفحة) -->\n`;
  html += `  <section id="english-policy" class="bg-white rounded-xl" dir="ltr">\n`;
  html += generateEnglishPolicyHtml(config);
  html += `  </section>\n`;
  html += `</div>\n`;
  return html;
}

export function generateCompleteIndexHtml(config: AppConfig): string {
  const bodyContent = generatePolicyHtml(config);
  const appName = escapeHtml(config.appName || "ترشيد (VoltWise)");
  const effectiveDate = escapeHtml(config.effectiveDate || "18 سبتمبر 2026");

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>سياسة الخصوصية - ${appName} | Privacy Policy</title>
  <meta name="description" content="وثيقة سياسة الخصوصية المعتمدة لتطبيق ${appName} - Official Privacy Policy for ${appName} Application.">
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
      word-break: keep-all;
      overflow-wrap: break-word;
      hyphens: none;
      -webkit-hyphens: none;
    }
    .policy-arabic {
      word-break: keep-all;
      overflow-wrap: break-word;
      hyphens: none;
      -webkit-hyphens: none;
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
    @media (max-width: 640px) {
      body {
        padding: 20px 12px;
      }
      .container {
        padding: 24px 18px;
      }
      h1 {
        font-size: 1.45rem !important;
      }
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
