import axios from "axios";
import packageJson from "../../package.json";

export default axios.create({
    baseURL: packageJson.proxy,
    headers: { "Content-Type": "application/json" },
});

export const axiosPrivate = axios.create({
    baseURL: packageJson.proxy,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
