'use client';

import { IContactContent } from '@/types/contact';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';
import ContactForm from '../ContactForm';
import ContactRRSSContainer from '../ContactRRSSContainer';
import styles from './contactOptionsContainer.module.css';

interface IContactOptionsContainer {
  page: IContactContent;
}

const ContactOptionsContainer: FC<IContactOptionsContainer> = ({
  page,
}): JSX.Element => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const type = params.get('type') || '0';
  function handleSearch(value: string): void {
    params.set('type', value);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button} ${
            type === '0' ? styles.buttonActive : ''
          }`}
          type="button"
          onClick={(): void => handleSearch('0')}
        >
          {page.buttons.socialMedia}
        </button>
        <button
          className={`${styles.button} ${
            type === '1' ? styles.buttonActive : ''
          }`}
          type="button"
          onClick={(): void => handleSearch('1')}
        >
          {page.buttons.directMessage}
        </button>
      </div>
      {type === '0' && <ContactRRSSContainer />}
      {type === '1' && (
        <div className={styles.formContainer}>
          <ContactForm page={page} />
        </div>
      )}
    </div>
  );
};

export default ContactOptionsContainer;
