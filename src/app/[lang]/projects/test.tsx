'use client';

import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Item from './Item';
import List from './List';
import styles from './styles.module.css';

const TestComponent = ({ items }): JSX.Element => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const id = params.get('id');
  const imageHasLoaded = true;
  return (
    <div className={styles.container}>
      <LayoutGroup>
        <List selectedId={id} />
        <AnimatePresence>
          {id && imageHasLoaded && <Item id={id} key="item" />}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
};

export default TestComponent;
