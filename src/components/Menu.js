import React from 'react';
import XIcon from 'src/media/icons/X.svg';

const PAGES = [
    { title: 'מי אנחנו' },
    { title: 'עזרה וסיוע' },
    { title: 'סימני אזהרה', isBold: true },
    { title: 'סטטיסטיקה' },
    { title: 'שליחת עדות', path: '/addStory' },
    { title: 'פורום מיכל סלה' },
    { title: 'נגישות' },
    { title: 'תמיכה טכנית' }
];

export function Menu(props) {
    const { show, onToggle, onGoTo } = props;

    return (
        <React.Fragment>
            {show && <div className="DarkFilter" onClick={onToggle}/>}
            <div className={`Menu ${show ? 'Visible' : ''}`}>
                <div className="Title">
                    <XIcon className="CloseIcon" onClick={onToggle} />
                    <div className="MainTitle">#הייתי_שם</div>
                    <div className="SubTitle">עדויות ממערכות יחסים אלימות</div>
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
                                {title}
                            </div>
                        );
                    })}
                </ul>
            </div>
        </React.Fragment>)
}

export default Menu;