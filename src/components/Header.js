import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import HamburgerIcon from 'src/media/icons/hamburger.svg';
import ArrowBackIcon from 'src/media/icons/ArrowBack.svg';
import SearchIcon from 'src/media/icons/Search.svg';
import Menu from 'src/components/Menu';

export const Header = ({ isMainHeader = false, history }) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const goBack = () => {
        history.goBack();
    };

    const goTo = (path) => {
        history.push(path);
    };

    return (
        <div className="AppHeader">
            <Menu show={showMenu} onToggle={toggleMenu} onGoTo={goTo} />
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
