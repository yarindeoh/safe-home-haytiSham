import React, { useState, useEffect } from 'react';

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
    const [filteredTags, setFilteredTags] = useState([]);

    return (
        <div className={'stories-gallery-container'}>
            <h1>{t('tagsFilter.additionalTestimonies')}</h1>
            <div className="tags-filter-container">
                {tagsData &&
                    Object.keys(tagsData).map((tag) => (
                        <TagFilter
                            value={tag}
                            tag={tag}
                            key={tag}
                            selected={tagsData[tag]}
                            onClick={event => changeTagSelected(tag)}
                        />
                    ))}
                <span className="more-tags" onClick={changeDisplayMoreTags}>
                    {isDisplayMoreTags
                        ? t('tagsFilter.lessCategories')
                        : t('tagsFilter.moreCategories')}
                </span>
            </div>
            <StoriesList
                tags={filteredTags}
                changeLocationByPath={changeLocationByPath}
            />
        </div>
    );
};
