import React, { useContext } from "react"

import { context } from "./Context"

export const Footer = (props) => {

    const data = useContext(context)

    return (
        <div className="footer">
            {/* <h1>Footer</h1>
            <p>{data.contextIsLoggedIn.toString()}</p> */}
        </div>
    )
}
