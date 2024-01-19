import { FC, ReactNode } from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EmailTemplate: FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  subject,
  message,
}): ReactNode => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <h2>Nuevo mensaje recibido:</h2>
      <p>
        <strong>De:</strong> {name} ({email})
      </p>
      <p>
        <strong>Asunto:</strong> {subject}
      </p>
      <p>
        <strong>Mensaje:</strong> {message}
      </p>
    </div>
  );
};

export default EmailTemplate;
