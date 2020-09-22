import { useState, useCallback, useEffect } from 'react';
import { getBreakpoint } from './breakpoints';

export function useSwitch() {
    const [isEnable, setIsEnable] = useState(true);
    const changeSwitch = useCallback(
        () => setIsEnable(prevEnableTags => !prevEnableTags),
        []
    );

    return { isEnable, changeSwitch };
}

export function useResize() {
    const [breakpoint, setBreakpoint] = useState(getBreakpoint());

    useEffect(() => {
        function handleResize() {
            setBreakpoint(getBreakpoint());
        }

        window.addEventListener('resize', handleResize);

        return _ => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return breakpoint;
}
