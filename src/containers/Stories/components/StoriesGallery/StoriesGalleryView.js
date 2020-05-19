import React, { useState, useRef } from 'react';
import { Tag } from 'components/Tag';
import { usePublicStories } from 'containers/Stories/storiesHooks';

export const StoriesGalleryView = ({ changeLocationByPath }) => {
    const [SelectedImage, setSelectedImage] = useState([false]);
    const gallery = useRef(null);
    const { publicStories } = usePublicStories();
    return (
        <div className={'stories-carousel-container'}>
            <div className={'stories-gallery'} ref={gallery}>
                {publicStories &&
                    publicStories.map((story, key) => {
                        return (
                            <section
                                key={`section${key}`}
                                onClick={() =>
                                    changeLocationByPath('publicStory')
                                }
                            >
                                <div className={'image'} key={`img${key}`}>
                                    <h1>{story.quote}</h1>
                                    <h2>
                                        `עדותה של {story.name} {story.date}`
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
