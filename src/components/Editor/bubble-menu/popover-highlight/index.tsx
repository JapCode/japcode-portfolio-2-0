import type { Editor } from '@tiptap/react';
import { Highlighter, Type } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import './highlightPopover.modules.css';

type ColorHighlightButtonProps = {
  editor: Editor | null;
};

export default function ColorHighlightButton({
  editor,
}: ColorHighlightButtonProps) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const backgroundColors: string[] = [
    'rgba(0,0,0,0)', // transparente base
    'rgba(255,99,71,0.8)', // rojo tomate translúcido
    'rgba(255,215,0,0.8)', // dorado translúcido
    'rgba(60,179,113,0.8)', // verde medio translúcido
    'rgba(30,144,255,0.8)', // azul dodger translúcido
    'rgba(186,85,211,0.8)', // púrpura medio translúcido
    'rgba(255,140,0,0.8)', // naranja oscuro translúcido
    'rgba(255,20,147,0.8)', // rosa profundo translúcido
    'rgba(0,206,209,0.8)', // turquesa oscuro translúcido
    'rgba(255,105,180,0.8)', // rosa intenso translúcido
  ];

  const textColors: string[] = [
    'rgba(255,255,255,1)', // blanco base
    'rgba(255,99,71,1)', // rojo tomate
    'rgba(255,215,0,1)', // dorado
    'rgba(60,179,113,1)', // verde medio
    'rgba(30,144,255,1)', // azul dodger
    'rgba(186,85,211,1)', // púrpura medio
    'rgba(255,140,0,1)', // naranja oscuro
    'rgba(255,20,147,1)', // rosa profundo
    'rgba(0,206,209,1)', // turquesa oscuro
    'rgba(255,105,180,1)', // rosa intenso
  ];

  // Cerrar popover si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function setAlpha(rgba: string, alpha: number) {
    const parts = rgba
      .replace(/^rgba?\(/, '')
      .replace(/\)$/, '')
      .split(',')
      .slice(0, 3);
    return `rgba(${parts.join(',')}, ${alpha})`;
  }

  if (!editor) return null;

  return (
    <div className="highlight-container" ref={popoverRef}>
      <button
        type="button"
        className="bubble-menu-button "
        onClick={() => setOpen(!open)}
        title="Text & Highlight Colors"
      >
        <Highlighter size={15} />
      </button>

      {open && (
        <div className="highlight-popover">
          {/* Background Colors */}
          <div className="color-section">
            <div className="section-title">
              <Highlighter size={14} /> Highlight color
            </div>
            <div className="color-grid">
              {backgroundColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className="color-swatch"
                  style={{
                    backgroundColor: setAlpha(color, 0.4),
                    borderColor: color,
                  }}
                  onClick={() => {
                    editor.chain().focus().setHighlight({ color }).run();
                    setOpen(false);
                  }}
                />
              ))}
              {/* <button
                type="button"
                className="clear-color"
                onClick={() => {
                  editor.chain().focus().unsetHighlight().run();
                  setOpen(false);
                }}
              >
                Clear
              </button> */}
            </div>
          </div>

          {/* Text Colors */}
          <div className="color-section">
            <div className="section-title">
              <Type size={14} /> Text
            </div>
            <div className="color-grid">
              {textColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className="color-swatch-text"
                  style={{ borderColor: color, color: color }}
                  onClick={() => {
                    editor.chain().focus().setColor(color).run();
                    setOpen(false);
                  }}
                >
                  A
                </button>
              ))}
              {/* <button
                type="button"
                className="clear-color"
                onClick={() => {
                  editor.chain().focus().unsetColor().run();
                  setOpen(false);
                }}
              >
                Clear
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
