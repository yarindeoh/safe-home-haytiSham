import React from 'react';

export const StoryHighlight = ({ story, changeLocationByPath }) => {
    let name = story.name && story.name.split('')[0];
    // let time = story.createdAt.split(' ')[0];
    let time = story.createdAt;
    return (
        <li
            className={'story'}
            onClick={() => changeLocationByPath(story._id, story)}
        >
            <figure>
                <h2>{name}</h2>
            </figure>
            <h6>{time}</h6>
            <p>{story.quote}</p>
        </li>
    );
};
