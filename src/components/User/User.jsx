'use client';

import React, { useEffect, useState } from 'react';
import Match from './Match';
import Image from 'next/image';

const User = ({ name }) => {
  const [data, setData] = useState('');
  // console.log(data);
  const [division, setDivision] = useState('');
  const [matchType, setMatchType] = useState('');

  const divisionImg = (divisionPoint) => {
    const divisionMapping = {
      800: 'rank0',
      900: 'rank1',
      1000: 'rank2',
      1100: 'rank3',
      1200: 'rank4',
      1300: 'rank5',
      2000: 'rank6',
      2100: 'rank7',
      2200: 'rank8',
      2300: 'rank9',
      2400: 'rank10',
      2500: 'rank11',
      2600: 'rank12',
      2700: 'rank13',
      2800: 'rank14',
      2900: 'rank15',
      3000: 'rank16',
      3100: 'rank17',
    };
    return divisionMapping[divisionPoint] || '';
  };

  // 유저 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/user/${decodeURIComponent(name)}`);
        const data = await res.json();
        // console.log(data);
        setData(data);
      } catch (error) {
        console.error('User API Error', error);
      }
    };

    fetchData();
  }, [name]);

  // 등급 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://open.api.nexon.com/static/fconline/meta/division.json');
        const data = await response.json();
        // console.log(data);
        setDivision(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [name]);

  // 매치 종류
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://open.api.nexon.com/static/fconline/meta/matchtype.json');
        const data = await response.json();
        // console.log(data);
        setMatchType(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data || data.length === 0) {
    return (
      <div className="loading">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="user">
      <div className="user__left">
        <div className="user__basic">
          <div className="user__maxdivision">
            <ul>
              {data.maxdivision?.map((el, key) => (
                <li key={key}>
                  <p>{matchType.find((item) => item.matchtype === el.matchType)?.desc} 최고 등급</p>
                  <div className="maxdivision__point ballon">
                    <p>{el.achievementDate.slice(0, 7)}</p>
                    <span>{division.find((item) => item.divisionId === el.division)?.divisionName}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="use__info">
            <div className="rank">{!data.maxdivision || data.maxdivision.length === 0 ? '' : <Image src={`/images/rank/ico_${divisionImg(data.maxdivision[0]?.division)}.png`} width={100} height={100} alt='디비전 랭크' />}</div>
            <div className="info">
              <h2>{data.basic?.nickname}</h2>
              <span>Lv.{data.basic?.level}</span>
            </div>
          </div>
        </div>
        <aside className="user__ad">
          <div className="ad__01">AD</div>
        </aside>
      </div>
      <div className="user__right">
        <Match name={name} ouid={data.basic?.ouid} searchName={data.basic?.nickname} matchList={matchType} />
      </div>
    </div>
  );
};

export default User;
