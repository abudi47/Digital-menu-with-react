import { jwtDecode } from "jwt-decode";

const decodeJwtToken = (token) => {
    try {
        return jwtDecode(token);
    } catch {
        return null;
    }
};

const initialState = {
    user: {
        isAuthenticated: false,
        token: null,
        user: decodeJwtToken(localStorage.getItem("user")),
    },
    appState: {
        isLoading: false,
        error: null,
        alert: {
            show: false,
            message: "Something went wrong try again later",
            type: "info",
            dismiss: 8000,
        },
    },

    newOrder: localStorage.getItem("newOrder") || [],

    orderHistory: localStorage.getItem("orderHistory") || [],
};

function reducer(state = initialState, action) {
    if (action.type === "SET_USER") {
        const newState = Object.assign({}, state);
        newState.user = {
            isAuthenticated: action.payload?.isAuthenticated,
            token: action.payload?.token,
            user: jwtDecode(action.payload?.user),
        };
        localStorage.setItem("user", action.payload?.user);
        return newState;
    } else if (action.type === "DISMISS_ALERT") {
        const newState = Object.assign({}, state);
        newState.appState.alert = {
            show: false,
            message: "Something went wrong try again later",
            type: "info",
            dismiss: 8000,
        };
        return newState;
    } else if (action.type === "SHOW_ALERT") {
        const newState = Object.assign({}, state);
        newState.appState.alert = {
            show: true,
            message: action.payload.message,
            type: action.payload.type,
            dismiss: action.payload?.dismiss || 5000,
        };
        return newState;
    } else if (action.type === "LOGOUT") {
        const newState = Object.assign({}, state);
        newState.user = {
            isAuthenticated: false,
            token: null,
            user: null,
        };
        localStorage.removeItem("user");
        return newState;
    }

    return state;
}

export default reducer;
