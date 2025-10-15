import { Editor } from '@tiptap/react';
import {
  CornerDownRight,
  Link,
  SquareArrowOutUpRight,
  Trash,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import './link-popover.modules.css';

type Props = {
  editor: Editor;
};

export default function LinkPopover({ editor }: Props) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const isLinkActive = editor.isActive('link');

  useEffect(() => {
    if (open) {
      const previousUrl = editor.getAttributes('link').href || '';
      setUrl(previousUrl);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const applyLink = () => {
    if (url.trim() !== '') {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url.trim() })
        .run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
    setOpen(false);
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
    setUrl('');
    setOpen(false);
  };

  return (
    <div className="link-popover-container">
      <button
        className={`bubble-menu-button ${isLinkActive ? 'active' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Link size={15} />
      </button>

      {open && (
        <div className="link-popover">
          <input
            ref={inputRef}
            type="url"
            placeholder="Paste a link..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="link-input"
          />
          <button className="link-button-options" onClick={applyLink}>
            <CornerDownRight className="link-button-options-link-icon" />
          </button>
          <div className="link-divider" />
          <a
            href={url}
            className="link-button-options"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SquareArrowOutUpRight className="link-button-options-link-icon" />
          </a>
          <button className="link-button-options" onClick={removeLink}>
            <Trash className="link-button-options-link-icon" />
          </button>
        </div>
      )}
    </div>
  );
}
