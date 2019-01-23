import React from 'react';
import { connect } from 'react-redux';

class VideoItem extends React.Component {

  render() {
    return (
      <div>Video Item</div>
    );
  }

}

export default connect(null)(VideoItem);