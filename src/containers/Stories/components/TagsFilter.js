import React, { useState } from 'react';

import { useAllTags } from 'containers/Stories/storiesHooks';
import { Tag } from 'components/Tag';
import { StoriesList } from 'containers/Stories/components/StoriesList';
import { useTranslation } from 'react-i18next';

export const TagsFilter = ({ changeLocationByPath }) => {
    const { t } = useTranslation();
    const tags = useAllTags();
    const [filteredTags, setFilteredTags] = useState([]);
    return (
        <div className={'stories-gallery-container'}>
            <h1>{t('tagsFilter.additionalTestimonies')}</h1>
            <div className="tags-container">
                {tags &&
                    tags.map((tag, key) => (
                        <Tag
                            value={tag}
                            key={key}
                            selected={filteredTags.includes(tag)}
                            onClick={() => {
                                filteredTags.includes(tag)
                                    ? setFilteredTags(
                                          filteredTags.filter(e => e !== tag)
                                      )
                                    : setFilteredTags([...filteredTags, tag]);
                            }}
                        />
                    ))}
                <span className="more-tags">
                    {t('tagsFilter.moreCategories')}
                </span>
            </div>
            <StoriesList
                tags={filteredTags}
                changeLocationByPath={changeLocationByPath}
            />
        </div>
    );
};
