import React, {Component} from 'react';
import './VideoThumbnail.css';

class VideoThumbnail extends Component {
  render() {
    return (
      <div className={'mz-video-thumbnail-container ' + (this.props.isPlaying ? 'isPlaying' : '')}>
        <div className="mz-video-image">
          <img src={this.props.video.snippet.thumbnails.default.url} />
        </div>
        <div className="mz-video-title">
          <span>{this.props.video.snippet.title}</span>
        </div>
      </div>
    );
  }
}

export default VideoThumbnail;