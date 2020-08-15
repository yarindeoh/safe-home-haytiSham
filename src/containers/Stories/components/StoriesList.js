import React from 'react';

import { useFilteredStories } from 'containers/Stories/storiesHooks';
import { StoryHighlight } from 'containers/Story/components/StoryHighlight';

export const StoriesList = ({ tags, changeLocationByPath }) => {
    const { stories } = useFilteredStories(tags);
    return (
        <main className={'stories'}>
            {stories &&
                Object.keys(stories).map(key => {
                    return (
                        <StoryHighlight
                            story={stories[key]}
                            key={key}
                            changeLocationByPath={() =>
                                changeLocationByPath(
                                    `story/${stories[key]._id}`,
                                    stories[key]
                                )
                            }
                        />
                    );
                })}
        </main>
    );
};
