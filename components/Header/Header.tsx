import Link from "next/link";
import css from "./Header.module.css";
import LocaleSwitcher from "../LocaleSwitcher/LocalSwitcher";
import { type Dictionary } from "@/types/dictType";

type HeaderProps = {
    dictionary: Dictionary
}

export default function Header({dictionary} : HeaderProps) {
    return (<header className={css.header}>
        <ul className={css.navlist}>
            <li><Link href="/"></Link>{ dictionary["nav home"]}</li>
            <li><Link href="/about"></Link>{dictionary["nav about"] }</li>
        </ul>
<LocaleSwitcher/>
    </header>)
}