import React, { Component } from "react"
import { navigate } from "gatsby"

export class IndexPage extends Component {
  render() {
    const redirectToLogin = () => {
      if (typeof window !== `undefined`) {
        navigate(`/a/login`)
      }
    }

    return <>{redirectToLogin()}</>
  }
}

export default IndexPage
