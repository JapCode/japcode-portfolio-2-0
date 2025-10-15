import ContentComponent from '@/components/ContentComponent';
import Card from './_components/Card';
import FirstCard from './_components/FirstCard';
import styles from './blog.module.css';

const BlogPage = () => {
  return (
    <ContentComponent>
      <FirstCard />
      <div className={styles.allCardsContainer}>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </ContentComponent>
  );
};
export default BlogPage;
