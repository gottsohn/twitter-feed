import React from 'react';
import styles from './App.css';
import classnames from 'classnames';
import Header from './components/shared/Header.jsx';
import Footer from './components/shared/Footer.jsx';

export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.fullHeight}>
      <Header />
        <div className={classnames(styles.container, styles.fullHeight)}>
          {this.props.children}
        </div>
      <Footer />
    </div>
    );
  }
}
