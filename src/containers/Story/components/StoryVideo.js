import React from 'react';
import { Video, Transformation } from 'cloudinary-react';
import { withRoute } from 'services/routing/routerHOC';
import { StoriesList } from 'containers/Stories/components/StoriesList';
import { getPublicStoryById } from 'services/general/publicStoriesConfig';
import { useTranslation } from 'react-i18next';
import Skeleton from 'src/components/Skeleton';
import Content from 'src/components/Content';
import { FacebookShare } from 'components/FacebookShare';
import StoryInfo from './StoryInfo';

export const StoryVideo = withRoute(props => {
    const { t } = useTranslation();
    const story = getPublicStoryById(props.match.params.id);

    const changeLocationByPath = (path, params) => {
        props.history.push(path, params);
    };
    return (
        <Skeleton>
            <div id={'story-page-container'}>
                <Content className="story-page-content" fullWidth={true}>
                    <StoryInfo story={story} isPublic={true} />
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
                    <FacebookShare
                        btnText={t('share.story')}
                        sharedContent="הייתי שם"
                    />
                </Content>
            </div>
            <StoriesList
                tags={story.tagsId}
                title={t('tagsFilter.additionalTestimonies')}
                changeLocationByPath={changeLocationByPath}
            />
        </Skeleton>
    );
});
