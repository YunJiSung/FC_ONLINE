'use client'

import React from 'react';
import Link from 'next/link';
import { nav } from '@/constants';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathName = usePathname();
  // console.log(decodeURIComponent(pathName));

  return (
    <nav>
      <ul className="nav">
        {nav.map((item, index) => (
          <li key={index}>
            <Link href={item.href}>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
