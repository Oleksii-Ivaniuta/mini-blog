'use client';
import css from './Home.module.css';
import { type Dictionary } from '@/types/dictType';
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/api/api";
import { useRouter } from 'next/navigation';


type HomeClientPageProps = {
  dictionary: Dictionary;
};

export default function HomeClientPage({ dictionary }: HomeClientPageProps) {
    const router = useRouter();
    const openPost = (id: number): void => {
       router.push(`/posts/${id}`);
    }
    const { data: post, isLoading, error } = useQuery({
    queryKey: ["post"],
    queryFn: () => fetchPosts(),
    refetchOnMount: false,
  });

    if (isLoading) return <p>{dictionary.loading }</p>;

    if (error || !post) return <p>{dictionary.error}</p>;

  return (
    <ul className={css.list}>
      {post.map((post) => {
        return (
          <li className={css.item} key={post.id}>
            <p className={css.title}>{post.title}</p>
            <button className={css.button} onClick={() => (openPost(post.id))} type="button">
              {dictionary.open}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
