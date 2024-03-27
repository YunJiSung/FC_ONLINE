'use client';

import Link from 'next/link';
import Nav from './Nav';
import Search from '../Search/Search';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathName = usePathname();

  return (
    <header id="header">
      <div className="container">
        <div className="header__top">
          <Link href="/">
            <h1 className="logo">FC.GG</h1>
          </Link>
          <Nav />
        </div>
        {pathName.startsWith('/user/') ? (
          <div className="user__search">
            <Search />
          </div>
        ) : (
          ''
        )}
      </div>
    </header>
  );
}
