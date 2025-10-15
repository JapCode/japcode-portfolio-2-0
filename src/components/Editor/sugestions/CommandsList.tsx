'use client';

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import './slash-commands.modules.css';

type CommandItem = {
  title: string;
  group: string;
  element?: React.ReactNode;
};

type CommandListProps = {
  items: CommandItem[];
  command: (item: CommandItem) => void;
};

interface IGroup {
  name: string;
  label: string;
}

const groupOrder: IGroup[] = [
  { name: 'styles', label: 'Styles' },
  { name: 'insert', label: 'Insert' },
  { name: 'upload', label: 'Upload' },
];

const CommandList = forwardRef((props: CommandListProps, ref) => {
  const { items, command } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Enfocar y resetear al montar/cambiar items
  useEffect(() => {
    containerRef.current?.focus();
    setSelectedIndex(0);
  }, [items]);

  // Agrupar y aplanar
  const flatItemsWithGroup = useMemo(() => {
    const groupedItems = items.reduce(
      (acc, item) => {
        if (!acc[item.group]) acc[item.group] = [];
        acc[item.group].push(item);
        return acc;
      },
      {} as Record<string, CommandItem[]>,
    );

    let globalIndex = 0;
    return groupOrder.map(({ name, label }) => {
      const groupItems = groupedItems[name] || [];
      const wrappedItems = groupItems.map((item) => ({
        item,
        globalIndex: globalIndex++,
      }));
      return {
        group: name,
        label,
        items: wrappedItems,
      };
    });
  }, [items]);

  const allItems = useMemo(
    () =>
      flatItemsWithGroup.flatMap((group) =>
        group.items.map(({ item }) => item),
      ),
    [flatItemsWithGroup],
  );

  // Manejo del teclado (lo que llama TipTap desde `renderItems`)
  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        setSelectedIndex(
          (prev) => (prev + allItems.length - 1) % allItems.length,
        );
        return true;
      }

      if (event.key === 'ArrowDown') {
        setSelectedIndex((prev) => (prev + 1) % allItems.length);
        return true;
      }

      if (event.key === 'Enter') {
        const item = allItems[selectedIndex];
        if (item) command(item);
        return true;
      }

      return false;
    },
  }));

  return (
    <div className="group-container" tabIndex={0} ref={containerRef}>
      {flatItemsWithGroup.map((group, groupIndex) => (
        <div className="container" key={`${groupIndex}-${group.group}`}>
          <h4>{group.label}</h4>
          {group.items.map(({ item, globalIndex }, itemIndex) => (
            <button
              key={`${groupIndex}-${itemIndex}`}
              className={`item ${
                selectedIndex === globalIndex ? 'is-selected' : ''
              }`}
              onClick={() => command(item)}
            >
              {item.element || item.title}
            </button>
          ))}
          {flatItemsWithGroup.length > groupIndex + 1 && (
            <div className="divider" />
          )}
        </div>
      ))}
    </div>
  );
});

CommandList.displayName = 'CommandList';

export default CommandList;
