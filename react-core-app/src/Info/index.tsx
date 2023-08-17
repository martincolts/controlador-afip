import * as React from 'react'
import { Stack } from '@mui/material';
import { currencyFormat } from "../Utils";
import { Row } from '../model/row';

interface InfoProps {
    values: Row[]
}

const Info: React.FC<InfoProps> = ({ values }) => {

    const calculateTotal = (type: string): number => {
        return values.filter(v => v.fileType === type).reduce((accum, value) => {
            return accum + value.total
        }, 0)
    }

    return <Stack>
        <div>
            Gastos Totales: {currencyFormat(calculateTotal('Gasto'))}
        </div>
        <div>
            Ingresos Totales: {currencyFormat(calculateTotal('Venta'))}
        </div>
    </Stack>
}

export default Info