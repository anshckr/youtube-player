import styles from './_Menu.scss';
import React from 'react';
import MenuItem from './MenuItem';
import ItemsStore from '../../stores/ItemsStore';
import Infinite from 'react-infinite';
import AppActions from '../../actions/AppActions';

let { Component, PropTypes } = React;

function getMenuState() {
  var localStorageItems = JSON.parse(localStorage.getItem('all_items'));
  return {
    items: localStorageItems && localStorageItems.length ? localStorageItems.concat(ItemsStore.getAll()) : ItemsStore.getAll(),
    isInfiniteLoading: false,
    nextPageToken: ItemsStore.getNextPageToken()
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
    this.setState(getMenuState());
    var items = JSON.parse(localStorage.getItem('all_items')) || [];
    items = items.concat(getMenuState().items);
    localStorage.setItem('all_items', JSON.stringify(items));
  }

  render() {
    return (
      <ul className={styles.menu}>
        <Infinite elementHeight={195}
                       containerHeight={500}
                       infiniteLoadBeginEdgeOffset={100}
                       onInfiniteLoad={this.handleInfiniteLoad.bind(this)}
                       loadingSpinnerDelegate={this.elementInfiniteLoad()}
                       isInfiniteLoading={this.state.isInfiniteLoading}
                       >
          {this.state.items.map((item) => {
            return (<MenuItem key={item.id.videoId} item={item} />);
          }, this)}
      </Infinite>
      </ul>
    );
  }

  handleInfiniteLoad() {
      var that = this;
      if (!that.state.nextPageToken) {
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
          Loading...
      </div>;
  }
}