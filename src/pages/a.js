import React from "react"
import { Router } from "@reach/router"

// Login, Signup
import Login from "../components/login"
import Signup from "../components/Signup"
import Tasks from "../components/tasks"

// Authentication
import jwtDecode from "jwt-decode"
import PrivateRoute from "../util/privateRoute"
import { logout } from "../util/auth"

const token = window.localStorage.FBIdToken
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    logout()
  }
}

const App = () => {
  return (
    <Router basepath="/a">
      <Login path="/login" />
      <Signup path="/signup" />
      <PrivateRoute path="/tasks/:id" component={Tasks} />
    </Router>
  )
}

export default App
