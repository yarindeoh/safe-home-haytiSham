import React from 'react';
import HeartIcon from 'src/media/icons/Union.svg';

export default function HelpButton() {
    return (
        <div className="HelpButton">
            <HeartIcon alt="heart-shape" className="HeartShape"/>
            <span className="Text">24/7</span>
        </div>
    );
}
