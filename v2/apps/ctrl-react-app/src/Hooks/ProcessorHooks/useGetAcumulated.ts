import { AFIPRecordRow } from "@v2/model"
import _  from "lodash"

const useGetAcumulated = (rows: AFIPRecordRow[] | undefined, numericAttribute: string) => {
    return _.reduce<AFIPRecordRow, number>(rows, (prev: number, current: any) => {
        return prev + current[numericAttribute]
    }, 0)
}

export default useGetAcumulated