import React from 'react';
import { useTranslation } from 'react-i18next';

export function CarrouselItem({ story, isSelected, onClick }) {
    const { t } = useTranslation();
    const { id, tags, quote, img, timestamp, storyteller } = story;

    const handleClick = () => {
        if (isSelected) {
            onClick(id);
        }
    };

    const renderTags = () => (
        <ul className="TagsList">
            {tags && tags.map(tagText => <span>{tagText}</span>)}
        </ul>
    );

    const wrapperClassName = 'CarruselItemWrapper';

    return (
        <div className={wrapperClassName} onClick={handleClick}>
            <img src={`src/media/videosImages/${img}`} />
            <div className="CarruselItemTextWrapper">
                <h1 className="CarruselItemQuote">"{quote}"</h1>
                <h2 className="CarruselItemBy">
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
