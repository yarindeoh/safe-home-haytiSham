import React from 'react';

import { withRoute } from 'services/routing/routerHOC';
import { Tags } from './components/Tags';
import { extractFieldsFromObj } from 'services/general/generalHelpers';
import { SimilarStories } from 'containers/Story/components/SimilarStories';
import { Footer } from 'components/Footer';
import { useTranslation } from 'react-i18next';

export const StoryView = withRoute(props => {
    const { t } = useTranslation();
    const story = props.location.state;
    const changeLocationByPath = (path, params) => {
        props.history.push(path, params);
    };
    const processedStory = extractFieldsFromObj(story, [
        'background',
        'whatTriggeredChange',
        'howDidYouManged',
        'additionalnfo',
        'whatHelpedYou',
        'storyContent'
    ]);
    return (
        <div id={'story-page-container'}>
            <header>
                <ul className={'header-menu-container'}>
                    <button
                        className={'BTX-back-white'}
                        onClick={() => changeLocationByPath('/')}
                    />
                    <button className={'BTN-search'} />
                </ul>
                <div className={'logo'} />
                <button className={'BTN-lang-changer'} />
            </header>
            <button className={'BTN-accessibility'} />
            <div className={'quote'}>
                <h1>"{story.quote}"</h1>
                <h2>
                    {`
                     ${t('storyView.storyOf')}
                     ${story.name.split('')[0]}׳ 
                     ${story.createdAt}
                   `}
                </h2>
                <Tags tags={story.tags} />
            </div>
            {processedStory &&
                Object.keys(processedStory).map((item, key) => (
                    <div key={key}>
                        <h6>{t(item)}</h6>
                        <span>{processedStory[item]}</span>
                        <br />
                    </div>
                ))}
            <SimilarStories
                tags={story.tags}
                changeLocationByPath={changeLocationByPath}
            />
            <button className="footercustom">
                <span className="helpright">
                    <button className="BTX-help2" />
                    <p>אוזן קשבת</p>
                </span>
                <span className="shareleft">
                    <button className="BTX-share" />
                    <p>שיתוף </p>
                </span>
            </button>
            <Footer />
        </div>
    );
});
