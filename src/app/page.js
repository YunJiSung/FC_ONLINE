import React from 'react';
import Search from '@/components/Search/Search';

export default function Home() {
  return (
    <main id="main" className='main__page'>
      <div className="container">
        <div className="main__logo">
          <h2>FC.GG</h2>
        </div>
        <div className="main__search">
          <Search />
        </div>
        <div className="box__wrap">
          <div className="box left">BOX1</div>
          <div className="box right">BOX2</div>
        </div>
      </div>
    </main>
  );
}
