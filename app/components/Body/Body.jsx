import styles from './_Body.scss';
import React from 'react';
import Menu from '../Menu/Menu';

let { PropTypes } = React;

export default class Body extends React.Component {

  static defaultProps = {
    items: []
  };

  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    return (
      <div className={styles.body}>
        <h1 className={styles.header}>React Seed</h1>
        <p>Here is some example data:</p>
        <Menu items={this.props.items} />
      </div>
    );
  }
}
