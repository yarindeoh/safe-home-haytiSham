import React, { useState, useEffect } from 'react';

import { useAllTags, useDisplayedTags } from 'containers/Stories/storiesHooks';
import TagFilter from 'components/TagFilter';
import { StoriesList } from 'containers/Stories/components/StoriesList';
import { useTranslation } from 'react-i18next';

export const TagsFilter = ({ changeLocationByPath }) => {
    const { t } = useTranslation();
    const { tags, showMoreTags, handleShowMoreTagsChange } = useDisplayedTags(
        useAllTags()
    );
    const [filteredTags, setFilteredTags] = useState([]);

    return (
        <div className={'stories-gallery-container'}>
            <h1>{t('tagsFilter.additionalTestimonies')}</h1>
            <div className="tags-filter-container">
                {tags &&
                    Object.keys(tags).map((key, index) => (
                        <TagFilter
                            value={key}
                            tag={tags[key]}
                            key={index}
                            selected={filteredTags.includes(key.toString())}
                            onClick={event => {
                                let tag = event.target.getAttribute('data-id');
                                if (filteredTags.includes(tag)) {
                                    setFilteredTags(
                                        filteredTags.filter(e => e !== tag)
                                    );
                                } else {
                                    setFilteredTags([...filteredTags, tag]);
                                }
                            }}
                        />
                    ))}
                <span className="more-tags" onClick={handleShowMoreTagsChange}>
                    {showMoreTags
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
