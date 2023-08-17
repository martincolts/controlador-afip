import { createColumnHelper } from '@tanstack/react-table';

import { currencyFormat } from '../Utils';
import { Row } from '../model/row';

const columnHelper = createColumnHelper<Row>()

const columns = [
    columnHelper.accessor(data => data.date, {
        cell: info => info.getValue(),
        header: 'Fecha',
      }),
    columnHelper.accessor(data => data.total, {
        cell: info => currencyFormat(info.getValue()),
        header: 'Total'
    }),
    columnHelper.accessor(data => data.fileType, {
        cell: info => info.getValue(),
        header: 'Tipo de registro'
    })
]

export default columns
