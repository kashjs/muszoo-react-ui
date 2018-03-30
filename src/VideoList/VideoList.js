import React, {Component} from 'react';
import './VideoList.css';
import VideoThumbnail from "./VideoThumbnail";
import VideoPlayer from "./VideoPlayer";
import VideoSearch from "./VideoSearch";


class VideoList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      currentVideo: {}
    };

    this.handleVideoListChange = this.handleVideoListChange.bind(this);
  }

  handleVideoClicked(video) {
    this.setState({currentVideo: video});
  }

  handleVideoListChange(videos) {
    this.setState({videos: videos, currentVideo: videos[0]})
  }

  render() {
    let listItems = this.state.videos.map((video) => {
      return (
        <div className="mz-video-item" key={video.id.videoId} onClick={() => { this.handleVideoClicked(video) }}>
          <VideoThumbnail key={video.id.videoId}
                          video={video}
                          isPlaying={this.state.currentVideo.id.videoId === video.id.videoId}></VideoThumbnail>
        </div>
      );
    });

    return (
      <div>
        <div><VideoSearch onVideoListChange={this.handleVideoListChange}></VideoSearch></div>
        <div>
          <VideoPlayer currentVideo={this.state.currentVideo}></VideoPlayer>
        </div>
        <div className="mz-video-list">
          {listItems}
        </div>
      </div>
    );
  }
}


export default VideoList;
