import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import no2violence from '../media/no2violence.png';

export const WideFooter = () => {
    const { t } = useTranslation();
    const facebookLink = t('common.facebookOrganizationLink');
    const websiteLink = t('common.organizationLink');
    const organizationName = t('common.organizationName');

    return (
        <div className="app-footer-wide">
            <div className="navigation">
                <Link to="/" className="title">
                    {t('common.iHaveBeenThereHashtag')}
                </Link>
                <img src={no2violence} alt="no2violence" />
                <div className="left-area">
                    <Link to="/addStory">{t('testimonySubmission')}</Link>
                    <Link to="/pages/warning-signs">
                        {t('warningSigns.header')}
                    </Link>
                    <Link to="/pages/about">{t('whoWeAre')}</Link>
                </div>
                <div className="emergency-line">
                    <span className="phone">6724*</span>
                    <span className="text">קו חירום 24/7</span>
                </div>
            </div>
            <span className="copyright">
                {t('footer.facebook', { name: organizationName })}
                <span className="separator">•</span>
                {t('footer.website', { name: organizationName })}
                <a
                    href={websiteLink}
                    className="organizationLink"
                    target="_blank"
                >
                    {t('common.organizationLinkDisplay')}
                </a>
                <span className="separator">•</span>
                <Link to="/pages/terms-of-service">
                    <u>{t('privacyPolicy')}</u>
                </Link>
            </span>
        </div>
    );
};

export default WideFooter;
