'use client';

import { motion, useAnimation } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { sideBarElements } from '../SideBar';
import styles from './adminMobileMenu.module.css';

const AdminMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useRouter();
  const controls = useAnimation();

  const handlerClick = async () => {
    if (isOpen) {
      await controls.start('hiddenMenu');
      setIsOpen(false);
    } else {
      await controls.start('visibleMenu');
      setIsOpen(true);
    }
  };

  const menuVariants = {
    hiddenMenu: {
      top: '-100vh',
      opacity: 0,
    },
    visibleMenu: {
      top: '0',
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 120,
        damping: 18,
      },
    },
  };

  const navigateTo = async (path: string) => {
    await navigation.push(path);
    handlerClick();
  };

  return (
    <>
      <motion.div
        variants={menuVariants}
        animate={isOpen ? 'visibleMenu' : 'hiddenMenu'}
        initial="hiddenMenu"
        className={styles.menuWrapper}
      >
        <ul className={styles.menuElements}>
          {sideBarElements.map((element) => (
            <li key={element.text}>
              <button onClick={() => navigateTo(element.href)}>
                <element.icon /> {element.text}
              </button>
              <div className={styles.separator} />
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.button
        className={styles.menuBtn}
        onClick={handlerClick}
        initial={{ rotate: 0, scale: 1 }}
        animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 1.2 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        {isOpen ? <X /> : <Menu />}
      </motion.button>
    </>
  );
};

export default AdminMobileMenu;
