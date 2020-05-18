import React from 'react';

import { useFilteredStories } from 'containers/Stories/storiesHooks';
import { StoryHighlight } from 'containers/Story/components/StoryHighlight';

export const StoriesList = ({ tags, changeStoryLocation }) => {
    const { stories } = useFilteredStories(tags);
    return (
        <div className="storiesList">
            {stories &&
                stories.map((story, key) => (
                    <StoryHighlight
                        story={story}
                        key={key}
                        changeStoryLocation={() =>
                            changeStoryLocation(`story/${story.id}`, story)
                        }
                    />
                ))}
        </div>
    );
};
