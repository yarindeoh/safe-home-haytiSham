import React from 'react';
import { withRoute } from 'services/routing/withRouter';
import { extractFieldsFromObjOrdered } from 'services/general/generalHelpers';
import { StoriesList } from 'containers/Stories/components/StoriesList';
import { useTranslation } from 'react-i18next';
import Skeleton from 'components/Skeleton';
import HelpButton from 'components/HelpButton.js';
import Content from 'components/Content';
import { Tags } from './components/Tags';
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
                    <div className={'quote'}>
                        <h1>"{story?.quote}"</h1>
                        <h2>
                            {`
                     ${t('storyView.storyOf')}
                     ${
                         story?.name
                             ? story?.name
                             : t('storyView.anonymousTeller')
                     }
                     ${story?.createdAt}
                   `}
                        </h2>
                        <Tags tags={story?.tags} />
                    </div>
                    <FacebookShare
                        btnText={t('share.story')}
                        sharedContent={story?.quote}
                    />
                    <div className={'border-separator'} />
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
