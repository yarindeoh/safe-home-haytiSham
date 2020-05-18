import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { Input } from 'src/components/Input';
import { Radio } from 'src/components/Radio';

export const AddStoryView = withRoute((props) => {
    return (
        <div>
            <h1> העדות שלי</h1>
            <h3> על מנת שנוכל לשמור על צנעת הפרט, נסיר פרטים מזהים של אנשים אחרים. כמו כן, נשלח הודעה אנונימית לאחר פרסום העדות לאמצעי שהשארת למטה</h3>
            <form>
                <Input name="name" label="תחת איזה שם היית רוצה שהסיפור יפורסם?" placeholder="שמך המלא או באופן אנונימי/בדוי" />
                <Input name="email" label="כתובת מייל או טלפון ליצירת קשר (לא חובה, לא יפורסם באתר)" placeholder="כתובת אימייל" />
                <Radio name="contact" label="שניצור איתך קשר לקבלת תמיכה? (אפשר גם ליצור קשר 24/7 דרך כפתור התמיכה)" checked={0}
                    options={[{ value: "yes", label: "כן" }, { value: "no", label: "לא" }]}></Radio>
            </form>
        </div>
    );
});