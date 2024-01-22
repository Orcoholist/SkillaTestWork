import React from "react";
import { noAvatar } from "../../../assets/images";
import "./PersonAvatar.css";

export default function PersonAvatar({ avatar }) {
 
  return<div className="person_avatar_wrapper">
  { avatar ? (
    <img src={avatar} alt="person_avatar" className="person_avatar" />
  ):  <img src={noAvatar} alt="person_avatar"/> }
  </div>
}


