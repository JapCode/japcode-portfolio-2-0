'use server';

interface IFormData {
  name: string;
}

interface ISendResponse {
  status: string;
  message: string;
}

async function sendMessage(formData: IFormData): Promise<ISendResponse> {
  console.log('data', formData);
  return {
    status: 'success',
    message: 'send ',
  };
}

export default sendMessage;
