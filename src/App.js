import React, {Component} from 'react';
import VideoPlayerContainer from "./VideoPlayer/VideoPlayerContainer";
import SocialWrapper from "./Social/SocialWrapper";

const DEFAULT_VIDEO_ID = 'defaultVideo';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVideoLoaded: false
        }
    }

    onVideoLoaded = () => {
        this.setState({isVideoLoaded: true});
    };

    render() {
        return (
            <div className="app-container">
                <VideoPlayerContainer onVideoLoaded={this.onVideoLoaded}/>
                <SocialWrapper videoId={DEFAULT_VIDEO_ID} isVideoLoaded={this.state.isVideoLoaded}/>
            </div>
        );
    }
}

export default App;
