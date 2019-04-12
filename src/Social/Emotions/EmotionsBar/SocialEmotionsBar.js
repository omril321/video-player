import React from 'react';
import "./SocialEmotionsBar.scss";

const SocialEmotionsBar = ({thumbsUpCounter, thumbsDownCounter}) => (
    <div className="social-emotions-bar">
        <div className="social-emotions-bar__positive" style={{flexGrow: thumbsUpCounter}}/>
        <div className="social-emotions-bar__negative" style={{flexGrow: thumbsDownCounter}}/>
    </div>
);

export default SocialEmotionsBar;