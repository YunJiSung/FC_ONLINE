import React from 'react'
import User from '@/components/User/User'

export default function page({params}) {
  const name = params.name;

  return (
    <main id='main'>
      <User name={name} />
    </main>
  )
}
