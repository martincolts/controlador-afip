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

    const gastos = useGetGastosByDate('2021-01-01', '2023-10-10')
    console.log('gastos raw', gastos.data)
    const grouped = useGroupAmountByMonth(gastos.data, 'total')
    const ventas = useGetVentasByDate('2021-01-01', '2023-10-10')
    console.log('ventas raw', ventas.data)
    const ventasGrouped = useGroupAmountByMonth(ventas.data, 'total')

    const labels = Object.keys(grouped)
    const chartData = Object.values(grouped)

    console.log('gastos', grouped)
    console.log('ventas', ventasGrouped)
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