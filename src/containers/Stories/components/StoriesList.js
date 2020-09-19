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
    const { stories, hasMore, getNextPage, init } = useFilteredStories(tags);

    return (
        <div className={'more-testimonies'}>
            {title}
            <InfiniteScroll
                dataLength={stories.length}
                next={getNextPage}
                hasMore={hasMore}
                loader={stories.length > 0 ? <Loader /> : undefined}
            >
                <ul className="stories">
                    {stories &&
                        (init ? (
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
                            })
                        ) : (
                            <Loader />
                        ))}
                </ul>
            </InfiniteScroll>
        </div>
    );
};
