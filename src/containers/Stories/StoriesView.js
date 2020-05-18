import React from 'react';

import { useData } from 'containers/Stories/storiesHooks';
import lang from 'services/lang.json';
import { withRoute } from 'services/routing/routerHOC';
import { StoriesGalleryView } from 'containers/Stories/components/StoriesGallery/StoriesGalleryView';
import { TagsFilter } from 'containers/Stories/components/TagsFilter';
import { Header } from '../../components/Header';

export const StoriesView = withRoute((props) => {
    const { data } = useData();
    const changeLocationByPath = (path, params) => {
        props.history.push(path, params);
    };
    return (
        <div className="app">
            <Header />
            <h4>בית לעדויות ממערכות יחסים אלימות</h4>
            <StoriesGalleryView />
            <button onClick={() => props.history.push('addStory')}>
                {lang.addStory}
            </button>
            <hr />
            <TagsFilter changeLocationByPath={changeLocationByPath} />
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
