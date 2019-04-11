import React, {Component} from 'react';
import './App.css';
import VideoPlayerContainer from "./VideoPlayer/VideoPlayerContainer";
import Social from "./Social/Social";

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
                <Social isVideoLoaded={this.state.isVideoLoaded}/>
            </div>
        );
    }
}

export default App;
