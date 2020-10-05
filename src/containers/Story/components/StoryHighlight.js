import React from 'react';
import Tag from 'components/Tag';
import dayjs from 'dayjs';

export const StoryHighlight = ({ story, changeLocationByPath, liStyle }) => {
    const { id, name, createdAt, tags, quote } = story;
    let initials = name && name.split('')[0];
    const createAtDate = dayjs(createdAt).format('DD.MM.YY');
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
            <span className="date">{createAtDate}</span>
            <p className="text">{quote}</p>
            {allTags()}
        </li>
    );
};

export default StoryHighlight;
