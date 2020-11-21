import React from 'react';
import HeartIcon from 'src/media/icons/Union.svg';
import { sendEngagementsAnalyticsEvent } from '../services/analytics/analytics';
import { analyticsEvents } from '../services/analytics/analyticsConstants';

const handleClick = () => {
    sendEngagementsAnalyticsEvent(analyticsEvents.CALLING_HELP);
};

export default function HelpButton() {
    return (
        <a href="tel:*6724" className="HelpButton" onClick={handleClick}>
            <HeartIcon alt="heart-shape" className="HeartShape" />
            <span className="Text">24/7</span>
        </a>
    );
}
