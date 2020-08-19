import React from 'react';
import Tag from 'components/Tag';

export const StoryHighlight = ({ story, changeLocationByPath }) => {
    const { id, name, createdAt, tags, quote } = story;
    let initials = name && name.split('')[0];
    const allTags = () => (
        <div className="tags">
            {tags && tags.map((tag, i) => <Tag key={`tag_${i}`} text={tag} />)}
        </div>
    );

    return (
        <li className="story" onClick={() => changeLocationByPath(id, story)}>
            <div className="initials">{initials}</div>
            <span className="date">{createdAt}</span>
            <p className="text">{quote}</p>
            {allTags()}
        </li>
    );
};

export default StoryHighlight;
