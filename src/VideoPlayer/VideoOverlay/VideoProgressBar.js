import React, {Component} from 'react';
import PropTypes from "prop-types";

class VideoProgressBar extends Component {

    static propTypes = {
        currentTime: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired
    };

    getFractionPlayed = () => {
        const {currentTime, duration} = {...this.props};

        if(!currentTime || !duration) {
            return 0;
        }
        return currentTime / duration;
    };

    getInlineStyleForElement = () => {
        const fraction = this.getFractionPlayed();
        return {flexGrow: fraction};
    };

    render() {
        return (
            <div className="video-progress-bar">
                <div className="video-progress-bar__inner" style={this.getInlineStyleForElement()}/>
            </div>
        )
    }
}


export default VideoProgressBar;