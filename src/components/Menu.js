import React from 'react';
import XIcon from 'src/media/icons/X.svg';
import { useTranslation } from 'react-i18next';

const PAGES = [
    { title: 'whoWeAre' },
    { title: 'getHelp' },
    { title: 'warningSigns', isBold: true },
    { title: 'statistic' },
    { title: 'testimonySubmission', path: '/addStory' },
    { title: 'michalSelaForum' },
    { title: 'accessability' },
    { title: 'technicSupport' }
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
                    {PAGES.map(({ title, isBold, path }, index) => {
                        let className = isBold ? 'Bold' : '';
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
