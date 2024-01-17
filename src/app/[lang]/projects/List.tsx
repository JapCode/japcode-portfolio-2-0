import { motion } from 'framer-motion';
import Link from 'next/link';
import { items } from './data';
import style from './styles.module.css';

const Card = ({ id, title, category, theme }) => {
  return (
    <li className={`${style.card} ${theme}`}>
      <div className={style['card-content-container']}>
        <motion.div
          layoutId={`card-container-${id}`}
          className={style['card-content']}
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
            <span className={style.category}>{category}</span>
            <h2>{title}</h2>
          </motion.div>
        </motion.div>
      </div>
      <Link href={`projects?id=${id}`} className={style['card-open-link']} />
    </li>
  );
};

const List = ({ selectedId }): JSX.Element => {
  return (
    <ul className={style['card-list']}>
      {items.map((card) => (
        <Card key={card.id} {...card} isSelected={card.id === selectedId} />
      ))}
    </ul>
  );
};

export default List;
