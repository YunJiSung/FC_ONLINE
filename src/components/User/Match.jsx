'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import timeAgo from '@/utils/timeAgo';
import Link from 'next/link';

const Match = ({ name, ouid, searchName, matchList }) => {
  // console.log(name, ouid, searchName);
  const [data, setData] = useState('');
  // console.log(data);
  const [matchType, setMatchType] = useState(50);
  // console.log(matchType);
  const [offset, setOffset] = useState('0');
  const [limit, setLimit] = useState('5');

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

  // 선수 이미지
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/p${선수id}.png`);
  //       const data = res.data;
  //       setData(data);
  //     } catch (error) {
  //       console.error('Spid API Error', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <div className="user__matchType">
        <ul>
          {matchList.slice(0, 5).map((el, key) => (
            <li className={matchType === el.matchtype ? 'active' : ''} key={key} value={el.matchtype} onClick={(e) => setMatchType(e.target.value)}>
              {el.desc}
            </li>
          ))}
        </ul>
      </div>
      <div className="user__match">
        <ul>
          {data.matches?.map((match, key) => (
            <li key={key} className={match.matchInfo.find((obj) => obj.nickname === searchName).matchDetail.matchResult === '승' ? 'win' : 'lose'}>
              <div className="match__left">
                <div className="matchLeft__top">
                  <p className="matchType">{match.matchType === 50 ? '공식경기' : ''}</p>
                  <p className="matchDate">{timeAgo(match.matchDate)}</p>
                </div>
                <div className="line50" />
                <div className="matchLeft__bottom">
                  <p className="matchResult">{match.matchInfo.find((obj) => obj.nickname === searchName).matchDetail.matchResult}</p>
                </div>
              </div>
              <div className="match__center">
                <div className="matchCenter__left">
                  <div className="left__detail"></div>
                  <p><Link href={`/user/${match.matchInfo[0].nickname}`}>{match.matchInfo[0].nickname}</Link></p>
                </div>
                <div className="matchCenter__center">
                  <p>{match.matchInfo[0].shoot.goalTotalDisplay}</p>
                  <p>:</p>
                  <p>{match.matchInfo[1].shoot.goalTotalDisplay}</p>
                </div>
                <div className="matchCenter__right">
                  <p><Link href={`/user/${match.matchInfo[1].nickname}`}>{match.matchInfo[1].nickname}</Link></p>
                </div>
              </div>
              <div className="match__right">
                <button type="button">&gt;</button>
              </div>
            </li>
          ))}
        </ul>
        <button className='more' type='button'>더보기</button>
      </div>
    </>
  );
};

export default Match;
