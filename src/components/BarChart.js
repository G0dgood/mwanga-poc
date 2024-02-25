import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({
  succDisp,
  Unsuccessful,
  failDisp,
  notPicked,
  switchedOff,
  selectedDate,
  setSelectedDate,
}) => {
  const data = {
    labels: [
      "Successful",
      "Unsuccessful",
      "Switched off",
      "Not picked",
      "Not reached",
    ],
    datasets: [
      {
        label: "Number of Call",
        backgroundColor: [
          "#278725",
          "#eb362a",
          "#1c6e90",
          "#F9C262",
          "#722AC5",
        ],
        data: [
          succDisp?.length,
          Unsuccessful?.length,
          failDisp?.length,
          notPicked?.length,
          switchedOff?.length,
        ],
        borderRadius: 75,
        borderSkipped: false,
        barPercentage: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: false,
    },
    scales: {
      x: {
        ticks: {
          color: "#252733",
        },
        grid: {
          display: false,
          borderColor: "#252733",
          color: "#005B90",
        },
      },

      y: {
        ticks: {
          padding: 5,
          color: " #252733",
        },
        grid: {
          borderDash: [8, 6],
          color: "#403d3b25",
          drawBorder: false,
          drawTicks: false,
        },
      },
    },
  };

  return (
    <div>
      <Bar
        data={data}
        options={options}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
};

export default BarChart;
