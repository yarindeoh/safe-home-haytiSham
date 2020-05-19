import React from 'react';

import { SimilarStories } from 'containers/Story/components/SimilarStories';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import img from 'src/media/videosImages/img2.png';
import { Tags } from 'containers/Story/components/Tags';

export const StoryViedo = () => {
    return (
        <div id={'story-page-container'}>
            <button className={'BTN-accessibility'} />
            <Header />
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
};
