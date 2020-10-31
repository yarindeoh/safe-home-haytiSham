import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { useTranslation } from 'react-i18next';
import { extractFieldsFromObjOrdered } from 'services/general/generalHelpers';

export const OriginalStoryView = withRoute(({ data, back }) => {
    const { t } = useTranslation();

    const processedStory = extractFieldsFromObjOrdered(data, [
        'name',
        'mail',
        'contact',
        'background',
        'storyContent',
        'howDidYouManged',
        'whatHelpedYou',
        'whatTriggeredChange',
        'additionalnfo'
    ]);

    return (
        <>
            <div className="original-story-col-container">
                <div className="back-to-admin" onClick={back}>
                    {t('moderation.back')}
                </div>
                <div className="original-header-container">
                    <div className="original-header">
                        {t('moderation.originalHeader')}
                    </div>
                    <div className="original-date">
                        {t('moderation.originalDate', {
                            date: data?.createdAt
                        })}
                    </div>
                </div>
                {processedStory.map((item, i) => {
                    let text = item.text;
                    if (item.titleKey === 'contact') {
                        text = item.text
                            ? t('login.table.yes')
                            : t('login.table.no');
                    }
                    return (
                        <div key={i}>
                            <div className="original-label">
                                {t(`addStoryView.${item.titleKey}Label`)}
                            </div>
                            <span className="original-text">{text}</span>
                            <br />
                        </div>
                    );
                })}
            </div>
        </>
    );
});
