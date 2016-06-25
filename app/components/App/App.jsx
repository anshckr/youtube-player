import styles from './_App.scss';

import React from 'react';
import Body from '../Body/Body';

export default class App extends React.Component {

  render() {
    return (
      <div className={styles.app}>
        <Body />
      </div>
    );
  }
}
