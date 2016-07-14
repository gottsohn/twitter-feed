import React from 'react';
import {Link} from 'react-router';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationHome from 'material-ui/svg-icons/action/home';
import Divider from 'material-ui/Divider';

import PublicStore from '../../stores/PublicStore';
import PublicActions from '../../actions/PublicActions';
import styles from '../../App.css';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.setTitle = this.setTitle.bind(this);
    this.handleShowSettings = this.handleShowSettings.bind(this);
    this.state = {
      title: ''
    };
  }

  componentDidMount() {
    PublicStore.listen(this.setTitle);
  }

  componentWillUnmount() {
    PublicStore.unlisten(this.setTitle);
  }

  handleShowSettings() {
    PublicActions.setDialogOpened(true);
  }

  setTitle(state) {
    this.setState({
      title: state.title
    });
  }

  render() {
    return (
      <div>
      <AppBar className={styles.header}
          iconElementLeft = {
            <Link to="/">
              <IconButton>
                <NavigationHome color="#fff" />
              </IconButton>
            </Link>
          }

          iconElementRight = {
              <IconMenu
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  iconButtonElement={
                    <IconButton><MoreVertIcon /></IconButton>
                  }
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem
                    className={styles.pointer}
                    onTouchTap={this.handleShowSettings}
                    primaryText="Settings"
                />
                <Divider />
                <Link to="/help">
                  <MenuItem primaryText="Help"/>
                </Link>
              </IconMenu>
            }
          title={this.state.title}
      />
      </div>);
  }
}
