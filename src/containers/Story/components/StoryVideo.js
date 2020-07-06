import React from 'react';

import { withRoute } from 'services/routing/routerHOC';
import { SimilarStories } from 'containers/Story/components/SimilarStories';
import { Footer } from 'components/Footer';
import { Tags } from 'containers/Story/components/Tags';

export const StoryViedo = withRoute((props) => {
    const story = props.location.state;
    const changeLocationByPath = (path) => {
        props.history.push(path);
    };

    return (
        <div id="story-page-container">
            <button className="BTN-accessibility" />
            <header>
                <ul className="header-menu-container">
                    <button
                        className="BTX-back-white"
                        onClick={() => changeLocationByPath('/')}
                    />
                    <button className="BTN-search" />
                </ul>
                <div className="logo" />
                <button className="BTN-lang-changer" />
            </header>
            <div className="quote">
                <h1>{story.quote}</h1>
                <h2>
                    {` צפו בעדות של ${story.storyteller} מתוך קמפיין של פרויקט אוף לייף והעמותה ל.א לאלימות`}
                    {` שפורסם ב${story.timestamp}`}
                </h2>
                <Tags tags={story.tags} />
                <div>
                    <iframe
                        src={`https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FonlifeIL%2Fvideos%${story.id}%2F&show_text=0`}
                    />
                </div>
            </div>
            {/* //TODO */}
            <SimilarStories tags={['השפלה', 'קנאה']} />
            <Footer />
        </div>
    );
});
