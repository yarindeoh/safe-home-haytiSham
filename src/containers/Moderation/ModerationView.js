import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { EditOriginalStoryView } from 'containers/Moderation/components/EditOriginalStoryView';
import { OriginalStoryView } from 'containers/Moderation/components/OriginalStoryView';
import { LeftColView } from 'containers/Moderation/components/LeftColView';
import { ModerationHeader } from 'containers/Moderation/components/ModerationHeader';
import {
    useModerationContext,
    useModerationFiledChange,
    useModerateStorySubmit,
    useModerationStory,
    usePublishModerateStory,
    useDialogOkClick
} from 'containers/Moderation/moderationHooks';
import {
    SUBMIT_DIALOG_TEXT,
    UNPUBLISH_DIALOG_TEXT,
    PUBLISH_DIALOG_TEXT,
    SAVE_DIALOG_TEXT
} from 'containers/Moderation/moderationConstants';
import {
    useBack,
    useDialog,
    useResetDialogParams,
    useResizeTextArea
} from 'services/general/generalHooks';
import { useTags } from 'containers/Stories/storiesHooks';
import CustomDialog from 'components/CustomDialog';

import '../../scss/componentsStyle/moderationView.scss';

export const ModerationView = withRoute(props => {
    const { moderationState } = useModerationContext();
    const { tagsMap } = useTags();
    const { handleFieldChange } = useModerationFiledChange();

    const { originalStory, moderatedStory } = props.location.state;
    const validModeratedStory =
        moderatedStory !== null ? moderatedStory : originalStory;
    const validOriginalStory =
        originalStory !== null ? originalStory : moderatedStory;
    useModerationStory(
        {
            ...validModeratedStory,
            ...{
                mail: validOriginalStory.mail,
                contact: validOriginalStory.contact
            }
        },
        tagsMap
    ); //add the filed contactAt

    const { submitted, setSubmitted, handleSubmit } = useModerateStorySubmit(
        validOriginalStory?.moderated
    );
    const { back } = useBack(props, setSubmitted, '/admin/loggedIn');
    const { handlePublish, publishPostSuccess } = usePublishModerateStory();
    const { handleDialogOkClick } = useDialogOkClick(back);

    const { open, showDialog, dialogParams, setDialogParams } = useDialog();
    //open Dialog when submitted
    let submitDialogText = SUBMIT_DIALOG_TEXT;
    if (validOriginalStory?.moderated && !validModeratedStory?.publish)
        submitDialogText = SAVE_DIALOG_TEXT;
    useResetDialogParams(submitted, showDialog, setDialogParams, {
        handleOk: handleDialogOkClick,
        ...submitDialogText
    });
    //open Dialog when unpublish story success
    const publishDialogText = validModeratedStory?.publish
        ? UNPUBLISH_DIALOG_TEXT
        : PUBLISH_DIALOG_TEXT;
    useResetDialogParams(publishPostSuccess, showDialog, setDialogParams, {
        handleOk: handleDialogOkClick,
        ...publishDialogText
    });

    useResizeTextArea();

    return (
        <>
            <div>
                <CustomDialog open={open} {...dialogParams} />
                <div className="moderation-container">
                    <ModerationHeader
                        handlePublish={handlePublish}
                        testimonyIsModerated={validOriginalStory?.moderated}
                        testimonyIsPublish={
                            validOriginalStory?.moderated === true &&
                            validModeratedStory?.publish
                        }
                    />
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
                        <div className="left-col-container">
                            <LeftColView
                                handleFieldChange={handleFieldChange}
                                formData={{ ...moderationState }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});
