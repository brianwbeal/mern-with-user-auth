import React, { useContext } from "react"

import { context } from "./Context"

import {
    Link
} from "react-router-dom"

export const Header = () => {

    const data = useContext(context)

    return (
        <div>
            <header className="header">
                <div className="header-container">
                    <div className="header-app">
                        <h1>App</h1>
                    </div>
                    <div className="header-user">
                        {
                            data.contextIsLoggedIn
                            ? <div><i className="fas fa-user-circle"></i></div>
                            : <Link to="/login" >Login</Link>
                        }
                    </div>
                    <div className="header-nav">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/signup">Sign Up</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/Profile">Profile</Link></li>
                        </ul>
                    </div>
                </div>
            </header>
        </div>
    )
}
