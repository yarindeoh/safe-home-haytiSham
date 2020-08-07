import React, { useState, useRef } from 'react';
import Tag from 'src/components/Tag';
import { PUBLIC_STORIES } from 'containers/Stories/components/StoriesGallery/storiesGalleryConstants';
import { useTranslation } from 'react-i18next';

export const StoriesGalleryView = ({ changeLocationByPath }) => {
    const { t } = useTranslation();
    const [SelectedImage, setSelectedImage] = useState([false]);
    const gallery = useRef(null);
    return (
        <div className={'stories-carousel-container'}>
            <div className={'stories-gallery'} ref={gallery}>
                {PUBLIC_STORIES.map((story, key) => {
                    return (
                        <section
                            id={key === 1 ? 'selected' : 'galleryImg'}
                            key={`section${key}`}
                            onClick={() =>
                                changeLocationByPath(
                                    `publicStory/${story.id}`,
                                    story
                                )
                            }
                        >
                            <div className={'image'} key={`img${key}`}>
                                <h1>{story.quote}</h1>
                                <h2>
                                    {t('storiesGalleryView.confessionOf', {
                                        name: story.name,
                                        date: story.date
                                    })}
                                </h2>
                                <ul>
                                    {story &&
                                        story.tags.map((tag, i) => (
                                            <Tag key={`tag_${i}`} text={tag} />
                                        ))}
                                </ul>
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
};
