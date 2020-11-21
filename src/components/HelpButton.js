import React from 'react';
import HelpIcon from 'src/media/icons/247-help-button.svg';
import {sendEngagementsAnalyticsEvent} from '../services/analytics/analytics'
import {analyticsEvents} from '../services/analytics/analyticsConstants'


const handleClick = () => {
    sendEngagementsAnalyticsEvent(analyticsEvents.CALLING_HELP);
};

export default function HelpButton() {
    return (
        <a href="tel:*6724" className="HelpButton" onClick={handleClick}>
            <HelpIcon />
        </a>
    );
}
