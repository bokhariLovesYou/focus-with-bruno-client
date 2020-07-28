import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/index.scss"
// Components
import Header from "./header"
import Footer from "./footer"
// Styled Components
import styled from "styled-components"
const LayoutWrapper = styled.div`
  background-color: #6a299a;
  width: 100%;
  overflow-x: hidden;
  height: 100vh;
  overflow: hidden;
`

const Main = styled.main``

class Layout extends Component {
  render() {
    const { children } = this.props
    return (
      <LayoutWrapper>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </LayoutWrapper>
    )
  }
}

export default Layout
