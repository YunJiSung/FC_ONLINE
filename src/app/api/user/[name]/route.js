import axios from "axios";
import { NextResponse } from "next/server";

// API 호출을 담당하는 함수
const fetchData = async (url) => {
  try {
    const response = await axios.get(url, { headers: { 'x-nxopen-api-key': process.env.NEXON_API } });
    return response.data;
  } catch (error) {
    console.error("서버에서 API 요청 중 에러가 발생했습니다: ", error);
    throw error;
  }
};

export const GET = async (req, {params}) => {
    const { name } = params;
    const encodeName = encodeURIComponent(name);
    // console.log(`사용자 이름: ${name}`);

    try {
      // ouid
      const ouidData = await fetchData(`https://open.api.nexon.com/fconline/v1/id?nickname=${encodeName}`);
      const ouid = ouidData.ouid;
  
      // 각 API 호출을 병렬로 수행
      const [basic, maxdivision, match] = await Promise.all([
        fetchData(`https://open.api.nexon.com/fconline/v1/user/basic?ouid=${ouid}`), // 기본 정보
        fetchData(`https://open.api.nexon.com/fconline/v1/user/maxdivision?ouid=${ouid}`), // 역대 최고 등급
      ]);
      // res.status(200).json({ basic });
      return new NextResponse(JSON.stringify({basic, maxdivision, match}, {status: 200}))
    } catch (error) {
      console.log(error);
      // res.status(500).json({ error: '서버에서 데이터를 불러오는 데 실패했습니다.' });
      return new NextResponse(JSON.stringify({ message: "CommentGet Error : 500" }, { status: 500 }))
    }
};
