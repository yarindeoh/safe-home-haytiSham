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
                    <span className={'phone-number'}>6724*</span>
                    <span className={'phone-text'}>
                        {t('loLalimotPhoneText')}
                    </span>
                </div>

                <div className="copyright">
                    <div>
                        <Link to="/">{t('IHaveBeenThere2020')}</Link>
                    </div>
                    <span> | </span>
                    <div>
                        {/* <Link to="/pages/privacy-policy"> */}{' '}
                        <u>{t('privacyPolicy')} </u>
                        {/* </Link> */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
