'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function Search() {
  const [name, setName] = useState(null);
  
  const router = useRouter();
  const handleSearch = () => {
    router.push(`/user/${name}`);
  }

  return (
    <div>
      <label htmlFor='search'>검색</label>
      <input
        type='text'
        placeholder='유저명'
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if(e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <button
        type='button'
        onClick={handleSearch}
      >검색</button>
    </div>
  )
}
