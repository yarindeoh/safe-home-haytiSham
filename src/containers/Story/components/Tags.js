import React from 'react';
import Tag from 'src/components/Tag';

export const Tags = ({ tags }) => {
    return (
        <div>
            {tags?.map((tag, key) => (
                <Tag text={tag} key={key} />
            ))}
        </div>
    );
};

export default Tags;
