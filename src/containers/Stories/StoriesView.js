import React from 'react';

import { withRoute } from 'services/routing/routerHOC';
import Carousel from 'containers/Stories/components/Carousel/Carousel';
import { TagsFilter } from 'containers/Stories/components/TagsFilter';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { useTranslation } from 'react-i18next';
import HelpButton from 'src/components/HelpButton.js';
import AccessibilityIcon from 'src/media/icons/accessibility.svg';

export const StoriesView = withRoute(props => {
    const { t } = useTranslation();

    const changeLocationByPath = (path, params) => {
        props.history.push(path, params);
    };
    return (
        <div className="app">
            <Header />
            <AccessibilityIcon className="AccessibilityButton" />
            <h4 className={'const-text'}>{t('storiesView.header')}</h4>
            <Carousel changeLocationByPath={changeLocationByPath} />
            <button
                className={'BTN-send-testimony'}
                onClick={() => props.history.push('addStory')}
            >
                {t('storiesView.addStory')}
            </button>
            <TagsFilter changeLocationByPath={changeLocationByPath} />
            <HelpButton />
            <Footer />
        </div>
    );
});
