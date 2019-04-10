import React, {Component} from 'react';
import {ReactComponent as PlaySvg } from "./play.svg";
import {ReactComponent as PauseSvg } from "./pause.svg";
class VideoPlaybackButton extends Component {


    render() {
        const isVideoPlaying = this.props.isVideoPlaying;
        const SvgToShow = isVideoPlaying ? PauseSvg : PlaySvg;
        return (
            <button className="video-playback-button">
                <SvgToShow className="video-playback-button__image"/>
            </button>
        )
    }
}


export default VideoPlaybackButton;