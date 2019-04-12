import React from 'react';
import "./SocialEmotionsBar.scss";
import PropTypes from "prop-types";

const SocialEmotionsBar = ({thumbsUpCounter, thumbsDownCounter}) => (
    <div className="social-emotions-bar">
        <div className="social-emotions-bar__positive" style={{flexGrow: thumbsUpCounter}}/>
        <div className="social-emotions-bar__negative" style={{flexGrow: thumbsDownCounter}}/>
    </div>
);


SocialEmotionsBar.propTypes = {
    thumbsUpCounter: PropTypes.number.isRequired,
    thumbsDownCounter: PropTypes.number.isRequired,
};

export default SocialEmotionsBar;