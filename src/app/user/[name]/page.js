import React from 'react'
import User from '@/components/User/User'

// const getData = async (name) => {
//   const res = await fetch(`/api/user/${name}`, {
//     cache: "no-store"
//   })

//   if (!res.ok) {
//     throw new Error("Error : getData")
//   }

//   return res.json();
// }

export default function page({params}) {
  const {name} = params;
  console.log(name);
  // const data = getData(name);
  // console.log(data);

  // if (data === "loading") {
  //   return <div>로딩중</div>
  // }

  return (
    <div>
      <p>{name}</p>
      <User />
    </div>
  )
}
