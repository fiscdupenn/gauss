'use client';

import React from "react";
import RangeSlider from "./components/rangeslider";
import GaussianChart from "./components/GaussianChart";

export default function Home() {
  return (
    <div>
      <h1>Range Slider</h1>
      <div>
        <RangeSlider />
      </div>
      <h1>Gaussian Chart</h1>
      <div>
        <GaussianChart />
      </div>
    </div>
  );
}
