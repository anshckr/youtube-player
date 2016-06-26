import React from 'react';
import styles from './_Menu.scss';
import classnames from 'classnames';

let { Component, PropTypes } = React;

export default class QueueItem extends React.Component {
  
  static propTypes = {
    item: PropTypes.object.isRequired
  }
  
  /**
   * [_playVideo method to play video in the player]
   */
  _playVideo() {
    if(this.props.setVideoId) {
      this.props.setVideoId(this.props.item.id.videoId, this.props.index + 1);
    }
  }
  
  render() {
    let classes = classnames(`${styles.link}`, {
      [`${styles.active}`] : this.props.item.id.videoId === this.props.activeId
    })

    return (
      <li className={classes} id={this.props.item.id.videoId} onClick={this._playVideo.bind(this)}>
        {this.props.item.snippet.title}
      </li>
    );
  }
}