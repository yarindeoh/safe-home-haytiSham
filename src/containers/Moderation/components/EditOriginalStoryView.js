import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { Input } from 'components/Input';
import { TextArea } from 'components/TextArea';
import { useTranslation } from 'react-i18next';

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
                        <Input
                            name="name"
                            label={t('addStoryView.nameLabel')}
                            placeholder={t('addStoryView.namePlaceholder')}
                            value={formData?.name}
                            onChange={e => handleFieldChange(e, 'name')}
                            disabled={disabled}
                            required
                        />
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
                    </form>
                </div>
            </div>
        );
    }
);
