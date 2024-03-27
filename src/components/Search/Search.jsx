'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Search() {
  const [name, setName] = useState(null);

  const router = useRouter();
  const handleSearch = () => {
    router.push(`/user/${name}`);
  };

  return (
    <div className="searchBar">
      <label htmlFor="search" className="hidden">
        검색
      </label>
      <input
        type="text"
        placeholder="유저명을 입력해주세요."
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <button type="button" onClick={handleSearch}>
        검색
      </button>
    </div>
  );
}
