import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { Input } from 'components/Input';
import { Radio } from 'components/Radio';
import { TextArea } from 'components/TextArea';
import { useTranslation } from 'react-i18next';
import { Header } from '../../components/Header';

const submitForm = () => {
    //TODO;
};

export const AddStoryView = withRoute(props => {
    const { t } = useTranslation();

    const submit = e => {
        e.preventDefault();
        props.history.push('/');
    };
    const back = e => {
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
                <h3>{t('addStoryView.anonymity')}</h3>
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
                            { value: 'no', label: t('common.no') }
                        ]}
                    />

                    <TextArea
                        name="background"
                        placeholder=""
                        label={t('background')}
                    />

                    <TextArea
                        name="storyContent"
                        label={t('storyContent')}
                        placeholder={t('storyContentPlaceholder')}
                    />
                    <TextArea
                        name="howDidYouManged"
                        label={t('howDidYouManged')}
                        placeholder={t('howDidYouMangedPlaceholder')}
                    />

                    <TextArea
                        name="whatHelpedYou"
                        label={t('whatHelpedYou')}
                        name="whatHelpedYou"
                        placeholder={t('whatHelpedYouPlaceHolder')}
                    />

                    <TextArea
                        name="additionalnfo"
                        placeholder={t('additionalnfoPlaceHolder')}
                        label={t('additionalnfo')}
                    />

                    <button onClick={submit}> {t('submitForm')} </button>
                </form>
            </div>
        </>
    );
});
