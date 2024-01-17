import { AnimatePresence } from 'framer-motion';
import Item from './Item';
import List from './List';

const Store = ({ match }) => {
  const id = match;
  const imageHasLoaded = true;

  return (
    <>
      <List selectedId={id} />
      <AnimatePresence>
        {id && imageHasLoaded && <Item id={id} key="item" />}
      </AnimatePresence>
    </>
  );
};
export default Store;
