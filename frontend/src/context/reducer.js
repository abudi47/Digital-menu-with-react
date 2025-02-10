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

    newOrder: JSON.parse(localStorage.getItem("newOrder")) || [],
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
    } else if (action.type === "ADD_TO_CART") {
        const newState = Object.assign({}, state);
        
        const isExist = newState.newOrder.filter((item) => {
            return item.menu?.id === action.payload.menu.menu.id;
        });

        if (isExist.length === 0) {
            newState.newOrder.push(action.payload.menu);
        } else {
            newState.newOrder.map((item) => {
                if (item.menu?.id === action.payload.menu.menu.id) {
                    item.quantity = action.payload.menu.quantity;
                }
            });
        }

        localStorage.setItem("newOrder", JSON.stringify(newState.newOrder));
        return newState;
    } else if (action.type === "REMOVE_FROM_CART") {
        const newState = Object.assign({}, state);
        newState.newOrder = newState.newOrder.filter((item) => {
            return item.menu?.id !== action.payload.menu.id;
        });
        localStorage.setItem("newOrder", JSON.stringify(newState.newOrder));
        return newState;
    }

    return state;
}

export default reducer;
