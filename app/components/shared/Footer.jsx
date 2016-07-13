import React from 'react';
import Anchor from './Anchor.jsx';
import {Link} from 'react-router';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <section>
          <p>
            <small>For help <Link to="/help">click here</Link>.</small>
            <br/>
            <small>Built with <Anchor href="//facebook.github.io/react/" label="ReactJS" />, <Anchor href="//webpack.github.io" label="Webpack" /> and <Anchor href="//material-ui.com" label="Material-ui"/></small>
          </p>
        </section>
        <section>
          <small>View the <Anchor href="//github.com/gottsohn/twitter-feed" label="source code"/>.</small>
        </section>
        <section>
        </section>
      </footer>
    );
  }
}
