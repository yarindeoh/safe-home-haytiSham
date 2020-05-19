import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { Input } from 'components/Input';
import { Radio } from 'components/Radio';
import { TextArea } from 'components/TextArea';
import lang from 'services/lang.json';
import { Header } from '../../components/Header';

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
    const submit = (e) => {
        e.preventDefault();
        console.log(e.currentTarget);
        props.history.push("/");
    };
    return (
        <>
            <Header />
            <div id={'testimony-form'}>
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
                        ]}>
                    </Radio>

                    <div>
                        <label>
                            אפשר לדלג ולמלא בכתב או:
                        </label>
                        <div>
                            <button onClick={uploadVideo}> להעלות סרטון </button>
                            <button onClick={uploadSound}> להעלות הקלטה </button>
                        </div>
                    </div>

                    <TextArea
                        name="background"
                        placeholder=""
                        label={lang.background}
                        sublabel={lang.backgroundSublabel}>
                    </TextArea>

                    <TextArea
                        name="storyContent"
                        placeholder=""
                        label={lang.storyContent}
                        sublabel="">
                    </TextArea>

                    <TextArea
                        name="howDidYouManged"
                        placeholder=""
                        label={lang.howDidYouManged}
                        sublabel="">
                    </TextArea>

                    <TextArea
                        name="whatTriggeredChange"
                        placeholder=""
                        label={lang.whatTriggeredChange}
                        sublabel="">
                    </TextArea>

                    <TextArea
                        name="howDidYouManged"
                        placeholder=""
                        label={lang.howDidYouManged}
                        sublabel="">
                    </TextArea>

                    <TextArea
                        name="additionalnfo"
                        placeholder=""
                        label={lang.additionalnfo}
                        sublabel="">
                    </TextArea>

                    <button onClick={submit}> {lang.submitForm} </button>
                </form>
            </div>
        </>
    );
});
