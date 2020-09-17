import React, { Fragment } from 'react';
import { Footer } from 'components/Footer';
import { useTranslation } from 'react-i18next';

export const FooterWrapper = () => {
    const { t } = useTranslation();
    const title = t('IHaveBeenThereHashtag');
    const footerMenu = [
        { name: t('getHelp'), url: '/get-help' },
        { name: t('whoWeAre'), url: '/about' },
        { name: t('warningSigns.header'), url: '/warning-signs' },
        { name: t('michalSelaForum'), url: '/michal-sela-forum' },
        { name: t('testimonySubmission'), url: '/testimony' },
        { name: t('accessability'), url: '/accessability' },
        { name: t('statistic'), url: '/statistic' },
        { name: t('technicSupport'), url: '/technical-support' }
    ];

    return (
        <Fragment>
            <Footer title={title} footerMenuItemsAndUrls={footerMenu} />
        </Fragment>
    );
};
