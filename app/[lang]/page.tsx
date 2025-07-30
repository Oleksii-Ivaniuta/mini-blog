import { fetchPosts } from "@/lib/api/api";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Locale } from "@/lib/i18n/i18n-config";
import HomeClientPage from "./Home.client";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";


export default async function HomePage(props: {
  params: Promise<{ lang: Locale }>;
}) {
 const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  const { lang } = await props.params;
  const dictionary = await getDictionary(lang);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
       <HomeClientPage dictionary={dictionary}/>
    </HydrationBoundary>
  );
}
