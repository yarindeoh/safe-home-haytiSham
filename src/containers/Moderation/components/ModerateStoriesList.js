import React from 'react';

import { StoryHighlight } from 'containers/Story/components/StoryHighlight';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useModerationStories } from 'containers/Moderation/moderationHooks';

export const ModerateStoriesList = ({ changeLocationByPath, title }) => {
    const { stories, hasMore, getByPage } = useModerationStories();

    return (
        <div className={'more-testimonies'}>
            <h1 style={{ paddingBottom: '10px' }}>{title}</h1>
            <InfiniteScroll
                dataLength={stories.length}
                next={getByPage}
                hasMore={hasMore}
                loader={stories.length > 0 ? <h4>Loading...</h4> : undefined}
            >
                <ul className="stories">
                    {stories &&
                        Object.keys(stories).map(key => {
                            return (
                                <StoryHighlight
                                    story={stories[key]}
                                    key={key}
                                    changeLocationByPath={() =>
                                        changeLocationByPath(
                                            `moderateStory/${stories[key]._id}`,
                                            stories[key]
                                        )
                                    }
                                />
                            );
                        })}
                </ul>
            </InfiniteScroll>
        </div>
    );
};
