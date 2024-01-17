export type IContactContent = {
  buttons: {
    socialMedia: string;
    directMessage: string;
  };
  form: {
    labels: {
      name: string;
      email: string;
      subject: string;
      message: string;
    };
    placeholders: {
      name: string;
      email: string;
      subject: string;
      message: string;
    };
    sendButton: string;
  };
};
