import React, {Component} from 'react';
import VideoDurationIndicator from "./VideoDurationIndicator/VideoDurationIndicator";
import VideoPlaybackButton from "./VideoPlaybackButton/VideoPlaybackButton";
import VideoProgressBar from "./VideoProgressBar";
import "./VideoOverlay.scss"

class VideoOverlay extends Component {

    render() {
        const {isVideoPlaying, isVideoLoaded, duration, currentTime, onPlaybackToggle} = {...this.props};

        if (!isVideoLoaded) {
            return <div>Loading ... </div>;
        }

        //Clicking anywhere on the overlay (playback button included) will trigger playback
        return (
            <div className="video-overlay" onClick={onPlaybackToggle}>
                <VideoPlaybackButton isVideoPlaying={isVideoPlaying}/>
                <VideoDurationIndicator currentTime={currentTime} duration={duration}/>
                <VideoProgressBar currentTime={currentTime} duration={duration}/>
            </div>
        )
    }
}

export default VideoOverlay;