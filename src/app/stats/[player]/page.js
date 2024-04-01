import React from 'react'

const page = () => {

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
  
  return (
    <div>page</div>
  )
}

export default page
