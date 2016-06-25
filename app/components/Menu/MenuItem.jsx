import React from 'react';
import YouTube from 'react-youtube';

let { Component, PropTypes } = React;

export default class Player extends React.Component {
  
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    const opts = {
      height: '195',
      width: '320'
    };

    return (
      <YouTube
        videoId={this.props.item.id.videoId}
        opts={opts}
        onReady={this._onReady}
      />
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}