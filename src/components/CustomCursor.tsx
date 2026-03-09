'use client';

import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const hovered = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const onEnter = () => {
      if (hovered.current) return;
      hovered.current = true;
      dot.classList.add(styles.dotHovered);
      ringEl.classList.add(styles.ringHovered);
    };

    const onLeave = () => {
      if (!hovered.current) return;
      hovered.current = false;
      dot.classList.remove(styles.dotHovered);
      ringEl.classList.remove(styles.ringHovered);
    };

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
      ringEl.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    const interactiveSelector = 'a, button, [data-hover]';
    const tracked = new WeakSet<Element>();

    const attachListeners = (el: Element) => {
      if (tracked.has(el)) return;
      tracked.add(el);
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    };

    const addListeners = () => {
      document.querySelectorAll<HTMLElement>(interactiveSelector).forEach(attachListeners);
    };

    addListeners();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const el = node as Element;
          if (el.matches(interactiveSelector)) attachListeners(el);
          el.querySelectorAll<HTMLElement>(interactiveSelector).forEach(attachListeners);
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot — snaps instantly to cursor position */}
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
      {/* Ring — lags behind with lerp */}
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  );
}
