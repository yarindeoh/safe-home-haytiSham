import React from 'react';
import { useTranslation } from 'react-i18next';
import { withRoute } from 'services/routing/routerHOC';
import { extractFieldsFromObjOrdered } from 'services/general/generalHelpers';
import { StoriesList } from 'containers/Stories/components/StoriesList';
import Skeleton from 'src/components/Skeleton';
import HelpButton from 'src/components/HelpButton.js';
import Content from 'src/components/Content';
import StoryInfo from './components/StoryInfo';
import { FacebookShare } from 'components/FacebookShare';

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
        story?.tagsIds && story?.tagsIds.slice(0, 3);

    return (
        <Skeleton>
            <div id={'story-page-container'}>
                <Content className={'story-page-content'} alignRight={true}>
                    <StoryInfo story={story} />
                    <FacebookShare
                        btnText={t('share.story')}
                        sharedContent={story?.quote}
                    />
                    <div className={'border-separator'}></div>
                    {processedStory &&
                        processedStory.map((item, key) => (
                            <div key={key}>
                                <h2>{t(`storyView.${item.titleKey}`)}</h2>
                                <p className="story-text">{item.text}</p>
                            </div>
                        ))}
                </Content>
            </div>
            <StoriesList
                originalStory={story?.originalStory}
                key={props?.location?.state?._id}
                tags={defaultTagsSimilarStories}
                title={t('tagsFilter.additionalTestimonies')}
                changeLocationByPath={changeLocationByPath}
            />
            <HelpButton />
        </Skeleton>
    );
});
