'use client';

import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Match = ({name, ouid, matchType, offset, limit}) => {
  // console.log(name, ouid, matchType, offset, limit);
  const [data, setData] = useState('');
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(`/api/user/${decodeURIComponent(name)}`, {
            ouid: ouid,
            matchType: matchType,
            offset: offset,
            limit: limit
        });
        const data = res.data;
        setData(data);
      } catch (error) {
        console.error('Match API Error', error);
      }
    };

    fetchData();
  }, [name, ouid, matchType, offset, limit]);

  return (
    <div style={{backgroundColor: "blue"}}>
      <ul style={{display: "flex", flexWrap: "wrap"}}>
        {data.matches?.map((match, key) => (
          <li key={key} style={{width: "50%"}}>
            <p>{match.matchDate}</p>
            <p>{match.matchInfo[0].nickname}</p>
            <p>{match.matchInfo[1].nickname}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Match