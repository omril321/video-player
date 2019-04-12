import React, {Component} from 'react';
import SocialVideoDAL from "./Database/SocialVideoDAL";
import "./Social.scss";
import VideoStatsKeys from "./Database/VideoStatsKeys";
import SocialEmotions from "./Emotions/SocialEmotions";
import {formatAsNumberString} from "../Utils/formatters";

const DEFAULT_VIDEO_ID = 'defaultVideo';

class SocialWrapper extends Component {

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
            viewsCounter: stats[VideoStatsKeys.VIEWS] || 0,
            thumbsUpCounter: stats[VideoStatsKeys.THUMBS_UP] || 0,
            thumbsDownCounter: stats[VideoStatsKeys.THUMBS_DOWN] || 0,
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

        return (
            <>
                <span className="social__views-counter">{formatAsNumberString(viewsCounter)} view{isSingular ? '' : 's'}</span>
                <SocialEmotions thumbsUpCounter={thumbsUpCounter}
                                thumbsDownCounter={thumbsDownCounter}
                                onThumbsUpClick={this.onThumbsUpClick}
                                onThumbsDownClick={this.onThumbsDownClick}
                />
            </>
        );
    };

    render() {
        const toRender = this.state.isSocialLoaded ? this.socialContent() : this.renderWhileLoading();

        return (
            <div className="social-wrapper">
                {toRender}
            </div>
        )
    }
}

export default SocialWrapper;
