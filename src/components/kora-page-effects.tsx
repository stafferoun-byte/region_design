"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * Exit (fold): circle shrink to top over mint.
 * Enter (unfold): circle expand from bottom only.
 * Idle: same React tree kept mounted (display:contents) so page
 * appear animations don't re-fire after the wipe — that was the
 * extra "틱" jump after unfold.
 */
const MINT = "#5DC39B";
const PAGE_CREAM = "#FCFCFA";

const EXIT_EASE = [0.73, 0.54, 0.05, 0.99] as const;
const EXIT_MS = 535;
/** Brief snap so clip origin is bottom before expand — keep short */
const ENTER_GAP_MS = 40;

const ENTER_EASE = [0.22, 1, 0.36, 1] as const;
const ENTER_MS = 520;

const CLIP_FULL_TOP = "circle(150% at 50% -5%)";
const CLIP_GONE_TOP = "circle(0% at 50% -5%)";
const CLIP_FULL_BOTTOM = "circle(150% at 50% 105%)";
/** Start slightly open so first pixels of content show immediately */
const CLIP_START_BOTTOM = "circle(12% at 50% 105%)";

function isModifiedClick(event: MouseEvent) {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

function sameDocumentHref(anchor: HTMLAnchorElement): string | null {
  if (anchor.target && anchor.target !== "_self") return null;
  if (anchor.hasAttribute("download")) return null;

  const hrefAttr = anchor.getAttribute("href");
  if (!hrefAttr || hrefAttr.startsWith("#")) return null;
  if (
    hrefAttr.startsWith("mailto:") ||
    hrefAttr.startsWith("tel:") ||
    hrefAttr.startsWith("javascript:")
  ) {
    return null;
  }

  let url: URL;
  try {
    url = new URL(hrefAttr, window.location.href);
  } catch {
    return null;
  }

  if (url.origin !== window.location.origin) return null;

  if (
    url.pathname === window.location.pathname &&
    url.search === window.location.search
  ) {
    return null;
  }

  return `${url.pathname}${url.search}${url.hash}`;
}

type Phase = "idle" | "exit" | "gap" | "enter";

export function KoraPageEffects({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("idle");
  const [display, setDisplay] = useState<ReactNode>(children);
  const pendingHref = useRef<string | null>(null);
  const pendingChildren = useRef<ReactNode | null>(null);
  const routeReady = useRef(false);
  const frozen = useRef(false);
  const gapTimer = useRef<number | null>(null);
  const phaseRef = useRef<Phase>("idle");
  const exitHandled = useRef(false);

  const transitioning = phase !== "idle";

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (transitioning) {
      root.style.backgroundColor = MINT;
      body.style.backgroundColor = MINT;
    } else {
      root.style.backgroundColor = "";
      body.style.backgroundColor = PAGE_CREAM;
    }
  }, [transitioning]);

  useEffect(() => {
    if (frozen.current) {
      // Keep newest tree ready so enter can swap instantly after exit
      if (pendingHref.current) {
        const target =
          pendingHref.current.split("?")[0]?.split("#")[0] ??
          pendingHref.current;
        if (pathname === target) {
          pendingChildren.current = children;
          routeReady.current = true;
        }
      }
      return;
    }
    setDisplay(children);
  }, [children, pathname]);

  useEffect(() => {
    return () => {
      if (gapTimer.current) window.clearTimeout(gapTimer.current);
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = PAGE_CREAM;
    };
  }, []);

  const beginEnter = useCallback(() => {
    frozen.current = false;
    pendingChildren.current = null;
    pendingHref.current = null;
    routeReady.current = false;

    if (reduceMotion) {
      setPhase("idle");
      return;
    }

    setPhase("gap");
    if (gapTimer.current) window.clearTimeout(gapTimer.current);
    gapTimer.current = window.setTimeout(() => {
      requestAnimationFrame(() => setPhase("enter"));
    }, ENTER_GAP_MS);
  }, [reduceMotion]);

  // Route landed while we were still exiting — mark ready; enter after exit
  useEffect(() => {
    if (!pendingHref.current) return;
    const target =
      pendingHref.current.split("?")[0]?.split("#")[0] ?? pendingHref.current;
    if (pathname !== target) return;

    pendingChildren.current = children;
    routeReady.current = true;

    // If exit already finished and we're waiting, enter now
    if (phaseRef.current === "exit" && exitHandled.current) {
      beginEnter();
    } else if (
      phaseRef.current !== "exit" &&
      phaseRef.current !== "gap" &&
      phaseRef.current !== "enter"
    ) {
      beginEnter();
    }
  }, [pathname, children, beginEnter]);

  const navigate = useCallback(
    (href: string) => {
      if (
        pendingHref.current ||
        phaseRef.current === "exit" ||
        phaseRef.current === "gap" ||
        phaseRef.current === "enter"
      ) {
        return;
      }

      try {
        (
          window as unknown as { __lenis?: { scrollTo: (y: number) => void } }
        ).__lenis?.scrollTo(0);
      } catch {
        /* ignore */
      }
      window.scrollTo(0, 0);

      if (reduceMotion) {
        router.push(href);
        return;
      }

      pendingHref.current = href;
      pendingChildren.current = null;
      routeReady.current = false;
      frozen.current = true;
      exitHandled.current = false;
      // Snapshot the outgoing page before fold
      setDisplay(children);
      setPhase("exit");
      // Prefetch during fold so the next page is ready when we expand
      router.push(href);
    },
    [reduceMotion, router, children],
  );

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event)) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = sameDocumentHref(anchor);
      if (!href) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      navigate(href);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate]);

  // Exit: frozen outgoing page. Gap/enter/idle: live children (same
  // instance through enter→idle so appear animations don't re-run).
  const content = phase === "exit" ? display : children;

  return (
    <motion.div
      className={
        transitioning
          ? "relative min-h-svh overflow-hidden will-change-[clip-path]"
          : undefined
      }
      style={
        transitioning
          ? { backgroundColor: MINT }
          : {
              // Passthrough box — sticky / scroll animations keep working
              display: "contents",
            }
      }
      initial={false}
      animate={
        phase === "idle"
          ? { clipPath: "none" }
          : phase === "exit"
            ? { clipPath: [CLIP_FULL_TOP, CLIP_GONE_TOP] }
            : phase === "gap"
              ? { clipPath: CLIP_START_BOTTOM }
              : { clipPath: [CLIP_START_BOTTOM, CLIP_FULL_BOTTOM] }
      }
      transition={
        phase === "idle"
          ? { duration: 0 }
          : phase === "exit"
            ? { duration: EXIT_MS / 1000, ease: EXIT_EASE }
            : phase === "gap"
              ? { duration: 0 }
              : { duration: ENTER_MS / 1000, ease: ENTER_EASE }
      }
      onAnimationComplete={() => {
        if (phaseRef.current === "exit") {
          if (exitHandled.current) return;
          exitHandled.current = true;
          if (routeReady.current) {
            beginEnter();
          }
          return;
        }
        if (phaseRef.current === "enter") {
          setPhase("idle");
        }
      }}
    >
      {content}
    </motion.div>
  );
}
