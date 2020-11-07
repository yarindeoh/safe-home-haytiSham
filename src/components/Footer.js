import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Footer = ({ title, footerMenuItemsAndUrls }) => {
    const { t } = useTranslation();
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
                    <Link to="/" className="footer-title">
                        {t('common.iHaveBeenThereHashtag')}
                    </Link>
                    <ul>{displayFooterMenu()}</ul>
                </div>
                <div className="phone-section">
                    <a href="tel:*6724" className={'phone-number'}>
                        6724*
                    </a>
                    <span className={'phone-text'}>
                        {t('loLalimotPhoneText')}
                    </span>
                </div>

                <div className="copyright">
                    <span>{t('IHaveBeenThere2020')}</span>
                    <span> | </span>
                    <div>
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
