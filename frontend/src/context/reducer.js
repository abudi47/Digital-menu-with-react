import { jwtDecode } from "jwt-decode";

const decodeJwtToken = (token) => {
    try {
        return jwtDecode(token)
    } catch {
        return null;
    }
} 

const initialState = {
    user: {
        isAuthenticated: false,
        token: null,
        user: decodeJwtToken(localStorage.getItem('user')),
    },
    appState: {
        isLoading: false,
        error: null,
        alert: {
            show: false,
            message: "",
            type: "info",
            dismiss: 8000,
        },
    },
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
    }

    return state;
}

export default reducer;
