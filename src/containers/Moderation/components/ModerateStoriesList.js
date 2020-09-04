import React from 'react';

import { StoryHighlight } from 'containers/Story/components/StoryHighlight';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useModerationStories } from 'containers/Moderation/moderationHooks';

export const ModerateStoriesList = ({ changeLocationByPath, title }) => {
    const { stories, hasMore, getByPage } = useModerationStories();

    return (
        //id={scrollableDiv} style={{ height: 300 ,overflowY: "scroll"}}
        <div className={'more-testimonies'}>
            {title}
            <InfiniteScroll
                dataLength={stories.length}
                next={getByPage}
                hasMore={hasMore}
                loader={stories.length > 0 ? <h4>Loading...</h4> : undefined}
                // height={300}
                // scrollableTarget="scrollableDiv"
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
