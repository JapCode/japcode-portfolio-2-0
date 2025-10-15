'use client';

import { ReactRenderer } from '@tiptap/react';
import { SuggestionProps } from '@tiptap/suggestion';
import tippy, { Instance } from 'tippy.js';
import CommandsList from './CommandsList';

type CommandsRenderer = {
  onStart: (props: SuggestionProps) => void;
  onUpdate: (props: SuggestionProps) => void;
  onKeyDown: (
    props: { event: KeyboardEvent } & Partial<SuggestionProps>,
  ) => boolean;
  onExit: () => void;
};

const renderItems = (): CommandsRenderer => {
  let component: ReactRenderer | null = null;
  let popup: Instance[] = [];

  return {
    onStart: (props: SuggestionProps) => {
      component = new ReactRenderer(CommandsList, {
        props,
        editor: props.editor,
      });

      popup = tippy('body', {
        getReferenceClientRect: props.clientRect as () => DOMRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'auto-start',
      });
    },

    onUpdate(props: SuggestionProps) {
      component?.updateProps(props);

      popup[0]?.setProps({
        getReferenceClientRect: props.clientRect as () => DOMRect,
      });
    },

    onKeyDown(props) {
      if (props.event.key === 'Escape') {
        popup[0]?.hide();
        return true;
      }

      return (
        (
          component?.ref as { onKeyDown?: (props: any) => boolean }
        )?.onKeyDown?.(props) ?? false
      );
    },

    onExit() {
      popup[0]?.destroy();
      component?.destroy();
    },
  };
};

export default renderItems;
