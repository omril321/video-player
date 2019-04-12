import React from "react";
import {formatAsNumberString} from "../Utils/formatters";
import "./Social.scss";
import SocialEmotions from "./Emotions/SocialEmotions";
import PropTypes from "prop-types";

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

Social.propTypes = {
    viewsCounter: PropTypes.number.isRequired,
    thumbsUpCounter: PropTypes.number.isRequired,
    thumbsDownCounter: PropTypes.number.isRequired,
    onThumbsUpClick: PropTypes.func.isRequired,
    onThumbsDownClick: PropTypes.func.isRequired
};

export default Social;