import React, { useState } from 'react';

import { useAllTags } from 'containers/Stories/storiesHooks';
import { Tag } from 'components/Tag';
import { StoriesList } from 'containers/Stories/components/StoriesList';

export const TagsFilter = ({ changeLocationByPath }) => {
    const tags = useAllTags();
    const [filteredTags, setFilteredTags] = useState([]);
    const [showMoreTags, setShowMoreTags] = useState(false);
    const allTags =
        tags &&
        tags.map((tag, key) => (
            <Tag
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
    const moreTagsText = showMoreTags ? "פחות קטגוריות" : "עוד קטגוריות";

    return (
        <div className={'stories-gallery-container'}>
            <h1>עדויות נוספות</h1>
            <div id={'tags-container'}>
                <div className="tagsFilter">
                    {first5Tags}
                    {showMoreTags && moreTags}
                    <span
                        id="moreTags"
                        onClick={() =>
                            setShowMoreTags(showMoreTags => !showMoreTags)
                        }
                    >
                        {moreTagsText}
                    </span>
                </div>
            </div>
            <StoriesList
                tags={filteredTags}
                changeLocationByPath={changeLocationByPath}
            />
        </div>
    );
};
