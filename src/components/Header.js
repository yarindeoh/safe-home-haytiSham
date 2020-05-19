import React from 'react';

export const Header = () => {
    return (
        <header>
            <ul className={'header-menu-container'}>
                <button id={'BTN-hamburger-menu'} />
                <button id={'BTN-search'} />
            </ul>
            <h1>#הייתי_שם</h1>
            <button id={'BTX-lang-changer'} />
        </header>
    );
}