import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Locale } from "@/lib/i18n/i18n-config";
import LocaleSwitcher from "@/components/LocaleSwitcher/LocalSwitcher";

export default async function IndexPage(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);

  return (
    <div>
      <LocaleSwitcher />
      <div>
        <p>Current locale: {lang}</p>
        <p>
      hello
        </p>
      </div>
    </div>
  );
}