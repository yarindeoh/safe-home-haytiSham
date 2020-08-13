import React, { useState } from 'react';
import Slider from 'react-slick';
import { PUBLIC_STORIES } from 'containers/Stories/components/StoriesGallery/storiesGalleryConstants';
import { useTranslation } from 'react-i18next';
import { CarouselItem } from './CarouselItem';

export const StoriesGalleryView = ({ changeLocationByPath }) => {

    const initialSelectedItem = Math.floor(PUBLIC_STORIES.length / 2);
    const [selectedItem, setSelectedItem] = useState(initialSelectedItem);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        centerMode: true,
        initialSlide: initialSelectedItem,
        focusOnSelect: true,
        afterChange: key => onChangeItem(key),
        customPaging: () => <div className="NavItem" />
    };

    const onChangeItem = key => {
        setSelectedItem(key);
    };

    const onClickItem = id => {
        changeLocationByPath(`/publicStory/${id}`);
    };

    return (
        <div className={'stories-carousel-container'}>
            <Slider {...sliderSettings}>
                {PUBLIC_STORIES.map((story, key) => (
                    <CarouselItem
                        key={key}
                        story={story}
                        onClick={onClickItem}
                        isSelected={key === selectedItem}
                    />
                ))}
            </Slider>
        </div>
    );
};

export default StoriesGalleryView;
