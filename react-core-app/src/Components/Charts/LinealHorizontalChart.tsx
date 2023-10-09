import * as React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useGroupAmountByMonth from '../../Hooks/ProcessorHooks/useGroupAmountByMonth';
import useGetGastosByDate from '../../Hooks/QueryHooks/useGetGastosByDate';
import useGetVentasByDate from '../../Hooks/QueryHooks/useGetVentasByDate';
import { useGetDateFromString, useGetDateToString } from '../../Hooks/dateSelectorStore';

// ts-ignore
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

const LinealHorizontal: React.FC = () => {

    const dateFrom = useGetDateFromString()
    const dateTo = useGetDateToString()

    const gastos = useGetGastosByDate(dateFrom, dateTo)
    
    const grouped = useGroupAmountByMonth(gastos.data, 'total')
    const ventas = useGetVentasByDate(dateFrom, dateTo)

    const ventasGrouped = useGroupAmountByMonth(ventas.data, 'total')

    const labels = Object.keys(grouped)
    const chartData = Object.values(grouped)

    const ventasChartData = Object.values(ventasGrouped)

    return <Bar options={options} data={{
        labels,
        datasets: [
            {
            label: 'Gastos',
            data: chartData,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Ventas',
                data: ventasChartData,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                }
        ]
    }} />;


}

export default LinealHorizontal