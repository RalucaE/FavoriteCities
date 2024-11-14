import Link from 'next/link';
import {Button} from "@/components/ui/button";
import styles from "@/styles/Header.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import {  useState } from 'react';
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
  } from "@/components/ui/menu";

export default function Header() {
  const { data: session } = useSession();
  let username = '';

  if(session) {
    username = session.user.name;
  }
  return (
    <>
      <header className={styles.header}> 
        <div className={styles.headerLeft}>
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
          </MenuContent>
        </MenuRoot>
        <h1 className={`${styles.h1}`}>
          <Link href="/">Favorite Cities</Link>
        </h1>
        </div>
        <div className={styles.headerRight}>
          {session ? (
            <h2 className={styles.h2} >   Hi, {username}</h2>
            ) : (
              <h2 className={styles.h2} > </h2>
            )
          }    
          <MenuRoot>
            <MenuTrigger asChild>
              <Button className={`${styles.userButton}`}  variant="outline" size="sm">
                <img src="/images/user.svg" alt="Menu Icon" className="menu-icon" />
              </Button>
            </MenuTrigger>
            <MenuContent className={`${styles.menuContent}`} >
              <MenuItem className={`${styles.menuItem}`}>
                {session ? (
                  <button onClick={() => signOut()}>Sign out</button>      
                  ) : (
                    <button onClick={() => signIn()}>Sign in</button>
                  )
                }            
              </MenuItem>                   
            </MenuContent>
          </MenuRoot>
        </div>
      </header>
    </>
  );
}