'use client';

import { createDefaultUser } from '@/lib/actions/auth';
import './modules.css';

const TestPage = () => {
  const defaultUser = () => {
    createDefaultUser();
  };
  return <div className="container">fondo</div>;
};

export default TestPage;
