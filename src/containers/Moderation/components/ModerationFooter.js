import React from 'react';
import { useTranslation } from 'react-i18next';

export const ModerationFooter = () => {
    const { t } = useTranslation();

    return (
        <div className="moderation-footer">
            <input
                className="moderation-submit-button"
                form="EditOriginalStoryView"
                type="submit"
                value={t('moderation.submitText')}
            />
        </div>
    );
};
