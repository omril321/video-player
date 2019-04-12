import React from 'react';

const SocialEmotion = ({onButtonClick, currentValue, buttonContent}) => (
    <div className="social-emotion">
        <button className="social-emotion__button" onClick={onButtonClick}>
            {buttonContent}
        </button>
        <div className="social-emotion__value-text">{currentValue}</div>
    </div>
);

export default SocialEmotion;