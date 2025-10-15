import { Editor, Extension } from '@tiptap/core';
import Suggestion, {
  SuggestionOptions,
  SuggestionProps,
} from '@tiptap/suggestion';

type CommandProps = {
  editor: Editor;
  range: { from: number; to: number };
  props: SuggestionProps;
};

const Commands = Extension.create<{
  suggestion: Partial<SuggestionOptions> & {
    command: (props: CommandProps) => void;
  };
}>({
  name: 'mention',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        startOfLine: false,
        command: ({ editor, range, props }: CommandProps) => {
          props.command({ editor, range, props });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export default Commands;
