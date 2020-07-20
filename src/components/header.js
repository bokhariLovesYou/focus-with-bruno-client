import React, { Component } from "react"
// Bootstrap
import Container from "react-bootstrap/Container"
// Styled Components
import styled from "styled-components"
import { Span } from "./styledElements"
import { logout } from "../util/auth"

const LogoWrapper = styled.div``
const LogoBox = styled.div`
  background-color: #fff;
  width: 50px;
  height: 25px;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
`
const LogoSpan = styled.span`
  font-size: 1.1rem;
  color: #6a299a;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 600;
`
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
