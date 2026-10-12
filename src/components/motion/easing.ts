/** Shared easing curve: a long, soft deceleration used across the site. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Reveal once, slightly before the element is fully in view. */
export const REVEAL_VIEWPORT = { once: true, margin: '0px 0px -12% 0px' } as const;
