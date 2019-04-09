import React, {Component} from 'react';
import './VideoPlayer.scss';
import VideoPlaybackButton from "./VideoPlaybackButton";
import Video from "./Video";

const USE_VIDEO_AUTOPLAY = true;

class VideoPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVideoPlaying: USE_VIDEO_AUTOPLAY,
        }
    }


    onPlaybackToggle = () => {
        this.setState((state) => ({isVideoPlaying: !state.isVideoPlaying}));
    };

    render() {
        return (
            <div>
                <VideoPlaybackButton isVideoPlaying={this.state.isVideoPlaying} onToggleClick={this.onPlaybackToggle}/>
                <Video isVideoPlaying={this.state.isVideoPlaying} />
            </div>
        );
    }
}

export default VideoPlayer;
