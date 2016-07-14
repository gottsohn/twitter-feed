import React from 'react';

import styles from '../../App.css';
import PublicActions from '../../actions/PublicActions';
import TextField from 'material-ui/TextField';
import searchTypes from '../../lib/searchTypes';

export default class Home extends React.Component {
  static propTypes = {
    params: React.PropTypes.shape({
      type: React.PropTypes.string
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      type: this.props.params.type || searchTypes[0].id
    };
  }

  componentDidMount() {
    PublicActions.setTitle('Home');
  }

  handleKeyUp() {

  }

  render() {
    return (
      <div>
        <div className={styles.center}>
          <h1>Query Settings</h1>
          <div className={styles.container}>
            <TextField
                floatingLabelText={`Search ${this.type.name}`}
                fullWidth
                hintText="Type a name"
                name="search"
                onKeyUp={this.handleKeyUp}
            />
          </div>
        </div>
      </div>
    );
  }
}
