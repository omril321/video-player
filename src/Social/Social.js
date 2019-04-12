import React, {Component} from 'react';
import SocialVideoDAL from "./Database/SocialVideoDAL";
import "./Social.scss";
import VideoStatsKeys from "./Database/VideoStatsKeys";

const DEFAULT_VIDEO_ID = 'defaultVideo';

class Social extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSocialLoaded: false,
            viewsCounter: 0,
            thumbsUpCounter: 0,
            thumbsDownCounter: 0,
        };
        this.socialVideoDAL = new SocialVideoDAL(DEFAULT_VIDEO_ID);
    }

    componentDidUpdate(prevProps) {
        const videoTurnedLoaded = !prevProps.isVideoLoaded && this.props.isVideoLoaded; //not loaded before, but loaded now.
        if (videoTurnedLoaded) {
            // for simplicity, the view counter will count "impressions", and not other complicated metric
            // also, viewing the same video over and over ("restart") will be counted as a single view. Refreshing the page however, considers as a new view
            this.socialVideoDAL.increaseVideoMetric(VideoStatsKeys.VIEWS);
        }
    }

    //TODO: consider extracting the logic outside

    componentDidMount() {
        this.socialVideoDAL.addStatsListener((stats) => this.setState({
            viewsCounter: stats[VideoStatsKeys.VIEWS],
            thumbsUpCounter: stats[VideoStatsKeys.THUMBS_UP],
            thumbsDownCounter: stats[VideoStatsKeys.THUMBS_DOWN],
            isSocialLoaded: true
        }));
    }


    onThumbsUpClick = () => this.socialVideoDAL.increaseVideoMetric(VideoStatsKeys.THUMBS_UP);

    onThumbsDownClick = () => this.socialVideoDAL.increaseVideoMetric(VideoStatsKeys.THUMBS_DOWN);

    //TODO: improve and extract to a different component
    renderWhileLoading = () => (
        <div>
            Connecting social network...
        </div>
    );

    socialContent = () => {

        const {viewsCounter, thumbsUpCounter, thumbsDownCounter} = this.state;
        const isSingular = viewsCounter === 1;

        //TODO: extract thumbs up / down buttons to a smaller component
        return (
            <>
                <span className="social__views-counter">{viewsCounter} view{isSingular ? '' : 's'}</span>
                <div className="social__thumbs-container">
                    <span role="img" aria-label="Thumbs up" onClick={this.onThumbsUpClick}>
                        <span>{thumbsUpCounter}</span>
                        👍
                    </span>
                    <span role="img" aria-label="Thumbs down" onClick={this.onThumbsDownClick}>
                        <span>{thumbsDownCounter}</span>
                        👎
                    </span>
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
