import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { withRoute } from 'services/routing/routerHOC';
import { Input } from 'components/Input';
import { Radio } from 'components/Radio';
import { TextArea } from 'components/TextArea';
import {
    useAddStoryContext,
    useCheckedContact,
    useFiledChange,
    useSubmit
} from './addStoryHooks';
import { useBack, useResizeTextArea } from 'services/general/generalHooks';
import Skeleton from 'src/components/Skeleton';
import Content from 'src/components/Content';

export const AddStoryView = withRoute(props => {
    const { addStoryState } = useAddStoryContext();
    const { t } = useTranslation();
    const { checkedContact, handleCheckedContact } = useCheckedContact();
    const { handleFieldChange } = useFiledChange();
    const { submitted, setSubmitted, handleSubmit } = useSubmit();
    const { back } = useBack(props, setSubmitted);
    useResizeTextArea();

    let wrapperClassName = 'testimony-form';
    if (submitted) {
        wrapperClassName += ' submitted';
        window.scrollTo(0, 0);
    }

    const submittedMsg = (
        <React.Fragment>
            <h1>{t('addStoryView.submittedSuccessHeading')}</h1>
            <h2>{t('addStoryView.submittedSuccessText')}</h2>
            <button className={'submit-button'} onClick={back}>
                {t('backFromForm')}
            </button>
        </React.Fragment>
    );

    return (
        <Skeleton>
            <Content className={wrapperClassName}>
                {submitted ? (
                    submittedMsg
                ) : (
                    <React.Fragment>
                        <h1>{t('addStoryView.myConfession')}</h1>
                        <h2>{t('addStoryView.anonymity')}</h2>
                        <Link to="/pages/terms-of-service">
                            <h2>{t('addStoryView.termsOfUse')}</h2>
                        </Link>
                        <form
                            onSubmit={handleSubmit}
                            id={'addStoryForm'}
                            autoComplete="off"
                            className={'addStoryForm'}
                        >
                            <Input
                                maxLength={28}
                                name="name"
                                label={t('addStoryView.nameLabel')}
                                placeholder={t('addStoryView.namePlaceholder')}
                                value={addStoryState?.name}
                                onChange={e => handleFieldChange(e, 'name')}
                                required
                            />
                            <Input
                                name="mail"
                                label={t('addStoryView.mailLabel')}
                                placeholder={t('addStoryView.mailPlaceholder')}
                                value={addStoryState?.mail}
                                onChange={e => handleFieldChange(e, 'mail')}
                            />
                            <Radio
                                name="contact"
                                label={t('addStoryView.contactLabel')}
                                notes={t('addStoryView.contactNotes')}
                                checked={checkedContact}
                                options={[
                                    { value: 'yes', label: t('common.yes') },
                                    { value: 'no', label: t('common.no') }
                                ]}
                                onClick={e => handleCheckedContact(e)}
                            />
                            {addStoryState.contact && (
                                <Input
                                    name="contactTime"
                                    label={t('addStoryView.contactTimeLabel')}
                                    subLabel={t(
                                        'addStoryView.contactTimeSubLabel'
                                    )}
                                    placeholder={t(
                                        'addStoryView.contactTimePlaceholder'
                                    )}
                                    value={addStoryState?.contactTime}
                                    onChange={e =>
                                        handleFieldChange(e, 'contactTime')
                                    }
                                />
                            )}
                            <TextArea
                                name="background"
                                placeholder=""
                                label={t('addStoryView.backgroundLabel')}
                                value={addStoryState?.background}
                                onChange={e =>
                                    handleFieldChange(e, 'background')
                                }
                                required
                            />
                            <TextArea
                                name="storyContent"
                                label={t('addStoryView.storyContentLabel')}
                                placeholder={t(
                                    'addStoryView.storyContentPlaceholder'
                                )}
                                value={addStoryState?.storyContent}
                                onChange={e =>
                                    handleFieldChange(e, 'storyContent')
                                }
                                required
                            />
                            <TextArea
                                name="howDidYouManged"
                                label={t('addStoryView.howDidYouMangedLabel')}
                                placeholder={t(
                                    'addStoryView.howDidYouMangedPlaceholder'
                                )}
                                value={addStoryState?.howDidYouManged}
                                onChange={e =>
                                    handleFieldChange(e, 'howDidYouManged')
                                }
                            />
                            <TextArea
                                name="whatHelpedYou"
                                label={t('addStoryView.whatHelpedYouLabel')}
                                placeholder={t(
                                    'addStoryView.whatHelpedYouPlaceHolder'
                                )}
                                value={addStoryState?.whatHelpedYou}
                                onChange={e =>
                                    handleFieldChange(e, 'whatHelpedYou')
                                }
                            />
                            <TextArea
                                name="whatTriggeredChange"
                                label={t(
                                    'addStoryView.whatTriggeredChangeLabel'
                                )}
                                value={addStoryState?.whatTriggeredChange}
                                onChange={e =>
                                    handleFieldChange(e, 'whatTriggeredChange')
                                }
                            />
                            <TextArea
                                name="additionalnfo"
                                placeholder={t(
                                    'addStoryView.additionalnfoPlaceHolder'
                                )}
                                label={t('addStoryView.additionalnfoLabel')}
                                value={addStoryState?.additionalnfo}
                                onChange={e =>
                                    handleFieldChange(e, 'additionalnfo')
                                }
                            />
                            <input
                                className="submit-button"
                                type="submit"
                                value={t('submitForm')}
                            />
                        </form>
                    </React.Fragment>
                )}
            </Content>
        </Skeleton>
    );
});
