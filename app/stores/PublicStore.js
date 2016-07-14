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
          text: 'Suitepad'
        }
      };

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
      settings = settings || this.state.settings;
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
