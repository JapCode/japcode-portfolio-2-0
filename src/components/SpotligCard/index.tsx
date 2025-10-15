'use client';

import { useRef } from 'react';
import './module.css';

interface Props {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard = ({
  children,
  className = '',
  // spotlightColor = 'rgba(255, 255, 255, 0.25)',
  spotlightColor = 'rgba(240, 0, 136, 0.1)',
}: Props) => {
  const divRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = divRef.current?.getBoundingClientRect();
    const x = e.clientX - (rect?.left || 0);
    const y = e.clientY - (rect?.top || 0);

    divRef.current?.style.setProperty('--mouse-x', `${x}px`);
    divRef.current?.style.setProperty('--mouse-y', `${y}px`);
    divRef.current?.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
