import React, { useState, useRef } from 'react';
import { Tag } from 'components/Tag';
import { PUBLIC_STORIES } from 'containers/Stories/components/StoriesGallery/storiesGalleryConstants';

export const StoriesGalleryView = ({ changeLocationByPath }) => {
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
                                    עדותה של {story.name} {story.date}
                                </h2>
                            </div>
                            <ul className={'tagsFilter'}>
                                {story &&
                                    story.tags.map((tag) => (
                                        <Tag value={tag} />
                                    ))}
                            </ul>
                        </section>
                    );
                })}
            </div>
        </div>
    );
};
