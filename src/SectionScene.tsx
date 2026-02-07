import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { SECTION_COLORS } from "./constants";
import type { SectionData } from "./constants";
import { useScale } from "./useScale";

const BulletItem: React.FC<{
  text: string;
  index: number;
  accentColor: string;
  fps: number;
  frame: number;
  fontSize: number;
  dotSize: number;
  gap: number;
  marginBottom: number;
}> = ({ text, index, accentColor, fps, frame, fontSize, dotSize, gap, marginBottom }) => {
  const delay = 50 + index * 12;

  const slideIn = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 120 },
    delay,
  });

  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateX = interpolate(slideIn, [0, 1], [-60, 0]);

  const dotScale = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 200 },
    delay: delay + 5,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap,
        opacity,
        transform: `translateX(${translateX}px)`,
        marginBottom,
      }}
    >
      <div
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          backgroundColor: accentColor,
          flexShrink: 0,
          transform: `scale(${dotScale})`,
          boxShadow: `0 0 12px ${accentColor}60`,
        }}
      />
      <div
        style={{
          fontSize,
          color: "#e0e0f0",
          fontFamily: "sans-serif",
          lineHeight: 1.5,
          textAlign: "right",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const SectionScene: React.FC<{ data: SectionData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { f, sp, cx, cy, fps, width, height, isPortrait } = useScale();
  const colors = SECTION_COLORS[data.number - 1];

  const numberScale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 100 },
    delay: 5,
  });

  const numberOpacity = interpolate(frame, [5, 20], [0, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [10, 35], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const titleOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lineWidth = interpolate(frame, [20, 50], [0, sp(200)], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const orbY = Math.sin(frame * 0.04) * 30;
  const orbX = Math.cos(frame * 0.03) * 20;

  // Background grid — responsive positions
  const gridDots = Array.from({ length: 15 }, (_, i) => {
    const row = Math.floor(i / 5);
    const col = i % 5;
    const dotOpacity = 0.04 + Math.sin(frame * 0.03 + i * 0.5) * 0.03;
    return {
      x: width * 0.14 + col * (width * 0.18),
      y: height * 0.16 + row * (height * 0.26),
      opacity: dotOpacity,
    };
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(170deg, ${colors.bg}, #0a0a1a 60%, #08081a)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: isPortrait ? "flex-start" : "center",
        alignItems: "center",
        direction: "rtl",
        padding: isPortrait ? `${sp(80)}px ${sp(60)}px` : `30px 60px`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      {gridDots.map((dot, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: dot.x,
            top: dot.y,
            width: 4,
            height: 4,
            borderRadius: "50%",
            backgroundColor: colors.accent,
            opacity: dot.opacity,
          }}
        />
      ))}

      {/* Floating orb */}
      <div
        style={{
          position: "absolute",
          left: -60,
          top: sp(200),
          width: sp(250),
          height: sp(250),
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.glow}, transparent 70%)`,
          transform: `translate(${orbX}px, ${orbY}px)`,
        }}
      />

      {/* Large section number watermark */}
      <div
        style={{
          position: "absolute",
          right: sp(60),
          top: sp(80),
          fontSize: f(300),
          fontWeight: 900,
          color: colors.accent,
          opacity: numberOpacity,
          fontFamily: "sans-serif",
          transform: `scale(${numberScale})`,
          lineHeight: 1,
        }}
      >
        {data.number}
      </div>

      {/* Section badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: sp(16),
          marginBottom: isPortrait ? sp(30) : 12,
          marginTop: isPortrait ? sp(100) : 0,
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            width: f(50),
            height: f(50),
            borderRadius: f(14),
            background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}aa)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: f(26),
            fontWeight: 800,
            color: "#fff",
            fontFamily: "sans-serif",
            boxShadow: `0 4px 20px ${colors.glow}`,
          }}
        >
          {data.number}
        </div>
        <div
          style={{
            fontSize: f(30),
            color: colors.accent,
            fontFamily: "sans-serif",
            fontWeight: 600,
          }}
        >
          {data.subtitle}
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: f(64),
          fontWeight: 900,
          color: "#ffffff",
          fontFamily: "sans-serif",
          textAlign: "center",
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          marginBottom: sp(10),
          lineHeight: 1.4,
          textShadow: `0 0 30px ${colors.glow}`,
        }}
      >
        {data.title}
      </div>

      {/* Divider */}
      <div
        style={{
          width: lineWidth,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
          marginBottom: isPortrait ? sp(50) : 16,
          borderRadius: 2,
        }}
      />

      {/* Bullets */}
      <div
        style={{
          width: "100%",
          maxWidth: isPortrait ? Math.min(width * 0.85, 850) : Math.min(width * 0.7, 1200),
          paddingRight: sp(20),
        }}
      >
        {data.bullets.map((bullet, i) => (
          <BulletItem
            key={i}
            text={bullet}
            index={i}
            accentColor={colors.accent}
            fps={fps}
            frame={frame}
            fontSize={f(40)}
            dotSize={f(14)}
            gap={sp(20)}
            marginBottom={sp(18)}
          />
        ))}
      </div>

      {/* Bottom accent bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
          opacity: interpolate(frame, [30, 60], [0, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </div>
  );
};
