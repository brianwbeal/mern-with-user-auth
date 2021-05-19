import React, { useContext, useState } from "react"

import { context } from "./Context"

import {
    Link
} from "react-router-dom"

export const Login = (props) => {

    const data = useContext(context)

    const [ inputEmail, setInputEmail ] = useState("")
    const [ inputPassword, setInputPassword ] = useState("")

    const formLogInHandler = (e) => {
        e.preventDefault()
        const email = inputEmail;
        const password = inputPassword;

        data.actions.handleLogIn(email, password)
    }

    return (
        <div className="login">
            <h1>Log In</h1>
            {/* <p>{data.contextIsLoggedIn.toString()}</p> */}
            <form onSubmit={formLogInHandler}>
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
                <input type="submit" value="log in" />
            </form>
            <Link to="/signup">Sign Up</Link>
        </div>
    )
}
