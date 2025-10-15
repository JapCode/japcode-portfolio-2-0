import { EditorBubble, removeAIHighlight, useEditor } from 'novel';

import { type ReactNode, useEffect } from 'react';

interface EditorMenuProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditorMenu({
  children,
  open,
  onOpenChange,
}: EditorMenuProps) {
  const { editor } = useEditor();

  useEffect(() => {
    if (!editor) return;
    if (!open) removeAIHighlight(editor);
  }, [open]);

  return (
    <EditorBubble
      tippyOptions={{
        placement: open ? 'bottom-start' : 'top',
        onHidden: () => {
          onOpenChange(false);
          editor?.chain().unsetHighlight().run();
        },
      }}
      className="editor-bubble"
    >
      {!open && children}
    </EditorBubble>
  );
}
