import { motion } from 'framer-motion';
import Link from 'next/link';
import { items } from './data';
import style from './styles.module.css';

const Item = ({ id }) => {
  // if (id === '0' || id == null) return;
  const { category, title } = items.find((item) => item.id === id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.2, delay: 0.15 }}
      style={{ pointerEvents: 'auto' }}
      className={style.overlay}
    >
      <div className={`${style['card-content-container']} ${style.open}`}>
        <motion.div
          className={style['card-content']}
          layoutId={`card-container-${id}`}
        >
          <motion.div
            className={style['card-image-container']}
            layoutId={`card-image-container-${id}`}
          >
            <img className="card-image" src={`images/${id}.jpg`} alt="" />
          </motion.div>
          <motion.div
            className={style['title-container']}
            layoutId={`title-container-${id}`}
          >
            <span className="category">{category}</span>
            <h2>{title}</h2>
          </motion.div>
          <motion.div className={style['content-container']} animate>
            kajsldkjalsjdla
          </motion.div>
        </motion.div>
      </div>
      <Link href="/projects" />
    </motion.div>
  );
};

export default Item;
