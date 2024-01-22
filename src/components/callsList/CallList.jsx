import React, { useState, useEffect } from "react";
import Step from "../UI/step/Step";
import "./CallList.css";
import SelectType from "../UI/select/SelectType";
import CallItems from "../callItems/CallItems";
import { stepTypes, types, inOutByType } from "../../assets/constants";
import Refresh from "../UI/refresh/Refresh";

const CallsList = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState("all");
  const [step, setStep] = useState("day");
  const [toggleRefresh, setToggleRefresh] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const currentInOut = inOutByType[type];
      const in_out = currentInOut !== null ? `in_out=${currentInOut}` : "";
      try {
        const response = await fetch(
          `https://api.skilla.ru/mango/getList?${in_out}`,
          {
            headers: {
              Authorization: "Bearer testtoken",
            },
            method: "POST",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData.results);
        console.log(jsonData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    setToggleRefresh(true);
    fetchData();
    
  }, [type]);

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
          {type !== "all" && toggleRefresh ? (
            <Refresh  />
          ) : (
            ""
          )}
        </div>
        <Step step={step} options={stepTypes} onChange={setStep} />
      </div>
      <CallItems data={data} />
    </div>
  );
};

export default CallsList;
