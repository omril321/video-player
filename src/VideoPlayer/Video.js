import React, {Component} from 'react';
import './VideoPlayer.scss';

class Video extends Component {

    constructor(props) {
        super(props);
        this.videoElementRef = React.createRef();
    }

    componentDidMount() {
        this.updateVideoPlayback();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isVideoPlaying !== this.props.isVideoPlaying) {
            this.updateVideoPlayback();
        }
    }

    updateVideoPlayback = () => {
        const videoElem = this.videoElementRef.current;
        this.props.isVideoPlaying ? videoElem.play() : videoElem.pause();
    };


    render() {
        return (
            <video ref={this.videoElementRef}>
                <source src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" type="video/mp4"/>
                <source src="http://clips.vorwaerts-gmbh.de/VfE.webm" type="video/webm"/>
                <source src="http://clips.vorwaerts-gmbh.de/VfE.ogv" type="video/ogg"/>
            </video>
        )
    }
}

export default Video;
