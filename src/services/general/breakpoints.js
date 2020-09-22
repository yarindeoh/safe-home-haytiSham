export const BREAKPOINT_MAP = {
    BREAKPOINT_1: 'BREAKPOINT_1',
    BREAKPOINT_2: 'BREAKPOINT_2'
};

export const getBreakpoint = () => {
    const { innerWidth } = window;
    if (innerWidth <= 480) {
        return BREAKPOINT_MAP.BREAKPOINT_1
    } else {
        return BREAKPOINT_MAP.BREAKPOINT_2;
    }
};
