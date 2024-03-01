import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DoughnutChart = ({ chartData, selectedDate, setSelectedDate }: any) => {
  const [firstParam, setFirstParam] = useState([]);
  const [secondParam, setSecondParam] = useState([]);
  const [thirdParam, setThirdParam] = useState([]);

  const [firstChart, setFirstChart] = useState("Connected");
  const [secondChart, setSecondChart] = useState("Not answered");
  const [thirdChart, setThirdChart] = useState("Switched off");
  const [forthChart, setForthChart] = useState("Unreachable");
  const [fifthChart, setFifthChart] = useState("Hung up");



  useEffect(() => {
    setFirstChart("Connected");
    setSecondChart("Not answered");
    setThirdChart("Switched off");
    setForthChart("Unreachable");
    setFifthChart("Hung up");
  }, []);



  useEffect(() => {
    setFirstParam(
      chartData?.filter((obj: { disposition: string; }) => {
        return obj?.disposition === "Connected";
      })
    );
    setSecondParam(
      chartData?.filter((obj: { disposition: string; }) => {
        return obj?.disposition === "Not answered";
      })
    );
    setThirdParam(
      chartData?.filter((obj: { disposition: string; }) => {
        return obj?.disposition === "Switched off";
      })
    );
    setForthChart(
      chartData?.filter((obj: { disposition: string; }) => {
        return obj?.disposition === "Unreachable";
      })
    );
    setFifthChart(
      chartData?.filter((obj: { disposition: string; }) => {
        return obj?.disposition === "Hung up";
      })
    );
  }, [chartData, selectedDate]);

  const total = firstParam?.length + secondParam?.length + thirdParam?.length;

  const ptpToPercent = Math.round((firstParam?.length / total) * 100);
  const nrpToPercent = Math.round((secondParam?.length / total) * 100);
  const aplToPercent = Math.round((thirdParam?.length / total) * 100);

  const chartConfig = {
    labels: [firstChart, secondChart, thirdChart, forthChart, fifthChart],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: ["#e2522e", "#F9C262", "#ADB55E"],
        borderColor: "#fff",
        borderWidth: 3,
        hoverBackgroundColor: ["#e2522e", "#F9C262", "#ADB55E"],
        hoverBorderColor: ["#e2522e", "#F9C262", "#ADB55E"],
        data: [ptpToPercent, nrpToPercent, aplToPercent],
      },
    ],
  };

  return (
    <div className="doughnutchart-wrapper">
      <h5>
        Disposition Trend
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}>
          <option value="Today">Today</option>
          <option value="Yesterday">Yesterday</option>
          <option value="7-Days">Last 7 Days</option>
        </select>
      </h5>
      <div className="doughnutchart-container">
        <div
          className="chart-container"
          style={{ position: "relative", margin: "auto", width: "40vw" }}>
          <Doughnut
            data={chartConfig}
            width={250}
            height={250}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
        <div className="legend-container">
          <div className="legend-details">
            <span className="legend-dot one"></span>
            <div className="legend-details-title">
              {firstChart}
              <p>{firstParam?.length} count</p>
            </div>
            <ProgressBar now={ptpToPercent} className="progress-one" animated />
          </div>
          <div className="legend-details">
            <span className="legend-dot two"></span>
            <div className="legend-details-title">
              {secondChart}
              <p>{secondParam?.length} count</p>
            </div>
            <ProgressBar now={nrpToPercent} className="progress-two" animated />
          </div>
          <div className="legend-details">
            <span className="legend-dot three"></span>
            <div className="legend-details-title">
              {thirdChart}
              <p>{thirdParam?.length} count</p>
            </div>
            <ProgressBar now={aplToPercent} className="progress-three" animated />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
