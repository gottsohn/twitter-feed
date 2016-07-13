import alt from '../lib/alt';
import request from 'superagent';

class SearchActions {
  search({text, language, geocode}) {
    text = window.encodeURIComponent(text);
    const url = `http://demo.suitepad.systems/1.1/search/tweets.json?q=${text}`+
      `&lang=${language}&geocode=${geocode.lat},${geocode.lng},
      ${geocode.radius}km`;

    request
      .get(url)
      .set('Accept', 'application/json')
      .end((err, res) => {

        console.log(res);
        if (!err) {
          this.tweet(res);
        } else {
          this.searchError(err);
        }
      });

      return true;
  }

  searchSuccess(tweets) {
    return tweets;
  }

  searchError(error) {
    return error;
  }
}

export default alt.createActions(SearchActions);
