// add JsDoc standard documentation for this file
/**
 * @module backend/utils/utils
 * @file utils.js
 * @description Helper utility functions
 */
export function isUuidv4(uuid) {
    const uuidv4Regex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
    return uuidv4Regex.test(uuid);
}
