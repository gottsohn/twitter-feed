import React from 'react';
import PublicActions from '../../actions/PublicActions';

export default class Help extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    PublicActions.setTitle('Help');
  }

  render() {
    return (
      <div>
        <h1>Hilfe</h1>
        <p>Etwas hilfe nachricht würde anzeigen hier.</p>
      </div>
    );
  }
}
