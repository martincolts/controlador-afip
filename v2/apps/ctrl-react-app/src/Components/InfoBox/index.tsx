import * as React from "react";
import Stack from "@mui/material/Stack";
import {
  useGetDateFrom,
  useGetDateTo,
  useSetDateFrom,
  useSetDateTo,
} from "../../Hooks/dateSelectorStore";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid";
import LinealHorizontal from "../Charts/LinealHorizontalChart";
import TotalValues from "../Charts/TotalValues";
import GastosVentasPieChart from "../Charts/GastosVentasPieChart";
import LinealHorizontalAccumulated from "../Charts/LinealHorizontalAccumulatedChart";

interface InfoBoxProps {}

const InfoBox: React.FC<InfoBoxProps> = () => {
  const setDateFrom = useSetDateFrom();
  const setDateTo = useSetDateTo();

  const dateFrom = useGetDateFrom();
  const dateTo = useGetDateTo();

  function currencyFormat(num: any) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  console.log(currencyFormat(2665));

  return (
    <Stack>
      <Stack direction={"row"} spacing={2}>
        <DatePicker
          label="Desde"
          value={dateFrom}
          onChange={(newValue: any) => setDateFrom(newValue)}
        />
        <DatePicker
          label="Hasta"
          value={dateTo}
          onChange={(newValue: any) => setDateTo(newValue)}
        />
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TotalValues></TotalValues>
        </Grid>
        <Grid item xs={6}>
          <LinealHorizontal></LinealHorizontal>
        </Grid>
        <Grid item xs={6}>
          <GastosVentasPieChart></GastosVentasPieChart>
        </Grid>
        <Grid item xs={6}>
          <LinealHorizontalAccumulated></LinealHorizontalAccumulated>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default InfoBox;
