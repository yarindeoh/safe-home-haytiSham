import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { Input } from 'components/Input';
import { TextArea } from 'components/TextArea';
import { useTranslation } from 'react-i18next';
import WarningIcon from 'src/media/icons/warning.svg';

export const EditOriginalStoryView = withRoute(
    ({ handleSubmit, handleFieldChange, formData, disabled }) => {
        const { t } = useTranslation();

        return (
            <div className="edit-container">
                <div className="edit-header">{t('moderation.editHeader')}</div>
                <div className={'testimony-form'}>
                    <form
                        onSubmit={!disabled ? handleSubmit : undefined}
                        id={'EditOriginalStoryView'}
                        className={'addStoryForm'}
                    >
                        <div className="name-and-contact-container">
                            <TextArea
                                name="name"
                                containerClass="name-container"
                                textWrapperClass="name-wrapper-text edit-border-radius"
                                textClass="name-text"
                                label={t('moderation.nameLabel')}
                                placeholder=""
                                value={formData?.name}
                                onChange={e => handleFieldChange(e, 'name')}
                                disabled={disabled}
                                required
                            />
                            {formData?.contact && formData?.mail && (
                                <TextArea
                                    containerClass="contact-container"
                                    textWrapperClass="contact-wrapper-text edit-border-radius"
                                    textClass="contact-text"
                                    name="contactAt"
                                    label={t('moderation.contactAtLabel', {
                                        mail: formData?.mail
                                    })}
                                    placeholder=""
                                    icon={<WarningIcon />}
                                    // value={formData?.contactAt} //change to validated field
                                    defaultValue={'ביום ראשון בשעה 17:00'} //change to validated field
                                    // onChange={e => handleFieldChange(e, 'contactAt')}
                                    disabled={disabled}
                                    required
                                />
                            )}
                        </div>
                        <TextArea
                            name="background"
                            textWrapperClass="edit-border-radius"
                            placeholder=""
                            label={t('addStoryView.backgroundLabel')}
                            value={formData?.background}
                            onChange={e => handleFieldChange(e, 'background')}
                            disabled={disabled}
                            required
                        />

                        <TextArea
                            name="storyContent"
                            textWrapperClass="edit-border-radius"
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
                            textWrapperClass="edit-border-radius"
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
                            textWrapperClass="edit-border-radius"
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
                            textWrapperClass="edit-border-radius"
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
                            textWrapperClass="edit-border-radius"
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
                    </form>
                </div>
            </div>
        );
    }
);
