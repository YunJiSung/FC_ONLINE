'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { nav } from '@/constants';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Nav() {
  const pathName = usePathname();
  // console.log(pathName);
  const [isShow, setIsShow] = useState(false)
  const toogleMenu = () => {
    setIsShow((prevShow) => !prevShow);
  }

  return (
    <>
      <nav className={`nav ${isShow ? 'show' : ''}`} role='navigation' aria-label='메인 메뉴'>
        <ul className="nav__list">
          {nav.map((item, index) => (
            <li key={index} className={pathName === item.href ? 'active' : ''}>
              <Link href={item.href}>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className='nav__mobile' id='navToggle' role='button' aria-label='메뉴 열기' aria-controls='primary-menu' aria-expanded={isShow ? 'true' : 'false'} onClick={toogleMenu}>
        <Image src={isShow ? '/images/svg/close.svg' : '/images/svg/menu.svg'} width={24} height={24} alt='menu img' />
      </div>
    </>
  );
}
