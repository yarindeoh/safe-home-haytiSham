import React from 'react';

import { StoryHighlight } from './StoryHighlight';
import { useSimilarStories } from 'containers/Story/storyHooks';
import lang from 'services/lang.json';

export const SimilarStories = ({ tags, changeStoryLocation }) => {
    const { stories } = useSimilarStories(tags);
    return (
        <div>
            {lang.additionalStories}:
            {stories &&
                Object.keys(stories).map((index, key) => {
                    return (
                        <StoryHighlight
                            story={stories[index]}
                            key={key}
                            changeStoryLocation={changeStoryLocation}
                        />
                    );
                })}
        </div>
    );
};
