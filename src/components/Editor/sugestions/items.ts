import uploadImage from '@/lib/uploadImage';
import type { Editor, Range } from '@tiptap/core';
import {
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image,
  List,
  ListOrdered,
  ListTodo,
  Minus,
  TextQuote,
} from 'lucide-react';

type SuggestionCommandItem = {
  title: string;
  command: (props: { editor: Editor; range: Range }) => void;
};

function getSuggestionItems({
  query,
  editor,
}: {
  query: string;
  editor: any;
}): SuggestionCommandItem[] {
  // your logic => {
  return [
    {
      group: 'styles',
      title: 'H1',
      label: 'Heading 1',
      icon: Heading1,
      command: ({ editor, range }: { editor: Editor; range: Range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 1 })
          .run();
      },
    },
    {
      group: 'styles',
      title: 'H2',
      label: 'Heading 2',
      icon: Heading2,
      command: ({ editor, range }: { editor: Editor; range: Range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 2 })
          .run();
      },
    },
    {
      group: 'styles',
      title: 'H3',
      label: 'Heading 3',
      icon: Heading3,
      command: ({ editor, range }: { editor: Editor; range: Range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 3 })
          .run();
      },
    },
    {
      group: 'styles',
      title: 'bulletList',
      label: 'Bullet List',
      icon: List,
      command: ({ editor, range }: { editor: Editor; range: Range }) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      group: 'styles',
      title: 'numberedList',
      label: 'Numbered List',
      icon: ListOrdered,
      command: ({ editor, range }: { editor: Editor; range: Range }) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      group: 'styles',
      title: 'toDoList',
      label: 'To-Do List',
      icon: ListTodo,
      command: ({ editor, range }: { editor: Editor; range: Range }) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run();
      },
    },
    {
      group: 'styles',
      title: 'blockQuote',
      label: 'Blockquote',
      icon: TextQuote,
      command: ({ editor, range }: { editor: Editor; range: Range }) => {
        editor.chain().focus().deleteRange(range).toggleBlockquote().run();
      },
    },
    {
      group: 'styles',
      title: 'codeBlock',
      label: 'Code Block',
      icon: Code,
      command: ({ editor, range }: { editor: Editor; range: Range }) => {
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
      },
    },
    {
      group: 'insert',
      title: 'separator',
      label: 'Separator',
      icon: Minus,
      command: ({ editor, range }: { editor: Editor; range: Range }) => {
        editor.chain().focus().deleteRange(range).setHorizontalRule().run();
      },
    },
    {
      group: 'upload',
      title: 'image',
      label: 'Image',
      icon: Image,
      command: ({ editor, range }: { editor: Editor; range: Range }) => {
        // Abrir input file
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = async () => {
          const file = input.files?.[0];
          if (!file) return;

          try {
            // Subir a Supabase
            const url = await uploadImage(file);

            // Insertar en el editor
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .setImage({ src: url })
              .run();
          } catch (error) {
            console.error('Error al subir la imagen:', error);
          }
        };

        input.click();
      },
    },
  ].filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()));
}

export default getSuggestionItems;
