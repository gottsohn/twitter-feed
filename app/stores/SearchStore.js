import alt from '../lib/alt';
import SearchActions from '../actions/SearchActions';

class SearchStore {
    constructor() {
      this.state = {
        tweets: null,
        error: null
      };

      this.bindListeners({
        searchSuccess: SearchActions.searchSuccess,
        searchError: SearchActions.searchError
      });
    }

    title(title) {
      this.setState({
        title
      });
    }

    searchSuccess(tweets) {
      this.setState({
        tweets
      });
    }

    searchError(error) {
      this.setState({
        error
      });
    }
}

export default alt.createStore(SearchStore, 'SearchStore');
