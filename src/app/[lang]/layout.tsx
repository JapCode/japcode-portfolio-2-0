import FooterSection from '@/components/FooterSection';
import WrapperContent from '@/components/WrapperContent';
import { Open_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import {
  GenerateStaticParamsReturnType,
  i18n,
  Locale,
} from '../../../i18n.config';
// @ts-ignore
import '../../assets/styles/globals.css';
import Providers from '../providers';

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

export const metadata = {
  title: 'Alonso Paredes | Portfolio',
  description: 'Desarrollador web',
};

export async function generateStaticParams(): Promise<GenerateStaticParamsReturnType> {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>; // <== tipo como promesa
}) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body
        className={`${openSans.className} ${hubot.variable} ${mona.variable}  font-sans layout-body`}
      >
        {/* <NavigationComponent /> */}
        {/* <LeftBarComponent /> */}
        <main>
          <WrapperContent lang={lang}>
            <Providers>{children}</Providers>
          </WrapperContent>
        </main>
        <FooterSection />
      </body>
    </html>
  );
}
