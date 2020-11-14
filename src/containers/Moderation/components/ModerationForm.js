import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { Input } from 'components/Input';
import { TextArea } from 'components/TextArea';
import { useTranslation } from 'react-i18next';
import WarningIcon from 'src/media/icons/warning.svg';

export const ModerationForm = withRoute(
    ({
        handleSubmit,
        handleFieldChange,
        formData,
        disabled,
        id,
        primaryFormData
    }) => {
        const { t } = useTranslation();
        return (
            <div className={'testimony-form'}>
                <form
                    onSubmit={!disabled ? handleSubmit : undefined}
                    id={id}
                    className={'addStoryForm'}
                >
                    <div className="name-and-contact-container">
                        {primaryFormData?.name && (
                            <TextArea
                                name="name"
                                labelClass={
                                    disabled ? 'original-align-text' : ''
                                }
                                containerClass="name-container"
                                textWrapperClass="name-wrapper-text edit-border-radius"
                                textClass="name-text"
                                label={t('moderation.nameLabel')}
                                value={formData?.name}
                                onChange={e => handleFieldChange(e, 'name')}
                                disabled={disabled}
                                maxLength={28}
                                required
                            />
                        )}
                        {!disabled && primaryFormData?.mail && (
                            <TextArea
                                containerClass="disabled-area contact-container"
                                textWrapperClass={`disabled-area ${
                                    primaryFormData?.contact
                                        ? 'contact-wrapper-text edit-border-radius'
                                        : 'disabled-text-area'
                                }`}
                                textClass={`disabled-area ${
                                    primaryFormData?.contact
                                        ? 'contact-text'
                                        : 'disabled-text-area'
                                }`}
                                name="contactAt"
                                label={
                                    primaryFormData?.contact
                                        ? t('moderation.contactAtLabel', {
                                              mail: primaryFormData?.mail
                                          })
                                        : primaryFormData?.mail
                                }
                                icon={
                                    primaryFormData?.contact ? (
                                        <WarningIcon />
                                    ) : (
                                        undefined
                                    )
                                }
                                defaultValue={primaryFormData?.contact ? primaryFormData?.contactTime : '' }
                                disabled={disabled}
                            />
                        )}
                    </div>
                    {primaryFormData?.background && (
                        <TextArea
                            name="background"
                            textWrapperClass="edit-border-radius"
                            labelClass={disabled ? 'original-align-text' : ''}
                            label={t('addStoryView.backgroundLabel')}
                            value={formData?.background}
                            onChange={e => handleFieldChange(e, 'background')}
                            disabled={disabled}
                            required
                        />
                    )}
                    {primaryFormData?.storyContent && (
                        <TextArea
                            name="storyContent"
                            textWrapperClass="edit-border-radius"
                            labelClass={disabled ? 'original-align-text' : ''}
                            label={t('addStoryView.storyContentLabel')}
                            value={formData?.storyContent}
                            onChange={e => handleFieldChange(e, 'storyContent')}
                            disabled={disabled}
                            required
                        />
                    )}
                    {primaryFormData?.howDidYouManged && (
                        <TextArea
                            name="howDidYouManged"
                            textWrapperClass="edit-border-radius"
                            labelClass={disabled ? 'original-align-text' : ''}
                            label={t('addStoryView.howDidYouMangedLabel')}
                            value={formData?.howDidYouManged}
                            onChange={e =>
                                handleFieldChange(e, 'howDidYouManged')
                            }
                            disabled={disabled}
                        />
                    )}
                    {primaryFormData?.whatHelpedYou && (
                        <TextArea
                            name="whatHelpedYou"
                            textWrapperClass="edit-border-radius"
                            labelClass={disabled ? 'original-align-text' : ''}
                            label={t('addStoryView.whatHelpedYouLabel')}
                            value={formData?.whatHelpedYou}
                            onChange={e =>
                                handleFieldChange(e, 'whatHelpedYou')
                            }
                            disabled={disabled}
                        />
                    )}
                    {primaryFormData?.whatTriggeredChange && (
                        <TextArea
                            name="whatTriggeredChange"
                            textWrapperClass="edit-border-radius"
                            labelClass={disabled ? 'original-align-text' : ''}
                            label={t('addStoryView.whatTriggeredChangeLabel')}
                            value={formData?.whatTriggeredChange}
                            onChange={e =>
                                handleFieldChange(e, 'whatTriggeredChange')
                            }
                            disabled={disabled}
                        />
                    )}
                    {primaryFormData?.additionalnfo && (
                        <TextArea
                            name="additionalnfo"
                            textWrapperClass="edit-border-radius"
                            labelClass={disabled ? 'original-align-text' : ''}
                            label={t('addStoryView.additionalnfoLabel')}
                            value={formData?.additionalnfo}
                            onChange={e =>
                                handleFieldChange(e, 'additionalnfo')
                            }
                            disabled={disabled}
                        />
                    )}
                </form>
            </div>
        );
    }
);
