import { useVideoConfig } from "remotion";

/**
 * Responsive scaling hook — adapts sizes from the base 1080×1920 portrait
 * design to any composition dimensions.
 */
export function useScale() {
  const { width, height, fps } = useVideoConfig();
  const s = height / 1920;
  const isPortrait = height > width;

  return {
    /** Scale a font size — clamped so text stays large and readable */
    f: (size: number) => Math.round(size * Math.max(s, 0.78)),
    /** Scale a spacing value — tighter for non-portrait */
    sp: (size: number) => Math.round(size * (isPortrait ? s : s * 0.6)),
    /** Center X */
    cx: width / 2,
    /** Center Y */
    cy: height / 2,
    /** Raw height scale */
    s,
    /** True for 9:16 portrait layout */
    isPortrait,
    width,
    height,
    fps,
  };
}
