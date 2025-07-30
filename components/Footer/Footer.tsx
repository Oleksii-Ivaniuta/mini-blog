import css from "./Footer.module.css";
import { type Dictionary } from "@/types/dictType";

type FooterProps = {
    dictionary: Dictionary
}

export default function Footer({dictionary} : FooterProps) {
    return (<header className={css.footer}>{dictionary.footer}</header>)
}