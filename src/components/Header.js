import React from 'react';

export const Header = () => {
    return (
        <header>
            <ul className={'header-menu-container'}>
                <button id={'BTN-hamburger-menu'} />
                <button id={'BOX-search'} />
                <button id={'BTX-lang-changer'} />
            </ul>
            <h1>#הייתי_שם</h1>
        </header>
    );
}