import React, {Component} from 'react';
import './VideoPlayerContainer.scss';
import VideoPlaybackButton from "./VideoPlaybackButton/VideoPlaybackButton";
import Video from "./Video";
import VideoProgressBar from "./VideoProgressBar";
import VideoDurationIndicator from "./VideoDurationIndicator/VideoDurationIndicator";

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
    };

    getOverlayElements = () => {
        //TODO: this should probably be extracted
        if (!this.state.isVideoLoaded) {
            return (<div>Loading...</div>);
        }
        return (
            <>
                <VideoPlaybackButton isVideoPlaying={this.state.isVideoPlaying}/>
                <VideoDurationIndicator currentTime={this.state.currentTime} duration={this.state.duration}/>
            </>)
    };

    getProgressBar = () => {
        return this.state.isVideoLoaded &&
            <VideoProgressBar currentTime={this.state.currentTime} duration={this.state.duration}/>
    };

    render() {
        const {duration, isVideoPlaying, currentTime} = {...this.state};
        return (
            <div className="video-player-container">
                {/*Clicking anywhere on the overlay (playback button included) will trigger playback*/}
                <div className="video-player-container__overlay" onClick={this.onPlaybackToggle}>
                    {this.getOverlayElements()}
                    <Video isVideoPlaying={isVideoPlaying} onVideoPlaybackUpdate={this.onVideoPlaybackUpdate}
                           onVideoLoaded={this.onVideoLoaded}/>
                </div>
                {this.getProgressBar()}
            </div>
        );
    }
}

export default VideoPlayerContainer;
