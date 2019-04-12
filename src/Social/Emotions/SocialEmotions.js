import React, {Component} from 'react';
import SocialEmotion from "./SocialEmotion";
import "./SocialEmotions.scss";
import SocialEmotionsBar from "./EmotionsBar/SocialEmotionsBar";

class SocialEmotions extends Component {

    static socialButtonContent = (emoji, label) => <span role="img" aria-label={label}>{emoji}</span>;

    render() {
        const {thumbsUpCounter, thumbsDownCounter} = {...this.props};
        return (
            <div className="social-emotions">
                <div className="social-emotions__container">
                    <SocialEmotion buttonContent={SocialEmotions.socialButtonContent("👍", "Thumbs up")}
                                   currentValue={thumbsUpCounter}
                                   onButtonClick={this.props.onThumbsUpClick}
                    />

                    <SocialEmotion buttonContent={SocialEmotions.socialButtonContent("👎", "Thumbs down")}
                                   currentValue={thumbsDownCounter}
                                   onButtonClick={this.props.onThumbsDownClick}
                    />
                </div>

                <SocialEmotionsBar thumbsUpCounter={thumbsUpCounter} thumbsDownCounter={thumbsDownCounter}/>
            </div>
        )
    }
}

export default SocialEmotions;