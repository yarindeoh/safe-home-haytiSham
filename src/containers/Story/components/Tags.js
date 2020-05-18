import React from 'react';

import { Tag } from 'components/Tag';
import lang from 'services/lang.json';

export const Tags = ({ tags }) => {
    return (
        <div>
            <br />
            {lang.tags}:
            {tags.map((tag, key) => (
                <Tag value={tag} key={key} />
            ))}
        </div>
    );
};
