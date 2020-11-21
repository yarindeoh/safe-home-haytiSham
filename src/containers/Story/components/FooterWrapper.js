import React, { Fragment } from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { useTranslation } from 'react-i18next';
import { Footer } from 'components/Footer';
import HelpButton from 'components/HelpButton';

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
            <HelpButton />
            <MessengerCustomerChat
                pageId="129705330373192"
                appId="1301955370137940"
            />
            <Footer title={title} footerMenuItemsAndUrls={footerMenu} />
        </Fragment>
    );
};
