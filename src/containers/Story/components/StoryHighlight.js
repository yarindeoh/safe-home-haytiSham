import React from 'react';
import Tag from 'components/Tag';
import EditImg from 'src/media/icons/Edit.svg';
import EyeSlashIcon from 'src/media/icons/eye-slash-grey.svg';
import AvatarIcon from 'src/media/icons/Avatar.svg';
import ArrowIcon from 'src/media/icons/arrow.svg';

export const StoryHighlight = ({
    story,
    changeLocationByPath,
    liStyle,
    handleStoryClick,
    displayEditImg,
    displayAsUnPublish
}) => {
    const { name, createdAt, tags, quote, updatedAt } = story;
    let initials = name && name.split('')[0];
    const allTags = () => (
        <div className="tags">
            {tags &&
                tags
                    .slice(0, 3)
                    .map((tag, i) => (
                        <Tag
                            key={`tag_${i}`}
                            text={tag}
                            displayAsUnPublish={displayAsUnPublish}
                        />
                    ))}
            {tags.length > 3 && <span className="tag">...</span>}
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
            {displayAsUnPublish && (
                <EyeSlashIcon className={'eye-slash-icon-story-highlight'} />
            )}
            <div className={'arrow-icon'}>{<ArrowIcon/>}</div>
            <div className="initials">
                <AvatarIcon />
            </div>
            <span
                className={`date ${displayAsUnPublish ? 'unPublish-date' : ''}`}
            >
                {displayEditImg ? updatedAt : createdAt}
            </span>
            <p
                className={`text ${
                    displayAsUnPublish ? 'unPublish-quote' : ''
                }`}
            >
                {`"${quote}"`}
            </p>
            {allTags()}
        </li>
    );
};

export default StoryHighlight;
