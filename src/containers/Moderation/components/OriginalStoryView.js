import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { useTranslation } from 'react-i18next';
import { ModerationForm } from 'containers/Moderation/components/ModerationForm';

export const OriginalStoryView = withRoute(({ data, back }) => {
    const { t } = useTranslation();
    return (
        <>
            <div className="original-story-col-container">
                <div
                    className="back-to-admin original-align-text"
                    onClick={back}
                >
                    {t('moderation.back')}
                </div>
                <div className="original-header-container original-align-text">
                    <div className="original-header">
                        {t('moderation.originalHeader')}
                    </div>
                    <div className="original-date">
                        {t('moderation.originalDate', {
                            date: data?.createdAt
                        })}
                    </div>
                </div>
                <ModerationForm
                    formData={data}
                    primaryFormData={data}
                    id={'OriginalStoryView'}
                    disabled
                />
            </div>
        </>
    );
});
