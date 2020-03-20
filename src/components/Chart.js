import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {}
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    location: "City"
  };

  render() {
    // console.log(Math.floor(Math.random() * 16777215).toString(16));

    return (
      <div className="chart">
        {this.props.chartData.open && (
          <Line
            data={this.props.chartData.dataOpen}
            options={{
              title: {
                display: this.props.displayTitle,
                text: this.props.chartData.dataOpen.name,
                fontSize: 25
              },
              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition
              }
            }}
          />
        )}
      </div>
    );
  }
}

export default Chart;
