import { createColumnHelper } from '@tanstack/react-table';

import { currencyFormat } from '../../../Utils';
import { AFIPRecordRow } from '../../../model/record';

const columnHelper = createColumnHelper<AFIPRecordRow>()

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
