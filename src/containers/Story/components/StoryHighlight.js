import React from 'react';
import Tag from 'src/components/Tag';

export const StoryHighlight = ({ story, changeLocationByPath }) => {
    const { id, initials, timestamp, tags, quote } = story;
    const date = timestamp.split(' ')[0];

    const allTags = () => (
        <div className="tags">
            {tags.map((tag, i) => (
                <Tag key={`tag_${i}`} text={tag} />
            ))}
        </div>
    );

    return (
        <li className="story" onClick={() => changeLocationByPath(id, story)}>
            <div className="initials">{initials}</div>
            <span className="date">{date}</span>
            <p className="text">{quote}</p>
            {allTags()}
        </li>
    );
};

export default StoryHighlight;
