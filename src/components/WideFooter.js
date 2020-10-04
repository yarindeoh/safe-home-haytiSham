import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const WideFooter = () => {
    const { t } = useTranslation();

    return (
        <div className="app-footer-wide">
            <div className="navigation">
                <Link to="/" className="title">
                    {t('common.iHaveBeenThereHashtag')}
                </Link>
                <div className="left-area">
                    <Link to="/addStory">{t('testimonySubmission')}</Link>
                    <Link to="/pages/warning-signs">
                        {t('warningSigns.header')}
                    </Link>
                    <Link to="/pages/about">{t('whoWeAre')}</Link>
                </div>
            </div>
            <span>
                © {t('IHaveBeenThere2020')} | {t('privacyPolicy')}
            </span>
        </div>
    );
};

export default WideFooter;
