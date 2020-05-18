import React from 'react';

import { withRoute } from 'services/routing/routerHOC';
import lang from 'services/lang.json';
import { Tags } from './components/Tags';
import { extractFieldsFromObj } from 'services/general/generalHelpers';
import { SimilarStories } from 'containers/Story/components/SimilarStories';
import { Footer } from 'containers/Story/components/Footer';

export const StoryView = withRoute((props) => {
    const story = props.location.state;
    const changeLocationByPath = (path, params) => {
        props.history.push(path, params);
    };
    const proccessedStory = extractFieldsFromObj(story, [
        'background',
        'whatTriggeredChange',
        'howDidYouManged',
        'additionalnfo',
        'whatHelpedYou',
        'storyContent',
    ]);
    return (
        <div>
            <h1>Hello From Story!</h1>
            <button onClick={() => changeLocationByPath('/')}>Go back</button>
            {proccessedStory &&
                Object.keys(proccessedStory).map((item, key) => (
                    <div key={key}>
                        <div style={{ fontWeight: '600' }}>{lang[item]}</div>
                        <span>{proccessedStory[item]}</span>
                        <br />
                    </div>
                ))}
            <Tags tags={story.tags} />
            <SimilarStories
                tags={story.tags}
                changeLocationByPath={changeLocationByPath}
            />
            <Footer />
        </div>
    );
});
