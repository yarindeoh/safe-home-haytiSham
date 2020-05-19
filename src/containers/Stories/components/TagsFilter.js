import React, { useState } from 'react';

import { useAllTags } from 'containers/Stories/storiesHooks';
import { Tag } from 'components/Tag';
import { StoriesList } from 'containers/Stories/components/StoriesList';

export const TagsFilter = ({ changeLocationByPath }) => {
    const tags = useAllTags();
    const [filteredTags, setFilteredTags] = useState([]);
    return (
        <div className={'stories-gallery-container'}>
            <div id={'tags-container'}>
                <div className="tagsFilter">
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
                    <span id="moreTags">עוד קטגוריות </span>
                </div>
            </div>
            <StoriesList
                tags={filteredTags}
                changeLocationByPath={changeLocationByPath}
            />
            <h6>לעוד הדויות</h6>
        </div>
    );
};
