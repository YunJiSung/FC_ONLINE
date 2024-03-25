
import React from 'react'
import Search from '@/components/Search/Search'

export default function Home() {
  return (
    <main className=''>
      <div className='wrap'>
        <div className='container'>
          <div>
            LOGO
          </div>
          <Search />
          <div className='box_wrap'>
            <div className='box 01'>BOX1</div>
            <div className='box 02'>BOX2</div>
          </div>
        </div>
      </div>
    </main>
  )
}