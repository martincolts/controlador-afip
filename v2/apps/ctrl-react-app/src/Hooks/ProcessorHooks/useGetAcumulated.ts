import { AFIPRecordRow } from "../../model/record"
import _  from "lodash"

const useGetAcumulated = (rows: AFIPRecordRow[], numericAttribute: string) => {
    return _.reduce<AFIPRecordRow, number>(rows, (prev: number, current: any) => {
        return prev + current[numericAttribute]
    }, 0)
}

export default useGetAcumulated