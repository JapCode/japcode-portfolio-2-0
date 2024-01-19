'use client';

import globalStyles from '@/assets/styles/genericStyles.module.css';
import { Toaster } from 'sonner';

const Providers = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <>
      {children}
      <Toaster
        position="bottom-center"
        expand
        toastOptions={{
          style: { borderRadius: 5, color: '#1a1222' },
        }}
        loadingIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={globalStyles.loadingIcon}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3a9 9 0 1 0 9 9" />
          </svg>
        }
      />
    </>
  );
};

export default Providers;
