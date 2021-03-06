export function extractFieldsFromObj(obj, fields) {
    let res = {};
    Object.keys(obj).map(item => {
        if (fields.includes(item)) {
            res[item] = obj[item];
        }
    });
    return res;
}

export function extractFieldsFromObjOrdered(obj, fields) {
    let res = [];
    fields.forEach(element => {
        //display just the question with answer
        if (obj && obj[element] !== undefined && obj[element] !== '') {
            res.push({ text: obj[element], titleKey: element });
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

export const getTagsAsArray = obj => {
    let arr = [];
    for (let item in obj) {
        arr.push({ value: item, label: obj[item] });
    }
    return arr;
};

export const getArrayOfTagsIds = arr => {
    return arr.map(item => item.value);
};

export const filterObjByKey = (raw, allowed) => {
    return (
        raw &&
        Object.keys(raw)
            .filter(key => allowed.includes(parseInt(key)))
            .reduce((obj, key) => {
                return {
                    ...obj,
                    [key]: raw[key]
                };
            }, {})
    );
};
