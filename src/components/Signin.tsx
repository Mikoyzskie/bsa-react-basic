// import { FormEventHandler } from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Header } from "../components/Header"
import { Footer } from "../components/Footer"


const Signin = ({ signups, setUser }: { signups: { [key: string]: FormDataEntryValue }, setUser: React.Dispatch<React.SetStateAction<string | undefined>> }) => {

    // const [signedIn, setSignedIn] = useState<ISignedIn>()
    const [signNotFound, setSignNotFound] = useState<boolean>()

    const navigate = useNavigate()


    const handleSigninSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const data = new FormData(form);

        const formDataObject: { [key: string]: FormDataEntryValue } = {};
        data.forEach((value, key) => {
            formDataObject[key] = value;
        });

        if (formDataObject.email !== signups.email || formDataObject.password !== signups.password) {
            setSignNotFound(true)
        } else {




            setUser(signups["full-name"].toString())
            navigate("/")
            form.reset()
        }



    };

    return <div className="layout__container">
        <Header auth={true} />
        <main className="sign-in-page">
            <h1 className="visually-hidden">Travel App</h1>
            <form onSubmit={handleSigninSubmit} className="sign-in-form" autoComplete="off">
                <h2 className="sign-in-form__title">Sign In</h2>
                <label className="input">
                    <span className="input__heading">Email</span>
                    <input data-test-id="auth-email" name="email" type="email" required />
                </label>
                <label className="input">
                    <span className="input__heading">Password</span>
                    <input
                        data-test-id="auth-password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        minLength={3}
                        maxLength={20}
                    />
                </label>
                {
                    signNotFound && <span>Invalid credentials</span>
                }
                <button data-test-id="auth-submit" className="button" type="submit">
                    Sign In
                </button>
            </form>
            <span>
                Don't have an account?&nbsp;
                <Link
                    data-test-id="auth-sign-up-link"
                    to="/sign-up"
                    className="sign-in-form__link"
                >
                    Sign Up
                </Link>
            </span>
        </main>
        <Footer />
    </div>

}

export { Signin }