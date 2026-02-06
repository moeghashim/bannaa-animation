#!/bin/bash
# Generate Arabic TTS audio using espeak-ng (local, no API key needed)
# Enhanced with ffmpeg audio processing for better quality

set -e

AUDIO_DIR="public/audio"
mkdir -p "$AUDIO_DIR"

# espeak-ng settings for Arabic
VOICE="ar"
SPEED=130      # Words per minute (slower = clearer)
PITCH=35       # Pitch (0-99)
AMPLITUDE=100  # Volume

generate() {
  local name="$1"
  local text="$2"
  local wav_file="/tmp/${name}.wav"
  local mp3_file="${AUDIO_DIR}/${name}.mp3"

  echo "  Generating: ${name}..."

  # Generate raw WAV with espeak-ng
  espeak-ng -v "$VOICE" -s "$SPEED" -p "$PITCH" -a "$AMPLITUDE" \
    -w "$wav_file" "$text" 2>/dev/null

  # Enhance with ffmpeg: normalize, add warmth, convert to mp3
  ffmpeg -y -i "$wav_file" \
    -af "aresample=44100,equalizer=f=200:t=q:w=1:g=3,equalizer=f=3000:t=q:w=1:g=-2,acompressor=threshold=-20dB:ratio=4:attack=5:release=50,loudnorm=I=-16:LRA=11:TP=-1.5" \
    -codec:a libmp3lame -b:a 192k \
    "$mp3_file" 2>/dev/null

  rm -f "$wav_file"

  local size=$(du -h "$mp3_file" | cut -f1)
  echo "    Saved: ${mp3_file} (${size})"
}

echo "Generating Arabic audio files with espeak-ng..."
echo ""

generate "intro" "Vibe Coding. دليلك للبرمجة بالذكاء الاصطناعي."

generate "section1" "ما هو Vibe Coding؟ ببساطة، أنت تُوجّه، والذكاء ينفّذ. برمجة بدون كود كثير. الفكرة أهم من التقنية. قل ماذا أريد بوضوح. ثم جرّب بسرعة. عدّل، وكرر."

generate "section2" "العقلية الصحيحة لغير المبرمجين. عقلية النجاح. لا تبدأ من الصفر. ابدأ بنموذج صغير. لا تبحث عن الكمال. الأخطاء تساوي معلومات. خطوة، ثم خطوة. اسأل، لماذا لم يعمل؟"

generate "section3" "طريقة كتابة البرومبت مثل محترف. برومبت ذكي يساوي نتائج قوية. اكتب الهدف في سطر. حدّد المنصة، ويب، تطبيق، أو بوت. اذكر المدخلات والمخرجات. اذكر القيود، لغة، وقت، تصميم. اطلب أمثلة. اطلب خطوات تشغيل. اطلب اختبار بسيط."

generate "section4" "بناء مشروع صغير خلال عشر دقائق. مشروعك الأول. اختر فكرة واحدة. مثال، صفحة هبوط. أقسام، عنوان، وصف، زر. نموذج تواصل بسيط. ألوان وخط واضح. تشغيل محلي. نشر سريع."

generate "section5" "التصحيح والتحسين والتسليم. من يعمل إلى ممتاز. جرّب، ثم لاحظ. وصف المشكلة بدقة. انسخ رسالة الخطأ. اطلب إصلاح محدد. حسّن الأداء. حسّن التصميم. وثّق الخطوات. سلّم نسخة نهائية."

generate "outro" "ابدأ الآن. الفكرة عندك، والذكاء الاصطناعي يحوّلها إلى حقيقة."

echo ""
echo "Done! All audio files are in ${AUDIO_DIR}/"
echo ""
echo "Tip: For higher quality, run 'npm run generate-audio' with an OpenAI API key instead."
