import React, { useState } from "react";
import TextField from "../../components/TextField";
import Button from "../../components/Button";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        phone: "",
        password: "",
    });

    const changeHandler = (e) => {        
        setForm((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const submitHandler = async (e) => {
        
    };

    return (
        <div className="flex flex-row h-[100vh]">
            <div className="flex flex-1 items-center justify-center bg-primary">
                <div className="w-[80%] px-8">
                    <h1 className="text-white text-5xl font-semibold">
                        Welcome Back
                    </h1>
                    <h2 className="text-white text-right text-base pb-40">
                        Have a nice work day
                    </h2>
                </div>
            </div>
            <div className="flex flex-1 justify-center items-center">
                <div className="border rounded-lg w-[60%] px-4 shadow-lg">
                    <form action="">
                        <h2 className="text-3xl text-center font-semibold text-gray-800 my-8">
                            USER LOGIN
                        </h2>
                        <TextField
                            placeholder="Enter your email or phone no"
                            type="text"
                            title="Email or Phone"
                            fieldStyle="w-full"
                            containerStyle="mt-4"
                            required={true}
                            name="email"
                            changeHandler={changeHandler}
                            value={form.email}
                        />
                        <TextField
                            placeholder="*********"
                            type="password"
                            title="Password"
                            fieldStyle="w-full"
                            containerStyle="mt-6"
                            required={true}
                            name="password"
                            changeHandler={changeHandler}
                            value={form.password}
                        />

                        <div className="flex flex-row mt-6">
                            <div className="flex-1">
                                <input
                                    type="checkbox"
                                />{" "}
                                Remember me
                            </div>

                            <div>
                                <a href="" className="text-blue-600">
                                    Forget password?
                                </a>
                            </div>
                        </div>

                        <Button
                            text="LOGIN"
                            containerStyle="w-full my-8"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
