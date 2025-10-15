import type { Editor } from '@tiptap/react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  EllipsisVertical,
  Subscript,
  Superscript,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import './popoverMoreOptions.modules.css';

interface MoreOptionsPopoverProps {
  editor: Editor;
}

export default function MoreOptionsPopover({
  editor,
}: MoreOptionsPopoverProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Cerrar popover si clic afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Funciones para acciones
  const setAlignment = (alignment: 'left' | 'center' | 'right' | 'justify') => {
    editor.chain().focus().setTextAlign(alignment).run();
    setOpen(false);
  };

  const toggleSuperscript = () => {
    editor.chain().focus().toggleSuperscript().run();
    setOpen(false);
  };

  const toggleSubscript = () => {
    editor.chain().focus().toggleSubscript().run();
    setOpen(false);
  };

  // Detectar estados activos para estilos visuales
  const isActiveAlignment = (alignment: string) =>
    editor.isActive({ textAlign: alignment });
  const isSuperscriptActive = editor.isActive('superscript');
  const isSubscriptActive = editor.isActive('subscript');

  return (
    <div className="more-options-container">
      <button
        ref={buttonRef}
        className="bubble-menu-button"
        onClick={() => setOpen((v) => !v)}
        title="Más opciones"
      >
        <EllipsisVertical size={15} />
      </button>

      {open && (
        <div ref={popoverRef} className="more-options-popover">
          <p className="popover-section-title">Alinear texto</p>
          <div className="popover-row">
            <button
              onClick={() => setAlignment('left')}
              className={isActiveAlignment('left') ? 'active' : ''}
              title="Alinear izquierda"
            >
              <AlignLeft size={16} />
            </button>
            <button
              onClick={() => setAlignment('center')}
              className={isActiveAlignment('center') ? 'active' : ''}
              title="Alinear centro"
            >
              <AlignCenter size={16} />
            </button>
            <button
              onClick={() => setAlignment('right')}
              className={isActiveAlignment('right') ? 'active' : ''}
              title="Alinear derecha"
            >
              <AlignRight size={16} />
            </button>
            <button
              onClick={() => setAlignment('justify')}
              className={isActiveAlignment('justify') ? 'active' : ''}
              title="Justificar"
            >
              <AlignJustify size={16} />
            </button>
          </div>

          <p className="popover-section-title">Formato</p>
          <div className="popover-row">
            <button
              onClick={toggleSuperscript}
              className={isSuperscriptActive ? 'active' : ''}
              title="Superscript"
            >
              <Superscript size={16} />
            </button>
            <button
              onClick={toggleSubscript}
              className={isSubscriptActive ? 'active' : ''}
              title="Subscript"
            >
              <Subscript size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
