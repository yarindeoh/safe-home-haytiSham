import { useState, useContext, useEffect } from 'react';
import Api from './moderationApi';
import { ModerationContext } from './moderationContext';
import { moderationDataInit } from './moderationConstants'
import { extractFieldsFromObj } from 'services/general/generalHelpers';

export const useFiledChange = (data, setData) => {
    const handleFiledChange = (e, filed) => {
        let newData = {...data};
        newData[filed] = e.target.value;
        setData(newData)
    }    
    
    return {
        handleFiledChange
    };
}

export const useLoginSubmit = (loginData) => {
    const {setModerationData} = useContext(ModerationContext)

    const handleLogin = e => {
        e.preventDefault();

        async function postLogin() {
            try{
                const serverData = await Api.postLogin(loginData);
                sessionStorage.moderatorToken = serverData.token;
                setModerationData((moderationData)=>({...moderationData, loggedIn: true}));
            }
            catch(e){
                window.alert(e)
            }
        }   
        postLogin()
    };
    
    return {
        handleLogin
    };
}

export const useModerationStories = () => {
    const {moderationData} = useContext(ModerationContext);
    const [stories, setStories] = useState();
    useEffect(() => {
        if(moderationData.loggedIn){
            (async () => {
                await setStories(await Api.getModerationStories());
            })();
        }
    }, [moderationData.loggedIn]);
    return {
        storiesToModerate: stories?.result
    };
};

export const useModerationStory = (story) => {
    const {moderationData, setModerationData} = useContext(ModerationContext);
    useEffect(() => {
        if(story._id !== moderationData._id){
            const processedStory = extractFieldsFromObj(story, [
                '_id',
                'additionalnfo',
                'background',
                'mail',
                'howDidYouManged',
                'name',
                'quote',
                'storyContent',
                'whatHelpedYou',
                'whatTriggeredChange',
                'contact'
            ]);    
            setModerationData((moderationData)=>({...moderationData, ...processedStory}));    
        }
    }, []);
    return {};
};


export const useModerateStorySubmit = (selectedTags) => {
    const {moderationData, setModerationData} = useContext(ModerationContext);
    const [submitted, setSubmitted] = useState(false);
    let moderationDataToPost = {...moderationData}
    delete moderationDataToPost.loggedIn;
    moderationDataToPost.originalStory = moderationData._id;
    delete moderationDataToPost._id;
    
    //TODO: add to json selectedTags

    const handleSubmit = e => {
        e.preventDefault();

        async function postData() {
            try{
                await Api.postModerateStory(moderationDataToPost);
                setModerationData((moderationData)=>({...moderationData, ...moderationDataInit}))
                setSubmitted(true);
            }
            catch(e){
                window.alert(e)
            }
        }   
        postData()
    };
    
    return {
        submitted,
        setSubmitted,
        handleSubmit
    };
}


export const useBack = (props, setSubmitted, path) => {
    const back = e => {
        e.preventDefault();
        setSubmitted(false);
        props.history.push(path);
    };

    return {
        back
    };
}
export const useSelectedTags = () => {
    const [selectedTags, setSelectedTags] = useState([]);
    function onSelect(selectedList, selectedItem) {
        setSelectedTags((selectedTags)=>[...selectedTags,selectedItem])
    }
    function onRemove(selectedList, selectedItem) {
        setSelectedTags((selectedTags)=>selectedTags.filter(e => e !== selectedItem))
    }

    return {
        selectedTags,
        onSelect,
        onRemove
    };
}

