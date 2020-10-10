import React from 'react';
import { useLocation } from 'react-router-dom';

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
    let location = useLocation();

    const { stories, hasMore, getNextPage } = useFilteredStories(tags);

    return (
        <div className={'more-testimonies'}>
            <h1>{title}</h1>
            <InfiniteScroll
                dataLength={stories?.length}
                next={getNextPage}
                hasMore={hasMore}
                loader={<Loader />}
            >
                <ul
                    className={`stories ${
                        location.pathname.includes('admin')
                            ? 'stories-admin'
                            : ''
                    }`}
                >
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
