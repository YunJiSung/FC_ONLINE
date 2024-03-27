import React from 'react'
import User from '@/components/User/User'

export const metadata = {
  title: '유저 정보 검색 - FC.GG',
  description: '유저 정보를 검색을 통해서 확인할 수 있습니다.',
};

export default function page({params}) {
  const name = params.name;

  return (
    <main id='main'>
      <div className='container'>
        <User name={name} />
      </div>
    </main>
  )
}
