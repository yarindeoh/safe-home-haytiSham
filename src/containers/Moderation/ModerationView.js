import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { EditOriginalStoryView } from 'containers/Moderation/components/EditOriginalStoryView';
import { OriginalStoryView } from 'containers/Moderation/components/OriginalStoryView';
import { LeftColView } from 'containers/Moderation/components/LeftColView';
import { ModerationFooter } from 'containers/Moderation/components/ModerationFooter';
import { useTranslation, Trans } from 'react-i18next';
import {
    useModerationContext,
    useModerationFiledChange,
    useModerateStorySubmit,
    useModerationStory,
    usePublishModerateStory
} from 'containers/Moderation/moderationHooks';
import { useBack } from 'services/general/generalHooks';
import { useTags } from 'containers/Stories/storiesHooks';

import '../../scss/componentsStyle/moderationView.scss';

export const ModerationView = withRoute(props => {
    const { t } = useTranslation();
    const { moderationState } = useModerationContext();
    const { tagsMap } = useTags();
    const { handleFieldChange } = useModerationFiledChange();
    const { submitted, setSubmitted, handleSubmit } = useModerateStorySubmit();
    const { back } = useBack(props, setSubmitted, '/admin');
    const { handlePublish, publishPostSuccess } = usePublishModerateStory();
    //TODO: add modal for submit / unpublish

    const { originalStory, moderatedStory } = props.location.state;
    const validModeratedStory =
        moderatedStory !== null ? moderatedStory : originalStory;
    const validOriginalStory =
        originalStory !== null ? originalStory : moderatedStory;
    useModerationStory(validModeratedStory, tagsMap);

    return (
        <>
            {submitted ? (
                <div className={'testimony-form'}>
                    <div className="submitted-success-heading">
                        {t('moderation.submittedSuccessHeading')}
                    </div>
                    <div className="submitted-success-text">
                        {t('moderation.submittedSuccessText')}
                    </div>
                    <div className="submitted-success-text">
                        {t('moderation.phoneMail') + validOriginalStory?.mail}
                    </div>
                    <button className={'submit-button'} onClick={back}>
                        {t('moderation.backToAdminPage')}
                    </button>
                </div>
            ) : (
                <div>
                    <div className="moderation-container">
                        <div className="moderation-main-content">
                            {/* Col1 - right col */}
                            <div>
                                <OriginalStoryView
                                    data={{ ...validOriginalStory }}
                                    back={back}
                                />
                            </div>
                            {/* Col2 - center col */}
                            <div>
                                <EditOriginalStoryView
                                    handleSubmit={handleSubmit}
                                    handleFieldChange={handleFieldChange}
                                    formData={{ ...moderationState }}
                                    moderatedForm
                                />
                            </div>
                            {/* Col3 - left col */}
                            <div>
                                <LeftColView
                                    handleFieldChange={handleFieldChange}
                                    formData={{ ...moderationState }}
                                />
                            </div>
                        </div>
                        <ModerationFooter handlePublish={handlePublish} />
                    </div>
                </div>
            )}
        </>
    );
});
