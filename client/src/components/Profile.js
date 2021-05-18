import React, { useContext } from "react"

import axios from "axios"

import { context } from "./Context"

export const Profile = (props) => {

    const data = useContext(context)

    return (
        <div className="profile">
            <h1>Profile</h1>
            <p>{data.contextIsLoggedIn.toString()}</p>
            <p>Welcome {data.contextCurrentUser.displayName}</p>
            <button onClick={data.actions.handleLogOut}>Log Out</button>
        </div>
    )
}
