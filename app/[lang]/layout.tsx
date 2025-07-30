import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { i18n, type Locale } from '@/lib/i18n/i18n-config';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import "./globals.css";

export const metadata: Metadata = {
  title: 'MiniBlog',
  description:
    'A simple multilingual blog built with Next.js. Explore posts, learn about the project, and switch languages with ease.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'MiniBlog',
    description:
      'A simple multilingual blog built with Next.js. Explore posts, learn about the project, and switch languages with ease.',
    url: 'https://your-vercel-url.vercel.app/',
    siteName: 'MiniBlog',
    images: [
      {
        url: 'https://your-vercel-url.vercel.app/og-image.jpg', // Замінити на актуальне зображення
        width: 1200,
        height: 630,
        alt: 'MiniBlog OpenGraph Image',
      },
    ],
    type: 'website',
  },
};

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
      <body className='container'>
        <Header dictionary={dictionary}/>
        <main>{children}</main>
      </body>
      <Footer dictionary={dictionary}/>
    </html>
  );
}
