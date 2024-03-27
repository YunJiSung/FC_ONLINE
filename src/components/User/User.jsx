'use client';

import React, { useEffect, useState } from 'react';
import Match from './Match';
import Search from '../Search/Search';

const User = ({ name }) => {
  const [data, setData] = useState('');
  // console.log(data);
  const [matchType, setMatchType] = useState('52');
  const [offset, setOffset] = useState('0');
  const [limit, setLimit] = useState('5');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/user/${decodeURIComponent(name)}`);
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error('User API Error', error);
      }
    };

    fetchData();
  }, [name]);

  if (!data || data.length === 0) {
    return (
      <div className="loading">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <div className="user__search">
        <Search />
      </div>
      <div className="user">
        <div className="user__left">
          <div className="user__basic">
            <div className="user__maxdivision">
              <ul>
                {data.maxdivision?.map((el, key) => (
                  <li key={key}>
                    <p>{el.achievementDate.slice(0, 7)}</p>
                    <div className='maxdivision__point ballon'>
                      <span>{el.division}</span>
                      <span>{el.matchType}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <h2>{data.basic?.nickname}</h2>
            <p>{data.basic?.level}</p>
          </div>
        </div>
        <div className="user__right">
          <div className='user__matchType'>
            <ul>
              <li>전체</li>
              <li>랭크</li>
            </ul>
          </div>
          <Match name={name} ouid={data.basic?.ouid} matchType={matchType} offset={offset} limit={limit} />
        </div>
      </div>
    </>
  );
};

export default User;
