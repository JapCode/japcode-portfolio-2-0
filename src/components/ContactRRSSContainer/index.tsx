import { useState } from 'react';
import ContactRRSS from '../ContactRRSS';
import QrElement from '../QrElement';
import styles from './contactRRSSContainer.module.css';

const testArray = [
  {
    id: 0,
    link: 'https://youtu.be/5ydXzNUZNaY?si=GR99zFW9O-Q9GCxD',
    accountName: 'japcode',
    icon: 'mdi:linkedin',
  },
  {
    id: 1,
    link: 'https://youtu.be/fhzKLBZJC3w?si=fcJHlje2gC-Rfwq1',
    accountName: 'JapCode',
    icon: 'mdi:github',
  },
  {
    id: 2,
    link: 'https://youtu.be/sVx1mJDeUjY?si=k1oxMSX7Oy9RFq4V',
    accountName: '@JapCode',
    icon: 'pajamas:x',
  },
  {
    id: 3,
    link: 'https://youtu.be/Vopbz-exbfg?si=MEfxGPj1zwHif8Iw',
    accountName: '@jap_Code',
    icon: 'mdi:instagram',
  },
];

const ContactRRSSContainer = (): JSX.Element => {
  const [qrValue, setQrValue] = useState(
    'https://youtu.be/M2cckDmNLMI?si=jdoEc25dV5yKaBQx',
  );
  return (
    <div className={styles.rrssContainer}>
      <div className={styles.options}>
        {testArray.map((element) => (
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
