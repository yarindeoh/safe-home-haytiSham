export function extractFieldsFromObj(obj, fields) {
    let res = {};
    Object.keys(obj).map((item) => {
        if (fields.includes(item)) {
            res[item] = obj[item];
        }
    });
    return res;
}