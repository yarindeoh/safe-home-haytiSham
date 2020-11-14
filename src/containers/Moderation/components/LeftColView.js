import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { useTranslation, Trans } from 'react-i18next';
import {
    useModerationContext,
    useSelectedTags
} from 'containers/Moderation/moderationHooks';
import { useTags } from 'containers/Stories/storiesHooks';
import { getTagsAsArray } from 'services/general/generalHelpers';
import Select from 'react-select';
import { TextArea } from 'components/TextArea';
import { red } from '@material-ui/core/colors';

export const LeftColView = withRoute(({ handleFieldChange, formData }) => {
    const { moderationState } = useModerationContext();
    const { t } = useTranslation();
    const { tagsMap } = useTags();
    const tags = getTagsAsArray(tagsMap);
    const { handleSelectedTags } = useSelectedTags();

    const customSelectStyles = {
        option: (styles, { isFocused }) => {
            return {
                ...styles,
                backgroundColor: isFocused ? '#EBE7FF' : null,
                ':active': {
                    ...styles[':active'],
                    backgroundColor: '#EBE7FF'
                }
            };
        },
        control: (styles, { isFocused, isSelected }) => {
            return {
                ...styles,
                boxShadow: 'none',
                borderColor: isFocused ? '#724BE4' : styles.borderColor,
                borderWidth: isFocused ? '2px' : styles.borderWidth,
                '&:hover': {
                    ...styles['&:hover'],
                    borderColor: isFocused
                        ? '#724BE4'
                        : styles['&:hover'].borderColor
                }
            };
        }
    };

    return (
        <>
            <div className="moderation-rules-container">
                <h1>{t('moderation.moderationRulesHeader')}</h1>
                <div className="moderation-rules-text">
                    <Trans i18nKey="moderation.moderationRules" />
                </div>
            </div>
            <div className="select-tags-container">
                <h1>{t('moderation.choseTags')}</h1>
                <span>{t('moderation.choseTagsWarn')}</span>
                <div className="select-area">
                    <Select
                        options={tags} // Options to display in the dropdown
                        defaultValue={moderationState?.tags}
                        value={moderationState?.tags}
                        onChange={value => handleSelectedTags(value || [])}
                        isMulti
                        name="tags"
                        closeMenuOnSelect={false}
                        styles={customSelectStyles}
                    />

                    <input
                        form={'EditOriginalStoryView'}
                        tabIndex={-1}
                        autoComplete="off"
                        style={{ opacity: 0, height: '1px' }}
                        value={moderationState?.tags}
                        onChange={() => {}}
                        required
                    />
                </div>
            </div>
            <div className={'quote-area testimony-form'}>
                <div className={'addStoryForm'}>
                    <TextArea
                        formId={'EditOriginalStoryView'}
                        name="quote"
                        labelClass="quote-label"
                        label={t('addStoryView.quoteLabel')}
                        placeholder={t('addStoryView.quotePlaceHolder')}
                        value={formData?.quote}
                        onChange={e => handleFieldChange(e, 'quote')}
                        required
                    />
                </div>
            </div>
        </>
    );
});
