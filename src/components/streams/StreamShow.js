import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef('videoElement');
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  buildPlayer() {
    const { id } = this.props.match.params;

    if (this.player || !this.props.streams) {
      return;
    }

    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    const { stream } = this.props;
    if (!stream) {
      return <div>Loading....</div>;
    }

    return (
      <div>
        <video
          ref="videoElement"
          id="videoElement"
          style={{ width: '100%' }}
          controls
        ></video>
        <h1>{stream.title}</h1>
        <h5>{stream.description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
