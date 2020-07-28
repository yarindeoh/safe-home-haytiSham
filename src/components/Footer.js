import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
    const { t } = useTranslation();

    const footerMenu = [
        { name: t('getHelp'), url: '/get-help' },
        { name: t('whoWeAre'), url: '/about' },
        { name: t('warningSigns'), url: '/warning-signs' },
        { name: t('michalSelaForum'), url: '/michal-sela-forum' },
        { name: t('testimonySubmission'), url: '/testimony' },
        { name: t('accessability'), url: '/accessability' },
        { name: t('statistic'), url: '/statistic' },
        { name: t('technicSupport'), url: '/technical-support' }
    ];

    const emergencyLines = [
        {
            number: t('emergencyHotlineOfSexualHarassmentNumber'),
            text: t('emergencyHotlineOfSexualHarassment')
            // TODO: Add dialing option url
        },
        {
            number: t('emergencyHotlineOfMinistryOfLaborAndSocialAffairsNumber'),
            text: t('emergencyHotlineOfMinistryOfLaborAndSocialAffairs')
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
        <footer>
            <div className="footer-menu">
                <h1>{t('common.iHaveBeenThereHashtag')}</h1>
                <ul>{displayFooterMenu()}</ul>
            </div>
            <div className="emergency-dial-wrapper purple">
                <ul>{displayFooterHotLines()}</ul>
            </div>
            <div className="legal-bar">
                <ul>
                    <li>
                        <Link to="/been-there-2020">
                            {t('IHaveBeenThere2020')}
                        </Link>
                    </li>
                    <span> | </span>
                    <li>
                        <Link to="/privacy-policy">{t('privacyPolicy')}</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};
