import React, { useContext } from "react"

import { context } from "./Context"

import {
    Link
} from "react-router-dom"

export const Header = () => {

    const data = useContext(context)

    return (
        <div className="header">
            <div className="header-container">
                <div className="header-space">
                </div>
                <div className="header-logo">
                    <Link to="/">App</Link>
                </div>
                <div className="header-nav">
                    {
                        data.contextIsLoggedIn
                        ? <Link to="/profile"><i class="far fa-user-circle"></i></Link>
                        : <Link to="/login"><span>Login</span></Link>
                    }
                </div>
            </div>
        </div>
    )
}
