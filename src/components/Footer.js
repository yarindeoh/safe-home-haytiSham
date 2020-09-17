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
                    <h1> {title} </h1>
                    <ul>{displayFooterMenu()}</ul>
                </div>
                <div className="copyright">
                    <div>
                        <Link to="/been-there-2020">
                            {t('IHaveBeenThere2020')}
                        </Link>
                    </div>
                    <span> | </span>
                    <div>
                        <Link to="/privacy-policy"> {t('privacyPolicy')} </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
