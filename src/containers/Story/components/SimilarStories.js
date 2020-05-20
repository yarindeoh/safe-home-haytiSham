import React from 'react';

import { StoryHighlight } from 'containers/Story/components/StoryHighlight';
import { useSimilarStories } from 'containers/Story/storyHooks';
import lang from 'services/lang.json';

export const SimilarStories = ({ tags, changeLocationByPath }) => {
    const { stories } = useSimilarStories(tags);
    return (
        <div className={'more-testimonies'}>
            {lang.additionalStories}
            <ul className="stories">
                {stories &&
                    Object.keys(stories).map((index, key) => {
                        return (
                            <StoryHighlight
                                story={stories[index]}
                                key={key}
                                changeLocationByPath={changeLocationByPath}
                            />
                        );
                    })}
            </ul>
        </div>
    );
};
