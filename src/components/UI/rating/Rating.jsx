import React from "react";
import "./Rating.css";

export default function Rating(inOut) {
  const rating = {
    1: "Плохо",
    0: "Отлично",
    null: "Хорошо",
  };

  return (
    <>
      <span
        className={`rating rating--negative ${
          inOut.in_out.in_out == 1 ? "" : "hide"
        }`}
      >
        {rating[inOut.in_out.in_out]}
      </span>
      <span
        className={`rating rating--positive ${
          inOut.in_out.in_out == null ? "" : "hide"
        }`}
      >
        {rating[inOut.in_out.in_out]}
      </span>
      <span
        className={`rating rating--exellent ${
          inOut.in_out.in_out == 0 ? "" : "hide"
        }`}
      >
        {rating[inOut.in_out.in_out]}
      </span>
    </>
  );
}
