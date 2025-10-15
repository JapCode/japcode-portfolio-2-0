import { motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import { useCustomFormContext } from '.';
import styles from './form.module.css';

export interface FormButtonProps {
  children: string;
}

export function FormButton({ children }: FormButtonProps) {
  const { loading } = useCustomFormContext();
  const MotionLoader = motion.create(LoaderCircle);

  return (
    <button className={styles.saveBtn} type="submit" disabled={loading}>
      {children}
      {loading && (
        <MotionLoader
          size={20}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: 'linear',
          }}
          style={{ transformOrigin: 'center' }}
        />
      )}
    </button>
  );
}
