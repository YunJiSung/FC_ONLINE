'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Match = ({ouid, matchType, offset, limit}) => {
  // console.log(ouid, matchType, offset, limit);
  const [data, setData] = useState('');
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://open.api.nexon.com/fconline/v1/user/match?ouid=${ouid}&matchtype=${matchType}&offset=${offset}&limit=${limit}`, { headers: { 'x-nxopen-api-key': process.env.NEXON_API } });
        setData(res.data);
      } catch (error) {
        console.error('Match API Error', error);
      }
    };

    fetchData();
  }, [ouid, matchType, offset, limit]);

  return (
    <div>Match</div>
  )
}

export default Match