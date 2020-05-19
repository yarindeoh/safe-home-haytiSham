import React from 'react';

import { SimilarStories } from 'containers/Story/components/SimilarStories';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import img from 'src/media/videosImages/img1.png';
import { Tags } from 'containers/Story/components/Tags';

export const StoryViedo = () => {
    return (
        <div id={'story-page-container'}>
            <Header />
            <div className={'quote'}>
                <h1>"אשה חזקה"</h1>
                <h2>
                    צפו בעדות של דנה מתוך הפרק של ׳עובדה׳ עם אילנה דיין ששודר
                    בתאריך 13.02.20
                </h2>
                <Tags tags={['השפלה', 'קנאה']} />
                <img className={'videoStory'} src={img} />
            </div>
            <SimilarStories tags={['השפלה', 'קנאה']} />
            <Footer />
        </div>
    );
};
