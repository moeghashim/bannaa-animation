const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("Error: Set OPENAI_API_KEY environment variable first.");
  console.error("  export OPENAI_API_KEY=sk-proj-...");
  process.exit(1);
}

const openai = new OpenAI({ apiKey });

const audioDir = path.join(__dirname, "public", "audio");
fs.mkdirSync(audioDir, { recursive: true });

const sections = [
  {
    name: "intro",
    text: "Vibe Coding. دليلك للبرمجة بالذكاء الاصطناعي.",
  },
  {
    name: "section1",
    text: "ما هو Vibe Coding؟ ببساطة… أنت تُوجّه… والذكاء ينفّذ. برمجة بدون كود كثير. الفكرة أهم من التقنية. قل ماذا أريد؟ بوضوح. ثم جرّب بسرعة. عدّل… وكرر.",
  },
  {
    name: "section2",
    text: "العقلية الصحيحة لغير المبرمجين. عقلية النجاح. لا تبدأ من الصفر. ابدأ بنموذج صغير. لا تبحث عن الكمال. الأخطاء تساوي معلومات. خطوة… ثم خطوة. اسأل: لماذا لم يعمل؟",
  },
  {
    name: "section3",
    text: "طريقة كتابة البرومبت مثل محترف. برومبت ذكي يساوي نتائج قوية. اكتب الهدف في سطر. حدّد المنصة: ويب، تطبيق، أو بوت. اذكر المدخلات والمخرجات. اذكر القيود: لغة، وقت، تصميم. اطلب أمثلة. اطلب خطوات تشغيل. اطلب اختبار بسيط.",
  },
  {
    name: "section4",
    text: "بناء مشروع صغير خلال عشر دقائق. مشروعك الأول. اختر فكرة واحدة. مثال: صفحة هبوط. أقسام: عنوان، وصف، زر. نموذج تواصل بسيط. ألوان وخط واضح. تشغيل محلي. نشر سريع.",
  },
  {
    name: "section5",
    text: "التصحيح والتحسين والتسليم. من يعمل إلى ممتاز. جرّب… ثم لاحظ. وصف المشكلة بدقة. انسخ رسالة الخطأ. اطلب إصلاح محدد. حسّن الأداء. حسّن التصميم. وثّق الخطوات. سلّم نسخة نهائية.",
  },
  {
    name: "outro",
    text: "ابدأ الآن. الفكرة عندك… والذكاء الاصطناعي يحوّلها إلى حقيقة.",
  },
];

async function generateAll() {
  console.log(`Generating ${sections.length} audio files...\n`);

  for (const section of sections) {
    const filePath = path.join(audioDir, `${section.name}.mp3`);

    if (fs.existsSync(filePath)) {
      console.log(`  Skipping ${section.name}.mp3 (already exists)`);
      continue;
    }

    console.log(`  Generating: ${section.name}.mp3...`);
    try {
      const response = await openai.audio.speech.create({
        model: "tts-1-hd",
        input: section.text,
        voice: "onyx",
        response_format: "mp3",
        speed: 0.95,
      });

      const buffer = Buffer.from(await response.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      console.log(`  Saved: ${section.name}.mp3 (${(buffer.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`  Error for ${section.name}:`, err.message);
    }
  }

  console.log("\nDone! Audio files are in public/audio/");
  console.log("Now run: npm run render");
}

generateAll();
