import React from 'react';

export const Header = () => {
    return (
        <header>
            <ul className={'header-menu-container'}>
                <button className={'BTN-hamburger-menu'} />
                <button className={'BTN-search'} />
            </ul>
            <div className={'logo'} />
            <button className={'BTN-lang-changer'} />
        </header>
    );
};