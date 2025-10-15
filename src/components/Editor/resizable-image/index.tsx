import Image from '@tiptap/extension-image';

export const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: 'auto',
        parseHTML: (el) => el.getAttribute('width') || 'auto',
        renderHTML: (attrs) => ({ width: attrs.width }),
      },
      alignment: {
        default: 'center',
        parseHTML: (el) => el.getAttribute('data-align') || 'center',
        renderHTML: (attrs) => ({ 'data-align': attrs.alignment }),
      },
    };
  },

  addOptions() {
    return {
      ...this.parent?.(),
      inline: false,
      group: 'block',
      atom: true, // 👈 esto hace que ProseMirror lo trate como un bloque atómico
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setImageAlignment:
        (alignment: 'left' | 'center' | 'right') =>
        ({ commands }: { commands: any }) =>
          commands.updateAttributes('image', { alignment }),
    };
  },

  addNodeView() {
    return ({ node, editor, getPos }) => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('resizable-image-wrapper');
      wrapper.setAttribute('data-align', node.attrs.alignment);
      // 👇 evita que dropcursor intente entrar al wrapper
      wrapper.contentEditable = 'false';

      const img = document.createElement('img');
      img.src = node.attrs.src;
      img.style.width = node.attrs.width;

      // handles estilo notion
      const leftHandle = document.createElement('div');
      leftHandle.classList.add('resize-handle', 'left');

      const rightHandle = document.createElement('div');
      rightHandle.classList.add('resize-handle', 'right');

      // función común de resize
      const startResize = (event: MouseEvent, direction: 'left' | 'right') => {
        event.preventDefault();
        const startX = event.clientX;
        const startWidth = img.offsetWidth;

        const onMouseMove = (e: MouseEvent) => {
          let deltaX = e.clientX - startX;
          if (direction === 'left') deltaX = -deltaX; // invertimos
          const newWidth = Math.max(50, startWidth + deltaX); // ancho mínimo
          img.style.width = `${newWidth}px`;
          wrapper.style.width = `${newWidth}px`;
        };

        const onMouseUp = () => {
          // persistir en tiptap
          const pos = getPos?.();
          if (typeof pos === 'number') {
            editor
              .chain()
              .focus()
              .updateAttributes('image', { width: img.style.width })
              .setNodeSelection(pos)
              .run();
          } else {
            editor
              .chain()
              .focus()
              .updateAttributes('image', { width: img.style.width })
              .run();
          }

          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      };

      leftHandle.onmousedown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        startResize(e, 'left');
      };
      rightHandle.onmousedown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        startResize(e, 'right');
      };

      wrapper.appendChild(img);
      wrapper.appendChild(leftHandle);
      wrapper.appendChild(rightHandle);

      return {
        dom: wrapper,
        update: (updatedNode) => {
          if (updatedNode.type.name !== 'image') return false;
          img.src = updatedNode.attrs.src;
          img.style.width = updatedNode.attrs.width;
          wrapper.setAttribute('data-align', updatedNode.attrs.alignment);
          return true;
        },
      };
    };
  },
});
