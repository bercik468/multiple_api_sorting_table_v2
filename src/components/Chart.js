import React from "react";
import { Line } from "react-chartjs-2";

const Chart = props => {
  return (
    <div className="chart">
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
