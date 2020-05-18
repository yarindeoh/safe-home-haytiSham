import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { Input } from 'src/components/Input';
import { Radio } from 'src/components/Radio';
import lang from 'services/lang.json';

export const AddStoryView = withRoute((props) => {
    const submit = (e) => {
        e.preventDefault();
        console.log(e.currentTarget);
    };
    return (
        <div>
            <h1> העדות שלי</h1>
            <h3>
                על מנת שנוכל לשמור על צנעת הפרט, נסיר פרטים מזהים של אנשים
                אחרים. כמו כן, נשלח הודעה אנונימית לאחר פרסום העדות לאמצעי
                שהשארת למטה
            </h3>
            <form onSubmit={submit}>
                <Input
                    name="name"
                    label="תחת איזה שם היית רוצה שהסיפור יפורסם?"
                    placeholder="שמך המלא או באופן אנונימי/בדוי"
                />
                <Input
                    name="email"
                    label="כתובת מייל או טלפון ליצירת קשר (לא חובה, לא יפורסם באתר)"
                    placeholder="כתובת אימייל"
                />
                <Radio
                    name="contact"
                    label="שניצור איתך קשר לקבלת תמיכה? (אפשר גם ליצור קשר 24/7 דרך כפתור התמיכה)"
                    checked={0}
                    options={[
                        { value: 'yes', label: 'כן' },
                        { value: 'no', label: 'לא' },
                    ]}
                ></Radio>
                <Input
                    name="background"
                    label={lang.background}
                    placeholder={lang.background}
                />
                <Input
                    name="whatTriggeredChange"
                    label={lang.whatTriggeredChange}
                    placeholder={lang.whatTriggeredChange}
                />
                <Input
                    name="howDidYouManged"
                    label={lang.howDidYouManged}
                    placeholder={lang.howDidYouManged}
                />
                <Input
                    name="storyContent"
                    label={lang.storyContent}
                    placeholder={lang.storyContent}
                />
                <Input
                    name="additionalnfo"
                    label={lang.additionalnfo}
                    placeholder={lang.additionalnfo}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
});
