import alt from '../lib/alt';
import PublicActions from '../actions/PublicActions';

class PublicStore {
    constructor() {
      this.state = {
        title: 'Twitter Feed',
        dialogOpened: false,
        settings: {
          geocode: {
            lat: 51.1657,
            lng: 10.4515,
            radius: 1000
          },
          language: 'en',
          text: ''
        }
      };

      const savedSettings =
        window.localStorage.getItem('settings');

      this.state.settings = window.JSON.parse(savedSettings) ||
        this.state.settings;

      this.bindListeners({
        settings: PublicActions.settings,
        title: PublicActions.title,
        dialogOpened: PublicActions.dialogOpened
      });
    }

    title(title) {
      this.setState({
        title
      });
    }

    settings(settings) {
      this.setState({
        settings
      });
    }

    dialogOpened(dialogOpened) {
      this.setState({
        dialogOpened
      });
    }
}

export default alt.createStore(PublicStore, 'PublicStore');
