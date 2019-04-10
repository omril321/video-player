import React, {Component} from 'react';

class VideoProgressBar extends Component {

    getFractionPlayed = () => {
        const {currentTime, duration} = {...this.props};
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