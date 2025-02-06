import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle, Warning, Error, Info, Close } from "@mui/icons-material";

export default function Alert() {
    const dispatch = useDispatch();
    const alert = useSelector((state) => state.appState.alert);

    if (alert.show) {
        setTimeout(() => {
            dispatch({ type: "DISMISS_ALERT" });
        }, alert.dismiss);
    }

    const dismissAlert = () => {
        dispatch({ type: "DISMISS_ALERT" });
    };

    const alertStyles = {
        success: "bg-green-100 border-green-400 text-green-800",
        warning: "bg-yellow-100 border-yellow-400 text-yellow-800",
        error: "bg-red-100 border-red-400 text-red-800",
        info: "bg-blue-100 border-blue-400 text-blue-800",
    };

    const icons = {
        success: <CheckCircle className="text-green-500" />,
        warning: <Warning className="text-yellow-500" />,
        error: <Error className="text-red-500" />,
        info: <Info className="text-blue-500" />,
    };

    if (!alert.show) return null;

    return (
        <div
            className={`absolute top-4 right-8 z-40 min-w-[200px] flex items-center p-4 border-l-4 rounded-md ${alertStyles[alert.type]} max-w-sm mx-auto shadow-md`}
        >
            {icons[alert.type]}
            <span className="ml-3 flex-1 text-sm">{alert.message}</span>
            <Close
                className="cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={() => dismissAlert()}
            />
        </div>
    );
}
