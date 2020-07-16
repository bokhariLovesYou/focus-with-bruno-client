import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from "../util/auth"
const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/a/login`) {
    navigate("/a/login")
    return null
  }
  return <Component {...rest} />
}
export default PrivateRoute
