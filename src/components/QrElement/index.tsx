import { QRCodeCanvas } from 'qrcode.react';
import { useRef } from 'react';
import styles from './qrElement.module.css';

interface IQrElementProps {
  qrValue: string;
}

const QrElement = ({ qrValue }: IQrElementProps): JSX.Element => {
  const bgColorValue = '#F2f2f2f2';
  const fgColorValue = '#1a1222';

  const qrCodeRef = useRef(null);
  return (
    <div ref={qrCodeRef}>
      <QRCodeCanvas
        className={styles.qr}
        size={200}
        value={qrValue}
        level="Q"
        includeMargin
        bgColor={bgColorValue}
        fgColor={fgColorValue}
      />
    </div>
  );
};
export default QrElement;
