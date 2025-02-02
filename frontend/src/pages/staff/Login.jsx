import React from "react";
import TextField from "../../components/TextField";

export default function Login() {
    return (
        <div className="flex flex-row h-[100vh]">
            <div className="border border-green-500 flex-1">Login</div>
            <div className="border border-green-500 flex flex-1 justify-center items-center">
                <div className="border border-green-500 w-96">
                    <form action="">
                        <h2 className="text-3xl text-center font-semibold text-gray-800">USER LOGIN</h2>
                        <TextField
                            placeholder="Enter your email or phone no"
                            type="text"
                            title="Email or Phone"
                            fieldStyle="w-full"
                            containerStyle="mt-4"
                            required={true}
                        />
                        <TextField
                            placeholder="*********"
                            type="password"
                            title="Password"
                            fieldStyle="w-full"
                            containerStyle="mt-4"
                            required={true}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
