import React from 'react';
import CallIcon from 'src/media/icons/call.svg';
import HoursIcon from 'src/media/icons/hours.svg';
import { sendEngagementsAnalyticsEvent } from 'services/analytics/analytics';
import { analyticsEvents } from 'services/analytics/analyticsConstants';

const handleClick = () => {
    sendEngagementsAnalyticsEvent(analyticsEvents.CALLING_HELP);
};

export default function HelpButton() {
    return (
        <a href="tel:*6724" className="help_button" onClick={handleClick}>
            <CallIcon alt="call-shape" className="heart_shape" />
            <HoursIcon alt="hours-shape" className="hours_shape" />
        </a>
    );
}
