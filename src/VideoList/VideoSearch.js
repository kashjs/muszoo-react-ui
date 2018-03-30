import React, {Component} from 'react';
import './VideoSearch.css';

class VideoSearch extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.__init = this.__init.bind(this);

    this.__init();
  }

  __init() {
    this._loadVideos = this._loadVideos.bind(this);

    window.googleApiClientReady = function() {
      window.gapi.auth.init(function() {
        window.setTimeout(window.loadAPIClientInterfaces, 1);
      });
    }

    window.loadAPIClientInterfaces = function () {
      window.gapi.client.load('youtube', 'v3', function() {
        window.handleAPILoaded();
      });
    }

    // After the API loads, call a function to enable the search box.
    window.handleAPILoaded = function () {
      // self._loadVideos();
    }

    let loadApiScript = () => {
      let scr = document.createElement('script');
      scr.type = 'text/javascript';
      scr.async = true;
      scr.src = "https://apis.google.com/js/client.js?onload=googleApiClientReady";
      let s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(scr, s);
    }

    loadApiScript();
  }

  videos = [];

  _loadVideos(callback) {
    let queryObject = {
      q: this.state.searchTerm,
      part: 'snippet',
      maxResults: 50,
      type: 'video',
      videoCategoryId: 10,
      videoEmbeddable: true,
      fields: 'items(id(videoId),snippet(title,channelTitle,thumbnails(default))),nextPageToken',
      key: 'AIzaSyDw5pJolqkxiAsQ6V8NeCpohdR3dRqDwWg'
    }, request = window.gapi.client.youtube.search.list(queryObject);

    request.execute((response) => callback(response.items));
  }

  handleChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  handleSubmit(event) {
    this._loadVideos((videos) => {
      this.props.onVideoListChange(videos);
    });

    event.preventDefault();
  }

  render () {
    return (
      <div className={"search-form-container"}>
        <form onSubmit={this.handleSubmit}>
          <input placeholder={"search"} value={this.props.searchTerm} onChange={this.handleChange}/>
        </form>
      </div>
    );
  }
}

export default VideoSearch;