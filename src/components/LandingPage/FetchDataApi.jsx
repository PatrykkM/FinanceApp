import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { data } from "../../Data";
import { setAPIData } from "../../redux/actions";
import { useEffect } from "react";

const FetchDataApi = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 6);
  const year = yesterday.getFullYear();
  const month = (yesterday.getMonth() + 1).toString().padStart(2, "0");
  const day = yesterday.getDate().toString().padStart(2, "0");
  const formattedYesterdays = `${year}-${month}-${day}`;

  const dispatch = useDispatch();

  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!dataFetched) {
        try {
          const promises = data.map(async (dataItem) => {
            const jsonData = await fetch(
              `https://api.polygon.io/v1/open-close/${dataItem.LinkStock}/${formattedYesterdays}?adjusted=true&apiKey=3jHxpz7O9_eoUB9NIERMOBhT5oiM0xQo`
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
  }, [dataFetched, dispatch, formattedYesterdays]);

  return <></>;
};

export default FetchDataApi;
