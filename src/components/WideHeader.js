import React from 'react';
import { useTranslation } from 'react-i18next';

export const WideHeader = () => {
    const { t } = useTranslation();

    const pipe = <span className="pipe">|</span>;

    return (<div className="app-header-wide">
        <div className="right-section">
            <a className="title" href="/">{t('common.iHaveBeenThereHashtag')}</a>
            { pipe }
            <span>{t('storiesView.header')}</span>
        </div>
        <div className="left-section">
            <a href="/addStory">{t('testimonySubmission')}</a>
            { pipe }
            <a href="/warning-signs">{t('warningSigns.header')}</a>
            { pipe }
            <a href="/about">{t('whoWeAre')}</a>
            { pipe }
            <span className="phone">#6724</span>
        </div>
    </div>);
};

export default WideHeader;