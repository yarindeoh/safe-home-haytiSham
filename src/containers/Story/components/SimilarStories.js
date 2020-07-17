import React from 'react';

import { StoryHighlight } from 'containers/Story/components/StoryHighlight';
import { useSimilarStories } from 'containers/Story/storyHooks';
import { useTranslation } from 'react-i18next';

export const SimilarStories = ({ tags, changeLocationByPath }) => {
    const { t } = useTranslation();
    const { stories } = useSimilarStories(tags);
    return (
        <div className={t('more-testimonies')}>
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
