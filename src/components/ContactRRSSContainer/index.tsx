import socialMedia from '@/data/socialMedia';
import { useState } from 'react';
import ContactRRSS from '../ContactRRSS';
import QrElement from '../QrElement';
import styles from './contactRRSSContainer.module.css';

const ContactRRSSContainer = (): JSX.Element => {
  const [qrValue, setQrValue] = useState(
    'https://youtu.be/M2cckDmNLMI?si=jdoEc25dV5yKaBQx',
  );
  return (
    <div className={styles.rrssContainer}>
      <div className={styles.options}>
        {socialMedia.map((element) => (
          <ContactRRSS
            key={element.id}
            link={element.link}
            accountName={element.accountName}
            icon={element.icon}
            optionSelect={setQrValue}
          />
        ))}
      </div>
      <QrElement qrValue={qrValue} />
    </div>
  );
};
export default ContactRRSSContainer;
