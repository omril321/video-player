import React, {Component} from 'react';
import {getTimeAsText} from "./VideoDurationIndicatorService";

class VideoDurationIndicator extends Component {
    render() {
        const {currentTime, duration} = {...this.props};

        return (
            <div className="video-duration-indicator">
                {getTimeAsText(currentTime)} / {getTimeAsText(duration)}
            </div>
        )
    }
}

export default VideoDurationIndicator;