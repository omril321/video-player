import React from 'react';
import {formatAsNumberString} from "../../Utils/formatters";

const SocialEmotion = ({onButtonClick, currentValue, buttonContent}) => (
    <div className="social-emotion">
        <button className="social-emotion__button" onClick={onButtonClick}>
            {buttonContent}
        </button>
        <div className="social-emotion__value-text">{formatAsNumberString(currentValue)}</div>
    </div>
);

export default SocialEmotion;