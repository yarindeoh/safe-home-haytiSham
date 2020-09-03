import React from 'react';
import { Video, Transformation } from 'cloudinary-react';

import { withRoute } from 'services/routing/routerHOC';
import { TagsFilter } from 'containers/Stories/components/TagsFilter';
import { Footer } from 'components/Footer';
import { Tags } from 'containers/Story/components/Tags';
import { getPublicStoryById } from 'src/constants/publicStories';
import { useTranslation } from 'react-i18next';
import Skeleton from 'src/components/Skeleton';

export const StoryVideo = withRoute(props => {
    const { t } = useTranslation();
    const story = getPublicStoryById(props.match.params.id);

    const changeLocationByPath = path => {
        props.history.replace(path);
    };
    return (
        <Skeleton>
            <div id="story-page-container">
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
                            autoPlay
                        >
                            <Transformation bitRate="250k" />
                        </Video>
                    </div>
                </div>
                <TagsFilter
                    defaultSelectedTags={story.tags_id}
                    changeLocationByPath={changeLocationByPath}
                />
                <Footer />
            </div>
        </Skeleton>
    );
});
