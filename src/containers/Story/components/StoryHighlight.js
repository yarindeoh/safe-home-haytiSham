import React from 'react';

export const StoryHighlight = ({ story, changeLocationByPath }) => {
    let name = story.name.split('')[0];
    let time = story.timestamp.split(' ')[0];
    return (
        <li
            className={'story'}
            onClick={() => changeLocationByPath(story.id, story)}
        >
            <figure>
                <h2>{name}</h2>
            </figure>
            <h6>{time}</h6>
            <p>{story.quote}</p>
        </li>
    );
};
