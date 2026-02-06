import { useVideoConfig } from "remotion";

/**
 * Responsive scaling hook — adapts sizes from the base 1080×1920 portrait
 * design to any composition dimensions.
 */
export function useScale() {
  const { width, height, fps } = useVideoConfig();
  const s = height / 1920;

  return {
    /** Scale a font size — clamped so text stays readable */
    f: (size: number) => Math.round(size * Math.max(s, 0.6)),
    /** Scale a spacing/position value — proportional to height */
    sp: (size: number) => Math.round(size * s),
    /** Center X */
    cx: width / 2,
    /** Center Y */
    cy: height / 2,
    /** Raw height scale (1.0 for portrait, ~0.56 for square/landscape) */
    s,
    width,
    height,
    fps,
  };
}
