import React from 'react';

import { useData } from 'containers/Stories/storiesHooks';
import lang from 'services/lang.json';
import { withRoute } from 'services/routing/routerHOC';
import { StoriesGalleryView } from 'containers/Stories/components/StoriesGallery/StoriesGalleryView';
import { TagsFilter } from 'containers/Stories/components/TagsFilter';

export const StoriesView = withRoute((props) => {
    const { data } = useData();
    return (
        <div className="app">
            <div className="title">It Could Have Been Me</div>
            <StoriesGalleryView />
            <button onClick={() => props.history.push('addStory')}>
                {lang.addStory}
            </button>
            <hr />
            <TagsFilter />
            {data &&
                data.map((item, key) => {
                    return (
                        <div
                            className="story"
                            key={key}
                            onClick={() => {
                                props.history.push(`story/${item.id}`, item);
                            }}
                        >
                            <span>{lang.storyName}: </span>
                            <span>{item.name}</span>
                        </div>
                    );
                })}
        </div>
    );
});
