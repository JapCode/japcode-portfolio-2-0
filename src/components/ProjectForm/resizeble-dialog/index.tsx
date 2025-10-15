'use client';

import { CustomScrollbar } from '@/components/CustomScrollbar';
import MDRender from '@/components/MDRender';
import { AnimatePresence, motion } from 'framer-motion';
import { Fullscreen } from 'lucide-react';
import { useRef, useState } from 'react';
import newProjectFormStyles from '../newProjectForm.module.css';
import styles from './resizeble-dialog.module.css';

interface IResizableDialogProps {
  showPreviewDialog: boolean;
  setShowPreviewDialog: (show: boolean) => void;
  currentMarkdown: string;
}

const ResizableDialog: React.FC<IResizableDialogProps> = ({
  showPreviewDialog,
  setShowPreviewDialog,
  currentMarkdown,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  // const [width, setWidth] = useState(800); // ancho inicial
  // const minWidth = 300;
  // const maxWidth = 2100;

  // const startResize = (
  //   e: React.PointerEvent<HTMLDivElement>,
  //   side: 'left' | 'right',
  // ) => {
  //   e.preventDefault();

  //   const startX = e.clientX;
  //   const startWidth = width;

  //   // 🔹 Bloquear selección de texto mientras arrastro
  //   document.body.style.userSelect = 'none';

  //   const handleMove = (ev: PointerEvent) => {
  //     let newWidth = startWidth;

  //     if (side === 'right') {
  //       newWidth = startWidth + (ev.clientX - startX);
  //     } else {
  //       newWidth = startWidth - (ev.clientX - startX);
  //     }

  //     newWidth = Math.min(maxWidth, Math.max(minWidth, newWidth));
  //     setWidth(newWidth);
  //   };

  //   const handleUp = () => {
  //     document.removeEventListener('pointermove', handleMove);
  //     document.removeEventListener('pointerup', handleUp);
  //     // 🔹 Restaurar selección de texto
  //     document.body.style.userSelect = '';
  //   };

  //   document.addEventListener('pointermove', handleMove);
  //   document.addEventListener('pointerup', handleUp);
  // };

  // const onLayout = (sizes: number[]) => {
  //   document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  // };

  // const defaultLayout = [33, 67];

  const minWidth = 360 + 20;
  const maxWidth = 1100 + 20;
  const [width, setWidth] = useState(minWidth); // ancho inicial
  const [resizing, setResizing] = useState<null | 'left' | 'right'>(null);

  const startResize = (side: 'left' | 'right') => setResizing(side);
  const stopResize = () => setResizing(null);

  const onResize = (e: React.MouseEvent) => {
    if (resizing) {
      const factor = width / 300;
      let newWidth = width;

      if (resizing === 'right') {
        newWidth = width + e.movementX * factor;
      } else if (resizing === 'left') {
        newWidth = width - e.movementX * factor;
      }

      // Limitar ancho
      newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));

      setWidth(newWidth);
    }
  };

  return (
    <AnimatePresence>
      {showPreviewDialog && (
        <motion.div
          className={styles.fullScreenPreview}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
          onMouseMove={onResize}
          onMouseUp={stopResize}
        >
          {/* <div
            className={styles.fullScreenPreviewContent}
            ref={contentRef}
            style={{ width, willChange: 'width' }}
          >
            <div
              className={`${styles.resizeHandle} ${styles.left}`}
              onPointerDown={(e) => startResize(e, 'left')}
            >
              <div className={styles.handleBar} />
            </div>

            <CustomScrollbar height="calc(100vh - 2rem)">
              <MDRender content={currentMarkdown} />
              <div className={styles.counter}>
                <button
                  // className={newProjectFormStyles.fullScreenBtn}
                  onClick={() => setShowPreviewDialog(false)}
                >
                  <Fullscreen />
                </button>
              </div>
            </CustomScrollbar>

            <div
              className={`${styles.resizeHandle} ${styles.right}`}
              onPointerDown={(e) => startResize(e, 'right')}
            >
              <div className={styles.handleBar} />
            </div>
          </div> */}

          <div className={styles.fullScreenPreviewContent} style={{ width }}>
            <CustomScrollbar height="calc(100vh - 2rem)">
              <MDRender content={currentMarkdown} />
              <div className={styles.btnClose}>
                <button
                  className={newProjectFormStyles.fullScreenBtn}
                  onClick={() => setShowPreviewDialog(false)}
                >
                  <Fullscreen />
                </button>
              </div>
            </CustomScrollbar>
            <div
              className={`${styles.resizeHandle} ${styles.resizeHandleLeft}`}
              onMouseDown={() => startResize('left')}
            />
            <div
              className={`${styles.resizeHandle} ${styles.resizeHandleRight}`}
              onMouseDown={() => startResize('right')}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResizableDialog;
