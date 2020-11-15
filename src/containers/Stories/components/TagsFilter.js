import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTags } from 'containers/Stories/storiesHooks';
import TagFilter from 'components/TagFilter';
import { StoriesList } from 'containers/Stories/components/StoriesList';
import { Loader } from 'components/Loader';

export const TagsFilter = ({
    changeLocationByPath,
    defaultSelectedTags,
    rootPath,
    storiesListClassName,
    handleStoryClick,
    displayEditImg,
    useStoriesHook
}) => {
    const { t } = useTranslation();
    const {
        tagsData,
        changeTagSelected,
        isDisplayMoreTags,
        changeDisplayMoreTags,
        unselectAllTags
    } = useTags();
    const filterTagsIds = useMemo(() =>
        tagsData
            ? Object.keys(tagsData).filter(tagId => tagsData[tagId].selected, [
                  tagsData
              ])
            : null
    );

    return (
        <div className={'stories-gallery-container'}>
            <h1>{t('tagsFilter.additionalTestimonies')}</h1>
            <Loader data={[tagsData, filterTagsIds]}>
                <div
                    className={
                        'tags-filter-container ' +
                        (isDisplayMoreTags
                            ? ''
                            : 'tags-filter-container-collapsed')
                    }
                >
                    {
                        <TagFilter
                            tag={t('tagsFilter.allTestimonies')}
                            selected={
                                filterTagsIds && filterTagsIds.length === 0
                            }
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
                <StoriesList
                    tags={filterTagsIds}
                    changeLocationByPath={changeLocationByPath}
                    rootPath={rootPath}
                    storiesListClassName={storiesListClassName}
                    handleStoryClick={handleStoryClick}
                    displayEditImg={displayEditImg}
                    useStoriesHook={useStoriesHook}
                />
            </Loader>
        </div>
    );
};
