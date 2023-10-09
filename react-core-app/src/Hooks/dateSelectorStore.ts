import { create } from 'zustand'
import dayjs from 'dayjs'
interface DateStore {
    dateFrom: dayjs.Dayjs
    dateTo: dayjs.Dayjs
}

interface DateStoreAPI {
    setDateFrom: (dateFrom: dayjs.Dayjs) => void;
    setDateTo: (dateTo: dayjs.Dayjs) => void;
}

const useDateSelectorStore = create<DateStore & DateStoreAPI>()((set) => ({
    dateFrom: dayjs(new Date()),
    dateTo: dayjs(new Date()),
    setDateFrom: (dateFrom:dayjs.Dayjs) => set((state) => ({ ...state, dateFrom: dateFrom})),
    setDateTo: (dateTo:dayjs.Dayjs) => set((state) => ({ ...state, dateTo: dateTo})),
}))


const useSetDateFrom = () => {
    const selectorStore = useDateSelectorStore()
    return selectorStore.setDateFrom
}

const useSetDateTo = () => {
    const selectorStore = useDateSelectorStore()
    return selectorStore.setDateTo
}

const useGetDateFrom = () => {
    return useDateSelectorStore().dateFrom
}

const useGetDateTo = () => {
    return useDateSelectorStore().dateTo
}

const useGetDateFromString = () => { // YYYY-MM-DD
    const dateSelectorStore = useDateSelectorStore()
    const dateFrom = dateSelectorStore.dateFrom
    const month = dateFrom.month()+1
    const date = dateFrom.date()
    const monthString = month.toString().length == 1 ? `0${month.toString()}` : month.toString()
    const dateString = date.toString().length == 1 ? `0${date.toString()}` : date.toString()
    return `${dateFrom.year()}-${monthString}-${dateString}`
}

const useGetDateToString = () => { // YYYY-MM-DD
    const dateSelectorStore = useDateSelectorStore()
    const dateTo = dateSelectorStore.dateTo
    const month = dateTo.month()+1
    const date = dateTo.date()
    const monthString = month.toString().length == 1 ? `0${month.toString()}` : month.toString()
    const dateString = date.toString().length == 1 ? `0${date.toString()}` : date.toString()
    return `${dateTo.year()}-${monthString}-${dateString}`
}

export {
    useDateSelectorStore,
    useGetDateFrom,
    useGetDateTo,
    useSetDateFrom,
    useSetDateTo,
    useGetDateFromString,
    useGetDateToString
}