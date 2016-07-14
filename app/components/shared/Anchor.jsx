import React from 'react';
import {underline} from '../../App.css';

export default class Anchor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a
          href={this.props.href}
          target={this.props.target || '_blank'}
      >
        {this.props.label}
      </a>
    );
  }
}

Anchor.propTypes = {
  href: React.PropTypes.string.isRequired,
  label: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]),
  target: React.PropTypes.string
};
