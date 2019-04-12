import React from 'react';
import {formatAsNumberString} from "../../Utils/formatters";
import PropTypes from "prop-types";

const SocialEmotion = ({onButtonClick, currentValue, buttonContent}) => (
    <div className="social-emotion">
        <button className="social-emotion__button" onClick={onButtonClick}>
            {buttonContent}
        </button>
        <div className="social-emotion__value-text">{formatAsNumberString(currentValue)}</div>
    </div>
);

SocialEmotion.propTypes = {
    onButtonClick: PropTypes.func.isRequired,
    currentValue: PropTypes.number.isRequired,
    buttonContent: PropTypes.element.isRequired,
};

export default SocialEmotion;