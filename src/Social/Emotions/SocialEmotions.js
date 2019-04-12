import React, {Component} from 'react';
import SocialEmotion from "./SocialEmotion";
import "./SocialEmotions.scss";

class SocialEmotions extends Component {

    static socialButtonContent = (emoji, label) => <span role="img" aria-label={label}>{emoji}</span>;

    render() {
        return (
            <div className="social-emotions">
                <SocialEmotion buttonContent={SocialEmotions.socialButtonContent("👍", "Thumbs up")}
                               currentValue={this.props.thumbsUpCounter}
                               onButtonClick={this.props.onThumbsUpClick}
                />

                <SocialEmotion buttonContent={SocialEmotions.socialButtonContent("👎", "Thumbs down")}
                               currentValue={this.props.thumbsDownCounter}
                               onButtonClick={this.props.onThumbsDownClick}
                />
            </div>
        )
    }
}

export default SocialEmotions;