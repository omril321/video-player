import React, {Component} from 'react';

class VideoPlaybackButton extends Component {


    render() {
        const isVideoPlaying = this.props.isVideoPlaying;
        return (
            <button onClick={this.props.onToggleClick}>now playing? {"" + isVideoPlaying}</button>
        )
    }
}


export default VideoPlaybackButton;