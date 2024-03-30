'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import timeAgo from '@/utils/timeAgo';
import { useData } from '@/context/DataContext';

const Match = ({ name, ouid, searchName }) => {
  const [data, setData] = useState('');
  const {spidData, matchData, seasonData} = useData();
  const [matchType, setMatchType] = useState(50);
  const [offset, setOffset] = useState('0');
  const [limit, setLimit] = useState('1');
  const [moreMatch, setMoreMatch] = useState(5);

  // 경기 정보
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

  const handleMore = () => {
    setMoreMatch((prevLimit) => prevLimit + 5);
  };

  return (
    <>
      <div className="user__matchType">
        <ul>
          {matchData.map((el, key) => (
            <li className={matchType === el.matchtype ? 'active' : ''} key={key} value={el.matchtype} onClick={(e) => setMatchType(e.target.value)}>
              {el.desc}
            </li>
          ))}
        </ul>
      </div>
      <div className="user__match">
        <ul>
          {!data || (data.matches && data.matches?.length) === 0 ? (
            <div className="notData">
              <p>기록된 정보가 없습니다.</p>
            </div>
          ) : (
            data.matches?.slice(0, moreMatch).map((match, key) => (
              <li key={key} className={match.matchInfo.find((item) => item.nickname === searchName)?.matchDetail.matchResult === '승' ? 'win' : match.matchInfo.find((item) => item.nickname === searchName)?.matchDetail.matchResult === '패' ? 'lose' : 'draw'}>
                <div className="match__left">
                  <div className="matchLeft__top">
                    <p className="matchType">{matchData.find((item) => item.matchtype === match.matchType).desc}</p>
                    <p className="matchDate">{timeAgo(match.matchDate)}</p>
                  </div>
                  <div className="line50" />
                  <div className="matchLeft__bottom">
                    <p className="matchResult">{match.matchInfo.find((item) => item.nickname === searchName)?.matchDetail.matchResult}</p>
                  </div>
                </div>
                <div className="match__center">
                  <div className="matchCenter__left">
                    <ul>
                      <li className="rating">
                        <span>경기평점</span>
                        {match.matchInfo.find((item) => item.nickname === searchName)?.matchDetail.averageRating.toFixed(2)}
                      </li>
                      <li>
                        <span>컨트롤러</span>
                        {match.matchInfo.find((item) => item.nickname === searchName)?.matchDetail.controller === 'keyboard' ? '키보드' : match.matchInfo.find((item) => item.nickname === searchName)?.matchDetail.controller === 'pad' ? '패드' : '기타'}
                      </li>
                      <li>
                        <span>점유율</span>
                        {match.matchInfo.find((item) => item.nickname === searchName)?.matchDetail.possession}
                        <span>%</span>
                      </li>
                    </ul>
                  </div>
                  <div className="matchCenter__center">
                    <ul className="player">
                      {/* 시즌아이콘 */}
                      {match.matchInfo.find((item) => item.nickname === searchName)?.player.map((el, key) => {
                          const playerName = spidData.find((player) => player.id === el.spId)?.name;
                          return (
                            <li key={key}>
                              <Image src={seasonData.find((season) => season.seasonId === Math.floor(item.id / 1000000))?.seasonImg} width={16} height={13} alt={`${seasonData.find((season) => season.seasonId === Math.floor(item.id / 1000000))?.className} ${item.name}`} />
                              <span>{playerName}</span>
                            </li>
                          );
                        })}

                      {/* 선수사진 */}
                      {/* {match.matchInfo.find((item) => item.nickname === searchName)?.player.map((el, key) => {
                          const playerName = spidData.find((player) => player.id === el.spId)?.name;
                          return (
                            <li key={key}>
                              <Image src={`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${el.spId}.png`} width={15} height={15} alt="선수 이미지" />
                              <span>{playerName}</span>
                            </li>
                          );
                        })} */}
                    </ul>
                  </div>
                  <div className="matchCenter__right"></div>
                </div>
                <div className="match__right">
                  <button type="button">&gt;</button>
                </div>
              </li>
            ))
          )}
        </ul>

        {moreMatch < data.matches?.length && (
          <button className="more" type="button" onClick={handleMore}>
            더보기
          </button>
        )}
      </div>
    </>
  );
};

export default Match;
