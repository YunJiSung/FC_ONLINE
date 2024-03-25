import React from 'react'
import Link from 'next/link'
import { nav } from '@/constants'

export default function Nav() {
  return (
    <nav>
        <ul className='nav'>
            {nav.map((item, index) => (
                <li key={index}>
                    <Link href={item.href}>
                        <span>{item.name}</span>
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
  )
}
