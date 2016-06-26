import React from 'react';
import YouTube from 'react-youtube';
import $ from "jquery";
import styles from './_Menu.scss';

let { Component, PropTypes } = React;

export default class MenuItem extends React.Component {
  
  static propTypes = {
    item: PropTypes.object.isRequired
  }
  
  _addToQueue() {
    let playlist = JSON.parse(localStorage.getItem('playlist')) || [];
    let itemToAdd = this.props.item;
    // add element to playlist only if not already added
    if (!$.grep(playlist, (n) => { return n.id.videoId == itemToAdd.id.videoId }).length) {
      playlist.push(this.props.item);
      localStorage.setItem('playlist', JSON.stringify(playlist));
      this.props.onChange();   
    }
  }
  
  render() {
    return (
      <li className={styles.link} id={this.props.item.id.videoId} onClick={this._addToQueue.bind(this)}>
          {this.props.item.snippet.title}
      </li>
    );
  }
}