import { db } from '@/db/drizzle';
import { SignInValidator } from '@/lib/validators/signIn';
import { getUserByEmail } from '@/utils/users';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import bcryptjs from 'bcryptjs';
import { CredentialsSignin, type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid identifier or password';
}

export const authConfig = {
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/admin/login',
  },
  // callbacks: {
  //   authorized({ auth, request: { nextUrl } }) {
  //     const isLoggedIn = !!auth?.user;
  //     const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
  //     if (isOnDashboard) {
  //       if (isLoggedIn) return true;
  //       return false; // Redirect unauthenticated users to login page
  //     } else if (isLoggedIn) {
  //       return Response.redirect(new URL('/dashboard', nextUrl));
  //     }
  //     return true;
  //   },
  // },
  adapter: DrizzleAdapter(db),
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // console.log('jwt', { token, user, trigger, session });

      if (user && user.email) {
        const searchUser = await getUserByEmail(user.email);
        token.id = user.id as string;
        token.role = searchUser[0].role ?? 'USER';
      }
      if (trigger === 'update' && session) {
        token = { ...token, ...session };
      }
      // console.log('token', token);
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role;
      // console.log('session', session);
      return session;
    },
    async redirect({ url, baseUrl }) {
      // console.log('redirect', { url, baseUrl });
      return Promise.resolve(url);
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        let user = null;
        // console.log('credentials', credentials);
        // validate credentials
        const parsedCredentials = SignInValidator.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error(
            'Invalid credentials:',
            parsedCredentials.error.message,
          );
          return null;
        }
        // console.log('parsedCredentials', parsedCredentials);
        // get user
        const searchUser = await getUserByEmail(parsedCredentials.data.email);
        // console.log('user', searchUser);
        user = searchUser[0];

        if (!user) {
          // console.log('Invalid credentials');
          throw new InvalidLoginError('Invalid identifier or password');
        }
        if (!user.password) {
          // console.log(
          //   'User has no password. They probably signed up with an oauth provider.',
          // );
          throw new InvalidLoginError(
            'User has no password. They probably signed up with an OAuth provider.',
          );
        }

        const isPasswordValid = await bcryptjs.compare(
          credentials.password as string,
          user.password as string,
        );
        if (!isPasswordValid) {
          // console.log('Invalid password');
          throw new InvalidLoginError('Invalid identifier or password');
        }

        const safeUser = {
          id: user.id as string,
          name: user.name as string,
          email: user.email as string,
          role: user.role as string,
        };
        return safeUser;
      },
    }),
  ],
} satisfies NextAuthConfig;
