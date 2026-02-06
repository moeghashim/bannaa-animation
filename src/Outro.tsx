import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
} from "remotion";
import { COLORS } from "./constants";
import { useScale } from "./useScale";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { f, sp, cx, cy, fps, width, height } = useScale();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
    delay: 10,
  });

  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleY = interpolate(frame, [30, 50], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowPulse = interpolate(
    frame % 90,
    [0, 45, 90],
    [0.3, 0.8, 0.3],
    { extrapolateRight: "clamp" }
  );

  // Converging particles — responsive center
  const particles = Array.from({ length: 30 }, (_, i) => {
    const angle = (i / 30) * Math.PI * 2;
    const baseRadius = Math.min(width, height) * 0.35;
    const progress = Math.min(1, frame / (fps * 2));
    const radius = baseRadius * (1 - progress * 0.6) + Math.sin(frame * 0.02 + i) * 30;
    const x = cx + Math.cos(angle + frame * 0.008) * radius;
    const y = cy + Math.sin(angle + frame * 0.008) * radius;
    const size = 2 + Math.sin(frame * 0.05 + i * 3) * 1.5;
    const opacity = 0.15 + progress * 0.2;
    return { x, y, size, opacity };
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `radial-gradient(circle at 50% 50%, ${COLORS.gradientMid}, ${COLORS.darkBg})`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        direction: "rtl",
        opacity: fadeIn,
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: sp(500),
          height: sp(500),
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}${Math.round(glowPulse * 30).toString(16).padStart(2, "0")}, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: i % 3 === 0 ? COLORS.gold : COLORS.accentLight,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Main text */}
      <div
        style={{
          fontSize: f(80),
          fontWeight: 900,
          color: COLORS.white,
          fontFamily: "sans-serif",
          textAlign: "center",
          transform: `scale(${titleScale})`,
          textShadow: `0 0 40px ${COLORS.accentGlow}`,
          lineHeight: 1.4,
          marginBottom: sp(30),
        }}
      >
        ابدأ الآن
      </div>

      {/* Divider */}
      <div
        style={{
          width: interpolate(frame, [20, 50], [0, sp(250)], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: 4,
          background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.accent}, ${COLORS.gold})`,
          borderRadius: 2,
          marginBottom: sp(40),
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          fontSize: f(42),
          color: COLORS.textSecondary,
          fontFamily: "sans-serif",
          textAlign: "center",
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          lineHeight: 1.8,
          maxWidth: Math.min(width * 0.85, 800),
        }}
      >
        الفكرة عندك… والذكاء الاصطناعي
        <br />
        <span style={{ color: COLORS.accent, fontWeight: 700 }}>
          يحوّلها إلى حقيقة
        </span>
      </div>

      {/* Hashtag */}
      <div
        style={{
          fontSize: f(34),
          color: COLORS.gold,
          fontFamily: "sans-serif",
          marginTop: sp(60),
          opacity: interpolate(frame, [50, 70], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          fontWeight: 700,
          direction: "ltr",
        }}
      >
        #VibeCoding
      </div>
    </div>
  );
};
