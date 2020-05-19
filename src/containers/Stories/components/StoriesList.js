import React from 'react';

import { useFilteredStories } from 'containers/Stories/storiesHooks';
import { StoryHighlight } from 'containers/Story/components/StoryHighlight';

export const StoriesList = ({ tags, changeLocationByPath }) => {
    const { stories } = useFilteredStories(tags);
    return (
        <main id={'stories'}>
            {stories &&
                stories.map((item, key) => {
                    return (
                        <StoryHighlight
                            story={item}
                            key={key}
                            changeLocationByPath={() =>
                                changeLocationByPath(`story/${item.id}`, item)
                            }
                        />
                    );
                })}
        </main>
    );
};
