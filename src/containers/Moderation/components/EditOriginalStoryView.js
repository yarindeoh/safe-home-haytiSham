import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { useTranslation } from 'react-i18next';
import { ModerationForm } from 'containers/Moderation/components/ModerationForm';

export const EditOriginalStoryView = withRoute(
    ({ handleSubmit, handleFieldChange, primaryFormData, formData }) => {
        const { t } = useTranslation();

        return (
            <div className="edit-container">
                <div className="edit-header">{t('moderation.editHeader')}</div>
                {!formData.contact && formData.mail && (
                    <div className="mail-not-contact">{formData.mail}</div>
                )}
                <ModerationForm
                    handleSubmit={handleSubmit}
                    handleFieldChange={handleFieldChange}
                    formData={formData}
                    id={'EditOriginalStoryView'}
                    primaryFormData={primaryFormData}
                />
            </div>
        );
    }
);
