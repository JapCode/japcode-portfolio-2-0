'use client';

import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import {
  FlaskConical,
  Folder,
  Home,
  LogOut,
  Newspaper,
  Settings,
  Sidebar,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './sidebar.module.css';

export const sideBarElements = [
  { href: '/admin/dashboard', icon: Home, text: 'Home' },
  {
    href: '/admin/dashboard/settings',
    icon: Settings,
    text: 'Settings',
  },
  { href: '/admin/dashboard/projects', icon: Folder, text: 'Projects' },
  // {
  //   href: '/admin/dashboard/content',
  //   icon: TableOfContents,
  //   text: 'Content',
  // },
  {
    href: '/admin/dashboard/articles',
    icon: Newspaper,
    text: 'Articles',
  },
  { href: '/admin/dashboard/test', icon: FlaskConical, text: 'Test' },
];

const OptionItem = ({
  href,
  icon: Icon,
  text,
  showText,
}: {
  href: string;
  icon: React.ComponentType;
  text: string;
  showText: boolean;
}) => {
  const patname = usePathname();
  const isActive = patname === href;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
    >
      <Link
        href={href}
        className={styles.linkItem}
        style={
          isActive
            ? {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '0.375rem',
              }
            : {}
        }
      >
        <Icon />
        <AnimatePresence initial={showText}>
          {showText && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {text}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    </motion.div>
  );
};

export default function GlassSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showText, setShowText] = useState(false);
  const controls = useAnimation();

  const toggleSidebar = async () => {
    if (isOpen) {
      setShowText(false);
      await controls.start('buttonCenter');
      controls.start('collapsed');
    } else {
      await controls.start('expanded');
      controls.start('buttonLeft');
      setTimeout(() => setShowText(true), 300);
    }
    setIsOpen(!isOpen);
  };

  const sidebarVariants = {
    collapsed: { width: '4rem' },
    expanded: { width: '16rem' },
  };

  const buttonVariants = {
    buttonCenter: {
      justifyContent: 'center',
      transition: { duration: 0.3 },
    },
    buttonLeft: {
      justifyContent: 'flex-start',
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.aside
      variants={sidebarVariants}
      animate={controls}
      initial="collapsed"
      className={styles.glassSidebar}
    >
      <motion.div
        variants={buttonVariants}
        animate={controls}
        className={styles.toggleButtonContainer}
      >
        <motion.button
          className={styles.toggleButton}
          onClick={toggleSidebar}

          // style={{ justifyContent: isOpen ? 'end' : 'center' }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
          >
            <Sidebar size={24} />
          </motion.div>
        </motion.button>
      </motion.div>

      <div className={styles.linkGroup}>
        {sideBarElements.map((item) => (
          <OptionItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            text={item.text}
            showText={showText}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0 }}
        // className="link-group"
      >
        <button className={`${styles.linkItem}, ${styles.signOutButton}`}>
          <LogOut
            style={{
              transform: 'scaleX(-1)',
              marginLeft: '-5%',
            }}
          />
          <AnimatePresence initial={showText}>
            {/* {showText && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Close
              </motion.span>
            )} */}
          </AnimatePresence>
        </button>
      </motion.div>
    </motion.aside>
  );
}
