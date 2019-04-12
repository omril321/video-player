import React, {Component} from 'react';
import './App.css';
import VideoPlayerContainer from "./VideoPlayer/VideoPlayerContainer";
import SocialWrapper from "./Social/SocialWrapper";

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
                <SocialWrapper isVideoLoaded={this.state.isVideoLoaded}/>
            </div>
        );
    }
}

export default App;
