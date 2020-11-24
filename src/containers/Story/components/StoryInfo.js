import React from 'react';
import { useTranslation } from 'react-i18next';
import Tags from './Tags';

export function StoryInfo(props) {
    const { story, isPublic } = props;
    const { t } = useTranslation();

    let storyBy = '';
    if (isPublic) {
        storyBy = t('storyVideo.campaign', {
            storyteller: story?.storyteller,
            timestamp: story?.timestamp
        });
    } else {
        const storyName = story?.name
            ? story.name
            : t('storyView.anonymousTeller');
        storyBy = `${t('storyView.storyOf')} ${storyName} ${story?.createdAt}`;
    }

    return (
        <div className="story-info">
            <h1>"{story.quote}"</h1>
            <h2>{storyBy}</h2>
            <Tags tags={story.tags} />
        </div>
    );
}

export default StoryInfo;
