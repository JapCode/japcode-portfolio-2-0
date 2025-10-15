import {
  AIHighlight,
  CharacterCount,
  CodeBlockLowlight,
  Color,
  CustomKeymap,
  HighlightExtension,
  HorizontalRule,
  Mathematics,
  Placeholder,
  StarterKit,
  TaskItem,
  TaskList,
  TextStyle,
  TiptapImage,
  TiptapLink,
  TiptapUnderline,
  Twitter,
  UpdatedImage,
  UploadImagesPlugin,
  Youtube,
} from 'novel';

import { common, createLowlight } from 'lowlight';

//TODO I am using cx here to get tailwind autocomplete working, idk if someone else can write a regex to just capture the class key in objects
const aiHighlight = AIHighlight;
//You can overwrite the placeholder with your own configuration
const placeholder = Placeholder;
const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: 'custom-link',
  },
});

const tiptapImage = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: 'custom-image-upload',
      }),
    ];
  },
}).configure({
  allowBase64: true,
  HTMLAttributes: {
    class: 'custom-image',
  },
});

const updatedImage = UpdatedImage.configure({
  HTMLAttributes: {
    class: 'custom-image',
  },
});

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: 'custom-tasklist',
  },
});

const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: 'custom-taskitem',
  },
  nested: true,
});

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: 'custom-hr',
  },
});

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: 'custom-bullet-list',
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: 'custom-ordered-list',
    },
  },
  listItem: {
    HTMLAttributes: {
      class: 'custom-listitem',
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: 'custom-blockquote',
    },
  },
  codeBlock: {
    HTMLAttributes: {
      class: 'custom-codeblock',
    },
  },
  code: {
    HTMLAttributes: {
      class: 'custom-inlinecode',
      spellcheck: 'false',
    },
  },
  horizontalRule: false,
  dropcursor: {
    color: '#DBEAFE',
    width: 4,
  },
  gapcursor: false,
});

const codeBlockLowlight = CodeBlockLowlight.configure({
  lowlight: createLowlight(common),
});

const youtube = Youtube.configure({
  HTMLAttributes: {
    class: 'custom-youtube',
  },
  inline: false,
});

const twitter = Twitter.configure({
  HTMLAttributes: {
    class: 'custom-twitter',
  },
  inline: false,
});

const mathematics = Mathematics.configure({
  HTMLAttributes: {
    class: 'custom-math',
  },
  katexOptions: {
    throwOnError: false,
  },
});

const characterCount = CharacterCount.configure();

// const globalDragHandle = GlobalDragHandle.configure({
//   dragHandleWidth: 20, // default

//   // The scrollTreshold specifies how close the user must drag an element to the edge of the lower/upper screen for automatic
//   // scrolling to take place. For example, scrollTreshold = 100 means that scrolling starts automatically when the user drags an
//   // element to a position that is max. 99px away from the edge of the screen
//   // You can set this to 0 to prevent auto scrolling caused by this extension
//   scrollTreshold: 0, // default
// });

// const autoJoiner = AutoJoiner.configure({
//   elementsToJoin: ['bulletList', 'orderedList'], // default
// });

export const defaultExtensions = [
  starterKit,
  placeholder,
  tiptapLink,
  tiptapImage,
  updatedImage,
  taskList,
  taskItem,
  horizontalRule,
  aiHighlight,
  codeBlockLowlight,
  youtube,
  twitter,
  mathematics,
  characterCount,
  TiptapUnderline,
  HighlightExtension,
  TextStyle,
  Color,
  CustomKeymap,
  // autoJoiner,
  // globalDragHandle,
];
