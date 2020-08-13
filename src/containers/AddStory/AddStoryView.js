import React, { useContext, useState } from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { Input } from 'components/Input';
import { Radio } from 'components/Radio';
import { TextArea } from 'components/TextArea';
import { useTranslation } from 'react-i18next';
import { Header } from '../../components/Header';
import { AddStoryContext } from './addStoryContext';

import Api from './addStoryApi';


const submitForm = () => {
    //TODO;
};

export const AddStoryView = withRoute(props => {
    const { t } = useTranslation();
    // const [checkedContact, setCheckedContact] = useState(0)
    const {addStoryData, setAddStoryData} = useContext(AddStoryContext)

    const handleFiledChange = (e, filed) => {
        let newAddStoryData = {...addStoryData};
        newAddStoryData[filed] = e.target.value;
        setAddStoryData(newAddStoryData)
    }

   const submit = e => {
        e.preventDefault();
        let addStoryDataToPost = {...addStoryData}
        delete addStoryDataToPost.submitted;

        async function postData() {
            try{
                await Api.postAddStory(addStoryDataToPost);
                setAddStoryData({...addStoryData, submitted: true})
                props.history.push('/');
            }
            catch(e){
                window.alert(e)
            }
        }   
        postData()
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
                <form onSubmit={submit} id={"addStoryForm"}>
                    <Input
                        name="name"
                        label={t('addStoryView.nameLabel')}
                        placeholder={t('addStoryView.namePlaceholder')}
                        value={addStoryData.name}
                        onChange={(e)=>handleFiledChange(e, "name")}
                    />
                    <Input
                        name="email"
                        label={t('addStoryView.emailLabel')}
                        placeholder={t('addStoryView.emailPlaceholder')}
                        value={addStoryData.email}
                        onChange={(e)=>handleFiledChange(e, "email")}
                    />
                    {/* <Radio
                        name="contact"
                        label={t('addStoryView.contactLabel')}
                        notes={t('addStoryView.contactNotes')}
                        checked={checkedContact}
                        options={[
                            { value: 'yes', label: t('common.yes') },
                            { value: 'no', label: t('common.no') }
                        ]}
                        onClick={(e)=>{e.target.value==='yes' ? setCheckedContact(0) : setCheckedContact(1)}}
                    /> */}

                    <TextArea
                        name="background"
                        placeholder=""
                        label={t('background')}
                        value={addStoryData.background}
                        onChange={(e)=>handleFiledChange(e, "background")}
                        required
                    />

                    <TextArea
                        name="storyContent"
                        label={t('storyContent')}
                        placeholder={t('storyContentPlaceholder')}
                        value={addStoryData.storyContent}
                        onChange={(e)=>handleFiledChange(e, "storyContent")}
                        required
                    />
                    <TextArea
                        name="howDidYouManged"
                        label={t('howDidYouManged')}
                        placeholder={t('howDidYouMangedPlaceholder')}
                        onChange={(e)=>handleFiledChange(e, "howDidYouManged")}
                        required
                    />

                    <TextArea
                        name="whatHelpedYou"
                        label={t('whatHelpedYou')}
                        placeholder={t('whatHelpedYouPlaceHolder')}
                        onChange={(e)=>handleFiledChange(e, "whatHelpedYou")}
                        required
                    />

                    <TextArea
                        name="whatTriggeredChange"
                        label={t('whatTriggeredChange')}
                        placeholder={t('whatTriggeredChangePlaceHolder')}
                        onChange={(e)=>handleFiledChange(e, "whatTriggeredChange")}
                        required
                    />

                    <TextArea
                        name="quote"
                        label={t('quote')}
                        placeholder={t('quotePlaceHolder')}
                        onChange={(e)=>handleFiledChange(e, "quote")}
                        required
                    />

                    <TextArea
                        name="additionalnfo"
                        placeholder={t('additionalnfoPlaceHolder')}
                        label={t('additionalnfo')}
                        onChange={(e)=>handleFiledChange(e, "additionalnfo")}
                        required
                    />

                    <input className="submit-button" type="submit"/>
                </form>
            </div>
        </>
    );
});
