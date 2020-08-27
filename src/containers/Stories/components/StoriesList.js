import React, { useState } from 'react';

import { useFilteredStories } from 'containers/Stories/storiesHooks';
import { StoryHighlight } from 'containers/Story/components/StoryHighlight';
import InfiniteScroll from "react-infinite-scroll-component";



export const StoriesList = ({ tags, changeLocationByPath }) => {
    const { stories, hasMore, getByPage } = useFilteredStories(tags);

    return (
        <main className={'stories'}>
            <InfiniteScroll
                dataLength={stories.length}
                next={getByPage}
                hasMore={hasMore}
                loader={stories.length>0 ? <h4>Loading...</h4>: undefined}
            >
            {stories &&
                Object.keys(stories).map(key => {
                    return (
                        <StoryHighlight
                            story={stories[key]}
                            key={key}
                            changeLocationByPath={() =>
                                changeLocationByPath(
                                    `story/${stories[key]._id}`,
                                    stories[key]
                                )
                            }
                        />
                    );
                })}
            </InfiniteScroll>
        </main>
    );
};
