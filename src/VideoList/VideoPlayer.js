import React, {Component} from 'react';
import './VideoPlayer.css';

class VideoPlayer extends Component {

  constructor(props) {
    super(props);

    this.player = null;
  }

  componentDidMount() {
    // 2. This code loads the IFrame Player API code asynchronously.
    let tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    window.onYouTubeIframeAPIReady = () => {
      this.player = new window.YT.Player('player', {
        height: '390',
        width: '640',
        videoId: '',
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    function onPlayerStateChange(event) {
      if (event.data == window.YT.PlayerState.PLAYING) {
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.player.loadVideoById(nextProps.currentVideo.id.videoId);
  }

  render() {
    return (
      <div className={'player_container ' + (this.props.currentVideo.id ? 'visible' : 'hidden') }>
        <div id="player"></div>
      </div>
    );
  }
}

export default VideoPlayer;