import { useEffect, useRef } from "react";
import * as d3 from "d3";

const GaussianChart = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    // Dimensions and margins
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    // Gaussian function
    const gaussian = (x, mean, stdDev) => {
      const exponent = -((x - mean) ** 2) / (2 * stdDev ** 2);
      return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
    };

    // Data for the Gaussian curve
    const mean = 5; // Center at the middle of the range (5 for 0-10)
    const stdDev = 1.5; // Adjusted for better visualization over 0-10 range
    const data = d3.range(0, 10, 0.1).map((x) => ({
      x,
      y: gaussian(x, mean, stdDev),
    }));

    // Scales
    const xScale = d3
      .scaleLinear()
      .domain([0, 10]) // x-axis range
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.y)]) // y-axis range
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Create SVG container
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    // Gaussian curve
    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Vertical line at 2 standard deviations above the mean
    const stdDevLine = mean + 2 * stdDev; // Position for +2σ
    svg
      .append("line")
      .attr("x1", xScale(stdDevLine))
      .attr("x2", xScale(stdDevLine))
      .attr("y1", yScale(0))
      .attr("y2", yScale(d3.max(data, (d) => d.y)))
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "4");

    // Label for the vertical line
    svg
      .append("text")
      .attr("x", xScale(stdDevLine))
      .attr("y", yScale(d3.max(data, (d) => d.y)) - 10)
      .attr("fill", "red")
      .attr("text-anchor", "middle")
      .text("+2σ");

    // Axis labels
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .text("X-axis (Range: 0 to 10)");

    svg
      .append("text")
      .attr("x", -height / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Probability Density");
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default GaussianChart;