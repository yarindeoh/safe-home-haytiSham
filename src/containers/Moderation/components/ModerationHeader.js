import React from 'react';
import { useTranslation } from 'react-i18next';
import VIcon from 'src/media/icons/v.svg';
import EyeIcon from 'src/media/icons/eye.svg';
import EyeSlashIcon from 'src/media/icons/eye-slash.svg';

export const ModerationHeader = ({
    handlePublish,
    testimonyIsModerated,
    testimonyIsPublish
}) => {
    const { t } = useTranslation();

    let submitButtonClass = 'moderation-submit-button-only';
    let cancelButtonClass = '';
    let submitText = t('moderation.submitText');
    let cancelText;
    let cancelIcon;

    if (testimonyIsModerated) {
        if (testimonyIsPublish) {
            //update & unPublish
            submitButtonClass = '';
            submitText = t('moderation.updateText');
            cancelText = t('moderation.unPublishText');
            cancelIcon = <EyeSlashIcon className="button-eye-slash-icon" />; //change to eye-slash
        } else {
            //save to the DB & Publish
            submitButtonClass = 'moderation-submit-button-save';
            cancelButtonClass = 'moderation-cancel-button-save';
            submitText = t('moderation.saveText');
            cancelText = t('moderation.publishText');
            cancelIcon = <EyeIcon className="button-eye-icon" />; //change to eye
        }
    }

    return (
        <div className="moderation-header">
            <div className={`button-icon-container`}>
                <VIcon className="button-icon" />
                <input
                    className={`moderation-submit-button ${submitButtonClass}`}
                    form="EditOriginalStoryView"
                    type="submit"
                    value={submitText}
                />
            </div>
            {testimonyIsModerated && (
                <div className={`button-icon-container`}>
                    {cancelIcon}
                    <button
                        className={`moderation-cancel-button ${cancelButtonClass}`}
                        onClick={() => handlePublish(!testimonyIsPublish)}
                    >
                        {cancelText}
                    </button>
                </div>
            )}
        </div>
    );
};
