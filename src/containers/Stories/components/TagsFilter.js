import React, { useMemo } from 'react';

import { useTags } from 'containers/Stories/storiesHooks';
import TagFilter from 'components/TagFilter';
import { StoriesList } from 'containers/Stories/components/StoriesList';
import { useTranslation } from 'react-i18next';

export const TagsFilter = ({ changeLocationByPath }) => {
    const { t } = useTranslation();
    const {
        tagsData,
        changeTagSelected,
        isDisplayMoreTags,
        changeDisplayMoreTags,
        getDisplayedTags
    } = useTags();
    const filterTagsIds = useMemo(
        () => Object.keys(tagsData).filter(tagId => tagsData[tagId].selected),
        [tagsData]
    );

    return (
        <div className={'stories-gallery-container'}>
            <h1>{t('tagsFilter.additionalTestimonies')}</h1>
            <div className="tags-filter-container">
                {tagsData &&
                    Object.keys(tagsData).map(tagId => (
                        <TagFilter
                            value={tagsData[tagId].value}
                            tag={tagsData[tagId].value}
                            key={tagId}
                            selected={tagsData[tagId].selected}
                            onClick={event => changeTagSelected(tagId)}
                        />
                    ))}
                <span className="more-tags" onClick={changeDisplayMoreTags}>
                    {isDisplayMoreTags
                        ? t('tagsFilter.lessCategories')
                        : t('tagsFilter.moreCategories')}
                </span>
            </div>
            <StoriesList
                tags={filterTagsIds}
                changeLocationByPath={changeLocationByPath}
            />
        </div>
    );
};
