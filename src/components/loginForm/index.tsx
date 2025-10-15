'use client';

import { authenticate } from '@/lib/actions/auth';
import { CircleAlert } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useActionState, useState } from 'react';
import './module.css';

export function LoginForm({ className = '', ...props }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  // const handleSubmit = async () => {
  //   // event.preventDefault();
  //   const result = await login(email, password);
  //   console.log('Login result:', result);
  // };
  return (
    <div className={`login-form ${className}`} {...props}>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Welcome back</h2>
          <p className="card-description">
            This is my admin panel, if you want to see the public version, go to{' '}
            <Link href="/" className="home-link">
              home.
            </Link>
          </p>
        </div>
        <div className="card-content">
          <form action={formAction}>
            <div className="form-grid">
              {/* <div className="social-buttons">
                <button type="button" className="btn btn-outline full-width">
                  <svg viewBox="0 0 24 24" className="icon">
                    <path d="M12.152 6.896..." fill="currentColor" />
                  </svg>
                  Login with Apple
                </button>
                <button type="button" className="btn btn-outline full-width">
                  <svg viewBox="0 0 24 24" className="icon">
                    <path d="M12.48 10.92..." fill="currentColor" />
                  </svg>
                  Login with Google
                </button>
              </div> */}

              {/* <div className="divider">
                <span className="divider-label">Or continue with</span>
              </div> */}

              <div className="form-fields">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="form-group">
                  <div className="label-row">
                    <label htmlFor="password">Password</label>
                    <a href="#" className="forgot-link">
                      Forgot your password?
                    </a>
                  </div>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    required
                    minLength={6}
                  />
                </div>
                <input type="hidden" name="redirectTo" value={callbackUrl} />
                <button
                  aria-disabled={isPending}
                  type="submit"
                  // onClick={handleSubmit}
                  className="btn full-width"
                >
                  Login
                </button>
                {/* <Link href="/admin/dashboard" className="btn full-width">
                  Login
                </Link> */}
              </div>
              {errorMessage && (
                <>
                  <CircleAlert className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
              {/* <div className="signup-text">
                Don&apos;t have an account? <a href="#">Sign up</a>
              </div> */}
            </div>
          </form>
        </div>
      </div>

      {/* <div className="terms-text">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </div> */}
    </div>
  );
}
