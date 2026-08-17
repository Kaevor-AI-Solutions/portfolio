type Frame = () => void;

const frames = new Set<Frame>();
let ticking = false;
let attached = false;

function run() {
  frames.forEach((fn) => fn());
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    run();
  });
}

/**
 * Single rAF-throttled scroll/resize driver shared by every scroll-linked piece of
 * the page (progress bar, nav condense, hero particle settle, pinned work track,
 * process line draw). Capture phase so scroll from nested scrollers is caught too —
 * scroll events do not bubble.
 */
export function onScrollFrame(fn: Frame): () => void {
  frames.add(fn);
  if (!attached) {
    attached = true;
    document.addEventListener('scroll', onScroll, { capture: true, passive: true });
    window.addEventListener('resize', onScroll);
  }
  fn();
  return () => {
    frames.delete(fn);
  };
}

export const clamp = (v: number) => Math.max(0, Math.min(1, v));

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
