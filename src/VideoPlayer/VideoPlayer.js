import React, {Component} from 'react';
import './VideoPlayer.scss';

class VideoPlayer extends Component {

    constructor(props) {
        super(props);
        this.videoElementRef = React.createRef();
    }

    onPlayClick = () => {
        this.videoElementRef.current.play();
    }

    onPauseClick = () => {
        this.videoElementRef.current.pause();
    }

    render() {
        return (
            <div>
                <button onClick={this.onPlayClick}>PLAY</button>
                <button onClick={this.onPauseClick}>STOP</button>
                <video ref={this.videoElementRef} autoPlay>
                    <source src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" type="video/mp4"/>
                    <source src="http://clips.vorwaerts-gmbh.de/VfE.webm" type="video/webm"/>
                    <source src="http://clips.vorwaerts-gmbh.de/VfE.ogv" type="video/ogg"/>
                </video>
            </div>
        );
    }
}

export default VideoPlayer;
