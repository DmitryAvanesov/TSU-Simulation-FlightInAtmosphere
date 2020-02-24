'use strict'

class Timer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class='timer'>
        {`${this.props.time / 1000} sec`}
      </div>
    );
  }
}