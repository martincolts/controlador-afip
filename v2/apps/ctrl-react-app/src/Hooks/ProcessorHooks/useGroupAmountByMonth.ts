import { AFIPRecordRow } from "@v2/model"
import _  from "lodash"

const useGroupAmountByMonth = (rows: AFIPRecordRow[] | undefined, numericAttribute: string) => {
    const groupedByDate = _.groupBy(rows, ( record )=> record.recordStringDate)

    let result: any = {}
    const keys = Object.keys(groupedByDate)

    for (const k of keys) {
        const amount = groupedByDate[k].reduce((p: any, c: any) =>  p + c[numericAttribute], 0)
        result[k] = amount
    }

    return result
}

export default useGroupAmountByMonth;
