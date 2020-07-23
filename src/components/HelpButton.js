import React from 'react';
import HeartIcon from 'src/media/icons/Union.svg';

export default function HelpButton() {
    return (
        <div className="HelpButton">
            <img alt="heart-shape" className="HeartShape" src={HeartIcon} />
            <span className="Text">24/7</span>
        </div>
    );
}
