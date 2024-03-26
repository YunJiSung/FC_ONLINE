'use client';

import React, { useEffect, useState } from 'react';
import Match from './Match';

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

  return (
    <div>
      {data ? (
        <div>
          성공
          <div>
            {data.basic?.level}
            {data.basic?.nickname}
          </div>
          <div>
            <ul>
              {data.maxdivision?.map((el, key) => (
                <li key={key}>
                  <p>{el.achievementDate}</p>
                  <p>{el.division}</p>
                  <p>{el.matchType}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Match name={name} ouid={data.basic?.ouid} matchType={matchType} offset={offset} limit={limit} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default User;
