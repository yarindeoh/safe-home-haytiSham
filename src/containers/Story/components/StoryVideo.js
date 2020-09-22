import React from 'react';
import { Video, Transformation } from 'cloudinary-react';

import { withRoute } from 'services/routing/routerHOC';
import { StoriesList } from 'containers/Stories/components/StoriesList';
import { Tags } from 'containers/Story/components/Tags';
import { getPublicStoryById } from 'services/general/publicStoriesConfig';
import { useTranslation } from 'react-i18next';
import HelpButton from 'src/components/HelpButton.js';
import Skeleton from 'src/components/Skeleton';

export const StoryVideo = withRoute(props => {
    const { t } = useTranslation();
    const story = getPublicStoryById(props.match.params.id);

    const changeLocationByPath = (path, params) => {
        props.history.push(path, params);
    };
    return (
        <Skeleton>
            <div id={'story-page-container'}>
                <div id={'story-page-content'}>
                    <div className="quote">
                        <h1>{story.quote}</h1>
                        <h2>
                            {t('storyVideo.campaign', {
                                storyteller: story.storyteller,
                                timestamp: story.timestamp
                            })}
                        </h2>
                        <Tags tags={story.tags} />
                        <div className="video-wrapper">
                            <Video
                                className="story-video"
                                cloudName="dh7jncxmb"
                                publicId={story.id}
                                format="mp4"
                                controls
                            >
                                <Transformation bitRate="250k" />
                            </Video>
                        </div>
                    </div>
                </div>
            </div>
            <StoriesList
                tags={story.tags_id}
                title={t('tagsFilter.additionalTestimonies')}
                changeLocationByPath={changeLocationByPath}
            />
            <HelpButton />
        </Skeleton>
    );
});
