'use client';
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import { ListKit, TaskItem } from '@tiptap/extension-list';
import Paragraph from '@tiptap/extension-paragraph';
import Strike from '@tiptap/extension-strike';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyleKit } from '@tiptap/extension-text-style';
import { Dropcursor } from '@tiptap/extensions';
import StarterKit from '@tiptap/starter-kit';
import ImageResize from 'tiptap-extension-resize-image';
import { Markdown } from 'tiptap-markdown';
import Commands from './sugestions/commands';
import getSuggestionItems from './sugestions/items';
import renderItems from './sugestions/RenderItems';

const highlight = Highlight.configure({
  multicolor: true, // 👈 Habilita múltiples colores
});

const textAlign = TextAlign.configure({
  types: ['heading', 'paragraph'],
});

const commands = Commands.configure({
  suggestion: {
    items: getSuggestionItems,
    render: renderItems,
    command: ({ editor, range, props }: any) => {
      props.command({ editor, range, props });
    },
  },
});

// export const CustomImage = Image.extend({
//   addAttributes() {
//     return {
//       ...this.parent?.(),
//       width: {
//         default: 'auto',
//         renderHTML: (attributes) => {
//           return { style: `width: ${attributes.width}` };
//         },
//       },
//       alignment: {
//         default: 'center',
//         renderHTML: (attributes) => {
//           return {
//             style: `display: block; margin: 0 auto; text-align: ${attributes.alignment}`,
//           };
//         },
//       },
//     };
//   },

//   renderHTML({ HTMLAttributes }) {
//     return ['img', mergeAttributes(HTMLAttributes)];
//   },
// });

export const defaultExtensions = [
  StarterKit,
  ListKit,
  TaskItem,
  Blockquote,
  CodeBlock,
  HorizontalRule,
  Bold,
  Italic,
  Strike,
  Code,
  Paragraph,
  Heading,
  Link,
  highlight,
  TextStyleKit,
  textAlign,
  Superscript,
  Subscript,
  commands,
  Markdown,
  // CustomImage,
  // Image,
  // ResizableImage,
  ImageResize,
  Dropcursor,
];
