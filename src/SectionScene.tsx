import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { SECTION_COLORS } from "./constants";
import type { SectionData } from "./constants";

const BulletItem: React.FC<{
  text: string;
  index: number;
  accentColor: string;
  fps: number;
  frame: number;
}> = ({ text, index, accentColor, fps, frame }) => {
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

  // Dot pulse
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
        gap: 20,
        opacity,
        transform: `translateX(${translateX}px)`,
        marginBottom: 18,
      }}
    >
      {/* Bullet dot */}
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          backgroundColor: accentColor,
          flexShrink: 0,
          transform: `scale(${dotScale})`,
          boxShadow: `0 0 12px ${accentColor}60`,
        }}
      />
      {/* Text */}
      <div
        style={{
          fontSize: 40,
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
  const { fps } = useVideoConfig();
  const colors = SECTION_COLORS[data.number - 1];

  // Section number animation
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

  // Title animations
  const titleY = interpolate(frame, [10, 35], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const titleOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle
  const subtitleOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleY = interpolate(frame, [25, 40], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Decorative line
  const lineWidth = interpolate(frame, [20, 50], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Floating accent orb
  const orbY = Math.sin(frame * 0.04) * 30;
  const orbX = Math.cos(frame * 0.03) * 20;

  // Background grid dots
  const gridDots = Array.from({ length: 15 }, (_, i) => {
    const row = Math.floor(i / 5);
    const col = i % 5;
    const dotOpacity =
      0.04 + Math.sin(frame * 0.03 + i * 0.5) * 0.03;
    return {
      x: 150 + col * 200,
      y: 300 + row * 500,
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
        justifyContent: "flex-start",
        alignItems: "center",
        direction: "rtl",
        padding: "80px 60px",
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
          top: 200,
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.glow}, transparent 70%)`,
          transform: `translate(${orbX}px, ${orbY}px)`,
        }}
      />

      {/* Large section number watermark */}
      <div
        style={{
          position: "absolute",
          right: 60,
          top: 80,
          fontSize: 300,
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
          gap: 16,
          marginBottom: 30,
          marginTop: 100,
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 14,
            background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}aa)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
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
            fontSize: 30,
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
          fontSize: 64,
          fontWeight: 900,
          color: "#ffffff",
          fontFamily: "sans-serif",
          textAlign: "center",
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          marginBottom: 10,
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
          marginBottom: 50,
          borderRadius: 2,
        }}
      />

      {/* Subtitle description */}
      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          marginBottom: 40,
        }}
      />

      {/* Bullets */}
      <div
        style={{
          width: "100%",
          maxWidth: 850,
          paddingRight: 20,
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
