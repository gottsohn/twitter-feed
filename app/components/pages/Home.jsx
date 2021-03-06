import React from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/CircularProgress';
import SearchIcon from 'material-ui/svg-icons/action/search';

import languages from '../../data/languages.json';
import geocodes from '../../data/geocodes.json';
import styles from '../../App.css';
import PublicActions from '../../actions/PublicActions';
import PublicStore from '../../stores/PublicStore';
import SearchActions from '../../actions/SearchActions';
import SearchStore from '../../stores/SearchStore';
import Tweet from '../shared/Tweet.jsx';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    // Set binders to use class instance
    this.getStoreData = this.getStoreData.bind(this);
    this.getSearchData = this.getSearchData.bind(this);
    this.renderDialog = this.renderDialog.bind(this);
    this.handleGeolocationChange = this.handleGeolocationChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleLanguageKeyUp = this.handleLanguageKeyUp.bind(this);
    this.handleGeoKeyUp = this.handleGeoKeyUp.bind(this);
    this.handleLngKeyUp = this.handleLngKeyUp.bind(this);
    this.handleRadiusKeyUp = this.handleRadiusKeyUp.bind(this);
    this.handleLatKeyUp = this.handleLatKeyUp.bind(this);
    this.handleSaveSettings = this.handleSaveSettings.bind(this);
    this.handleSearchChanged = this.handleSearchChanged.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    // Set initial states
    this.state = {
      dialogOpened: false,
      geocode: {
        id: null,
        lat: 0.0,
        lng: 0.0,
        radius: 0.0
      },
      geolocationIndex: 0,
      language: '',
      text: '',
      tweets: null,
      error: null,
      showToast: false
    };
  }

  componentDidMount() {
    PublicActions.setTitle('Home');
    PublicStore.listen(this.getStoreData);
    SearchStore.listen(this.getSearchData);
    PublicActions.getSettings();
    this.handleDialogClose();
    setTimeout(this.handleSearch, 1000);
  }

  renderSearch(type) {
    return(
      <Link to={`/search/${type.id}`}>
        <div className={classnames(styles.inlineBlock, styles.margin20)}>
          <i className={classnames('fa', 'fa-3x', type.icon)}></i>
          <br />
          <h4>{type.name}</h4>
        </div>
      </Link>
    );
  }

  handleShowSettings() {
    PublicActions.setDialogOpened(true);
  }

  getStoreData({dialogOpened, settings}) {
    let geolocationIndex = -1;
    geocodes.forEach((geocode, i) => {
      if (geocode.lng === settings.geocode.lng &&
        geocode.lat === settings.geocode.lat) {
          geolocationIndex = i;
        }
    });

    this.setState({
      dialogOpened,
      geolocationIndex,
      text: settings.text,
      geocode: settings.geocode,
      language: settings.language
    });
  }

  getSearchData({tweets, error}) {
    if (tweets) {
      this.setState({
        tweets
      });
    } else {
      const showToast = true;
      this.setState({
        error,
        showToast
      });
    }
  }

  handleDialogClose() {
    PublicActions.setDialogOpened(false);
  }

  handleSaveSettings() {
    const {geocode, language, text} = this.state;
    PublicActions.saveSettings({
      geocode,
      language,
      text
    });

    this.handleDialogClose();
  }

  handleGeolocationChange(e, i, v) {
    v = parseInt(v, 10);
    this.setState({
      geocodeIndex: v,
      geocode: {
        id: geocodes[v].id,
        lat: geocodes[v].geocode.lat,
        lng: geocodes[v].geocode.lng,
        radius: geocodes[v].geocode.radius
      }
    });
  }

  handleLanguageChange(e, i, v) {
    this.setState({
      language: v
    });
  }

  handleLanguageKeyUp({target}) {
    this.setState({
      language: target.value
    });
  }

  handleGeoKeyUp(e, key) {
    let geocode = this.state.geocode;
    geocode[key] = e.target.value;
    this.setState({
      geocode
    });
  }

  handleLatKeyUp(e) {
    this.handleGeoKeyUp(e, 'lat');
  }

  handleLngKeyUp(e) {
    this.handleGeoKeyUp(e, 'lng');
  }

  handleRadiusKeyUp(e) {
    this.handleGeoKeyUp(e, 'radius');
  }

  handleSearchChanged({target}) {
    this.setState({
      text: target.value
    });
  }

  handleSearch(e) {
    const {geocode, text, language} = this.state;
    if (text) {
      this.handleSaveSettings();
      this.setState({
        tweets: null
      });

      SearchActions.search({
        geocode,
        language,
        text
      });
    }

    if(e && e.preventDefault) {
        e.preventDefault();
    }
  }

  renderDialog() {
    const actions = [
      <FlatButton
          key="0"
          keyboardFocused
          label="Save"
          onTouchTap={this.handleSaveSettings}
          primary
      /> ,
      <FlatButton
          key="1"
          keyboardFocused
          label="Close"
          onTouchTap={this.handleDialogClose}
          primary
      />
    ];

    // Render Settings Dialog
    return (
      <Dialog
          actions={actions}
          autoScrollBodyContent
          modal
          onRequestClose={this.handleClose}
          open={this.state.dialogOpened}
          title="Query Settings"
      >
        <div className={styles.paddingTop}>
          <div>
          <div className={styles.inlineBlock}>
            <h2>
              <i className={classnames('fa', 'fa-globe')}></i>
              <span> Set Geolocation</span>
            </h2>
            <SelectField
                floatingLabelText="Geolocation"
                onChange={this.handleGeolocationChange}
                value={this.state.geocodeIndex}
            >
              {
                  geocodes.map((geo, index) =>
                    (<MenuItem
                        key={index}
                        primaryText={geo.name}
                        value={index}
                     />
                  ))
              }
            </SelectField>
            <br/>
            <TextField
                errorText={
                  this.state.geocode.lat ? '': 'This field is required'
                }
                floatingLabelText="Latitude"
                hintText="Type a name"
                onChange={this.handleLatKeyUp}
                value={this.state.geocode.lat}
            />
            <br/>
            <TextField
                errorText={
                  this.state.geocode.lng ? '': 'This field is required'
                }
                floatingLabelText="Longitude"
                hintText="Type a Longitude"
                onChange={this.handleLngKeyUp}
                type="number"
                value={this.state.geocode.lng}
            />
            <br/>
            <TextField
                errorText={
                  this.state.geocode.radius ? '': 'This field is required'
                }
                floatingLabelText="Radius (in Km)"
                hintText="Type a Latitude"
                onChange={this.handleRadiusKeyUp}
                type="number"
                value={this.state.geocode.radius}
            />
          </div>
          <div className={classnames(styles.inlineBlock, styles.margin20)}>
            <h2>
              <i className={classnames('fa', 'fa-1x', 'fa-language')}></i>
              <span> Set language</span>
            </h2>
            <SelectField
                floatingLabelText="Language"
                onChange={this.handleLanguageChange}
                value={this.state.language}
            >
              {
                  languages.map((lang, index) =>
                    (<MenuItem
                        key={index}
                        primaryText={lang.name}
                        value={lang.id}
                     />
                  ))
              }

            </SelectField>
            <br/>
            <TextField
                errorText={this.state.language ? '': 'This field is required'}
                floatingLabelText="Language code (eg. en for English)"
                hintText="Type a Language code"
                id="language"
                onChange={this.handleLanguageKeyUp}
                value={this.state.language}
            />
          </div>
        </div>
      </div>
    </Dialog>
    );
  }

  renderTweets(status, index) {
    return (
      <Tweet key={index} status={status}/>
    );
  }

  render() {
    return(
      <div>
        <div>
          <h1>Welcome to Twitter Feed</h1>
          <p>
            <small><span>Set your query settings </span>
            <a onTouchTap={this.handleShowSettings}>
              <i className={classnames('fa', 'fa-wrench')}></i> here
            </a>
            <span> to customize your wall.</span></small>
          </p>
          <div>
            <form action="#" onSubmit={this.handleSearch}>
              <div className={classnames(styles.inlineContainer)}>
                <TextField
                    errorText={
                      this.state.text ? '': 'This field is required'
                    }
                    floatingLabelText="Search"
                    hintText="Type a Search String"
                    onChange={this.handleSearchChanged}
                    value={this.state.text}
                />
              </div>
              <div
                  className={
                    classnames(styles.inlineContainer, styles.marginTop20)
                  }
              >
                <IconButton
                    className={styles.valignBottom}
                    disabled={!this.state.text}
                    onTouchTap={this.handleSearch}
                >
                  <SearchIcon />
                </IconButton>
              </div>
            </form>
            <h3>Tweets</h3>
            <div>
              {
                this.state.tweets ?
                  (
                    this.state.tweets.statuses.length === 0 ?
                      <h2 className={styles.colorWarn}>
                        <i className={classnames('fa', 'fa-warning')}></i>
                        <span> No tweets available</span>
                      </h2>
                    :
                    this.state.tweets.statuses.map(this.renderTweets))
                : <CircularProgress />
              }
              {

              }
            </div>
          </div>
          {this.renderDialog()}
        </div>
      </div>
    );
  }
}
