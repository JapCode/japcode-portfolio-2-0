import { Editor } from '@tiptap/core';
import { BubbleMenu } from '@tiptap/react/menus';

interface ICustomImageBubbleMenuProps {
  editor: Editor;
}

function ImageBubbleMenu({ editor }: ICustomImageBubbleMenuProps) {
  if (!editor) return null;

  return (
    <BubbleMenu editor={editor}>
      <div className="image-controls">
        <button
          onClick={() => editor.chain().focus().setImageAlignment('left').run()}
        >
          Left
        </button>
        <button
          onClick={() =>
            editor.chain().focus().setImageAlignment('center').run()
          }
        >
          Center
        </button>
        <button
          onClick={() =>
            editor.chain().focus().setImageAlignment('right').run()
          }
        >
          Right
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .updateAttributes('image', { width: '100%' })
              .run()
          }
        >
          Full
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .updateAttributes('image', { width: '300px' })
              .run()
          }
        >
          Small
        </button>
      </div>
    </BubbleMenu>
  );
}

export default ImageBubbleMenu;
