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
  const [stepper, setStepper] = useState("day");
  const [toggleRefresh, setToggleRefresh] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentInOut = inOutByType[type];
  const in_out = currentInOut !== null ? `in_out=${currentInOut}` : "";

  let date_end = moment().format("YYYY-MM-DD");
  let date_start = moment();

  if (step === "day") {
    date_start = moment(date_start).subtract(3, "days").format("YYYY-MM-DD");
  } else if (step === "week") {
    date_start = moment(date_start).subtract(7, "days").format("YYYY-MM-DD");
  } else if (step === "month") {
    date_start = moment(date_start).subtract(30, "days").format("YYYY-MM-DD");
  } else if (step === "year") {
    date_start = moment(date_start).subtract(365, "days").format("YYYY-MM-DD");
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      fetchCallList(date_start, date_end, in_out).then((data) => {
        // console.log(data.results);
        setData(data.results);
      });
    };

    fetchData();
  }, [date_start, date_end, in_out, stepper]);

  const handleToggleRefresh = () => {
    setToggleRefresh(!toggleRefresh);
  };
  const handleRefresh = () => {
    handleToggleRefresh();
    setType("all");
  };

  const handleCallback = (value) => {
    console.log("old", date_start);
    if (value == "minus") {
      moment(date_start).subtract(3, "days");
      console.log("new", date_start, date_end);
    } else if (value == "plus") {
      moment(date_end).add(3, "days").format("YYYY-MM-DD");
    }
    console.log("new", date_start, date_end);
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
        <Step
          step={step}
          options={stepTypes}
          onChange={setStep}
          onStep={handleCallback}
        />
      </div>
      <CallItems data={data} />
    </div>
  );
};

export default CallsList;
