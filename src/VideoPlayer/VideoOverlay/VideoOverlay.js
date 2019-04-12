import React from 'react';
import VideoDurationIndicator from "./VideoDurationIndicator/VideoDurationIndicator";
import VideoPlaybackButton from "./VideoPlaybackButton/VideoPlaybackButton";
import VideoProgressBar from "./VideoProgressBar";
import "./VideoOverlay.scss"
import PropTypes from "prop-types";

const VideoOverlay = ({isVideoPlaying, isVideoLoaded, duration, currentTime, onPlaybackToggle}) => {

    if (!isVideoLoaded) {
        return false; //render nothing
    }

    //Clicking anywhere on the overlay (playback button included) will trigger playback
    return (
        <div className="video-overlay" onClick={onPlaybackToggle}>
            <VideoPlaybackButton isVideoPlaying={isVideoPlaying}/>
            <VideoDurationIndicator currentTime={currentTime} duration={duration}/>
            <VideoProgressBar currentTime={currentTime} duration={duration}/>
        </div>
    )
};

VideoOverlay.propTypes = {
    isVideoPlaying: PropTypes.bool.isRequired,
    isVideoLoaded: PropTypes.bool.isRequired,
    currentTime: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    onPlaybackToggle: PropTypes.func.isRequired,
}
export default VideoOverlay;