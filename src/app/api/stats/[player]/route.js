import axios from 'axios';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { ouid, matchType, offset, limit } = body;
    // console.log(`matchtype: ${matchType}`)

    const matchIds = await fetchData(`https://open.api.nexon.com/fconline/v1/user/match?ouid=${ouid}&matchtype=${matchType}&offset=${offset}&limit=${limit}`);
    const matchDataPromises = matchIds.map(async (matchId) => {
      return fetchData(`https://open.api.nexon.com/fconline/v1/match-detail?matchid=${matchId}`);
    });

    // 각 매치 데이터를 가져온 후에 모아서 반환
    const matches = await Promise.all(matchDataPromises);

    return new NextResponse(JSON.stringify({ matches }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: '서버에서 매치 데이터를 불러오는 데 실패했습니다. : 500' }, { status: 500 }));
  }
};
