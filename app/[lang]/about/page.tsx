import css from './About.module.css';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { Locale } from '@/lib/i18n/i18n-config';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);

  return {
    title: dictionary['meta about title'],
    description: dictionary['meta about description'],
  };
}

export default async function About(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);

  return (
    <section className={css.about}>
      <h2 className={css.header}>{dictionary['about header']}</h2>
      <p className={css.text}>{dictionary['about text']}</p>
    </section>
  );
}
