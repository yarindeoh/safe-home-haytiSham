import React, { useState, useContext } from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { Input } from 'components/Input';
import { Radio } from 'components/Radio';
import { TestimonyForm } from 'components/TestimonyForm';
import { TextArea } from 'components/TextArea';
import { useTranslation, Trans } from 'react-i18next';
import { useFiledChange, useModerateStorySubmit,useBack, useModerationStory } from './moderationHooks';
import { ModerationContext } from './moderationContext';
import BackArrowIcon from 'src/media/icons/backArrow.svg';
import '../../scss/componentsStyle/moderationView.scss';



export const ModerationView = withRoute(props => {
    const { t } = useTranslation();
    const {moderationData, setModerationData} = useContext(ModerationContext);
    const { handleFiledChange } = useFiledChange(moderationData, setModerationData);
    const { submitted, setSubmitted, handleSubmit } = useModerateStorySubmit();
    const { back } = useBack(props,setSubmitted, '/admin');

    const story = props.location.state;
    useModerationStory(story);

    
    return (
        <>
        {submitted ? 
            <div id={'testimony-form'} >
                <div className="submitted-success-heading">{t('moderation.submittedSuccessHeading')}</div>
                <div className="submitted-success-text">{t('moderation.submittedSuccessText')}</div>
                <div className="submitted-success-text">{t('moderation.phoneMail') + story.mail}</div>
                <button className={'submit-button'} onClick={back}>{t('moderation.backToAdminPage')}</button>
            </div> 
            :
            <div id={'testimony-form'}>
                <header>
                        <BackArrowIcon className={'back-arrow-icon'} onClick={back}/>
                        <h1>{t("moderation.header")}</h1>
                </header>
                <div className="container">
                    {/* Col1 - right col */}
                    <div >
                        <TestimonyForm
                            handleFiledChange={handleFiledChange}
                            formData={{...story}}
                            disabled={true}
                        />
                    </div>
                    {/* Col2 - center col */}
                    <div >
                        <TestimonyForm
                            handleSubmit={handleSubmit}
                            handleFiledChange={handleFiledChange}
                            formData={{...moderationData}}
                            moderatedForm
                        />
                    </div>
                    {/* Col3 - left col */}
                    <div>
                        {t('moderation.moderationRulesHeader')}
                        <br></br>
                        <br></br>
                        <Trans i18nKey='moderation.moderationRules'/>
                    </div>
                    

                </div>
            </div>
        }
        </>
    );
});
