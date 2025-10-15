import { Calendar } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styles from './calendarPicker.module.css';

interface CalendarPickerProps {
  onChange?: (value: string) => void;
  label?: string;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({ onChange, label }) => {
  const [selected, setSelected] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Cerrar el calendario si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (date?: Date) => {
    setSelected(date);
    setOpen(false);
    if (date && onChange) {
      const formatted = formatToPostgresTimestamp(date);
      onChange(formatted);
    }
  };

  const formatToPostgresTimestamp = (date: Date) => {
    const pad = (n: number, len = 2) => n.toString().padStart(len, '0');
    const year = date.getUTCFullYear();
    const month = pad(date.getUTCMonth() + 1);
    const day = pad(date.getUTCDate());
    return `${year}-${month}-${day} 00:00:00.000000+00`;
  };

  const formattedDate = selected
    ? selected.toISOString().split('T')[0]
    : 'Seleccionar fecha';

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        type="button"
        className={styles.button}
        onClick={() => setOpen(!open)}
      >
        {formattedDate}
        <span className={styles.icon}>
          <Calendar size={15} />
        </span>
      </button>

      {open && (
        <div className={styles.popover}>
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            className={styles.calendar}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarPicker;
