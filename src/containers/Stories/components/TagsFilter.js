import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTags } from 'containers/Stories/storiesHooks';
import TagFilter from 'components/TagFilter';
import { StoriesList } from 'containers/Stories/components/StoriesList';

export const TagsFilter = ({
    changeLocationByPath,
    defaultSelectedTags,
    rootPath
}) => {
    const { t } = useTranslation();
    const {
        tagsData,
        changeTagSelected,
        isDisplayMoreTags,
        changeDisplayMoreTags,
        unselectAllTags
    } = useTags(defaultSelectedTags);
    const filterTagsIds = useMemo(() =>
        Object.keys(tagsData).filter(tagId => tagsData[tagId].selected, [
            tagsData
        ])
    );

    return (
        <div className={'stories-gallery-container'}>
            <h1>{t('tagsFilter.additionalTestimonies')}</h1>
            <div className="tags-filter-container">
                {
                    <TagFilter
                        tag={t('tagsFilter.allTestimonies')}
                        selected={filterTagsIds.length === 0}
                        onClick={() =>
                            filterTagsIds.length > 0 && unselectAllTags()
                        }
                    />
                }
                {tagsData &&
                    Object.keys(tagsData).map(tagId => (
                        <TagFilter
                            value={tagsData[tagId].value}
                            tag={tagsData[tagId].value}
                            key={tagId}
                            selected={tagsData[tagId].selected}
                            onClick={event => changeTagSelected(tagId)}
                        />
                    ))}
            </div>
            <span className="more-tags" onClick={changeDisplayMoreTags}>
                {isDisplayMoreTags
                    ? t('tagsFilter.lessCategories')
                    : t('tagsFilter.moreCategories')}
            </span>
            {filterTagsIds ? (
                <StoriesList
                    tags={filterTagsIds}
                    changeLocationByPath={changeLocationByPath}
                    rootPath={rootPath}
                />
            ) : null}
        </div>
    );
};
