'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Match = ({ name, ouid }) => {
  // console.log(name, ouid);
  const [data, setData] = useState('');
  // console.log(data);
  const [matchType, setMatchType] = useState(50);
  // console.log(matchType);
  const [offset, setOffset] = useState('0');
  const [limit, setLimit] = useState('5');

  // 임시
  const tempMatchType = [
    {
      "matchtype": 30,
      "desc": "리그 친선"
    },
    {
      "matchtype": 40,
      "desc": "클래식 1on1"
    },
    {
      "matchtype": 50,
      "desc": "공식경기"
    },
    {
      "matchtype": 52,
      "desc": "감독모드"
    },
    {
      "matchtype": 60,
      "desc": "공식 친선"
    },
    {
      "matchtype": 204,
      "desc": "볼타 친선"
    },
    {
      "matchtype": 214,
      "desc": "볼타 공식"
    },
    {
      "matchtype": 224,
      "desc": "볼타 AI대전"
    },
    {
      "matchtype": 234,
      "desc": "볼타 커스텀"
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(`/api/user/${decodeURIComponent(name)}`, {
          ouid: ouid,
          matchType: matchType,
          offset: offset,
          limit: limit,
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
    <>
      <div className="user__matchType">
        <ul>
          {tempMatchType.slice(0, 5).map((el, key) => (
            <li className={matchType === el.matchtype ? 'active' : ''} key={key} value={el.matchtype} onClick={(e) => setMatchType(e.target.value)}>
              {el.desc}
            </li>
          ))}
        </ul>
      </div>
      <div className="user__match">
        <ul>
          {data.matches?.map((match, key) => (
            <li key={key}>
              <p>{match.matchDate}</p>
              <p>{match.matchInfo[0].nickname}</p>
              <p>{match.matchInfo[1].nickname}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Match;
