import * as React from 'react';
import _ from 'lodash'
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
            text: 'Gastos por mes',
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



    const gastosLabels = Object.keys(grouped)
    const ventasLabels = Object.keys(ventasGrouped)

    const labels = _.union(gastosLabels, ventasLabels)

    labels.sort((a: string, b: string) => {
        const aYear = parseInt(a.split('-')[0])
        const aMonth = parseInt(a.split('-')[1])
        const bYear = parseInt(b.split('-')[0])
        const bMonth = parseInt(b.split('-')[1])

        if (aYear > bYear) {
            return 1
        } else if (aYear < bYear) {
            return -1
        } else if (aMonth > bMonth) {
            return 1
        } else if (aMonth < bMonth) {
            return -1
        } else {
            return 0
        }
        
    })

    const gastosToChart = labels.map(label => {
        return grouped[label] ? grouped[label] : 0.0
    })

    const ventasToChard = labels.map(label => {
        return ventasGrouped[label] ? ventasGrouped[label] : 0.0
    })

    return <Bar options={options} data={{
        labels,
        datasets: [
            {
            label: 'Gastos',
            data: gastosToChart,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Ventas',
                data: ventasToChard,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                }
        ]
    }} />;


}

export default LinealHorizontal