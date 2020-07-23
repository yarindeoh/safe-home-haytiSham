import React from 'react';

export const StoryHighlight = ({ story, changeLocationByPath }) => {
    const { id, initials, timestamp, tags, quote } = story;
    const date = timestamp.split(' ')[0];

    const allTags = () => (
        <div className="tags">
            {tags.map((tag, i) => (
                <span key={`tag_${i}`} className="tag">{tag}</span>
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
