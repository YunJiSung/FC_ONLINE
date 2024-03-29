'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [divisionData, setDivisionData] = useState([]);
  const [matchData, setMatchData] = useState([]);
  const [positionData, setPositionData] = useState([]);
  const [spidData, setSpidData] = useState([]);
  const [seasonData, setSeasonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Division 데이터 가져오기
        const divisionResponse = await fetch('https://open.api.nexon.com/static/fconline/meta/division.json');
        const divisionData = await divisionResponse.json();
        setDivisionData(divisionData);

        // Match 데이터 가져오기
        const matchResponse = await fetch('https://open.api.nexon.com/static/fconline/meta/matchtype.json');
        const matchData = await matchResponse.json();
        setMatchData(matchData);

        // Position 데이터 가져오기
        const positionResponse = await fetch('https://open.api.nexon.com/static/fconline/meta/spposition.json');
        const positionData = await positionResponse.json();
        setPositionData(positionData);

        // Spid 데이터 가져오기
        const spidResponse = await fetch('https://open.api.nexon.com/static/fconline/meta/spid.json');
        const spidData = await spidResponse.json();
        setSpidData(spidData);

        // Season 데이터 가져오기
        const seasonRespnse = await fetch('https://open.api.nexon.com/static/fconline/meta/seasonid.json');
        const seasonData = await seasonRespnse.json();
        setSeasonData(seasonData);        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ divisionData, matchData, positionData, spidData, seasonData }}>
      {children}
    </DataContext.Provider>
  );
};
