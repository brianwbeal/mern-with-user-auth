import React, { useEffect, useState } from "react"

import axios from "axios"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom"

import { Provider } from "./components/Context"

import { Header } from "./components/Header"
import { Footer } from "./components/Footer"

import { Landing } from "./components/Landing"
import { Signup } from "./components/Signup"
import { Login } from "./components/Login"
import { Profile } from "./components/Profile"

const App = () => {

    /* App state */
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ latestJWT, setLatestJWT ] = useState("")
    const [ currentUser, setCurrentUser ] = useState({
        id: "",
        email: "",
        password: "",
        displayName: ""
    })

    /* sign up handler */
    const handleSignUp = (email, password, displayName) => {
        axios.post('http://localhost:5000/api/users', {
            email: email,
            password: password,
            displayName: displayName
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    /* sign in handler */
    const handleLogIn = (email, password) => {
        axios.post('http://localhost:5000/login', {
            email: email,
            password: password
        })
        .then((response) => {
            console.log(response)

            // persist to app state
            setIsLoggedIn(response.data.isLoggedIn)
            setLatestJWT(response.data.jwt)
            setCurrentUser({
                id: response.data.user.id,
                email: response.data.user.email,
                password: response.data.user.password,
                displayName: response.data.user.displayName 
            })

            // persist to localStorage 
            localStorage.setItem('isLoggedIn', JSON.stringify(response.data.isLoggedIn))
            localStorage.setItem('latestJWT', response.data.jwt)
            localStorage.setItem('currentUser', JSON.stringify({
                id: response.data.user.id,
                email: response.data.user.email,
                password: response.data.user.password,
                displayName: response.data.user.displayName 
            }))
        })
        .catch(err => console.log(err))
    }

    /* sign out handler */
    const handleLogOut = () => {
        // set app state
        setIsLoggedIn(false)
        setLatestJWT("")
        setCurrentUser({
            id: "",
            email: "",
            password: "",
            displayName: ""
        })

        // set localStorage
        localStorage.setItem('isLoggedIn', JSON.stringify(false))
        localStorage.setItem('latestJWT', "")
        localStorage.setItem('currentUser', "")
    }

    /* useEffect function */    
    useEffect(() => {
        // check localStorage & persist to app state
        const checkIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
        if (!checkIsLoggedIn) {
            // do nothing, user not logged in (proceed with default app state)
        } else {
            const isLoggedIn = checkIsLoggedIn
            const latestJWT = localStorage.getItem('latestJWT')
            const currentUser = JSON.parse(localStorage.getItem('currentUser'))

            // set app state
            setIsLoggedIn(isLoggedIn)
            setLatestJWT(latestJWT)
            setCurrentUser({
                id: currentUser.id,
                email: currentUser.email,
                password: currentUser.password,
                displayName: currentUser.displayName
            })  
        }
    }, [])


    
    return (
        /* context & default state values */
        <Provider value={{
            contextIsLoggedIn: isLoggedIn,
            contextLatestJWT: latestJWT,
            contextCurrentUser: currentUser,
            actions: {
                handleSignUp,
                handleLogIn,
                handleLogOut
            }
        }}>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/profile">
                        {
                            isLoggedIn
                            ? <Profile />
                            : <Redirect to="/login" />
                        }
                    </Route>
                    <Route exact path="/signup">
                        <Signup />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route path="/">
                        <Landing />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </Provider>
    )
}

export default App