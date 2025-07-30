import { fetchPostById, fetchPosts } from '@/lib/api/api';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { Locale } from '@/lib/i18n/i18n-config';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import css from "./Post.module.css";

type Props = {
  params: {
    locale: Locale;
    id: string;
  };
};

export async function generateStaticParams() {
  const posts = await fetchPosts();
  const locales: Locale[] = ['en', 'uk'];

  return posts.flatMap((post) =>
    locales.map((locale) => ({
      id: post.id.toString(),
      locale,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetchPostById(Number(params.id));
  return {
    title: post.title || 'Post',
    description: post.body || 'Description'
  };
}

export default async function PostPage({ params }: Props) {
  const post = await fetchPostById(Number(params.id));

  if (!post) return notFound();

  const dictionary = await getDictionary(params.locale);

  return (
    <div className={css.container}>
      <h1 className={css.header}>{post.title}</h1>
      <p className={css.text}>{post.body}</p>
      <Link className={css.button} href="/">{dictionary['back to home']}</Link>
    </div>
  );
}