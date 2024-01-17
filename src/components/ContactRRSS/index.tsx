'use client';

import { Icon } from '@iconify/react';
import { FC } from 'react';
import style from './contactRRSS.module.css';

interface IContactRRSSProps {
  link: string;
  accountName: string;
  icon: string;
  optionSelect: (value: string) => void;
}

const ContactRRSS: FC<IContactRRSSProps> = ({
  link,
  accountName,
  icon,
  optionSelect,
}): JSX.Element => {
  return (
    <div className={style.contactContainer}>
      <div className={style.linkContainer}>
        <Icon icon={icon} className={style.elementIcon} />
        <span>{accountName}</span>
        <a target="_blank" rel="noopener" href={link}>
          <Icon icon="fluent:open-24-filled" className={style.elementIcon} />
        </a>
      </div>
      <button
        type="button"
        className={style.button}
        onClick={(): void => {
          console.log('social');
          optionSelect(link);
        }}
      >
        <Icon icon="clarity:qr-code-line" className={style.buttonIcon} />
      </button>
    </div>
  );
};

export default ContactRRSS;
