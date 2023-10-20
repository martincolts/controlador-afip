import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import useGetAcumulated from '../../Hooks/ProcessorHooks/useGetAcumulated';
import { useGetDateFromString, useGetDateToString } from '../../Hooks/dateSelectorStore';
import useGetGastosByDate from '../../Hooks/QueryHooks/useGetGastosByDate';
import useGetVentasByDate from '../../Hooks/QueryHooks/useGetVentasByDate';
import Box from '@mui/material/Box'

ChartJS.register(ArcElement, Tooltip, Legend);



const GastosVentasPieChart: React.FC = () => {

    const dateFrom = useGetDateFromString()
    const dateTo = useGetDateToString()

    const gastos = useGetGastosByDate(dateFrom, dateTo)
    const ventas = useGetVentasByDate(dateFrom, dateTo)

    const gastosTotal = useGetAcumulated(gastos.data, 'total')
    const ventasTotal = useGetAcumulated(ventas.data, 'total')

     const data = {
        labels: ['Gastos', 'Ventas'],
        datasets: [
          {
            label: '# of Votes',
            data: [gastosTotal, ventasTotal],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

  return <Box maxWidth={400} maxHeight={300}>
    <Pie data={data} />
  </Box>;
}

export default GastosVentasPieChart
