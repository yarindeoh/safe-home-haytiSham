import React from 'react';

import { useFilteredStories } from 'containers/Stories/storiesHooks';
import { StoryHighlight } from 'containers/Story/components/StoryHighlight';
import { Loader } from 'components/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';

export const StoriesList = ({
    tags,
    changeLocationByPath,
    title,
    rootPath
}) => {
    const { stories, hasMore, getNextPage } = useFilteredStories(tags);

    return (
        <div className={'more-testimonies'}>
            <h1>{title}</h1>
            <InfiniteScroll
                dataLength={stories ? stories.length : 0}
                next={getNextPage}
                hasMore={hasMore}
                loader={<Loader />}
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
                                            `${
                                                rootPath !== undefined
                                                    ? rootPath
                                                    : '/story'
                                            }/${stories[key]._id}`,
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
