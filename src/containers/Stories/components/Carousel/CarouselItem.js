import React from 'react';
import { useTranslation } from 'react-i18next';

export function CarouselItem({ story, isSelected, onClick }) {
    const { t } = useTranslation();
    const { id, tags, quote, img, timestamp, storyteller } = story;

    const handleClick = () => {
        if (isSelected) {
            onClick(id);
        }
    };

    const renderTags = () => (
        <ul className="TagsList">
            {tags &&
                tags.map((tagText, key) => <span key={key}>{tagText}</span>)}
        </ul>
    );

    return (
        <div className="CarouselItemWrapper" onClick={handleClick}>
            <img src={require(`src/media/videosImages/${img}`)} />
            <div className="CarouselItemTextWrapper">
                <h1 className="CarouselItemQuote">"{quote}"</h1>
                <h2 className="CarouselItemBy">
                    {t('storiesGalleryView.confessionOf', {
                        name: storyteller,
                        date: timestamp
                    })}
                </h2>
                {renderTags()}
            </div>
        </div>
    );
}
