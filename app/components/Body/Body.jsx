import styles from './_Body.scss';
import React from 'react';
import Menu from '../Menu/Menu';
import AppActions from '../../actions/AppActions';

export default class Body extends React.Component {

  search() {
    let q = document.getElementById('query').value;
    AppActions.getItems(q);
  }

  render() {
    return (
      <div className={styles.body}>
        <input type="text" id="query" />
        <button id="search-button" onClick={this.search}>Search</button>
        <Menu />
      </div>
    );
  }
}
