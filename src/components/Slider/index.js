import React from "react";

const Slider = (props) => {
  const { step, min, max, value, onChangeValue } = props;

  const handleChange = (maxVal) => (e) => {
    onChangeValue(e);
  };

  return (
    <div className='slider-container'>
      <input
        className='range-slider'
        type='range'
        step={step}
        min={min}
        max={max}
        value={value}
        onChange={handleChange(max)}
      />
      {/* {value} */}
    </div>
  );
};

export default Slider;
