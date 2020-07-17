import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { Input } from 'components/Input';
import { Radio } from 'components/Radio';
import { TextArea } from 'components/TextArea';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();

    const submit = (e) => {
        e.preventDefault();
        props.history.push('/');
    };
    const back = (e) => {
        e.preventDefault();
        props.history.push('/');
    };
    return (
        <>
            <div id={'testimony-form'}>
                <header>
                    <button className={'BTX-back'} onClick={back} />
                    <h1>{t('addStoryView.myConfession')}</h1>
                </header>
                <button className={'BTN-accessibility'} />
                <h3>
                    {t('addStoryView.anonymity')}
                </h3>
                <form onSubmit={submit}>
                    <Input
                        name="name"
                        label={t('addStoryView.nameLabel')}
                        placeholder={t('addStoryView.namePlaceholder')}
                    />
                    <Input
                        name="email"
                        label={t('addStoryView.emailLabel')}
                        placeholder={t('addStoryView.emailPlaceholder')}
                    />
                    <Radio
                        name="contact"
                        label={t('addStoryView.contactLabel')}
                        notes={t('addStoryView.contactNotes')}
                        checked={0}
                        options={[
                            { value: 'yes', label: t('common.yes') },
                            { value: 'no', label: t('common.no') },
                        ]}
                    />
                    <div>
                        <label>{t('addStoryView.manualSubmition')}</label>
                        <div>
                            <button onClick={uploadVideo}>
                                {' '}
                                {t('addStoryView.uploadVideo')}
                                {' '}
                            </button>
                            <button onClick={uploadSound}>
                                {' '}
                                {t('addStoryView.uploadRecording')}
                                {' '}
                            </button>
                        </div>
                    </div>

                    <TextArea
                        name="background"
                        placeholder=""
                        label={t('background')}
                        sublabel={t('backgroundSublabel')}
                    />

                    <TextArea
                        name="storyContent"
                        placeholder=""
                        label={t('storyContent')}
                        sublabel=""
                    />

                    <TextArea
                        name="howDidYouManged"
                        placeholder=""
                        label={t('howDidYouManged')}
                        sublabel=""
                    />

                    <TextArea
                        name="whatTriggeredChange"
                        placeholder=""
                        label={t('whatTriggeredChange')}
                        sublabel=""
                    />

                    <TextArea
                        name="howDidYouManged"
                        placeholder=""
                        label={t('howDidYouManged')}
                        sublabel=""
                    />

                    <TextArea
                        name="additionalnfo"
                        placeholder=""
                        label={t('additionalnfo')}
                        sublabel=""
                    />

                    <button onClick={submit}> {t('submitForm')} </button>
                </form>
            </div>
        </>
    );
});
