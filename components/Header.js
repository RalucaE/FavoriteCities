import Link from 'next/link';
import {Button} from "@/components/ui/button";
import styles from "@/styles/Header.module.css";
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
  } from "@/components/ui/menu";

export default function Header() {
  return (
    <>
      <header className={styles.header}> 
        <MenuRoot>
          <MenuTrigger asChild>
            <Button className={`${styles.menuButton}`}  variant="outline" size="sm">
              <img src="/images/list.svg" alt="Menu Icon" className="menu-icon" />
            </Button>
          </MenuTrigger>
          <MenuContent className={`${styles.menuContent}`} >
            <MenuItem className={`${styles.menuItem}`}>
              <Link href="/search">Search</Link>
            </MenuItem>
            <MenuItem className={`${styles.menuItem}`}>
              <Link href="/favorites">Favorites</Link>
            </MenuItem>
            <MenuItem className={`${styles.menuItem}`}>
              <Link href="/city">City</Link>
            </MenuItem>
          </MenuContent>
        </MenuRoot>
        <h1 className={`${styles.h1}`}>
          <Link href="/">Favorite Cities</Link>
        </h1>
      </header>
    </>
  );
}