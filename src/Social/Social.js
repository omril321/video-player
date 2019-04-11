import React, {Component} from 'react';
import SocialVideoDAL from "./Database/SocialVideoDAL";


const DEFAULT_VIDEO_ID = 'defaultVideo';

class Social extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            views: 0,
        };
        this.socialVideoDAL = new SocialVideoDAL(DEFAULT_VIDEO_ID);

    }

    //TODO: consider extracting the logics toutside
    onSocialLoaded = () => {
        this.socialVideoDAL.addViewsListener((views) => this.setState({views, isLoaded: true}));
    };

    componentDidMount() {
        this.socialVideoDAL.increaseViewCounter()
            .then(this.onSocialLoaded);
    }

    render() {
        return (
            <div>
                SOCIAL GOES HERE!
                loaded? {"" + this.state.isLoaded}
                views: {this.state.views}
            </div>
        )
    }
}

export default Social;
