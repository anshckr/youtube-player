import styles from './_Body.scss';
import React from 'react';
import Menu from '../Menu/Menu';
import YouTube from 'react-youtube';
import $ from "jquery";
import ItemsStore from '../../stores/ItemsStore';
import AppActions from '../../actions/AppActions';

export default class Body extends React.Component {

  state = {
    videoId: null,
    nextIndex: null
  }

  _search() {
    ItemsStore.removeAll();
    let q = document.getElementById('query').value;
    AppActions.getItems(q);
  }

  _setVideoId(id, nextIndex) {
    this.setState({
      videoId: id,
      nextIndex: nextIndex
    });
  }

  _playNext() {
    let playlist = JSON.parse(localStorage.getItem('playlist')) || [];
    if (this.state.nextIndex < playlist.length) {
      let videoId = playlist[this.state.nextIndex].id.videoId;
      this.setState({
        videoId: videoId,
        nextIndex: this.state.nextIndex + 1
      })
    }
  }

  _hanleKeyPress(event) {
    if(event.key == 'Enter'){
      this._search();
    }
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1
      }
    };

    return (
      <div className={styles.body}>
        <input type="text" id="query" className={styles.input} onKeyPress={this._hanleKeyPress.bind(this)} />
        <button id="search-button" className={styles.search} onClick={this._search}>Search</button>
        <Menu activeId={this.state.videoId} setVideoId={this._setVideoId.bind(this)}/>
        {this.state.videoId ? 
          <YouTube videoId={this.state.videoId} opts={opts} onReady={this._onReady} onEnd={this._playNext.bind(this)} />
          : null
        }
      </div>
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}
