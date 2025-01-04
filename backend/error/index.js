import BadRequest from "./bad_request.js";
import UnauthorizedRequest from "./unauthorized_request.js";
import NotFound from "./not_found.js";

const CustomError = { BadRequest, UnauthorizedRequest, NotFound };

export default CustomError;
