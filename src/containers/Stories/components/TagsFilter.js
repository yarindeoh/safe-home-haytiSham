import React, { useState, useMemo } from 'react';

import { useTags } from 'containers/Stories/storiesHooks';
import TagFilter from 'components/TagFilter';
import { StoriesList } from 'containers/Stories/components/StoriesList';
import { useTranslation } from 'react-i18next';

export const TagsFilter = ({ changeLocationByPath, defaultSelectedTags }) => {
    const { t } = useTranslation();
    const {
        tagsData,
        changeTagSelected,
        isDisplayMoreTags,
        changeDisplayMoreTags
    } = useTags(defaultSelectedTags);
    const [isEnableTags, setIsEnableTags] = useState(true);
    const filterTagsIds = useMemo(() => {
        const allIds = Object.keys(tagsData);
        return isEnableTags
            ? allIds.filter(tagId => tagsData[tagId].selected)
            : allIds;
    }, [tagsData, isEnableTags]);

    return (
        <div className={'stories-gallery-container'}>
            <h1>{t('tagsFilter.additionalTestimonies')}</h1>
            <div className="tags-filter-container">
                {
                    <TagFilter
                        tag={t('tagsFilter.allTestimonies')}
                        selected={!isEnableTags}
                        onClick={() =>
                            setIsEnableTags(prevEnableTags => !prevEnableTags)
                        }
                    />
                }
                {tagsData &&
                    Object.keys(tagsData).map(tagId => (
                        <TagFilter
                            value={tagsData[tagId].value}
                            tag={tagsData[tagId].value}
                            key={tagId}
                            selected={tagsData[tagId].selected && isEnableTags}
                            onClick={event =>
                                isEnableTags && changeTagSelected(tagId)
                            }
                        />
                    ))}
            </div>
            <span className="more-tags" onClick={changeDisplayMoreTags}>
                {isDisplayMoreTags
                    ? t('tagsFilter.lessCategories')
                    : t('tagsFilter.moreCategories')}
            </span>
            <StoriesList
                tags={filterTagsIds}
                changeLocationByPath={changeLocationByPath}
            />
        </div>
    );
};
