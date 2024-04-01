'use client';

import React, { useEffect, useState } from 'react';
import { useData } from '@/context/DataContext';
import Image from 'next/image';
import Link from 'next/link';

const Stats = () => {
  const [data, setData] = useState('');
  const { matchData, positionData, spidData, seasonData } = useData();
  // console.log(seasonData);
  const [matchType, setMatchType] = useState(50);
  const [category, setCategory] = useState('공격수');
  const [keyword, setKeyword] = useState('');
  conwt [selectPosition, setSelectPosition] = useState('');S
  const [selectPlayer, setSelectPlayer] = useState('');
  const [filterPlayer, setFilterPlayer] = useState();
  console.log(`매치타입 : ${matchType}, 포지션 : ${category}, 검색어 : ${keyword}, 클릭선택 : ${selectPlayer.id} ${selectPlayer.name}`)

  const positionCategories = {
    공격수: ['ST', 'CF', 'RF', 'LF', 'RS', 'LS', 'RW', 'LW'],
    수비수: ['CB', 'LCB', 'RCB', 'LB', 'RB', 'LWB', 'RWB'],
    미드필더: ['CM', 'LCM', 'RCM', 'LM', 'RM', 'CDM', 'LDM', 'RDM', 'CAM', 'LAM', 'RAM'],
    골키퍼: ['GK'],
  };

  // 포지션1에서 카테고리 선택 시 처리
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // 선택된 카테고리에 따라 포지션 필터링
  const filteredPositions = positionData.filter((pos) => positionCategories[category]?.includes(pos.desc));

  // Enter 검색
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const filteredPlayers = spidData.filter((item) => item.name.includes(keyword));
      if (filteredPlayers) {
        setFilterPlayer(filteredPlayers);
      } else {
        console.log(없음);
      }
    }
  };

  // 클릭
  const hadlePlayerClick = (item) => {
    setSelectPlayer(item);
  };
  

  // if (!data || data.length === 0) {
  //   return (
  //     <div className="loading">
  //       <span className="loader"></span>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="rank__matchType">
        <ul>
          {matchData.map((el, key) => (
            <li className={matchType === el.matchtype ? 'active' : ''} key={key} value={el.matchtype} onClick={(e) => setMatchType(e.target.value)}>
              {el.desc}
            </li>
          ))}
          <li></li>
        </ul>
      </div>

      <div className='rank__nav'>
        <div className='rank__position'>
          <label htmlFor="pos1" className="hidden">
            포지션1
          </label>
          <select name="pos1" id="pos1" onChange={handleCategoryChange}>
            <option value="공격수">공격수</option>
            <option value="수비수">수비수</option>
            <option value="미드필더">미드필더</option>
            <option value="골키퍼">골키퍼</option>
          </select>

          <label htmlFor="pos2" className="hidden">
            포지션2
          </label>
          <select name="pos2" id="pos2" onRateChange={(e) => setSelectPosition(e.target.value)}>
            {filteredPositions.map((pos) => (
              <option value={pos.spposition} key={pos.spposition}>
                {pos.desc}
              </option>
            ))}
          </select>
        </div>

        <div className='rank__search'>
          <label htmlFor="search" className="hidden">
            선수 검색
          </label>
          <input type="text" value={keyword} placeholder="선수 이름을 입력해주세요." onChange={(e) => setKeyword(e.target.value)} onKeyDown={handleSearch} />
        </div>

      </div>

      <div className='rank__result'>
        <ul>
          {filterPlayer?.map((item, key) => (
            <li key={key} onClick={() => hadlePlayerClick(item)}>
              <div className='result__player'>
                <Image src={`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${item.id}.png`} width={100} height={100} alt="선수 이미지" />
              </div>

              <div className='search__name ellipsis'>
                <Image src={seasonData.find((season) => season.seasonId === Math.floor(item.id / 1000000))?.seasonImg} width={16} height={13} alt={`${seasonData.find((season) => season.seasonId === Math.floor(item.id / 1000000))?.className} ${item.name}`} />
                {/* <span><Link href={`/rank/staus/${matchType}${po${item.name}`}>{item.name}</Link></span> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Stats;
