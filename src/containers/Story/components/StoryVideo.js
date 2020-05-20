import React from 'react';

import { withRoute } from 'services/routing/routerHOC';
import { SimilarStories } from 'containers/Story/components/SimilarStories';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import img from 'src/media/videosImages/img2.png';
import { Tags } from 'containers/Story/components/Tags';

export const StoryViedo = withRoute((props) => {
    const story = props.location.state;
    const changeLocationByPath = (path, params) => {
        props.history.push(path, params);
    }

    return (
        <div id={'story-page-container'}>
            <button className={'BTN-accessibility'} />
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
            <div className={'quote'}>
                <h1>
                    "מבחורה אנרגטית שהיתה בלב הקליקה החברתית, הוא הפך אותי
                    לעכבר"
                </h1>
                <h2>
                    צפו בעדות של דנה מתוך הפרק של ׳עובדה׳ עם אילנה דיין ששודר
                    בתאריך 13.02.20
                </h2>
                <Tags tags={['השפלה', 'קנאה']} />
                <div>
                    <img className={'videoStory'} src={img} />
                </div>
            </div>
            <SimilarStories tags={['השפלה', 'קנאה']} />
            <Footer />
        </div>
    );
});
