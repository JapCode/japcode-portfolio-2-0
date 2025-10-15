'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface CustomScrollbarProps {
  children: ReactNode;
  height?: string; // "300px" | "90vh" | "calc(90vh - 2rem)"
  color?: string; // color del thumb
  trackColor?: string; // color de la pista
  thumbMinHeight?: number; // alto mínimo del thumb
  thumbPadding?: number; // espacio arriba/abajo dentro del track
  trackWidth?: number; // ancho del track
}

export function CustomScrollbar({
  children,
  height = '300px',
  color = '#999',
  trackColor = 'transparent',
  thumbMinHeight = 30,
  thumbPadding = 4,
  trackWidth = 8,
}: CustomScrollbarProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(false);

  const recalc = () => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const viewport = content.clientHeight; // alto visible del área con scroll
    const contentH = content.scrollHeight; // alto total del contenido
    const trackUsable = container.clientHeight - thumbPadding * 2;

    // ¿Hay overflow?
    const overflow = contentH > viewport + 1; // +1 evita problemas de redondeo
    setHasOverflow(overflow);

    if (!overflow) {
      setThumbHeight(0);
      setThumbTop(0);
      return;
    }

    // Tamaño del thumb proporcional al contenido visible
    const rawThumb = (viewport / contentH) * trackUsable;
    const h = Math.max(rawThumb, thumbMinHeight);
    setThumbHeight(h);

    // Rango desplazable real del thumb
    const maxThumbTop = Math.max(trackUsable - h, 0);

    // Proporción de scroll real (0..1)
    const scrollRange = Math.max(contentH - viewport, 1);
    const scrollRatio = content.scrollTop / scrollRange;

    // Posición del thumb dentro del track con padding simétrico
    setThumbTop(thumbPadding + scrollRatio * maxThumbTop);
  };

  useEffect(() => {
    const content = contentRef.current;
    const container = containerRef.current;
    if (!content || !container) return;

    // Recalcular en scroll y resize
    const onScroll = () => recalc();
    content.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', recalc);

    // Observar cambios de tamaño del contenedor y del contenido
    const ro = new ResizeObserver(() => recalc());
    ro.observe(container);
    ro.observe(content);

    // Primer cálculo
    recalc();

    return () => {
      content.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', recalc);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <div
        ref={contentRef}
        className="cs-content"
        style={{
          height: '100%',
          overflowY: 'auto', // solo cuando haga falta
          paddingRight: `${trackWidth + 8}px`, // espacio para que el contenido no quede debajo del track
          scrollbarWidth: 'none', // Firefox oculta nativa
          msOverflowStyle: 'none', // IE/Edge
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </div>

      {/* Barra personalizada (solo si hay overflow) */}
      {hasOverflow && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: '3px',
            width: `${trackWidth}px`,
            height: '100%',
            background: trackColor,
            paddingTop: `${thumbPadding}px`,
            paddingBottom: `${thumbPadding}px`,
            boxSizing: 'border-box',
          }}
        >
          <motion.div
            animate={{ height: thumbHeight, top: thumbTop }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            style={{
              position: 'absolute',
              left: 0,
              width: '100%',
              background: color,
              borderRadius: '9999px',
              cursor: 'grab',
            }}
          />
        </div>
      )}
    </div>
  );
}
