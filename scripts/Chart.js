'use strict';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.model = new ChartModel();

    this.state = {
      data: this.model.data
    };

    this.chartWidth = 720;
    this.chartHeight = 480;
    this.axisExtensionCoef = 1.1;
  }

  render() {
    if (this.props.time == 0) {
      this.model.data.length = 0;
      this.model.setInitialValues(this.props.speed, this.props.height, this.props.angle);
    }

    this.model.setMaxAxis(this.props.speed, this.props.height, this.props.angle);

    this.model.increaseTime(
      this.props.speed,
      this.props.height,
      this.props.angle,
      this.props.mass,
      this.props.drag,
      this.props.time
    );

    if (this.model.data[this.model.data.length - 1].y <= 0) {
      this.props.callbackFinish();
    }

    return (
      <window.Recharts.LineChart
        width={this.chartWidth}
        height={this.chartHeight}
        data={this.state.data.slice()}
      >
        <window.RechartsCartesianGrid />
        <window.Recharts.XAxis
          dataKey='x'
          type='number'
          domain={[0, Math.round(this.model.maxX * this.axisExtensionCoef)]}
        />
        <window.Recharts.YAxis
          dataKey='y'
          type='number'
          domain={[0, Math.round(this.model.maxY * this.axisExtensionCoef)]}
        />
        <window.Recharts.Line
          type='monotone'
          dataKey='y'
          stroke='black'
          dot={false}
        />
      </window.Recharts.LineChart>
    );
  }
}