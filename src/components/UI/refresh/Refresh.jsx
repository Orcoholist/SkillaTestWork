import React from "react";
import { close } from "../../../assets/images";
import "./Refresh.css";

export default function Refresh() {
  return (
    <div className="refresh">
      Сбросить фильтры
      <img src={close} alt="close" />
    </div>
  );
}
