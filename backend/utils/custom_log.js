import { query } from "express";

const color = {
    reset: '\x1b[0m',
    red: '\x1b[311m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
}

const customLog = {
    success(message) {
        console.log(color.green, `[Success]`, color.reset, message);
    },
    error(message) {
        console.log(color.red, `[Error]`, color.reset, message);
    },
    warning(message) {
        console.log(color.magenta, `[Warning]`, color.reset, message);
    },
    query(message) {
        console.log(color.cyan, `[Query]`, color.reset, message);
    }
}

export default customLog;
