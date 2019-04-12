import React, {Component} from 'react';
import {formatTimeAsText} from "../../../Utils/formatters";

class VideoDurationIndicator extends Component {
    render() {
        const {currentTime, duration} = {...this.props};

        return (
            <div className="video-duration-indicator">
                {formatTimeAsText(currentTime)} / {formatTimeAsText(duration)}
            </div>
        )
    }
}

export default VideoDurationIndicator;