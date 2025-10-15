'use server';

import { createUser } from '@/utils/users';
import { AuthError } from 'next-auth';
import { signIn, signOut } from '../../../auth';

export const login = async (email: string, password: string) => {
  console.log('Attempting to log in with:', { email, password });
  try {
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      throw new Error(response.error);
    }

    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // Re-throw the error for further handling
  }
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  console.log('this is my data', formData);
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export const createDefaultUser = async () => {
  const newUser = {
    name: 'DefaultUser',
    email: 'default@gmai.com',
    role: 'ADMIN' as 'ADMIN',
    password: 'defaultPassword',
  };
  createUser(newUser);
};

export const signOutAction = async () => {
  console.log('Signing out...');
  await signOut({ redirectTo: '/admin/login' });
};
