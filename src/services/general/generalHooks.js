import { useState, useCallback } from 'react';

export function useSwitch() {
    const [isEnable, setIsEnable] = useState(true);
    const changeSwitch = useCallback(
        () => setIsEnable(prevEnableTags => !prevEnableTags),
        []
    );

    return { isEnable, changeSwitch };
}
