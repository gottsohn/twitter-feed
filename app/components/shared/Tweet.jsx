import React from 'react';
import Divider from 'material-ui/Divider';
import classnames from 'classnames';
import moment from 'moment';

import Anchor from './Anchor.jsx';
import styles from '../../App.css';

export default class Tweet extends React.Component {
  static propTypes = {
    status: React.PropTypes.shape({
      created_at: React.PropTypes.string,
      favorite_count: React.PropTypes.number,
      in_reply_to_screen_name: React.PropTypes.string,
      in_reply_to_status_id: React.PropTypes.number,
      entities: React.PropTypes.shape({
        media: React.PropTypes.arrayOf(
          React.PropTypes.shape({
            media_url_https: React.PropTypes.string,
            type: React.PropTypes.string
          })
        )
      }),
      retweet_count: React.PropTypes.number,
      text: React.PropTypes.string,
      user: React.PropTypes.shape({
        name: React.PropTypes.string,
        screen_name: React.PropTypes.string,
        location: React.PropTypes.string,
        profile_image_url_https: React.PropTypes.string
      })
    })
  }

  constructor(props) {
    super(props);
  }

  renderImages(image, index) {
    if (image.type === 'photo') {
      return (
        <div
            className={classnames(styles.inlineBlock, styles.padding10)}
            key={index}
        >
        <Anchor
            href={image.media_url_https}
            label={<img src={image.media_url_https} width={256}/>}
        />
        </div>
      );
    }

    return null;
  }

  getCleanTime(dateString) {
    const date = new Date(dateString);
    return moment(date).fromNow();
  }

  render() {
    let typeIcon;
    let userRef;
    if (this.props.status.in_reply_to_screen_name) {
      typeIcon = 'fa-reply';
      userRef = this.props.status.in_reply_to_screen_name;
    }

    return (
      <div>
        <div>
          {
            typeIcon ?
            <small className={styles.padding10}>
              <i className={classnames('fa', typeIcon)}></i> in reply to
              <Anchor
                  href={`https://twitter.com/${userRef}`}
                  label={` @${userRef}`}
              />
            </small>
            : null
          }
        </div>
        <div>
          <div className={classnames(styles.inlineBlock, styles.padding10)}>
            <img
                className={styles.userImage}
                src={this.props.status.user.profile_image_url_https}
            />
          </div>
          <div
              className={
                classnames(
                  styles.inlineBlock,
                  styles.padding10,
                  styles.maxWidth70
                )
              }
          >
            <div>
              <b>{this.props.status.user.name}</b>
              <Anchor
                  href={`https://twitter.com/${this.props.status.user.screen_name}`}
                  label={` @${this.props.status.user.screen_name} `}
              />

              <small
                  className={styles.underline}
                  title={this.props.status.created_at}
              >
                {this.getCleanTime(this.props.status.created_at)}
              </small>
            </div>
            <div>{this.props.status.text}</div>
            <div>
              {
                this.props.status.entities.media ?
                  this.props.status.entities.media.map(this.renderImages)
                : null
              }
            </div>
            <div>
              <i className={classnames('fa', 'fa-retweet', styles.margin5)}></i>
              <small> {this.props.status.retweet_count}</small>
              <small> </small>
              <i className={classnames('fa', 'fa-heart', styles.margin5)}></i>
              <small> {this.props.status.favorite_count}</small>
            </div>
          </div>
        </div>
        <Divider />
        <br />
      </div>
    );
  }
}
