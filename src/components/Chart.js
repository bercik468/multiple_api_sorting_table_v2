import React from "react";
import { Line } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  chart: {
    display: "none",
    [theme.breakpoints.up(700)]: {
      display: "block"
    }
  }
}));

const Chart = props => {
  const classes = useStyles();
  return (
    <div className={classes.chart}>
      {props.chartData.open && (
        <Line
          data={props.chartData.dataOpen}
          options={{
            title: {
              display: props.displayTitle,
              text: props.chartData.dataOpen.name,
              fontSize: 25
            },
            legend: {
              display: props.displayLegend,
              position: props.legendPosition
            }
          }}
        />
      )}
    </div>
  );
};

export default Chart;
