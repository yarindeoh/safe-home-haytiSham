import React from 'react';

import { useData } from 'containers/Stories/storiesHooks';
import lang from 'services/lang.json';
import { withRoute } from 'services/routing/routerHOC';

export const StoriesView = withRoute((props) => {
    const { data } = useData();
    return (
        <div className="app">
            <div className="title">It Could Have Been Me</div>
            <button onClick={() => props.history.push('addStory')}>
                {lang.addStory}
            </button>
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
