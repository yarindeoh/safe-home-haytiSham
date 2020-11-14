import React from 'react';
import { FacebookShareButton } from 'react-share';
import FB from 'src/media/icons/fb.svg';

export const FacebookShare = ({ btnText, sharedContent }) => (
    <FacebookShareButton
        //working in prod only
        url={`https://haytisham.herokuapp.com/${window.location.pathname}`}
        quote={sharedContent}
        className="BTN-fb-share"
    >
        <FB style={{ marginLeft: '7px', marginBottom: '-3px' }} />
        {btnText}
    </FacebookShareButton>
);
