import React, {Component} from 'react';
import SocialVideoDAL from "./Database/SocialVideoDAL";
import "./Social.scss";

const DEFAULT_VIDEO_ID = 'defaultVideo';

class Social extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSocialLoaded: false,
            views: 0,
        };
        this.socialVideoDAL = new SocialVideoDAL(DEFAULT_VIDEO_ID);
    }

    componentDidUpdate(prevProps) {
        const videoTurnedLoaded = !prevProps.isVideoLoaded && this.props.isVideoLoaded; //not loaded before, but loaded now.
        if (videoTurnedLoaded) {
            // for simplicity, the view counter will count "impressions", and not other complicated metric
            // also, viewing the same video over and over ("restart") will be counted as a single view. Refreshing the page however, considers as a new view
            this.socialVideoDAL.increaseViewCounter();
        }
    }

    //TODO: consider extracting the logic outside

    componentDidMount() {
        this.socialVideoDAL.addViewsListener((views) => this.setState({views, isSocialLoaded: true}));
    }


    //TODO: improve and extract to a different component
    renderWhileLoading = () => (
        <div>
            Connecting social network...
        </div>
    );

    socialContent = () => {

        const viewsCounter = this.state.views;
        const isSingular = viewsCounter === 1;

        return (
            <>
                <span className="social__views-counter">{viewsCounter} view{isSingular ? '' : 's'}</span>
                <div className="social__thumbs-container">
                    <span role="img" aria-label="Thumbs up">👍</span>
                    <span role="img" aria-label="Thumbs down">👎</span>
                </div>
            </>
        );
    };

    render() {
        const toRender = this.state.isSocialLoaded ? this.socialContent() : this.renderWhileLoading();

        return (
            <div className="social">
                {toRender}
            </div>
        )
    }
}

export default Social;
