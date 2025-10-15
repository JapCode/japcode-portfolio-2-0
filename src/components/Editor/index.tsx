// 'use client';

// import { useState } from 'react';

// import {
//   EditorCommand,
//   EditorCommandEmpty,
//   EditorCommandItem,
//   EditorCommandList,
//   EditorContent,
//   EditorRoot,
//   handleCommandNavigation,
//   handleImageDrop,
//   handleImagePaste,
//   ImageResizer,
//   type JSONContent,
// } from 'novel';
// import './editor.modules.css';

// // import { Separator } from '@/components/ui/separator';
// import EditorMenu from './editor-menu';
// import { defaultExtensions } from './extensions';
// import { uploadFn } from './image-upload';
// import { slashCommand, suggestionItems } from './slash-command';

// const hljs = require('highlight.js');

// const extensions = [...defaultExtensions, slashCommand];

// export const Separator = () => {
//   return (
//     <div
//       style={{
//         height: '2px',
//         backgroundColor: '#000', // puedes personalizar con Tailwind o estilos CSS propios
//         margin: '2rem 0',
//         borderRadius: '9999px',
//       }}
//     />
//   );
// };

// export const defaultEditorContent = {
//   type: 'doc',
//   content: [
//     {
//       type: 'paragraph',
//       content: [],
//     },
//   ],
// };

// interface EditorProps {
//   initialValue?: JSONContent;
//   onChange: (content: string) => void;
// }

// export default function Editor({ initialValue, onChange }: EditorProps) {
//   const [openNode, setOpenNode] = useState(false);
//   const [openColor, setOpenColor] = useState(false);
//   const [openLink, setOpenLink] = useState(false);
//   const [openAI, setOpenAI] = useState(false);
//   // const editor = useEditor();

//   //Apply Codeblock Highlighting on the HTML from editor.getHTML()
//   // const highlightCodeblocks = (content: string) => {
//   //   const doc = new DOMParser().parseFromString(content, 'text/html');
//   //   doc.querySelectorAll('pre code').forEach((el) => {
//   //     // @ts-ignore
//   //     // https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
//   //     hljs.highlightElement(el);
//   //   });
//   //   return new XMLSerializer().serializeToString(doc);
//   // };

//   return (
//     <>
//       {/* {editor != null && (
//         <DragHandle>
//           <div>Drag Me!</div>
//         </DragHandle>
//       )} */}
//       <div className="editor-container">
//         <EditorRoot>
//           <EditorContent
//             immediatelyRender={false}
//             initialContent={initialValue}
//             extensions={extensions}
//             className="editor-content"
//             editorProps={{
//               handleDOMEvents: {
//                 keydown: (_view, event) => handleCommandNavigation(event),
//               },
//               handlePaste: (view, event) =>
//                 handleImagePaste(view, event, uploadFn),
//               handleDrop: (view, event, _slice, moved) =>
//                 handleImageDrop(view, event, moved, uploadFn),
//               attributes: {
//                 class: 'editor-prose',
//               },
//             }}
//             onUpdate={({ editor }) => {
//               onChange(editor.getHTML());
//             }}
//             slotAfter={<ImageResizer />}
//           >
//             <EditorCommand className="editor-command">
//               <EditorCommandEmpty className="editor-command-empty">
//                 No results
//               </EditorCommandEmpty>
//               <EditorCommandList>
//                 {suggestionItems.map((item: any) => (
//                   <EditorCommandItem
//                     value={item.title}
//                     onCommand={(val) => item.command?.(val)}
//                     className="editor-command-item"
//                     key={item.title}
//                   >
//                     <div className="editor-command-icon">{item.icon}</div>
//                     <p className="editor-command-title">{item.title}</p>
//                     {/* <p className="editor-command-desc">{item.description}</p> */}
//                   </EditorCommandItem>
//                 ))}
//               </EditorCommandList>
//             </EditorCommand>

//             <EditorMenu open={openAI} onOpenChange={setOpenAI}>
//               <div>sklajdalksd</div>
//               {/* <Separator />
//             <NodeSelector open={openNode} onOpenChange={setOpenNode} />
//             <Separator />
//             <LinkSelector open={openLink} onOpenChange={setOpenLink} />
//             <Separator />
//             <MathSelector />
//             <Separator />
//             <TextButtons />
//             <Separator />
//             <ColorSelector open={openColor} onOpenChange={setOpenColor} /> */}
//             </EditorMenu>
//           </EditorContent>
//         </EditorRoot>
//       </div>
//     </>
//   );
// }

'use client';

import DragHandle from '@tiptap/extension-drag-handle-react';
import { EditorContent, useEditor } from '@tiptap/react';
import { GripVertical } from 'lucide-react';

import type { AnyExtension } from '@tiptap/core';
import { Dispatch, SetStateAction } from 'react';
import CustomBubbleMenu from './bubble-menu/CustomBubbleMenu';
import './editor.modules.css';
import { defaultExtensions } from './extensions';
import ImageBubbleMenu from './image-bubble-menu';

interface ICustomEditorProps {
  setMarkdown: Dispatch<SetStateAction<string>>;
}

export default (props: ICustomEditorProps) => {
  // const extensions: AnyExtension[] = [
  //   ...(defaultExtensions as AnyExtension[]),
  //   Commands.configure({
  //     suggestion: {
  //       items: getSuggestionItems,
  //       render: renderItems,
  //       command: ({ editor, range, props }: any) => {
  //         props.command({ editor, range, props });
  //       },
  //     },
  //   }) as AnyExtension,
  // ];
  const extensions: AnyExtension[] = [...(defaultExtensions as AnyExtension[])];

  const { setMarkdown } = props;

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    onUpdate: ({ editor }) => {
      const jsonContent = editor.getJSON();
      // @ts-ignore
      const markdownOutput: string = editor.storage.markdown.getMarkdown();
      console.log(markdownOutput);
      setMarkdown(markdownOutput); // Mandamos el contenido HTML al padre
    },
    // content: `# Title`,
    content: ``,
  });

  if (editor == null) {
    return <div>await...</div>;
  }

  return (
    <>
      {editor.isActive('image') ? (
        <ImageBubbleMenu editor={editor} />
      ) : (
        <CustomBubbleMenu editor={editor} />
      )}

      <DragHandle editor={editor} className="tiptap-editor">
        <GripVertical className="drag-icon" />
      </DragHandle>
      <EditorContent
        editor={editor}
        // style={{
        //   width: '100%',
        // }}
      />
    </>
  );
};
