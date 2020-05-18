import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { Input } from 'src/components/Input';
import { Radio } from 'src/components/Radio';
import { TextArea } from 'src/components/TextArea';

const uploadVideo = () => {
    //TODO;
};

const uploadSound = () => {
    //TODO;
};

const submitForm = () => {
    //TODO;
};

export const AddStoryView = withRoute((props) => {
    return (
        <div>
            <h1> העדות שלי</h1>
            <h3> על מנת שנוכל לשמור על צנעת הפרט, נסיר פרטים מזהים של אנשים אחרים. כמו כן, נשלח הודעה אנונימית לאחר פרסום העדות לאמצעי שהשארת למטה</h3>
            <form>
                <Input name="name" label="שם לפרסום העדות (שם מלא או אנונימי/בדוי(" placeholder="הוספת שם" />
                <Input name="email" label="מייל או טלפון ליצירת קשר (לא חובה, לא יפורסם באתר" placeholder="הוספת פרטי קשר" />
                <Radio name="contact" label="שניצור איתך קשר לקבלת תמיכה? (אפשר גם ליצור קשר 24/7 דרך כפתור התמיכה)" checked={0}
                    options={[{ value: "yes", label: "כן" }, { value: "no", label: "לא" }]}></Radio>

                <div>
                    <label>
                        אפשר לדלג ולמלא בכתב או:
                    </label>
                    <div>
                        <button onClick={uploadVideo}> להעלות סרטון </button>
                        <button onClick={uploadSound}> להעלות הקלטה </button>
                    </div>
                </div>

                <TextArea placeholder="" label="רקע" sublabel="מה היה טיב מערכת היחסים, מתי זה קרה, לאורך כמה זמן, גיל וכו׳"></TextArea>
                <TextArea placeholder="" label="סיפור העדות שלך" sublabel=""></TextArea>
                <TextArea placeholder="" label="איך התמודדת עם המצב?" sublabel=""></TextArea>
                <TextArea placeholder="" label="איך הסיטואציה השתנתה?" sublabel=""></TextArea>
                <TextArea placeholder="" label="מה עזר לך להתמודד?" sublabel=""></TextArea>
                <TextArea placeholder="" label="בכמה משפטים, מה הכי היית רוצה לומר למי שבמצב דומה?" sublabel=""></TextArea>

                <button onClick={submitForm}> שליחה </button>
            </form>
        </div>
    );
});