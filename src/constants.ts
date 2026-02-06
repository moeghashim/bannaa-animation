export const COLORS = {
  darkBg: "#0a0a1a",
  cardBg: "#12122a",
  accent: "#6c5ce7",
  accentLight: "#a29bfe",
  accentGlow: "#6c5ce740",
  gold: "#fdcb6e",
  white: "#ffffff",
  textSecondary: "#b2b2cc",
  gradientStart: "#0a0a1a",
  gradientMid: "#1a1a3e",
  gradientEnd: "#0d0d2b",
  green: "#00b894",
  pink: "#fd79a8",
  orange: "#e17055",
  blue: "#74b9ff",
  cyan: "#81ecec",
};

export const SECTION_COLORS = [
  { accent: "#6c5ce7", glow: "#6c5ce740", bg: "#12122a" },
  { accent: "#00b894", glow: "#00b89440", bg: "#0a1f1a" },
  { accent: "#fdcb6e", glow: "#fdcb6e40", bg: "#1a1708" },
  { accent: "#fd79a8", glow: "#fd79a840", bg: "#1a0a14" },
  { accent: "#74b9ff", glow: "#74b9ff40", bg: "#0a141a" },
];

export const FPS = 30;

export const SECTION_DURATION = 14 * FPS; // 14 seconds per section
export const TRANSITION_DURATION = 15; // frames for transitions
export const INTRO_DURATION = 5 * FPS; // 5 second intro

export type SectionData = {
  number: number;
  title: string;
  subtitle: string;
  bullets: string[];
};

export const SECTIONS: SectionData[] = [
  {
    number: 1,
    title: "Vibe Coding ببساطة",
    subtitle: "ما هو Vibe Coding؟",
    bullets: [
      "أنت تُوجّه… والذكاء ينفّذ",
      "برمجة بدون \"كود\" كثير",
      "الفكرة أهم من التقنية",
      'قل "ماذا أريد؟" بوضوح',
      "ثم جرّب بسرعة",
      "عدّل… وكرر",
    ],
  },
  {
    number: 2,
    title: "عقلية النجاح",
    subtitle: "العقلية الصحيحة لغير المبرمجين",
    bullets: [
      "لا تبدأ من الصفر",
      'ابدأ "بنموذج صغير"',
      "لا تبحث عن الكمال",
      "الأخطاء = معلومات",
      "خطوة… ثم خطوة",
      'اسأل: "لماذا لم يعمل؟"',
    ],
  },
  {
    number: 3,
    title: "برومبت ذكي = نتائج قوية",
    subtitle: "طريقة كتابة البرومبت مثل محترف",
    bullets: [
      "اكتب الهدف في سطر",
      "حدّد المنصة: ويب / تطبيق / بوت",
      "اذكر المدخلات والمخرجات",
      "اذكر القيود: لغة، وقت، تصميم",
      "اطلب أمثلة",
      "اطلب خطوات تشغيل",
      "اطلب اختبار بسيط",
    ],
  },
  {
    number: 4,
    title: "مشروعك الأول",
    subtitle: "بناء مشروع صغير خلال 10 دقائق",
    bullets: [
      "اختر فكرة واحدة",
      'مثال: "صفحة هبوط"',
      "أقسام: عنوان، وصف، زر",
      "نموذج تواصل بسيط",
      "ألوان وخط واضح",
      "تشغيل محلي",
      "نشر سريع",
    ],
  },
  {
    number: 5,
    title: 'من "يعمل" إلى "ممتاز"',
    subtitle: "التصحيح والتحسين والتسليم",
    bullets: [
      "جرّب… ثم لاحظ",
      "وصف المشكلة بدقة",
      "انسخ رسالة الخطأ",
      "اطلب إصلاح محدد",
      "حسّن الأداء",
      "حسّن التصميم",
      "وثّق الخطوات",
      "سلّم نسخة نهائية",
    ],
  },
];
