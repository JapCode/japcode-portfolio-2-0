'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';
import sectionStyles from '../newProjectForm.module.css';
import styles from './TagSelector.module.css';

interface ITagSelectorProps {
  callback?: (tags: string[]) => void;
  defaultTags?: string[];
}

export default function TagSelector({
  callback,
  defaultTags,
}: ITagSelectorProps) {
  const [tags, setTags] = useState<string[]>(
    defaultTags != null ? defaultTags : [],
  );
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
        callback && callback([...tags, input.trim()]);
      }
      setInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
    callback && callback(tags.filter((t) => t !== tag));
  };

  return (
    <div className={styles.container}>
      <label className={sectionStyles.label}>Tags for this project</label>
      <input
        type="text"
        className={sectionStyles.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Press Enter or comma to add"
      />

      <div className={styles.tagsContainer}>
        <AnimatePresence>
          {tags.map((tag) => (
            <motion.div
              key={tag}
              className={styles.tag}
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              {tag}
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeTag(tag)}
              >
                <X size={15} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
