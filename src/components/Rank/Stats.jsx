'use client'

import React, { useEffect, useState } from 'react';

const Stats = () => {
  const [matchList, setMatchList] = useState([]);
  const [matchType, setMatchType] = useState('');
  const [positions, setPositions] = useState([]);
  const [category, setCategory] = useState('');
  const [spids, setSpids] = useState([]);

  // 매치 종류
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://open.api.nexon.com/static/fconline/meta/matchtype.json');
        const data = await response.json();
        // console.log(data);
        setMatchList(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  // console.log(matchList);

  // Position
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://open.api.nexon.com/static/fconline/meta/spposition.json');
        const data = await res.json();
        setPositions(data);
      } catch (error) {
        console.error('Fetch API Error', error);
      }
    };
    fetchData();
  }, []);

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
  const filteredPositions = positions.filter(pos =>
    positionCategories[category]?.includes(pos.desc)
  );

  // spid
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://open.api.nexon.com/static/fconline/meta/spid.json');
        const data = await res.json();
        setSpids(data);
      } catch (error) {
        console.error('Fetch API Error', error);
      }
    };
    fetchData();
  }, []);
  console.log(spids);

  const handleSearch = (e) => {

  }

  // if (!data || data.length === 0) {
  //   return (
  //     <div className="loading">
  //       <span className="loader"></span>
  //     </div>
  //   );
  // }

  return (
    <div>
      <div className="user__matchType">
        <ul>
          {matchList.map((el, key) => (
            <li className={matchType === el.matchtype ? 'active' : ''} key={key} value={el.matchtype} onClick={(e) => setMatchType(e.target.value)}>
              {el.desc}
            </li>
          ))}
          <li></li>
        </ul>
      </div>
      <div>
        <label htmlFor="pos1" className="hidden">포지션1</label>
        <select name="pos1" id="pos1" onChange={handleCategoryChange}>
          <option value="">선택하세요</option>
          <option value="공격수">공격수</option>
          <option value="수비수">수비수</option>
          <option value="미드필더">미드필더</option>
          <option value="골키퍼">골키퍼</option>
        </select>

        <label htmlFor="pos2" className="hidden">포지션2</label>
        <select name="pos2" id="pos2">
          {filteredPositions.map(pos => (
            <option value={pos.spposition} key={pos.spposition}>{pos.desc}</option>
          ))}s
        </select>

        <label htmlFor="search" className="hidden">선수 검색</label>
        <input
          type="text"
          // value={ }
          placeholder="선수 이름을 입력해주세요."
          // onKeyDown={(e) => {
          //   if (e.key === 'Enter') {
          //     handleSearch();
          //   }
          // }}
          />
      </div>
    </div>
  );
};

export default Stats;
