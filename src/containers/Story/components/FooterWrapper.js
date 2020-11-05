import React, { Fragment } from 'react';
import { Footer } from 'components/Footer';
import { useTranslation } from 'react-i18next';

export const FooterWrapper = () => {
    const { t } = useTranslation();
    const title = t('IHaveBeenThereHashtag');
    const footerMenu = [
        { name: t('testimonySubmission'), url: '/addStory' },
        { name: t('whoWeAre'), url: '/pages/about' },
        { name: t('warningSigns.header'), url: '/pages/warning-signs' }
    ];

    return (
        <Fragment>
            <Footer title={title} footerMenuItemsAndUrls={footerMenu} />
        </Fragment>
    );
};
