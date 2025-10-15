// CustomSelect.tsx
import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import styles from './customSelect.module.css';

export interface Option {
  value: string;
  label: string;
  meta?: string;
}

export interface CustomSelectProps {
  options: Option[];
  value: Option | null;
  onChange: (option: Option) => void;
  placeholder?: string;
  searchable?: boolean;
}

export default function CustomSelect({
  options = [],
  value = null,
  onChange,
  placeholder = 'Select...',
  searchable = false,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const filtered = query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  useEffect(() => {
    setHighlight(0);
  }, [query, open]);

  function toggle() {
    setOpen((v) => !v);
    setQuery('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const option = filtered[highlight];
      if (option) selectOption(option);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  function selectOption(option: Option) {
    onChange(option);
    setOpen(false);
  }

  return (
    <div
      className={styles.wrapper}
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <button
        type="button"
        className={styles.control}
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles.selected}>
          {value ? (
            value.label
          ) : (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </span>
        <span className={styles.chev} aria-hidden>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            ▾
          </motion.span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className={styles.dropdown}
            role="listbox"
            aria-activedescendant={
              filtered[highlight]
                ? `option-${filtered[highlight].value}`
                : undefined
            }
          >
            {searchable && (
              <div className={styles.searchWrap}>
                <input
                  className={styles.search}
                  value={query}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setQuery(e.target.value)
                  }
                  placeholder="Buscar..."
                  autoFocus
                />
              </div>
            )}

            <ul className={styles.list}>
              {filtered.length === 0 && (
                <li className={styles.empty}>No hay opciones</li>
              )}

              {filtered.map((opt, i) => (
                <li
                  key={opt.value}
                  id={`option-${opt.value}`}
                  role="option"
                  aria-selected={value ? value.value === opt.value : false}
                  className={
                    `${styles.option} ` +
                    (i === highlight ? styles.highlight : '')
                  }
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => selectOption(opt)}
                >
                  <div className={styles.optionLabel}>{opt.label}</div>
                  {opt.meta && (
                    <div className={styles.optionMeta}>{opt.meta}</div>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Uso ejemplo (en el mismo proyecto):

  import CustomSelect, { Option } from './CustomSelect';

  const options: Option[] = [
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'rs', label: 'Rust', meta: 'Sistemas' },
  ];

  function Page() {
    const [val, setVal] = useState<Option | null>(null);
    return (
      <div style={{padding: 20}}>
        <CustomSelect
          options={options}
          value={val}
          onChange={(o) => setVal(o)}
          placeholder="Elige un lenguaje"
          searchable
        />
      </div>
    );
  }
*/
