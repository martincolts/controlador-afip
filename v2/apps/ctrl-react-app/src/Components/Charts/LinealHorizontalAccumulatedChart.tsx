import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import _ from "lodash"
import useGroupAmountByMonth from "../../Hooks/ProcessorHooks/useGroupAmountByMonth";
import useGetGastosByDate from "../../Hooks/QueryHooks/useGetGastosByDate";
import useGetVentasByDate from "../../Hooks/QueryHooks/useGetVentasByDate";
import {
  useGetDateFromString,
  useGetDateToString,
} from "../../Hooks/dateSelectorStore";

// ts-ignore
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Gastos por mes",
    },
  },
};

const LinealHorizontalAccumulated: React.FC = () => {
  const dateFrom = useGetDateFromString();
  const dateTo = useGetDateToString();

  const gastos = useGetGastosByDate(dateFrom, dateTo);

  const gastosGrouped = useGroupAmountByMonth(gastos.data, "total");
  const ventas = useGetVentasByDate(dateFrom, dateTo);

  const ventasGrouped = useGroupAmountByMonth(ventas.data, "total");

  const gastosLabels = Object.keys(gastosGrouped);
  const ventasLabels = Object.keys(ventasGrouped);

  const labels = _.union(gastosLabels, ventasLabels);

  labels.sort((a: string, b: string) => {
    const aYear = parseInt(a.split("-")[0]);
    const aMonth = parseInt(a.split("-")[1]);
    const bYear = parseInt(b.split("-")[0]);
    const bMonth = parseInt(b.split("-")[1]);

    if (aYear > bYear) {
      return 1;
    } else if (aYear < bYear) {
      return -1;
    } else if (aMonth > bMonth) {
      return 1;
    } else if (aMonth < bMonth) {
      return -1;
    } else {
      return 0;
    }
  });

  const labelsWithDate = labels.map((label) => {
    return {
      month: label,
      gastos: gastosGrouped[label] || 0.0,
      ventas: ventasGrouped[label] || 0.0,
    };
  });

  console.log("LABELS GROUPED", labelsWithDate);

  const gastosAccumulated: any = [];
  const ventasAccumulated: any = [];
  const catA = [];
  const catB = [];

  for (let i = 0; i < labelsWithDate.length; i++) {
    if (i == 0) {
      gastosAccumulated.push(labelsWithDate[i].gastos);
      ventasAccumulated.push(labelsWithDate[i].ventas);
      catA.push(100000);
      catB.push(600000);
    } else {
      gastosAccumulated.push(
        labelsWithDate[i].gastos + gastosAccumulated[i - 1]
      );
      ventasAccumulated.push(
        labelsWithDate[i].ventas + ventasAccumulated[i - 1]
      );
      catA.push(100000);
      catB.push(600000);
    }
  }


  return (
    <Chart type='bar' options={options}
      data={{
        labels,
        datasets: [
          {
            type: "bar" as const,
            label: "Gastos",
            data: gastosAccumulated,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            type: "bar" as const,
            label: "Ventas",
            data: ventasAccumulated,
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
          {
            type: "line" as const,
            label: "cat A",
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgb(255, 99, 132)",
            borderWidth: 2,
            
            data: catA,
          },
          {
            type: "line" as const,
            label: "cat B",
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgb(255, 99, 132)",
            borderWidth: 2,
            
            data: catB,
          }
        ],
      }}
    />
  );
};

export default LinealHorizontalAccumulated;
