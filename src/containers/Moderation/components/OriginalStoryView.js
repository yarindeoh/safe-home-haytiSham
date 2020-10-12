import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { useTranslation } from 'react-i18next';
import { extractFieldsFromObjOrdered } from 'services/general/generalHelpers';

export const OriginalStoryView = withRoute(({ data }) => {
    const { t } = useTranslation();

    const processedStory = extractFieldsFromObjOrdered(data, [
        'createdAt',
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

    console.log('OriginalStoryView -> processedStory', processedStory);

    return (
        <>
            <div>
                {processedStory.map((item, i) => {
                    let text = item.text;
                    if (item.titleKey === 'contact') {
                        text = item.text
                            ? t('login.table.yes')
                            : t('login.table.no');
                    }
                    return (
                        <div key={i}>
                            <h4>{t(`addStoryView.${item.titleKey}Label`)}</h4>
                            <span>{text}</span>
                            <br />
                        </div>
                    );
                })}
            </div>
        </>
    );
});
