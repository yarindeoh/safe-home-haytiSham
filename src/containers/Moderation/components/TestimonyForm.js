import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { Input } from 'components/Input';
import { Radio } from 'components/Radio';
import { TextArea } from 'components/TextArea';
import { useTranslation } from 'react-i18next';
import { useCheckedContact } from 'containers/AddStory/addStoryHooks';

export const TestimonyForm = withRoute(
    ({
        handleSubmit,
        handleFieldChange,
        formData,
        disabled,
        moderatedForm
    }) => {
        const { t } = useTranslation();
        const { checkedContact, handleCheckedContact } = useCheckedContact();

        return (
            <>
                <div className={'testimony-form'} style={{ padding: '0 50px' }}>
                    <form
                        onSubmit={!disabled ? handleSubmit : undefined}
                        id={'addStoryForm'}
                    >
                        {formData?.createdAt && (
                            <div>
                                <div>{`${t('addStoryView.createdAtLabel')}  ${
                                    formData.createdAt
                                }`}</div>
                            </div>
                        )}
                        <Input
                            name="name"
                            label={t('addStoryView.nameLabel')}
                            placeholder={t('addStoryView.namePlaceholder')}
                            value={formData?.name}
                            onChange={e => handleFieldChange(e, 'name')}
                            disabled={disabled}
                            required
                        />
                        <Input
                            name="mail"
                            label={t('addStoryView.mailLabel')}
                            placeholder={t('addStoryView.mailPlaceholder')}
                            value={formData?.mail}
                            onChange={e => handleFieldChange(e, 'mail')}
                            disabled={disabled}
                        />
                        {!moderatedForm && (
                            <Radio
                                name="contact"
                                label={t('addStoryView.contactLabel')}
                                notes={t('addStoryView.contactNotes')}
                                checked={checkedContact}
                                options={[
                                    { value: 'yes', label: t('common.yes') },
                                    { value: 'no', label: t('common.no') }
                                ]}
                                onClick={e => handleCheckedContact(e)}
                                disabled={disabled}
                            />
                        )}

                        <TextArea
                            name="background"
                            placeholder=""
                            label={t('addStoryView.backgroundLabel')}
                            value={formData?.background}
                            onChange={e => handleFieldChange(e, 'background')}
                            disabled={disabled}
                            required
                        />

                        <TextArea
                            name="storyContent"
                            label={t('addStoryView.storyContentLabel')}
                            placeholder={t(
                                'addStoryView.storyContentPlaceholder'
                            )}
                            value={formData?.storyContent}
                            onChange={e => handleFieldChange(e, 'storyContent')}
                            disabled={disabled}
                            required
                        />
                        <TextArea
                            name="howDidYouManged"
                            label={t('addStoryView.howDidYouMangedLabel')}
                            placeholder={t(
                                'addStoryView.howDidYouMangedPlaceholder'
                            )}
                            value={formData?.howDidYouManged}
                            onChange={e =>
                                handleFieldChange(e, 'howDidYouManged')
                            }
                            disabled={disabled}
                        />

                        <TextArea
                            name="whatHelpedYou"
                            label={t('addStoryView.whatHelpedYouLabel')}
                            placeholder={t(
                                'addStoryView.whatHelpedYouPlaceHolder'
                            )}
                            value={formData?.whatHelpedYou}
                            onChange={e =>
                                handleFieldChange(e, 'whatHelpedYou')
                            }
                            disabled={disabled}
                        />

                        <TextArea
                            name="whatTriggeredChange"
                            label={t('addStoryView.whatTriggeredChangeLabel')}
                            placeholder={t(
                                'addStoryView.whatTriggeredChangePlaceHolder'
                            )}
                            value={formData?.whatTriggeredChange}
                            onChange={e =>
                                handleFieldChange(e, 'whatTriggeredChange')
                            }
                            disabled={disabled}
                        />

                        <TextArea
                            name="additionalnfo"
                            label={t('addStoryView.additionalnfoLabel')}
                            placeholder={t(
                                'addStoryView.additionalnfoPlaceHolder'
                            )}
                            value={formData?.additionalnfo}
                            onChange={e =>
                                handleFieldChange(e, 'additionalnfo')
                            }
                            disabled={disabled}
                        />

                        {moderatedForm && (
                            <TextArea
                                name="quote"
                                label={t('addStoryView.quoteLabel')}
                                placeholder={t('addStoryView.quotePlaceHolder')}
                                value={formData?.quote}
                                onChange={e => handleFieldChange(e, 'quote')}
                                disabled={disabled}
                            />
                        )}

                        {!disabled && (
                            <input
                                className="submit-button"
                                type="submit"
                                value={
                                    moderatedForm
                                        ? t('moderation.submitText')
                                        : t('submitForm')
                                }
                            ></input>
                        )}
                    </form>
                </div>
            </>
        );
    }
);
