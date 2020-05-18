import React from 'react';

import { useFilteredStories } from 'containers/Stories/storiesHooks';
import { StoryHighlight } from 'containers/Story/components/StoryHighlight';

export const StoriesList = ({ tags }) => {
    const { stories } = useFilteredStories(tags);
    return (
        <div className="storiesList">
            {stories &&
                stories.map((story, key) => (
                    <StoryHighlight story={story} key={key} />
                ))}
        </div>
    );
};
