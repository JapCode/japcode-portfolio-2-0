import { Popover } from '@/components/Popover';
import { Check, Trash } from 'lucide-react';
import { useEditor } from 'novel';
import { useEffect, useRef } from 'react';

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (_e) {
    return false;
  }
}
export function getUrlFromString(str: string) {
  if (isValidUrl(str)) return str;
  try {
    if (str.includes('.') && !str.includes(' ')) {
      return new URL(`https://${str}`).toString();
    }
  } catch (_e) {
    return null;
  }
}
interface LinkSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LinkSelector = ({ open, onOpenChange }: LinkSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const { editor } = useEditor();

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current?.focus();
  });
  if (!editor) return null;

  return (
    <div>
      <button ref={anchorRef} onClick={() => onOpenChange(!open)}>
        <p className="text-base">↗</p>
        <p
          className={cn('underline decoration-stone-400 underline-offset-4', {
            'text-blue-500': editor.isActive('link'),
          })}
        >
          Link
        </p>
      </button>
      <Popover
        open={open}
        onClose={() => onOpenChange(false)}
        anchorRef={anchorRef}
      >
        <form
          onSubmit={(e) => {
            const target = e.currentTarget as HTMLFormElement;
            e.preventDefault();
            const input = target[0] as HTMLInputElement;
            const url = getUrlFromString(input.value);
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
              onOpenChange(false);
            }
          }}
          className="flex p-1"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Paste a link"
            className="flex-1 bg-background p-1 text-sm outline-none"
            defaultValue={editor.getAttributes('link').href || ''}
          />
          {editor.getAttributes('link').href ? (
            <button
              type="button"
              className="flex h-8 items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                if (inputRef.current) {
                  inputRef.current.value = '';
                }
                onOpenChange(false);
              }}
            >
              <Trash className="h-4 w-4" />
            </button>
          ) : (
            <button className="h-8">
              <Check className="h-4 w-4" />
            </button>
          )}
        </form>
      </Popover>
    </div>
  );
};
