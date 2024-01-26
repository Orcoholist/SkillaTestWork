import React, { useState, useEffect } from "react";
import Step from "../UI/step/Step";
import "./CallList.css";
import SelectType from "../UI/select/SelectType";
import CallItems from "../callItems/CallItems";
import { stepTypes, types, inOutByType } from "../../assets/constants";
import Refresh from "../UI/refresh/Refresh";
import { fetchCallList } from "../../Api/FetchData.js";
import moment from "moment";

const CallsList = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState("all");
  const [step, setStep] = useState("day");
  const [toggleRefresh, setToggleRefresh] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentInOut = inOutByType[type];
  const in_out = currentInOut !== null ? `in_out=${currentInOut}` : "";
  // const date_start = new Date().toISOString().slice(0, 10);
  const date_end = new Date().toISOString().slice(0, 10);
  let date_start = moment(Date.now() - 3 * 24 * 3600 * 1000).format('YYYY-MM-DD'); 

  if ( step === "day" ) {
      date_start = moment(Date.now() - 3 * 24 * 3600 * 1000).format('YYYY-MM-DD');
    } else if ( step === "week" ) {
      date_start = moment(Date.now() - 7 * 24 * 3600 * 1000).format('YYYY-MM-DD');
    } else if ( step === "month" ) {
      date_start = moment(Date.now() - 30 * 24 * 3600 * 1000).format('YYYY-MM-DD');
    } else if ( step === "year" ) {
      date_start = moment(Date.now() - 365 * 24 * 3600 * 1000).format('YYYY-MM-DD');
    }


  console.log(date_start,date_end)



  useEffect(() => {

  
    


    const fetchData = async () => {
      setIsLoading(true);
      fetchCallList(date_start, date_end, in_out).then((data) => {
        console.log(data.results);
        setData(data.results);
      });
    };
    
    fetchData();
  }, [date_start, date_end, in_out]);

  // useEffect(() => {
  //   const fetchData = async ( ) => {
  //     setIsLoading(true);
  //     const currentInOut = inOutByType[type];
  //     const in_out = currentInOut !== null ? `in_out=${currentInOut}` : "";
  //     const date_start = new Date().toISOString().slice(0, 10);
  //     const date_end = new Date().toISOString().slice(0, 10);

  //     try {
  //       const response = await fetch(
  //         // `https://api.skilla.ru/mango/getList?${in_out}&limit=500`,
  //         `https://api.skilla.ru/mango/getList?date_start=${date_start}&date_end=${date_end}&in_out=${in_out}`,
  //         {
  //           headers: {
  //             Authorization: "Bearer testtoken",
  //           },
  //           method: "POST",
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const jsonData = await response.json();
  //       setData(jsonData.results);

  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   setToggleRefresh(true);
  //   fetchData();
  // }, [type]);

  const handleToggleRefresh = () => {
    setToggleRefresh(!toggleRefresh);
  };
  const handleRefresh = () => {
    handleToggleRefresh();
    setType("all");
  };

  return (
    <div className="call-list">
      <div className="call-list__header">
        <SelectType
          className="call-list__type"
          onChange={setType}
          value={type}
          options={types}
          data={data}
          defaultValue={type}
        />
        <div className="call-list__refresh" onClick={handleRefresh}>
          {type !== "all" && toggleRefresh ? <Refresh /> : ""}
        </div>
        <Step step={step} options={stepTypes} onChange={setStep} />
      </div>
      <CallItems data={data} />
    </div>
  );
};

export default CallsList;
