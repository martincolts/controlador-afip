import { createColumnHelper } from '@tanstack/react-table';

import { currencyFormat } from '../../../Utils';
import { AFIPRecordRow } from '../../../model/record';

const columnHelper = createColumnHelper<AFIPRecordRow>()

/*

"Fecha","Tipo","Punto de Venta","Número Desde","Número Hasta","Cód. Autorización",

"Tipo Doc. Emisor","Nro. Doc. Emisor","Denominación Emisor",
"Tipo Cambio","Moneda","Imp. Neto Gravado","Imp. Neto No Gravado","Imp. Op. Exentas","IVA","Imp. Total"
*/

const columns = [
    columnHelper.accessor(data => data.date, {
        cell: info => info.getValue(),
        header: 'Fecha',
      }),
      columnHelper.accessor(data => data.fileType, {
        cell: info => info.getValue(),
        header: 'Tipo de registro'
    }),
    columnHelper.accessor(data => data.receiptType, {
        cell: info => info.getValue(),
        header: 'Tipo'
    }),
    columnHelper.accessor(data => data.sellPoint, {
        cell: info => info.getValue(),
        header: 'Punto de venta'
    }),
    columnHelper.accessor(data => data.numberFrom, {
        cell: info => info.getValue(),
        header: 'Numbero desde'
    }),
    columnHelper.accessor(data => data.numberTo, {
        cell: info => info.getValue(),
        header: 'Numbero hasta'
    }),
    columnHelper.accessor(data => data.authCod, {
        cell: info => info.getValue(),
        header: 'Doc autorization'
    }),
    columnHelper.accessor(data => data.typeReceptorCode, {
        cell: info => info.getValue(),
        header: 'Tipo doc emisor'
    }),
    columnHelper.accessor(data => data.docReceptor, {
        cell: info => info.getValue(),
        header: 'Num doc emisor'
    }),
    columnHelper.accessor(data => data.receptorDenomination, {
        cell: info => info.getValue(),
        header: 'Denominacion emisor'
    }),
    columnHelper.accessor(data => data.changeType, {
        cell: info => info.getValue(),
        header: 'Tipo de cambio'
    }),
    columnHelper.accessor(data => data.currency, {
        cell: info => info.getValue(),
        header: 'Moneda'
    }),
    columnHelper.accessor(data => data.taxNet, {
        cell: info => info.getValue(),
        header: 'Imp no gravado'
    }),
    columnHelper.accessor(data => data.noTaxNet, {
        cell: info => info.getValue(),
        header: 'Imp neto no gravado'
    }),
    columnHelper.accessor(data => data.impOpExentas, {
        cell: info => info.getValue(),
        header: 'Imp. Op. Exentas'
    }),
    columnHelper.accessor(data => data.iva, {
        cell: info => info.getValue(),
        header: 'IVA'
    }),
    columnHelper.accessor(data => data.total, {
        cell: info => currencyFormat(info.getValue()),
        header: 'Total'
    })
]

export default columns
