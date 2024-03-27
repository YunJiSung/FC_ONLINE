import axios from 'axios';
import { NextResponse } from 'next/server';

// API 호출을 담당하는 함수
const fetchData = async (url) => {
  try {
    const response = await axios.get(url, { headers: { 'x-nxopen-api-key': process.env.NEXON_API } });
    return response.data;
  } catch (error) {
    console.error('서버에서 API 요청 중 에러가 발생했습니다: ', error);
    throw error;
  }
};

export const GET = async (req, { params }) => {
  const { name } = params;
  const encodeName = encodeURIComponent(name);
  // console.log(`사용자 이름: ${name}`);

  try {
    // ouid
    const ouidData = await fetchData(`https://open.api.nexon.com/fconline/v1/id?nickname=${encodeName}`);
    const ouid = ouidData.ouid;

    // 각 API 호출을 병렬로 수행
    const [basic, maxdivision] = await Promise.all([
      fetchData(`https://open.api.nexon.com/fconline/v1/user/basic?ouid=${ouid}`), // 기본 정보
      fetchData(`https://open.api.nexon.com/fconline/v1/user/maxdivision?ouid=${ouid}`), // 역대 최고 등급
    ]);
    // res.status(200).json({ basic });
    return new NextResponse(JSON.stringify({ basic, maxdivision }, { status: 200 }));
  } catch (error) {
    console.log(error);
    // res.status(500).json({ error: '서버에서 데이터를 불러오는 데 실패했습니다.' });
    return new NextResponse(JSON.stringify({ message: '서버에서 데이터를 불러오는 데 실패했습니다. : 500' }, { status: 500 }));
  }
};

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
