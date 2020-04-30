import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions/index';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }
  render() {
    return <div>StreamList</div>;
  }
}

export default connect(null, { fetchStreams })(StreamList);
