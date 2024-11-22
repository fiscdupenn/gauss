'use client';

import React from "react";
import RangeSlider from "./components/RangeSlider";
import GaussianChart from "./components/GaussianChart";

export default function Home() {
  return (
    <div>
      <h1>Range Slider</h1>
      <div>
        <RangeSlider />
      </div>
      <h1>Gauss Distribution</h1>
      <div>
        <GaussianChart />
      </div>
    </div>
  );
}
