import React, {Component} from 'react';
import './App.css';
import VideoPlayerContainer from "./VideoPlayer/VideoPlayerContainer";

class App extends Component {
    render() {
        return (
            <div className="app-container">
                <VideoPlayerContainer/>
            </div>
        );
    }
}

export default App;
