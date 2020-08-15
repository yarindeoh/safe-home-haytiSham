import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { SimilarStories } from 'containers/Story/components/SimilarStories';
import { Footer } from 'components/Footer';
import { Tags } from 'containers/Story/components/Tags';
import { getPublicStoryById } from 'src/constants/publicStories';
import { useTranslation } from 'react-i18next';
import Skeleton from 'src/components/Skeleton';

export const StoryVideo = withRoute(props => {
    const { t } = useTranslation();
    const story = getPublicStoryById(props.match.params.id);
    const changeLocationByPath = path => {
        props.history.push(path);
    };

    return (<Skeleton>
            <div id="story-page-container">
                <div className="quote">
                    <h1>{story.quote}</h1>
                    <h2>
                        {t('storyVideo.campaign', {
                            storyteller: story.storyteller,
                            timestamp: story.timestamp
                        })}
                    </h2>
                    <Tags tags={story.tags}/>
                    <div>
                        <iframe
                            src={`https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FonlifeIL%2Fvideos%${story.id}%2F&show_text=0`}
                        />
                    </div>
                </div>
                {/* //TODO */}
                <SimilarStories
                    tags={[t('tags.jealousy'), t('tags.humiliation')]}
                />
                <Footer/>
            </div>
        </Skeleton>
    );
});
