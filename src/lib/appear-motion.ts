/**
 * Lightweight scroll-appear presets.
 * Avoid CSS filter:blur — it forces expensive layer paints while Lenis scrolls.
 */
export const easeOut = [0.22, 1, 0.36, 1] as const;

export const appearHidden = {
  opacity: 0,
  y: 14,
} as const;

export const appearVisible = {
  opacity: 1,
  y: 0,
} as const;

export const appearTransition = {
  duration: 0.55,
  ease: easeOut,
} as const;
