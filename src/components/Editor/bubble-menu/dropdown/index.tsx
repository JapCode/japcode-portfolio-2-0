import type { Editor } from '@tiptap/core';
import {
  ChevronDown,
  Code,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  ListTodo,
  Minus,
  TextQuote,
  Type,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import './dropdown.modules.css';

interface IDropDownProps {
  editor: Editor;
}

const DropDown = (props: IDropDownProps) => {
  const { editor } = props;
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const blockOptions = [
    {
      label: 'Text (Paragraph)',
      icon: Type,
      action: () => editor.chain().focus().setParagraph().run(),
    },
    {
      label: 'Heading 1',
      icon: Heading1,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      label: 'Heading 2',
      icon: Heading2,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: 'Bullet List',
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      label: 'Numbered List',
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      label: 'To-do List',
      icon: ListTodo,
      action: () => editor.chain().focus().toggleTaskList().run(),
    },
    {
      label: 'Quote',
      icon: TextQuote,
      action: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      label: 'Code Block',
      icon: Code,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
    },
    {
      label: 'Horizontal Rule',
      icon: Minus,
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
  ];

  const [activeNodeType, setActiveNodeType] = useState(
    editor.state.selection.$from.parent.type.name,
  );

  useEffect(() => {
    const updateNodeType = () => {
      const currentType = editor.state.selection.$from.parent.type.name;
      console.log(editor.state.selection.$from.parent);
      setActiveNodeType(currentType);
    };

    editor.on('selectionUpdate', updateNodeType);

    return () => {
      editor.off('selectionUpdate', updateNodeType);
    };
  }, [editor]);
  const handleOptionClick = (action: () => void) => {
    action();
    setOpen(false);
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button
        className="bubble-menu-button"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="dropdown-button-content">
          {activeNodeType} <ChevronDown size={11} />
        </span>
      </button>

      {open && (
        <div className="dropdown-items-container">
          <p className="dropdown-title">Turn into</p>
          {blockOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.label}
                onClick={() => handleOptionClick(option.action)}
                className="dropdown-items"
              >
                <Icon className="dropdown-items-icons" />
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropDown;
