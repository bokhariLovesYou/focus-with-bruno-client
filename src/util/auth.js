import jwtDecode from "jwt-decode"

export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.FBIdToken
    ? jwtDecode(window.localStorage.FBIdToken)
    : {}

export const isLoggedIn = () => {
  const user = getUser()
  return !!user.email
}

export const logout = callback => {
  callback()
}

export const decodeJWT = token => {
  return jwtDecode(token)
}

export const getToken = token => {
  return window.localStorage.FBIdToken
}