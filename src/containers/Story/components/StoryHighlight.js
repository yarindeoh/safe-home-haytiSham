import React from 'react';
import Tag from 'components/Tag';
import EditImg from 'src/media/icons/Edit.svg';
import AvatarIcon from 'src/media/icons/Avatar.svg';

export const StoryHighlight = ({
    story,
    changeLocationByPath,
    liStyle,
    handleStoryClick,
    displayEditImg
}) => {
    const { id, name, createdAt, tags, quote } = story;
    let initials = name && name.split('')[0];
    const allTags = () => (
        <div className="tags">
            {tags &&
                tags
                    .slice(0, 3)
                    .map((tag, i) => <Tag key={`tag_${i}`} text={tag} />)}
        </div>
    );

    return (
        <li
            className={`story ${displayEditImg ? 'edit-icon-container' : ''}`}
            style={liStyle}
            onClick={
                handleStoryClick !== undefined
                    ? handleStoryClick
                    : changeLocationByPath
            }
        >
            {displayEditImg && (
                <EditImg className={'edit-icon-story-highlight'} />
            )}
            <div className="initials">
                <AvatarIcon />
            </div>
            <span className="date">{createdAt}</span>
            <p className="text">{quote}</p>
            {allTags()}
        </li>
    );
};

export default StoryHighlight;
