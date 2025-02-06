import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import { axiosPrivate } from "../../api/axios";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        e.preventDefault();
        axiosPrivate
            .post("/auth/login", form)
            .then((res) => {
                dispatch({
                    type: "SET_USER",
                    payload: {
                        isAuthenticated: true,
                        token: res.data?.data?.token,
                        user: res.data?.data?.user,
                    },
                });
                dispatch({
                    type: "SHOW_ALERT",
                    payload: {
                        message: res?.data?.message || null,
                        type: "success",
                        dismiss: 9000,
                    },
                });

                navigate("/dashboard");
            })
            .catch((err) => {
                dispatch({
                    type: "SHOW_ALERT",
                    payload: {
                        message: err?.response?.data?.error || null,
                        type: "warning",
                        dismiss: 9000,
                    },
                });
            });
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
                    <form action="" onSubmit={submitHandler}>
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
                                <input type="checkbox" /> Remember me
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
