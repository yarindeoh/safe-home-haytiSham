import React from 'react';

import { Tag } from 'components/Tag';

export const Tags = ({ tags }) => {
    return (
        <div className="tagsFilter">
            {tags.map((tag, key) => (
                <Tag value={tag} key={key} />
            ))}
        </div>
    );
};
