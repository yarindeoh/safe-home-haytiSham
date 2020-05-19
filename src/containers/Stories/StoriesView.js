import React from 'react';

import { useData } from 'containers/Stories/storiesHooks';
import lang from 'services/lang.json';
import { withRoute } from 'services/routing/routerHOC';
import { StoriesGalleryView } from 'containers/Stories/components/StoriesGallery/StoriesGalleryView';
import { TagsFilter } from 'containers/Stories/components/TagsFilter';
import { Header } from 'components/Header';
import { StoryHighlight } from 'containers/Story/components/StoryHighlight';

export const StoriesView = withRoute((props) => {
    const { data } = useData();
    const changeLocationByPath = (path, params) => {
        props.history.push(path, params);
    };
    return (
        <div className="app">
            <Header />
            <h4 className={'const-text'}>בית לעדויות ממערכות יחסים אלימות</h4>
            <StoriesGalleryView />
            <button
                className={'BTN-send-testimony'}
                onClick={() => props.history.push('addStory')}
            >
                {lang.addStory}
            </button>
            <hr />
            <div className={'stories-gallery-container'}>
                <div id={'tags-container'}>
                    <TagsFilter changeStoryLocation={changeLocationByPath} />
                </div>
                <main id={'stories'}>
                    {data &&
                        data.map((item, key) => {
                            return (
                                <StoryHighlight
                                    story={item}
                                    key={key}
                                    changeLocationByPath={() => {
                                        props.history.push(
                                            `story/${item.id}`,
                                            item
                                        );
                                    }}
                                />
                            );
                        })}
                </main>
                <h6>לעוד הדויות</h6>
            </div>
        </div>
    );
});
