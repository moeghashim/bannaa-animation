import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { COLORS } from "./constants";
import { useScale } from "./useScale";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { f, sp, cx, cy, fps, width, height } = useScale();

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
    delay: 10,
  });

  const titleOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleY = interpolate(frame, [40, 60], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const lineWidth = interpolate(frame, [25, 55], [0, sp(300)], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const glowPulse = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.3, 0.7, 0.3],
    { extrapolateRight: "clamp" }
  );

  // Floating particles — positions relative to center
  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    const baseRadius = Math.min(width, height) * 0.15;
    const radius = baseRadius + Math.sin(frame * 0.03 + i) * (baseRadius * 0.4);
    const x = cx + Math.cos(angle + frame * 0.01) * radius;
    const y = cy + Math.sin(angle + frame * 0.01) * radius;
    const size = 3 + Math.sin(frame * 0.05 + i * 2) * 2;
    const opacity = 0.2 + Math.sin(frame * 0.04 + i) * 0.15;
    return { x, y, size, opacity };
  });

  const fadeOut = interpolate(frame, [fps * 4, fps * 5], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
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
        opacity: fadeOut,
      }}
    >
      {/* Glow orb */}
      <div
        style={{
          position: "absolute",
          width: sp(400),
          height: sp(400),
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accent}${Math.round(glowPulse * 40).toString(16).padStart(2, "0")}, transparent 70%)`,
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
            backgroundColor: COLORS.accentLight,
            opacity: p.opacity * fadeOut,
          }}
        />
      ))}

      {/* Main title */}
      <div
        style={{
          fontSize: f(90),
          fontWeight: 900,
          color: COLORS.white,
          fontFamily: "sans-serif",
          textAlign: "center",
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
          textShadow: `0 0 40px ${COLORS.accentGlow}`,
          lineHeight: 1.3,
        }}
      >
        <span style={{ color: COLORS.accent }}>Vibe</span> Coding
      </div>

      {/* Divider line */}
      <div
        style={{
          width: lineWidth,
          height: 4,
          background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`,
          marginTop: sp(30),
          marginBottom: sp(30),
          borderRadius: 2,
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          fontSize: f(44),
          color: COLORS.textSecondary,
          fontFamily: "sans-serif",
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        دليلك للبرمجة بالذكاء الاصطناعي
      </div>
    </div>
  );
};
