import React from 'react'
import { nav } from '@/constants'
import Link from 'next/link'

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
