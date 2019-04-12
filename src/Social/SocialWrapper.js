import React, {Component} from 'react';
import SocialVideoDAL from "./Database/SocialVideoDAL";
import VideoStatsKeys from "./Database/VideoStatsKeys";
import Social from "./Social";
import PropTypes from 'prop-types';

class SocialWrapper extends Component {

    static propTypes = {
        videoId: PropTypes.string.isRequired,
        isVideoLoaded: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            isSocialLoaded: false,
            viewsCounter: 0,
            thumbsUpCounter: 0,
            thumbsDownCounter: 0,
        };
        this.socialVideoDAL = new SocialVideoDAL(props.videoId);
    }

    componentDidUpdate(prevProps) {
        const videoTurnedLoaded = !prevProps.isVideoLoaded && this.props.isVideoLoaded; //not loaded before, but loaded now.
        if (videoTurnedLoaded) {
            // for simplicity, the view counter will count "impressions", and not other complicated metric
            // also, viewing the same video over and over ("restart") will be counted as a single view. Refreshing the page however, considers as a new view
            this.socialVideoDAL.increaseVideoMetric(VideoStatsKeys.VIEWS);
        }
    }

    componentDidMount() {
        this.socialVideoDAL.addStatsListener(stats => this.setState({
            viewsCounter: stats[VideoStatsKeys.VIEWS] || 0,
            thumbsUpCounter: stats[VideoStatsKeys.THUMBS_UP] || 0,
            thumbsDownCounter: stats[VideoStatsKeys.THUMBS_DOWN] || 0,
            isSocialLoaded: true
        }));
    }


    onThumbsUpClick = () => this.socialVideoDAL.increaseVideoMetric(VideoStatsKeys.THUMBS_UP);

    onThumbsDownClick = () => this.socialVideoDAL.increaseVideoMetric(VideoStatsKeys.THUMBS_DOWN);

    render() {
        const renderWhileLoading = <div>Connecting social network...</div>;
        const social = <Social viewsCounter={this.state.viewsCounter}
                               thumbsUpCounter={this.state.thumbsUpCounter}
                               thumbsDownCounter={this.state.thumbsDownCounter}
                               onThumbsUpClick={this.onThumbsUpClick}
                               onThumbsDownClick={this.onThumbsDownClick}
        />;

        const toRender = this.state.isSocialLoaded ? social : renderWhileLoading;

        return <div className="social-wrapper">{toRender}</div>;
    }
}

export default SocialWrapper;
