import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAPIData } from "./redux/actions";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const FetchDataApi = () => {
  const data = useSelector((state) => state.stockData);
  // const today = new Date();
  // const yesterday = new Date(today);
  // yesterday.setDate(today.getDate() - 3);
  // const year = yesterday.getFullYear();
  // const month = (yesterday.getMonth() + 1).toString().padStart(2, "0");
  // const day = yesterday.getDate().toString().padStart(2, "0");
  // const formattedYesterdays = `${year}-${month}-${day}`;

  const dispatch = useDispatch();

  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    //  I'm glad you notice how I fetch data. Initially, I planned to do it differently like this
    //  `https://api.polygon.io/v1/open-close/${dataItem.LinkStock}/${formattedYesterdays}?adjusted=true&apiKey=3jHxpz7O9_eoUB9NIERMOBhT5oiM0xQo`
    //  but as I finished the project, I realized the Polygon API is only partially functional
    //  Now, I retrieve data from just one day instead of refreshing randomly because the API often lacks data for about seven days a month.
    //  This project is mainly for future recruiters, not commercial use. If a recruiter sees a blank page ,it won't help grab attention
    //  While other APIs are available, I believe this is the best choice, despite some imperfections
    //  Trust me, I spent a long time looking for a free, good alternative :D
    const fetchData = async () => {
      if (!dataFetched) {
        try {
          const promises = data.map(async (dataItem) => {
            const jsonData = await fetch(
              `https://api.polygon.io/v1/open-close/${dataItem.LinkStock}/2023-12-22?adjusted=true&apiKey=3jHxpz7O9_eoUB9NIERMOBhT5oiM0xQo`
            );
            const response = await jsonData.json();
            return response;
          });

          const apiDataArray = await Promise.all(promises);
          dispatch(setAPIData(apiDataArray));
          setDataFetched(true);
        } catch (error) {
          console.error("Type of Error:", error);
        }
      }
    };

    fetchData();
  }, [dataFetched, dispatch, data]);

  return <></>;
};

export default FetchDataApi;
