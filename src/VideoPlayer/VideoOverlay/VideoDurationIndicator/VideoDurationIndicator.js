import React from 'react';
import {formatTimeAsText} from "../../../Utils/formatters";
import PropTypes from "prop-types";

const VideoDurationIndicator = ({currentTime, duration}) => (
    <div className="video-duration-indicator">
        {formatTimeAsText(currentTime)} / {formatTimeAsText(duration)}
    </div>
);

VideoDurationIndicator.propTypes = {
    currentTime: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired
};

export default VideoDurationIndicator;