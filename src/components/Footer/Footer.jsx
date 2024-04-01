import React from 'react';
import { footerNav } from '@/constants';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="footer" role='contentinfo'>
      <div className="container">
        <ul className='footer__nav'>
          {footerNav.map((el, key) => (
            <li key={key}>
              <Link href={el.href}>
                {el.name}
              </Link>
            </li>
          ))}
        </ul>
        <p>© All Rights Reserved. FC.GG is not associated with NEXON Korea. Data based on NEXON Open API.</p>
      </div>
    </footer>
  );
}
