import * as React from 'react'
import useGetGastosByDate from '../../Hooks/QueryHooks/useGetGastosByDate'
import useGetVentasByDate from '../../Hooks/QueryHooks/useGetVentasByDate'
import { useGetDateFromString, useGetDateToString } from '../../Hooks/dateSelectorStore'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useGetAcumulated from '../../Hooks/ProcessorHooks/useGetAcumulated'

const TotalValues: React.FC = () => {
    const dateFrom = useGetDateFromString()
    const dateTo = useGetDateToString()

    const gastos = useGetGastosByDate(dateFrom, dateTo)
    const ventas = useGetVentasByDate(dateFrom, dateTo)

    const gastosTotal = useGetAcumulated(gastos.data, 'total')
    const ventasTotal = useGetAcumulated(ventas.data, 'total')

    function currencyFormat(num: any) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }
     console.log(currencyFormat(2665))

    return <Stack direction={'column'} spacing={2}>
        <Typography>Gastos totales: {currencyFormat(gastosTotal)}</Typography>
        <Typography>Ventas totales: {currencyFormat(ventasTotal)}</Typography>
    </Stack>
}

export default TotalValues