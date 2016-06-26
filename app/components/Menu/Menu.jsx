import styles from './_Menu.scss';
import React from 'react';
import MenuItem from './MenuItem';
import QueueItem from './QueueItem';
import ItemsStore from '../../stores/ItemsStore';
import Infinite from 'react-infinite';
import AppActions from '../../actions/AppActions';

let { Component, PropTypes } = React;

function getMenuState() {
  return {
    items: ItemsStore.getAll(),
    isInfiniteLoading: false,
    nextPageToken: ItemsStore.getNextPageToken(),
    playlist: JSON.parse(localStorage.getItem('playlist')) || []
  };
}

export default class Menu extends Component {

  state = getMenuState()

  componentDidMount() {
    ItemsStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    ItemsStore.removeChangeListener(this.onChange);
  }

  onChange = () => {
    this.setState(getMenuState.bind(this)());
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.playlist}>
            <span>Playlist</span>
            {this.state.playlist.map((item, index) => {
              return (<QueueItem key={item.id.videoId} setVideoId={this.props.setVideoId} activeId={this.props.activeId} index={index} item={item} />);
            }, this)}
        </div>
        <ul className={styles.menu}>
          <Infinite elementHeight={38}
                         containerHeight={500}
                         infiniteLoadBeginEdgeOffset={200}
                         onInfiniteLoad={this.handleInfiniteLoad.bind(this)}
                         loadingSpinnerDelegate={this.elementInfiniteLoad()}
                         isInfiniteLoading={this.state.isInfiniteLoading}
                         >
            {this.state.items.map((item) => {
              return (<MenuItem item={item} onChange={this.onChange.bind(this)}/>);
            }, this)}
          </Infinite>
        </ul>
      </div>
    );
  }

  handleInfiniteLoad() {
      let that = this;
      if (!that.state.nextPageToken) {
        that.setState({
            isInfiniteLoading: false
        });
        return;
      }
      that.setState({
          isInfiniteLoading: true
      });
      let q = document.getElementById('query').value;
      AppActions.getItems(q, that.state.nextPageToken);
  }

  elementInfiniteLoad() {
      return <div className="infinite-list-item">
          Loading more...
      </div>;
  }
}