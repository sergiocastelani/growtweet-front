/** Minimum size of any clickable control (FR-09 touch hit area). */
export const MIN_HIT_AREA = "40px";

/** Opacity of disabled controls. */
export const DISABLED_OPACITY = 0.5;

/** Scale applied while a control is pressed (:active). */
export const PRESSED_SCALE = 0.97;

/** Transition for state changes; durations collapse globally under prefers-reduced-motion. */
export const CONTROL_TRANSITION = [
    "background-color", "border-color", "color", "transform",
].map((property) => `${property} var(--duration-fast) var(--ease-out)`).join(", ");
