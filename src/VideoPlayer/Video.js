import React, {Component} from 'react';

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

    onVideoPlaybackUpdate = (e) => {
        //This gets called every 15 to 250ms ("best effort"), so it won't have a big effect on CPU
        //see https://stackoverflow.com/a/12325960/7931129
        this.props.onVideoPlaybackUpdate({currentTime: e.currentTarget.currentTime});
    };

    onLoadedData = (e) => {
        this.props.onVideoLoaded({duration: e.currentTarget.duration});
    };

    render() {
        return (
            //TODO: remove the muted attribute
            <video className="video" ref={this.videoElementRef} muted onTimeUpdate={this.onVideoPlaybackUpdate} onLoadedData={this.onLoadedData}>
                <source src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" type="video/mp4"/>
                <source src="http://clips.vorwaerts-gmbh.de/VfE.webm" type="video/webm"/>
                <source src="http://clips.vorwaerts-gmbh.de/VfE.ogv" type="video/ogg"/>
            </video>
        )
    }
}

export default Video;
