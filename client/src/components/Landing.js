import React, { useContext, useState } from "react"

import axios from 'axios'

import { Redirect } from "react-router-dom"

import { context } from "./Context"

export const Landing = (props) => {

    const data = useContext(context)
    const [ items, setItems ] = useState([])

    const testHandler = () => {
        axios.get('http://localhost:5000/api/items', {}, {
            headers: {
                'jwt': data.contextLatestJWT
            }
        })
        .then((response) => {
            const items = response.data
            setItems(items)
        })
    }

    return (
        <div className="Home">
            <h1>Home</h1>
            <p>{data.contextIsLoggedIn.toString()}</p>
            <button onClick={testHandler}>Populate</button>
            <ul>
                {
                    items.map((item) => {
                        return <li>{item.title}</li>
                    })
                }
            </ul>
        </div>
    )
}
