import React, { useState } from 'react';

import { useAllTags } from 'containers/Stories/storiesHooks';
import TagFilter from 'src/components/TagFilter';
import { StoriesList } from 'containers/Stories/components/StoriesList';
import { useTranslation } from 'react-i18next';

export const TagsFilter = ({ changeLocationByPath }) => {
    const { t } = useTranslation();
    const tags = useAllTags();
    const [filteredTags, setFilteredTags] = useState([]);
    const [showMoreTags, setShowMoreTags] = useState(false);
    const allTags =
        tags &&
        tags.map((tag, key) => (
            <TagFilter
                value={tag}
                key={key}
                selected={filteredTags.includes(tag)}
                onClick={() => {
                    filteredTags.includes(tag)
                        ? setFilteredTags(filteredTags.filter(e => e !== tag))
                        : setFilteredTags([...filteredTags, tag]);
                }}
            />
        ));

    const first5Tags = allTags && allTags.slice(0, 5);
    const moreTags = allTags && allTags.slice(5);
    const moreTagsText = showMoreTags
        ? t('tagsFilter.lessCategories')
        : t('tagsFilter.moreCategories');

    return (
        <div className={'stories-gallery-container'}>
            <h1>{t('tagsFilter.additionalTestimonies')}</h1>
            <div className="tags-filter-container">
                {first5Tags}
                {showMoreTags && moreTags}
                <span
                    className="more-tags"
                    onClick={() =>
                        setShowMoreTags(showMoreTags => !showMoreTags)
                    }
                >
                    {moreTagsText}
                </span>
            </div>
            <StoriesList
                tags={filteredTags}
                changeLocationByPath={changeLocationByPath}
            />
        </div>
    );
};
