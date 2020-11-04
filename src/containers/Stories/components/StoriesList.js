import React from 'react';
import { useStories } from 'containers/Stories/storiesHooks';
import { StoryHighlight } from 'containers/Story/components/StoryHighlight';
import { Loader } from 'components/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';

export const StoriesList = ({
    tags,
    changeLocationByPath,
    title,
    rootPath,
    storiesListClassName = '',
    handleStoryClick,
    displayEditImg,
    originalStory
}) => {
    const { stories, hasMore, getNextPage } = useStories(tags);
    return (
        <div className={'more-testimonies'}>
            <h1>{title}</h1>
            <InfiniteScroll
                dataLength={stories?.length}
                next={getNextPage}
                hasMore={hasMore}
                loader={<Loader />}
                scrollThreshold={0.001}
            >
                <ul className={`stories ${storiesListClassName}`}>
                    {stories &&
                        Object.keys(stories)
                            .filter(
                                key =>
                                    stories[key]?.originalStory !==
                                    originalStory
                            )
                            .map(key => {
                                return (
                                    <StoryHighlight
                                        story={stories[key]}
                                        key={key}
                                        displayEditImg={displayEditImg}
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
                                        handleStoryClick={
                                            handleStoryClick !== undefined
                                                ? () =>
                                                      handleStoryClick(
                                                          stories[key]
                                                              ?.originalStory
                                                      )
                                                : undefined
                                        }
                                    />
                                );
                            })}
                </ul>
            </InfiniteScroll>
        </div>
    );
};
