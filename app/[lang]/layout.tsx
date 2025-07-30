import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { i18n, type Locale } from '@/lib/i18n/i18n-config';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import "./globals.css";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.locale);

  return {
    title: dict['meta layout title'],
    description: dict['meta layout description'],
    icons: {
      icon: '/favicon.svg',
    }
  };
}

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;
  const { children } = props;
const dictionary = await getDictionary(params.lang);

  return (
    <html lang={params.lang}>
      <body className={`${roboto.variable} container`}>
        <Header dictionary={dictionary}/>
        <main>{children}</main>
        <Footer dictionary={dictionary}/>
      </body>
      
    </html>
  );
}
