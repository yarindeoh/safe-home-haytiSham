import React from 'react';
import XIcon from 'src/media/icons/X.svg';
import { useTranslation } from 'react-i18next';

const PAGES = [
    { title: 'testimonySubmission', path: '/addStory' },
    { title: 'warningSigns.header', path: '/pages/warning-signs' },
    { title: 'whoWeAre', path: '/pages/about' }
];

export function Menu(props) {
    const { show, onToggle, onGoTo } = props;
    const { t } = useTranslation();

    return (
        <React.Fragment>
            {show && <div className="DarkFilter" onClick={onToggle} />}
            <div className={`Menu ${show ? 'Visible' : ''}`}>
                <div className="Title">
                    <XIcon className="CloseIcon" onClick={onToggle} />
                    <div className="MainTitle">
                        {t('common.iHaveBeenThereHashtag')}
                    </div>
                    <div className="SubTitle">
                        {t('testimoniesFromRelationships')}
                    </div>
                </div>
                <ul className="Items">
                    {PAGES.map(({ title, path }, index) => {
                        let className = '';
                        if (index === 4) {
                            className += ` EndSection`;
                        }
                        if (path) {
                            className += ` Clickable`;
                        }
                        return (
                            <div
                                key={`menu_item_${index}`}
                                className={className}
                                onClick={() => path && onGoTo(path)}
                            >
                                {t(title)}
                            </div>
                        );
                    })}
                </ul>
            </div>
        </React.Fragment>
    );
}

export default Menu;
