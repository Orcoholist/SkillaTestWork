import React from "react";
import {
  vectorBlue,
  vectorRed,
  vectorGreen,
  vectorRed2,
} from "./../../../assets/images"
import { inOutByType } from "./../../../assets/constants";

const imgByType = {
    1: vectorBlue,
    0: vectorGreen,
    2: vectorRed2,
  };

const TypeColor = ( in_out ) => {  
  return (
    <div>
      <img src={imgByType[in_out.data]} alt="CallType" />
    </div>
  );
};

export default TypeColor;
