// app/layout.tsx
import { Open_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import '../../assets/styles/globals.css';
import '../../assets/styles/prosemirror.css';

const openSans = Open_Sans({ subsets: ['latin'] });
const mona = localFont({
  src: '../../assets/fonts/MonaSans[slnt,wdth,wght].woff2',
  variable: '--font-mona',
  weight: '200 900',
});
const hubot = localFont({
  src: '../../assets/fonts/HubotSans[slnt,wdth,wght].woff2',
  variable: '--font-hubot',
  weight: '200 900',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${openSans.className} ${hubot.variable} ${mona.variable} font-sans layout-body`}
      >
        {children}
      </body>
    </html>
  );
}
