'use client'

import React from 'react';
import Link from 'next/link';
import { nav } from '@/constants';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathName = usePathname();
  // console.log(pathName);

  return (
    <nav className='nav'>
      <ul className="nav__list">
        {nav.map((item, index) => (
          <li
            key={index}
            className={pathName === item.href ? 'active' : ''}
          >
            <Link href={item.href}>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
