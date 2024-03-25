// import axios from "axios";
// import { NextResponse } from "next/server"

// const fetchData = async (url) => {
//     try {
//         const res = await axios.get(url, { headers: { 'x-nxopen-api-key': process.env.NEXON_API}});
//     } catch (error) {
//         console.error('API 요청중 에러가 발생했습니다.', error);
//         return new NextResponse(
//             JSON.stringify({message: "API Error"})
//         )
//     }
// }

// export const GET = async(req, {params}) => {
//     const { name } = params;
//     // console.log(name);
    
//     try {
//         // ocid
//         const ocidData = await fetchData(`https://open.api.nexon.com/fconline/v1/id?nickname=${name}`)
//         const ocid = ocidData.ocid;
//         console.log(ocid);

//         const [basic] = await Promise.all([
//             fetchData(`https://open.api.nexon.com/fconline/v1/user/basic?ocid=${ocid}`), // 기본 정보
//         ]);

//         return new NextResponse(JSON.stringify(basic ,{status : 200}))
//     } catch (error) {
//         console.log(error);
//         return new NextResponse(JSON.stringify({message: "API Error"}, {status: 500}))
//     }
// }