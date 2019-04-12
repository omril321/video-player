import React from "react";
import {formatAsNumberString} from "../Utils/formatters";
import "./Social.scss";
import SocialEmotions from "./Emotions/SocialEmotions";

const Social = ({
                    viewsCounter,
                    thumbsUpCounter,
                    thumbsDownCounter,
                    onThumbsUpClick,
                    onThumbsDownClick
                }) => {

    const isSingular = viewsCounter === 1;

    return (
        <div className="social">
            <span className="social__views-counter">{formatAsNumberString(viewsCounter)} view{isSingular ? '' : 's'}</span>
            <SocialEmotions thumbsUpCounter={thumbsUpCounter}
                            thumbsDownCounter={thumbsDownCounter}
                            onThumbsUpClick={onThumbsUpClick}
                            onThumbsDownClick={onThumbsDownClick}
            />
        </div>
    )
};

export default Social;