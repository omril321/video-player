import React, {Component} from 'react';
import './VideoPlayerContainer.scss';
import Video from "./Video";
import VideoOverlay from "./VideoOverlay/VideoOverlay";
import PropTypes from "prop-types";

const USE_VIDEO_AUTOPLAY = true;

class VideoPlayerContainer extends Component {

    static propTypes = {
        onVideoLoaded: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            isVideoPlaying: USE_VIDEO_AUTOPLAY,
            isVideoLoaded: false,
            currentTime: 0,
            duration: NaN,
        }
    }


    onPlaybackToggle = () => this.setState((state) => ({isVideoPlaying: !state.isVideoPlaying}));

    onVideoPlaybackUpdate = ({currentTime}) => this.setState({currentTime});

    onVideoEnded = () => this.setState({isVideoPlaying: false});

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
                       onVideoLoaded={this.onVideoLoaded}
                       onVideoEnded={this.onVideoEnded}
                />

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
