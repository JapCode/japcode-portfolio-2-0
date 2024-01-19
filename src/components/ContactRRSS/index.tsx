'use client';

import { FC } from 'react';
import SocialIcon from '../SocialIcon';
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
        <SocialIcon iconName={icon} className={style.elementIcon} />
        <span>{accountName}</span>
        <a target="_blank" rel="noopener" href={link}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={style.elementIcon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
            <path d="M11 13l9 -9" />
            <path d="M15 4h5v5" />
          </svg>
        </a>
      </div>
      <button
        type="button"
        className={style.button}
        onClick={(): void => {
          optionSelect(link);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={style.buttonIcon}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
          <path d="M7 17l0 .01" />
          <path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
          <path d="M7 7l0 .01" />
          <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
          <path d="M17 7l0 .01" />
          <path d="M14 14l3 0" />
          <path d="M20 14l0 .01" />
          <path d="M14 14l0 3" />
          <path d="M14 20l3 0" />
          <path d="M17 17l3 0" />
          <path d="M20 17l0 3" />
        </svg>
      </button>
    </div>
  );
};

export default ContactRRSS;
