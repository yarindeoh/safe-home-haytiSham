export function extractFieldsFromObj(obj, fields) {
    let res = {};
    Object.keys(obj).map(item => {
        if (fields.includes(item)) {
            res[item] = obj[item];
        }
    });
    return res;
}

export const changeLocationByPath = (history, path, params) => {
    history.push(path, params);
};

export const getSlicedTagsObj = (obj, start, end) => {
    return Object.keys(obj)
        .slice(start, end)
        .reduce((result, key) => {
            result[key] = obj[key];

            return result;
        }, {});
};

export const getTagsAsArray = (obj) => {
    let arr = []
    for (let item in obj){
        arr.push({id: item, name: obj[item]})
    }
    return arr;
};