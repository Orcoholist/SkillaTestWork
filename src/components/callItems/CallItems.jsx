import CallItem from "./CallItem";
import "./CallItems.css";
import { arrowUp } from "../../assets/images";
import { useEffect, useState } from "react";

export default function CallItems({ data, update }) {
  const [sortedData, setSortedData] = useState(data);
  const [sortOrder, setSortOrder] = useState("ASC");

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  if (!data) {
    return <p>Loading...</p>;
  }


  const compare = (a, b) => {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);

    if (sortOrder === "ASC") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  };
  const sortByTime = () => {
    console.log("sorting", sortOrder)
    setSortedData(sortedData.sort(compare));
    setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    
  };

  const sortByDuration = (data) => {
    // return data.sort((a, b) => a.duration - b.duration);
    //  setSortedData(data)
  };
  
  return (
    <table className="table-header">
   
      <tr>
        <th className="type">Тип</th>
        <th className="time">
          {" "}
          Время <img src={arrowUp} alt="arrowUp" onClick={sortByTime} />{" "}
        </th>
        <th className="avatar">Сотрудник</th>
        <th className="call">Звонок</th>
        <th className="source"> Источник</th>
        <th className="rating">Оценка</th>
        <th className="duration">
          {" "}
          Длительность{" "}
          <img src={arrowUp} alt="arrowUp" onClick={sortByDuration} />
        </th>
      </tr>
      {/* </thead> */}

      <tbody className="table-body">
        <tr>
          <td>
            {sortedData.map((call, index) => (      
                                              
              <CallItem data={call} update={update} key={index} index={index} /> 
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  );
}