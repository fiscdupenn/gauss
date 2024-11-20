import { useState } from "react";

const RangeSlider = () => {
  const [value, setValue] = useState(50); // Default value

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div style={{ width: "300px", margin: "20px auto", textAlign: "center" }}>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        style={{ width: "100%" }}
      />
      <p>Value: {value}</p>
    </div>
  );
};

export default RangeSlider;