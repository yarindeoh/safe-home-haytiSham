import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import Carousel from 'containers/Stories/components/Carousel/Carousel';
import { TagsFilter } from 'containers/Stories/components/TagsFilter';
import { useTranslation } from 'react-i18next';
import HelpButton from 'src/components/HelpButton.js';
import { Skeleton } from 'src/components/Skeleton';
import LeftArrowIcon from 'src/media/icons/leftArrow.svg';

export const StoriesView = withRoute((props) => {
    const { t } = useTranslation();
    const changeLocationByPath = (path, params) => {
        props.history.push(path, params);
    };
    return (
        <Skeleton isMainHeader={true}>
            <h4 className={'const-text'}>{t('storiesView.header')}</h4>
            <Carousel changeLocationByPath={changeLocationByPath} />
            <div className="actions">
                <button
                    className={'BTN-send-testimony'}
                    onClick={() => props.history.push('addStory')}
                >
                    {t('storiesView.addStory')}
                    <LeftArrowIcon style={{ marginRight: '11px' }} />
                </button>
            </div>
            <TagsFilter changeLocationByPath={changeLocationByPath} />
            <HelpButton />
        </Skeleton>
    );
});
