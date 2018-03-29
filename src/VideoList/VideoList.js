import React, {Component} from 'react';
import './VideoList.css';
import VideoThumbnail from "./VideoThumbnail";


class VideoList extends Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   color: props.initialColor
    // };
    let self = this;

    this.state = {
      videos: []
    };

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
      self._loadVideos();
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

  _loadVideos(term = 'arijit') {
    let queryObject = {
      q: term,
      part: 'snippet',
      maxResults: 50,
      type: 'video',
      videoCategoryId: 10,
      videoEmbeddable: true,
      fields: 'items(id(videoId),snippet(title,channelTitle,thumbnails(default))),nextPageToken',
      key: 'AIzaSyDw5pJolqkxiAsQ6V8NeCpohdR3dRqDwWg'
    }, request = window.gapi.client.youtube.search.list(queryObject);

    request.execute((response) => this.setState({videos: response.items}));
  }

  render() {
    var listItems = this.state.videos.map(function(video) {
      return (
        <div className="mz-video-item">
          <VideoThumbnail key={video.id.videoId} video={video}></VideoThumbnail>
        </div>
      );
    });

    return (
      <div className="mz-video-list">
        {listItems}
      </div>
    );
  }
}


export default VideoList;
