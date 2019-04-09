import React, {Component} from 'react';
import './VideoPlayerContainer.scss';
import VideoPlaybackButton from "./VideoPlaybackButton/VideoPlaybackButton";
import Video from "./Video";
import VideoProgressBar from "./VideoProgressBar";

const USE_VIDEO_AUTOPLAY = true;

class VideoPlayerContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVideoPlaying: USE_VIDEO_AUTOPLAY,
        }
    }


    onPlaybackToggle = () => {
        this.setState((state) => ({isVideoPlaying: !state.isVideoPlaying}));
    };

    onVideoPlaybackUpdate = (playbackDetails) => {
        this.setState({currentTime: playbackDetails.currentTime, duration: playbackDetails.duration});
    };

    render() {
        return (
            <div className="video-player-container">
                {/*Clicking anywhere on the overlay (playback button included) will trigger playback*/}
                <div className="video-player-container__overlay" onClick={this.onPlaybackToggle}>
                    <VideoPlaybackButton isVideoPlaying={this.state.isVideoPlaying}/>
                    <Video isVideoPlaying={this.state.isVideoPlaying} onVideoPlaybackUpdate={this.onVideoPlaybackUpdate}/>
                </div>
                <VideoProgressBar currentTime={this.state.currentTime} duration={this.state.duration}/>
            </div>
        );
    }
}

export default VideoPlayerContainer;
