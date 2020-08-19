import React, { useState } from 'react';

import { addStoryDataInit } from 'containers/AddStory/addStoryConstants';
export const AddStoryContext = React.createContext({});

export function AddStoryProvider({ children }) {
    const [addStoryData, setAddStoryData] = useState(addStoryDataInit);
    return (
        <AddStoryContext.Provider value={{ addStoryData, setAddStoryData }}>
            {children}
        </AddStoryContext.Provider>
    );
}
