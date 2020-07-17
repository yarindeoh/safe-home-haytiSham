import React, { useState } from 'react';

import { useAllTags } from 'containers/Stories/storiesHooks';
import { Tag } from 'components/Tag';
import { StoriesList } from 'containers/Stories/components/StoriesList';

export const TagsFilter = ({ changeLocationByPath }) => {
    const tags = useAllTags();
    const [filteredTags, setFilteredTags] = useState([]);
    return (
        <div className={'stories-gallery-container'}>
            <h1>עדויות נוספות</h1>
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
                                              filteredTags.filter(
                                                  (e) => e !== tag
                                              )
                                          )
                                        : setFilteredTags([
                                              ...filteredTags,
                                              tag,
                                          ]);
                                }}
                            />
                        ))}
                    <span className="more-tags">עוד קטגוריות </span>
            </div>
            <StoriesList
                tags={filteredTags}
                changeLocationByPath={changeLocationByPath}
            />
        </div>
    );
};
