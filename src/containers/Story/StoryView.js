import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { Tags } from './components/Tags';
import { extractFieldsFromObjOrdered } from 'services/general/generalHelpers';
import { StoriesList } from 'containers/Stories/components/StoriesList';
import { useTranslation } from 'react-i18next';
import Skeleton from 'src/components/Skeleton';
import HelpButton from 'src/components/HelpButton.js';

export const StoryView = withRoute(props => {
    const { t } = useTranslation();
    const story = props.location.state;
    const changeLocationByPath = (path, params) => {
        props.history.push(path, params);
    };
    const processedStory = extractFieldsFromObjOrdered(story, [
        'background',
        'storyContent',
        'howDidYouManged',
        'whatTriggeredChange',
        'whatHelpedYou',
        'additionalnfo'
    ]);
    const defaultTagsSimilarStories =
        story.tagsIds && story.tagsIds.slice(0, 3);

    return (
        <Skeleton>
            <div id={'story-page-container'}>
                <div id={'story-page-content'}>
                    <div className={'quote'}>
                        <h1>"{story.quote}"</h1>
                        <h2>
                            {`
                     ${t('storyView.storyOf')}
                     ${
                         story.name
                             ? story.name.split('')[0]
                             : t('storyView.anonymousTeller')
                     }
                     ${story.createdAt}
                   `}
                        </h2>
                        <Tags tags={story.tags} />
                    </div>
                    {processedStory &&
                        processedStory.map((item, key) => (
                            <div key={key}>
                                <h6>{t(`storyView.${item.titleKey}`)}</h6>
                                <span className="story-text">{item.text}</span>
                                <br />
                            </div>
                        ))}
                </div>
            </div>
            <StoriesList
                key={props.location.state._id}
                tags={defaultTagsSimilarStories}
                title={t('tagsFilter.additionalTestimonies')}
                changeLocationByPath={changeLocationByPath}
            />
            <HelpButton />
        </Skeleton>
    );
});
