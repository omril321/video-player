import React, {Component} from 'react';
import './VideoPlayerContainer.scss';
import Video from "./Video";
import VideoOverlay from "./VideoOverlay/VideoOverlay";

const USE_VIDEO_AUTOPLAY = true;

class VideoPlayerContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVideoPlaying: USE_VIDEO_AUTOPLAY,
            isVideoLoaded: false,
            currentTime: 0,
            duration: NaN,
        }
    }


    onPlaybackToggle = () => {
        this.setState((state) => ({isVideoPlaying: !state.isVideoPlaying}));
    };

    onVideoPlaybackUpdate = ({currentTime}) => {
        this.setState({currentTime});
    };

    onVideoLoaded = ({duration}) => {
        this.setState({isVideoLoaded: true, duration: duration});
        this.props.onVideoLoaded();
    };

    render() {
        const {duration, isVideoPlaying, currentTime, isVideoLoaded} = {...this.state};
        return (
            <div className="video-player-container">
                <Video isVideoPlaying={isVideoPlaying}
                       onVideoPlaybackUpdate={this.onVideoPlaybackUpdate}
                       onVideoLoaded={this.onVideoLoaded}/>

                <VideoOverlay isVideoPlaying={isVideoPlaying}
                              isVideoLoaded={isVideoLoaded}
                              currentTime={currentTime}
                              duration={duration}
                              onPlaybackToggle={this.onPlaybackToggle}/>
            </div>
        );
    }
}

export default VideoPlayerContainer;
