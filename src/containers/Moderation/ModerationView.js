import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { EditOriginalStoryView } from 'containers/Moderation/components/EditOriginalStoryView';
import { OriginalStoryView } from 'containers/Moderation/components/OriginalStoryView';
import { LeftColView } from 'containers/Moderation/components/LeftColView';
import { ModerationFooter } from 'containers/Moderation/components/ModerationFooter';
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
    UNPUBLISH_DIALOG_TEXT
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
    const { submitted, setSubmitted, handleSubmit } = useModerateStorySubmit();
    const { back } = useBack(props, setSubmitted, '/admin/loggedIn');
    const { handlePublish, publishPostSuccess } = usePublishModerateStory();
    const { handleDialogOkClick } = useDialogOkClick(back);

    const { open, showDialog, dialogParams, setDialogParams } = useDialog();
    //open Dialog when submitted
    useResetDialogParams(submitted, showDialog, setDialogParams, {
        handleOk: handleDialogOkClick,
        ...SUBMIT_DIALOG_TEXT
    });
    //open Dialog when unpublish story success
    useResetDialogParams(publishPostSuccess, showDialog, setDialogParams, {
        handleOk: handleDialogOkClick,
        ...UNPUBLISH_DIALOG_TEXT
    });

    const { originalStory, moderatedStory } = props.location.state;
    const validModeratedStory =
        moderatedStory !== null ? moderatedStory : originalStory;
    const validOriginalStory =
        originalStory !== null ? originalStory : moderatedStory;
    useModerationStory(validModeratedStory, tagsMap);

    useResizeTextArea();

    return (
        <>
            <div>
                <CustomDialog open={open} {...dialogParams} />
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
                    <ModerationFooter
                        handlePublish={handlePublish}
                        showRemoveButton={
                            validOriginalStory.moderated === true &&
                            validModeratedStory?.publish
                        }
                    />
                </div>
            </div>
        </>
    );
});
