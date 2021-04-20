import React from "react";
import styled from "styled-components";
import SliderSun from "./../../icons/sun.svg"
import SliderMoon from "./../../icons/moon.svg"
import localPars from "./../../hooks/currTheme";

const Slider = (props) => {
  const { step, min, max, value, onChangeValue } = props;
  const handleChange = (maxVal) => (e) => {
    onChangeValue(e);
  };

  let thumbIcon;
  
  if(localPars.theme === "dark")
  {
    thumbIcon = SliderMoon
  }
  else if( localPars.theme === "light")
  {
    thumbIcon = SliderSun
  } 

  return (
    <SliderWrap className="SliderWrap">
       
    <div className='slider-container'>
     <RangeSlider  
        type='range'
        step={step}
        min={min}
        max={max}
        value={value}
        onChange={handleChange(max)}
        backG={thumbIcon}
        className="RangeSlider"
        />
    </div>
    <SliderTextWrap>
    <div>
      {" From: " + localStorage.getItem("startDate") +" To: " + localStorage.getItem("endDate") + " "+ (value - 1) + " day(s) back"}</div>
    </SliderTextWrap>

    </SliderWrap>
  );
};

const RangeSlider = styled.input`
    -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  outline: none;
  appearance: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;


    &.RangeSlider::-webkit-slider-thumb
    { 
      -webkit-appearance: none;
      appearance: none;
      width: 30px;
      height: 30px;
      border: 0;
      background: url(${props => props.backG});
      background-size: 30px;
      background-repeat: no-repeat;
      filter: brightness(100%);
      cursor: pointer;
    }

`



const SliderWrap =styled.div `
  display: inline-flex;
  flex-direction: column;
`;



const SliderTextWrap = styled.div`
font-weight: bold;
`;


export default Slider;
