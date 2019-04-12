import React from 'react';
import {ReactComponent as PlaySvg} from "./play.svg";
import {ReactComponent as PauseSvg} from "./pause.svg";
import PropTypes from "prop-types";

const VideoPlaybackButton = ({isVideoPlaying}) => {
    const SvgToShow = isVideoPlaying ? PauseSvg : PlaySvg;

    return (
        <button className="video-playback-button">
            <SvgToShow className="video-playback-button__image"/>
        </button>
    )
};

VideoPlaybackButton.propTypes = {
    isVideoPlaying: PropTypes.bool.isRequired
};

export default VideoPlaybackButton;