'use client'

import React, { useEffect, useState } from 'react'

const Stats = () => {
  const [data, setData] = useState('');
  const [position, setPosition] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://open.api.nexon.com/static/fconline/meta/spposition.json');
        const data = await res.json();

        setPosition(data)
      } catch (error) {
        console.error('Rank API Error', error);
      }
    }

    fetchData();
  }, [])

  console.log(position)

  return (
    <div>
      <div>
        {/* position1 */}
        <label htmlFor="pos1" className='hidden'>포지션1</label>
        <select name="pos1" id="pos1">
          <option value="st">공격수</option>
          <option value="md">미드필더</option>
          <option value="df">수비수</option>
          <option value="gk">골키퍼</option>
        </select>

        {/* postion2 */}
        <label htmlFor="pos2">포지션2</label>
        <select name="pos2" id="pos2">포지션2</select>

        {/* search */}
        <label htmlFor="">선수 검색</label>
        <input type="text" placeholder='선수 이름을 입력해주세요.' />
      </div>
    </div>
  )
}

export default Stats