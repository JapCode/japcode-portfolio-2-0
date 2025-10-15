import type { Editor } from '@tiptap/core';
import { BubbleMenu } from '@tiptap/react/menus';
import { Bold, Code, Italic, Strikethrough } from 'lucide-react';
import './bubble.modules.css';
import DropDown from './dropdown';
import ColorHighlightButton from './popover-highlight';
import LinkPopover from './popover-link';
import MoreOptionsButton from './popover-more-options';

interface ICustomBubbleMenuProps {
  editor: Editor;
}

const CustomBubbleMenu = (props: ICustomBubbleMenuProps) => {
  const { editor } = props;

  return (
    <BubbleMenu
      editor={editor}
      options={{ placement: 'bottom', offset: 8 }}
      className="bubble-container"
    >
      <DropDown editor={editor} />
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${
          editor.isActive('bold') ? 'is-active' : ''
        } bubble-menu-button`}
        type="button"
      >
        <Bold size={15} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${
          editor.isActive('italic') ? 'is-active' : ''
        } bubble-menu-button`}
        type="button"
      >
        <Italic size={15} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${
          editor.isActive('strike') ? 'is-active' : ''
        } bubble-menu-button`}
        type="button"
      >
        <Strikethrough size={15} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`${
          editor.isActive('strike') ? 'is-active' : ''
        } bubble-menu-button`}
        type="button"
      >
        <Code size={15} />
      </button>
      <LinkPopover editor={editor} />
      <ColorHighlightButton editor={editor} />
      <MoreOptionsButton editor={editor} />
    </BubbleMenu>
  );
};

export default CustomBubbleMenu;
