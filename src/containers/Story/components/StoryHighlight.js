import React from 'react';
import Tag from 'components/Tag';
import moment from 'moment-mini-ts';

export const StoryHighlight = ({ story, changeLocationByPath, liStyle }) => {
    const { id, name, createdAt, tags, quote } = story;
    let initials = name && name.split('')[0];
    const allTags = () => (
        <div className="tags">
            {tags && tags.map((tag, i) => <Tag key={`tag_${i}`} text={tag} />)}
        </div>
    );

    return (
        <li
            className="story"
            style={liStyle}
            onClick={() => changeLocationByPath(id, story)}
        >
            <div className="initials">{initials}</div>
            <span className="date">
                {moment.utc(createdAt).format('DD.MM.YYYY HH:mm:ss')}
            </span>
            <p className="text">{quote}</p>
            {allTags()}
        </li>
    );
};

export default StoryHighlight;
