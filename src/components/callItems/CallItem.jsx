import React, { useState } from "react";
import "./CallItems.css";
import TypeColor from "../UI/typeColor/TypeColor";
import Rating from "../UI/rating/Rating";
import Record from "../UI/record/Record";
import moment from "moment";
import PersonAvatar from "../UI/person-avatar/PersonAvatar";

export default function CallItem({ data, index }) {
  let fullDateUtc = moment(data.date);
  let hoursUtc = fullDateUtc.format("HH:mm");
  let phone = `+7(${data.partner_data.phone.slice(
    1,
    4
  )})${data.partner_data.phone.slice(4, 11)}`;

  const [showRecord, setShowRecord] = useState(false);

  const handlerGetRecord = () => {
    setShowRecord(!showRecord);
  };

  let current_date = data.date_notime;
  // console.log(current_date === data.date_notime);

  return (
    <table className="callLine" onClick={() => handlerGetRecord()}>
      <span className="line"></span>
      <tr className="callLine_row">
        <td className="type">
          <TypeColor data={data.in_out} />
        </td>
        <td className="time">{hoursUtc === null ? "" : hoursUtc}</td>
        <td className="avatar">
          <PersonAvatar avatar={data.person_avatar} />
        </td>
        <td className="call">{phone}</td>
        <td className="source">{data.source}</td>
        <td className="rating">
          <Rating in_out={data} />
        </td>
        <td className="duration">
          {showRecord && (
            <Record recordId={data.id} partnerId={data.partnership_id} />
          )}
        </td>
      </tr>
    </table>
  );
}
