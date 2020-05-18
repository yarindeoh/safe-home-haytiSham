export function extractFieldsFromObj(obj, fields) {
    let res = {};
    Object.keys(obj).map((item) => {
        if (fields.includes(item)) {
            res[item] = obj[item];
        }
    });
    return res;
}

export const changeLocationByPath = (history, path, params) => {
    history.push(path, params);
};
