import React, { useState, useEffect } from "react";
import Step from "../UI/step/Step";
import "./CallList.css";
import SelectType from "../UI/select/SelectType";
import CallItems from "../callItems/CallItems";
import { stepTypes, types, inOutByType } from "../../assets/constants";
import Refresh from "../UI/refresh/Refresh";
import { fetchCallList } from "../../Api/FetchData.js";
import moment from "moment";
import SelType from "../UI/select/SelType.jsx";

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
  let date_start = moment().subtract(3, "days").format("YYYY-MM-DD");

  const [dateStart, setDateStart] = useState(
    moment().subtract(3, "days").format("YYYY-MM-DD")
  );
  const [dateEnd, setDateEnd] = useState(moment().format("YYYY-MM-DD"));

  const handleStep = (value) => {
    if (step === "day") {
      date_start = moment(date_start).subtract(3, "days").format("YYYY-MM-DD");
    } else if (step === "week") {
      date_start = moment(date_start).subtract(7, "days").format("YYYY-MM-DD");
    } else if (step === "month") {
      date_start = moment(date_start).subtract(30, "days").format("YYYY-MM-DD");
    } else if (step === "year") {
      date_start = moment(date_start)
        .subtract(365, "days")
        .format("YYYY-MM-DD");
    }
    setDateStart(date_start);
    setStep(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setDateStart(dateStart);
      setDateEnd(dateEnd);
      fetchCallList(dateStart, dateEnd, in_out).then((data) => {
        console.log(data.results, dateStart, dateEnd, in_out);
        setData(data.results);
      });
    };

    fetchData();
  }, [in_out, stepper, dateStart, dateEnd]);

  const handleToggleRefresh = () => {
    setToggleRefresh(!toggleRefresh);
  };
  const handleRefresh = () => {
    handleToggleRefresh();
    setType("all");
  };

  const handleCallback = (value) => {
    if (value === "minus") {
      const newDateStart = moment(dateStart)
        .subtract(3, "days")
        .format("YYYY-MM-DD");
      const newDateEnd = moment(dateEnd)
        .subtract(3, "days")
        .format("YYYY-MM-DD");
      setDateStart(newDateStart);
      setDateEnd(newDateEnd);
    } else if (value === "plus") {
      const newDateStart = moment(dateStart)
        .add(3, "days")
        .format("YYYY-MM-DD");
      const newDateEnd = moment(dateEnd).add(3, "days").format("YYYY-MM-DD");
      setDateStart(newDateStart);
      setDateEnd(newDateEnd);
    }
    console.log(dateStart, dateEnd);
  };

  const pickerDayStart = (value) => {
    setDateStart(value);
    setDateStart(value);
  };

  const pickerDayEnd = (value) => {
    setDateEnd(value);
    setDateEnd(value);
  };
console.log("ТИП", type)
  return (
    <div className="call-list">
      <div className="call-list__header">
        {/* <SelectType
          className="call-list__type"
          onChange={setType}
          value={type}
          options={types}
          data={data}
          defaultValue={type}
        /> */}
        <SelType
          className="call-list__type"
          onChange={setType}
          value={type}
          options={types}
          data={data}
          defaultValue={type}
        />
        <div className="call-list__refresh" onClick={handleRefresh}>
        {type !== "all"  ? <Refresh /> : ""}
        </div>
        <div className="call-list__refresh" onClick={handleRefresh}>
          {type !== "all" && toggleRefresh ? <Refresh /> : ""}
        </div>
        <Step
          step={step}
          options={stepTypes}
          onChange={handleStep}
          onStep={handleCallback}
          pickerDayStart={pickerDayStart}
          pickerDayEnd={pickerDayEnd}
        />
      </div>
      <CallItems data={data} />
    </div>
  );
};

export default CallsList;
