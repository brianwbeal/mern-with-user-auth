import React, { useContext } from "react"

import { context } from "./Context"

export const Landing = (props) => {

    const data = useContext(context)

    return (
        <div className="landing">
            {/* <h1>Home</h1>
            <p>{data.contextIsLoggedIn.toString()}</p> */}
        </div>
    )
}
