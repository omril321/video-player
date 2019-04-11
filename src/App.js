import React, {Component} from 'react';
import './App.css';
import VideoPlayerContainer from "./VideoPlayer/VideoPlayerContainer";
import Social from "./Social/Social";

class App extends Component {
    render() {
        return (
            <div className="app-container">
                <VideoPlayerContainer/>
                <Social/>
            </div>
        );
    }
}

export default App;
