import React from 'react';
import { Link } from 'react-router-dom';
import lang from 'services/lang.json';

export const Footer = () => {
    const {
        getHelp,
        whoWeAre,
        warningSigns,
        michalSelaForum,
        testimonySubmission,
        accessability,
        statistic,
        technicSupport,
        emergencyHotlineOfSexualHarassment,
        emergencyHotlineOfSexualHarassmentNumber,
        emergencyHotlineOfMinistryOfLaborAndSocialAffairs,
        emergencyHotlineOfMinistryOfLaborAndSocialAffairsNumber,
        IHaveBeenThere2020,
        IHaveBeenThereHashtag,
        privacyPolicy
    } = lang;

    const footerMenu = [
        { name: getHelp, url: '/get-help' },
        { name: whoWeAre, url: '/about' },
        { name: warningSigns, url: '/warning-signs' },
        { name: michalSelaForum, url: '/michal-sela-forum' },
        { name: testimonySubmission, url: '/testimony' },
        { name: accessability, url: '/accessability' },
        { name: statistic, url: '/statistic' },
        { name: technicSupport, url: '/technical-support' }
    ];

    const emergencyLines = [
        {
            number: emergencyHotlineOfSexualHarassmentNumber,
            text: emergencyHotlineOfSexualHarassment
            // TODO: Add dialing option url
        },
        {
            number: emergencyHotlineOfMinistryOfLaborAndSocialAffairsNumber,
            text: emergencyHotlineOfMinistryOfLaborAndSocialAffairs
            // TODO: Add dialing option url
        }
    ];

    // TODO: Fix li's alignment
    const displayFooterMenu = () => {
        return footerMenu.map((item, index) => (
            <li key={`${item}-${index}`}>
                <Link to={item.url}>{item.name}</Link>
            </li>
        ));
    };
    const displayFooterHotLines = () => {
        return emergencyLines.map((item, index) => (
            <li key={`${item}-${index}`}>
                {/*TODO: Add dialing option */}
                <Link to="/">
                    <span>
                        {/*TODO: Add phone icon */}
                        {/* <i className="fa fa-phone" aria-hidden="true"></i> */}
                        <p>{item.number}</p>
                    </span>
                    <span>
                        <p>{item.text}</p>
                    </span>
                </Link>
            </li>
        ));
    };

    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-menu">
                    <h1>{IHaveBeenThereHashtag}</h1>
                    <ul>{displayFooterMenu()}</ul>
                </div>
                <div className="emergency-dial-wrapper purple">
                    <ul>{displayFooterHotLines()}</ul>
                </div>
                <div className="legal-bar">
                    <ul>
                        <li>
                            <Link to="/been-there-2020">
                                {IHaveBeenThere2020}
                            </Link>
                        </li>
                        <span> | </span>
                        <li>
                            <Link to="/privacy-policy">{privacyPolicy}</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};
