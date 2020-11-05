import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const WideHeader = () => {
    const { t } = useTranslation();

    const pipe = <span className="pipe">|</span>;

    return (
        <div className="app-header-wide">
            <div className="right-section">
                <Link to="/" className="title">
                    {t('common.iHaveBeenThereHashtag')}
                </Link>
                {pipe}
                <span>{t('storiesView.header')}</span>
            </div>
            <div className="left-section">
                <Link to="/addStory">{t('testimonySubmission')}</Link>
                {pipe}
                <Link to="/pages/warning-signs">
                    {t('warningSigns.header')}
                </Link>
                {pipe}
                <Link to="/pages/about">{t('whoWeAre')}</Link>
                {pipe}
                <span className="phone">6724*</span>
            </div>
        </div>
    );
};

export default WideHeader;
