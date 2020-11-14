import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import no2violenceFooter from '../media/no2violence-footer-mobile.png';

export const Footer = ({ title, footerMenuItemsAndUrls }) => {
    const { t } = useTranslation();
    const facebookLink = t('common.facebookOrganizationLink');
    const websiteLink = t('common.organizationLink');
    const organizationName = t('common.organizationName');
    const displayFooterMenu = () => {
        return footerMenuItemsAndUrls.map((item, index) => (
            <li key={`${item}-${index}`}>
                <Link to={item.url}> {item.name} </Link>
            </li>
        ));
    };

    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-menu">
                    <img src={no2violenceFooter} alt="no2violenceFooter" />
                    <Link to="/" className="footer-title">
                        {t('common.iHaveBeenThereHashtag')}
                    </Link>
                    <ul>{displayFooterMenu()}</ul>
                </div>
                <div className="phone-section">
                    <span className={'phone-text'}>
                        {t('loLalimotPhoneText')}
                    </span>
                    <a href="tel:*6724" className={'phone-number'}>
                        6724*
                    </a>
                </div>

                <div className="copyright">
                    <div className="facebook-no2violence">
                        <p>
                            {t('footer.facebook', { name: organizationName })}
                        </p>
                    </div>
                    <div>
                        {t('footer.website', { name: organizationName })}
                        <a
                            href={websiteLink}
                            className="organizationLink"
                            target="_blank"
                        >
                            {t('common.organizationLinkDisplay')}
                        </a>
                        <span className="separator">•</span>
                        <Link to="/pages/terms-of-service">
                            <u>{t('privacyPolicy')}</u>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
