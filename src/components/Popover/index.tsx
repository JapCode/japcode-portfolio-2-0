import './modules.css';

import React, { useEffect, useRef, useState } from 'react';

interface PopoverProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  anchorRef: React.RefObject<HTMLElement>;
  placement?: 'top' | 'bottom';
}

export const Popover: React.FC<PopoverProps> = ({
  open,
  onClose,
  children,
  anchorRef,
  placement = 'bottom',
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const updatePosition = () => {
      const anchor = anchorRef.current;
      const popover = popoverRef.current;

      if (anchor && popover) {
        const anchorRect = anchor.getBoundingClientRect();
        const top =
          placement === 'top'
            ? anchorRect.top - popover.offsetHeight - 8
            : anchorRect.bottom + 8;

        const left = anchorRect.left;

        setPosition({
          top: top + window.scrollY,
          left: left + window.scrollX,
        });
      }
    };

    if (open) {
      updatePosition();
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !anchorRef.current?.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    window.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, anchorRef, onClose, placement]);

  if (!open) return null;

  return (
    <div
      ref={popoverRef}
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 9999,
      }}
      className="popover-container"
    >
      {children}
    </div>
  );
};
