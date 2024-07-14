import { FormEventHandler } from 'react'
import { Link } from 'react-router-dom'

import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

const Signup = ({ onSubmit, message }: { onSubmit: FormEventHandler<HTMLFormElement> | undefined, message: boolean }) => {
    return <div className="layout__container">
        <Header auth={true} />
        <main className="sign-up-page">
            <h1 className="visually-hidden">Travel App</h1>
            <form onSubmit={onSubmit} className="sign-up-form" autoComplete="off">
                <h2 className="sign-up-form__title">Sign Up</h2>
                <label className="input">
                    <span className="input__heading">Full name</span>
                    <input
                        data-test-id="auth-full-name"
                        name="full-name"
                        type="text"
                        required
                    />
                </label>
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

                {message && <span>Please sign in</span>}

                <button data-test-id="auth-submit" className="button" type="submit">
                    Sign Up
                </button>
            </form>
            <span>
                Already have an account?&nbsp;
                <Link
                    data-test-id="auth-sign-in-link"
                    to="/sign-in"
                    className="sign-up-form__link"
                >
                    Sign In
                </Link>
            </span>
        </main>
        <Footer />
    </div>

}

export { Signup }