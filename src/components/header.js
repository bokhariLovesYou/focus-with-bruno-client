import React, { Component } from "react"
// Bootstrap
import Container from "react-bootstrap/Container"
// Styled Components
import styled from "styled-components"
import { Span, LogoWrapper, LogoBox, LogoSpan } from "./styledElements"
import { logout, getUser } from "../util/auth"

const HeaderOuterWrapper = styled.div`
  padding: 1rem 0;
`
const HeaderInnerWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`
const AccountWrapper = styled.div``

const AccountContent = styled.div`
  font-weight: 600;
  background-color: #fff;
  color: #6a299a;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  &:hover {
    background-color: #eee;
    cursor: pointer;
  }
`

export class Header extends Component {
  render() {
    console.log(getUser())
    return (
      <HeaderOuterWrapper>
        <Container>
          <HeaderInnerWrapper>
            {/* Logo */}
            <LogoWrapper>
              <LogoBox>
                <LogoSpan>fo.</LogoSpan>
              </LogoBox>
            </LogoWrapper>
            {/* //Logo */}
            {/* Account */}
            <AccountWrapper>
              <AccountContent>
                <Span onClick={logout}>Log out</Span>
              </AccountContent>
            </AccountWrapper>
            {/* //Account */}
          </HeaderInnerWrapper>
        </Container>
      </HeaderOuterWrapper>
    )
  }
}

export default Header
