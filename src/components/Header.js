import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import HamburgerIcon from 'src/media/icons/hamburger.svg';
import ArrowBackIcon from 'src/media/icons/ArrowBack.svg';
import SearchIcon from 'src/media/icons/Search.svg';
import XIcon from 'src/media/icons/X.svg';

const PAGES = [
    { title: 'מי אנחנו', path: '' },
    { title: 'עזרה וסיוע', path: '' },
    { title: 'סימני אזהרה', path: '', isBold: true },
    { title: 'סטטיסטיקה', path: '' },
    { title: 'שליחת עדות', path: '' },
    { title: 'פורום מיכל סלה', path: '' },
    { title: 'נגישות', path: '' },
    { title: 'תמיכה טכנית', path: '' }
];

export const Header = ({ isMainHeader = false, history }) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const goBack = () => {
        history.goBack();
    };

    return (
        <div className="AppHeader">
            <div className={`Menu ${showMenu ? 'Visible' : ''}`}>
                <div className="Title">
                    <XIcon className="CloseIcon" onClick={toggleMenu} />
                    <div className="MainTitle">#הייתי_שם</div>
                    <div className="SubTitle">עדויות ממערכות יחסים אלימות</div>
                </div>
                <ul className="Items">
                    {PAGES.map(({ title, isBold }, index) => {
                        let className = isBold ? 'Bold' : '';
                        if (index === 4) {
                            className += ` EndSection`;
                        }
                        return (
                            <div
                                key={`menu_item_${index}`}
                                className={className}
                            >
                                {title}
                            </div>
                        );
                    })}
                </ul>
            </div>
            <SearchIcon />
            <span>#הייתי_שם</span>
            {isMainHeader ? (
                <HamburgerIcon onClick={toggleMenu} />
            ) : (
                <ArrowBackIcon onClick={goBack} />
            )}
        </div>
    );
};

export default withRouter(Header);
