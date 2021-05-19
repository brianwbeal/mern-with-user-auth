import React, { useContext, useState } from "react"

import { context } from "./Context"

export const Signup = (props) => {

    const data = useContext(context)

    const [ inputEmail, setInputEmail ] = useState("")
    const [ inputPassword, setInputPassword ] = useState("")
    const [ inputDisplayName, setInputDisplayName ] = useState("")
    const [ submission, setSubmission ] = useState("")

    const formSignUpHandler = (e) => {
        e.preventDefault()
        const email = inputEmail;
        const password = inputPassword;
        const displayName = inputDisplayName;

        data.actions.handleSignUp(email, password, displayName)

        setSubmission(email)
    }

    return (
        <div className="signup">
            <h1>Sign Up</h1>
            {/* <p>{data.contextIsLoggedIn.toString()}</p> */}
            <form onSubmit={formSignUpHandler}>
                <input
                    type="text"
                    name="email"
                    value={inputEmail}
                    onChange={e => setInputEmail(e.target.value)}
                />
                <input
                    type="text"
                    name="password"
                    value={inputPassword}
                    onChange={e => setInputPassword(e.target.value)}
                />
                <input
                    type="text"
                    name="displayName"
                    value={inputDisplayName}
                    onChange={e => setInputDisplayName(e.target.value)}
                />
                <input type="submit" value="sign up" />
            </form>
            {/* <p>submitted: {submission}</p> */}
        </div>
    )
}
