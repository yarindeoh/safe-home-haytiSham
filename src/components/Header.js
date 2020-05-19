import React from 'react';

export const Header = () => {
    return (
        <header>
            <ul className={'header-menu-container'}>
                <button className={'BTN-hamburger-menu'} />
                <button className={'BTN-search'} />
            </ul>
            <h1>#הייתי_שם</h1>
            <button className={'BTN-lang-changer'} />
        </header>
    );
};