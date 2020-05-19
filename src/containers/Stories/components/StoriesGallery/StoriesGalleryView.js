import React, { useState, useRef } from 'react';

export const StoriesGalleryView = () => {
    const [SelectedImage, setSelectedImage] = useState([false]);
    const gallery = useRef(null);
    console.log('>>>', gallery);

    return (
        <div className={'stories-carousel-container'}>
            <div className={'stories-gallery'}
                 ref={gallery}>
                <section>
                    <div className={'image'}>
                        <h1>
                            "אישה חזקה. מצליחה. מרוויחה טוב. יפהפייה. כל יום חוזרת הביתה והופכת לאפס. "
                        </h1>
                        <h2>
                            עדותה של דריה אילון, 13.02.20
                        </h2>
                    </div>
                    <ul className={'tagsFilter'}>
                        <button className={'tag'}>tag tag</button>
                        <button className={'tag'}>tag tag</button>
                        <button className={'tag'}>tag tag</button>
                    </ul>
                </section>
                <section id={'selected'}>
                    <div className={'image'}>
                        <h1>
                            "אישה חזקה. מצליחה. מרוויחה טוב. יפהפייה. כל יום חוזרת הביתה והופכת לאפס. "
                        </h1>
                        <h2>
                            עדותה של דריה אילון, 13.02.20
                        </h2>
                    </div>
                    <ul className={'tagsFilter'}>
                        <button className={'tag'}>tag tag</button>
                        <button className={'tag'}>tag tag</button>
                        <button className={'tag'}>tag tag</button>
                    </ul>
                </section>
                <section>
                    <div className={'image'}>
                        <h1>
                            "אישה חזקה. מצליחה. מרוויחה טוב. יפהפייה. כל יום חוזרת הביתה והופכת לאפס. "
                        </h1>
                        <h2>
                            עדותה של דריה אילון, 13.02.20
                        </h2>
                    </div>
                    <ul className={'tagsFilter'}>
                        <button className={'tag'}>tag tag</button>
                        <button className={'tag'}>tag tag</button>
                        <button className={'tag'}>tag tag</button>
                    </ul>
                </section>
                <section>
                    <div className={'image'}>
                        <h1>
                            "אישה חזקה. מצליחה. מרוויחה טוב. יפהפייה. כל יום חוזרת הביתה והופכת לאפס. "
                        </h1>
                        <h2>
                            עדותה של דריה אילון, 13.02.20
                        </h2>
                    </div>
                    <ul className={'tagsFilter'}>
                        <button className={'tag'}>tag tag</button>
                        <button className={'tag'}>tag tag</button>
                        <button className={'tag'}>tag tag</button>
                    </ul>
                </section>
            </div>
        </div>
    );
};
