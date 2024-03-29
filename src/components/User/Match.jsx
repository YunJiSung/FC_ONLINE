'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import timeAgo from '@/utils/timeAgo';
import Link from 'next/link';
import Image from 'next/image';

const Match = ({ name, ouid, searchName, matchList }) => {
  // console.log(name, ouid, searchName);
  const [data, setData] = useState('');
  // console.log(data.matches);
  const [imgData, setImgData] = useState('');
  const [matchType, setMatchType] = useState(50);
  // console.log(matchType);
  const [offset, setOffset] = useState('0');
  const [limit, setLimit] = useState('10');
  const [moreMatch, setMoreMatch] = useState(5);

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
          {matchList.map((el, key) => (
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
              <li key={key} className={match.matchInfo.find((item) => item.nickname === searchName).matchDetail.matchResult === '승' ? 'win' : 'lose'}>
                <div className="match__left">
                  <div className="matchLeft__top">
                    <p className="matchType">{matchList.find((item) => item.matchtype === match.matchType).desc}</p>
                    <p className="matchDate">{timeAgo(match.matchDate)}</p>
                  </div>
                  <div className="line50" />
                  <div className="matchLeft__bottom">
                    <p className="matchResult">{match.matchInfo.find((item) => item.nickname === searchName).matchDetail.matchResult}</p>
                  </div>
                </div>
                <div className="match__center">
                  <div className="matchCenter__left">
                    <div className="left__detail">
                      <ul>
                        <li>
                          <span>컨트롤러</span>
                          <span>{match.matchInfo[0]?.matchDetail.controller}</span>
                        </li>
                        <li>
                          <span>평점</span>
                          <span>{match.matchInfo[0]?.matchDetail.averageRating}</span>
                        </li>
                        <li>
                          <span>오프사이드</span>
                          <span>{match.matchInfo[0]?.matchDetail.OffsideCount}</span>
                        </li>
                        <li>
                          <span>점유율</span>
                          <span>{match.matchInfo[0]?.matchDetail.possession}</span>
                        </li>
                        <li>
                          <span>드리블 거리</span>
                          <span>{match.matchInfo[0]?.matchDetail.dribble}</span>
                        </li>
                        <li>
                          <span>코너킥</span>
                          <span>{match.matchInfo[0]?.matchDetail.cornerKick}</span>
                        </li>
                        <li>
                          <span>파울</span>
                          <span>{match.matchInfo[0]?.matchDetail.foul}</span>
                        </li>
                        <li>
                          <span>부상</span>
                          <span>{match.matchInfo[0]?.matchDetail.injury}</span>
                        </li>
                        <li>
                          <span>옐로우카드</span>
                          <span>{match.matchInfo[0]?.matchDetail.yellowCards}</span>
                        </li>
                        <li>
                          <span>레드카드</span>
                          <span>{match.matchInfo[0]?.matchDetail.redCards}</span>
                        </li>
                        
                      </ul>
                    </div>
                    <p>
                      <Link href={`/user/${match.matchInfo[0]?.nickname}`}>{match.matchInfo[0]?.nickname}</Link>
                    </p>
                  </div>
                  <div className="matchCenter__center">
                    <p>{match.matchInfo[0]?.shoot.goalTotalDisplay}</p>
                    <p>:</p>
                    <p>{match.matchInfo[1]?.shoot.goalTotalDisplay}</p>
                  </div>
                  <div className="matchCenter__right">
                    <p>
                      <Link href={`/user/${match.matchInfo[1]?.nickname}`}>{match.matchInfo[1]?.nickname}</Link>
                    </p>
                    <div className="right__detail">
                      <ul>
                        <li>
                          <span>컨트롤러</span>
                          <span>{match.matchInfo[0]?.matchDetail.controller}</span>
                        </li>
                        <li>
                          <span>평점</span>
                          <span>{match.matchInfo[0]?.matchDetail.averageRating}</span>
                        </li>
                        <li>
                          <span>오프사이드</span>
                          <span>{match.matchInfo[0]?.matchDetail.OffsideCount}</span>
                        </li>
                        <li>
                          <span>점유율</span>
                          <span>{match.matchInfo[0]?.matchDetail.possession}</span>
                        </li>
                        <li>
                          <span>드리블 거리</span>
                          <span>{match.matchInfo[0]?.matchDetail.dribble}</span>
                        </li>
                        <li>
                          <span>코너킥</span>
                          <span>{match.matchInfo[0]?.matchDetail.cornerKick}</span>
                        </li>
                        <li>
                          <span>파울</span>
                          <span>{match.matchInfo[0]?.matchDetail.foul}</span>
                        </li>
                        <li>
                          <span>부상</span>
                          <span>{match.matchInfo[0]?.matchDetail.injury}</span>
                        </li>
                        <li>
                          <span>옐로우카드</span>
                          <span>{match.matchInfo[0]?.matchDetail.yellowCards}</span>
                        </li>
                        <li>
                          <span>레드카드</span>
                          <span>{match.matchInfo[0]?.matchDetail.redCards}</span>
                        </li>
                        
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="match__right">
                  <button type="button">&gt;</button>
                </div>
{/* 
                <ul className="player">
                  {match.matchInfo[0]?.player.map((el, key) => (
                    <li key={key}>
                      <Image src={`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${el.spId}.png`} width={15} height={15} alt="선수 이미지" />
                      <p>{el.spId}</p>
                    </li>
                  ))}
                </ul> */}
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
