import React, { useState, useContext } from 'react';
import { AddStoryContext } from './addStoryContext';
import { addStoryDataInit } from './addStoryConstants';
import Api from './addStoryApi';

export function useAddStoryState() {
    const context = React.useContext(AddStoryContext);
    if (context === undefined) {
        throw new Error(
            'AddStoryContext must be used within a AddStoryProvider'
        );
    }
    return context;
}

export const useCheckedContact = () => {
    const { addStoryData, setAddStoryData } = useAddStoryState();
    const [checkedContact, setCheckedContact] = useState(
        addStoryData.contact === true ? 0 : 1
    );
    const handleCheckedContact = e => {
        if (e.target.value === 'yes') {
            setCheckedContact(0);
            setAddStoryData(addStoryData => ({
                ...addStoryData,
                contact: true
            }));
        } else {
            setCheckedContact(1);
            setAddStoryData(addStoryData => ({
                ...addStoryData,
                contact: false
            }));
        }
    };
    return {
        checkedContact: {},
        handleCheckedContact: {}
    };
};

export const useFiledChange = () => {
    const { addStoryData, setAddStoryData } = useAddStoryState();
    const handleFiledChange = (e, filed) => {
        let newAddStoryData = { ...addStoryData };
        newAddStoryData[filed] = e.target.value;
        setAddStoryData(newAddStoryData);
    };

    return {
        handleFiledChange
    };
};

export const useSubmit = () => {
    const { addStoryData, setAddStoryData } = useAddStoryState();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        let addStoryDataToPost = { ...addStoryData };

        async function postData() {
            try {
                await Api.postAddStory(addStoryDataToPost);
                setAddStoryData({ ...addStoryDataInit });
                setSubmitted(true);
            } catch (e) {
                window.alert(e);
            }
        }
        postData();
    };

    return {
        submitted,
        setSubmitted,
        handleSubmit
    };
};

export const useBack = (props, setSubmitted) => {
    const back = e => {
        e.preventDefault();
        setSubmitted(false);
        props.history.push('/');
    };

    return {
        back
    };
};
