// Defaults
import React, { Component } from "react"
import SEO from "../components/seo"
import { Link, navigate } from "gatsby"
// Bootstrap
import Container from "react-bootstrap/Container"
import Spinner from "react-bootstrap/Spinner"
// Axios
import axios from "axios"
import { baseURL } from "../base/axios.js"
// Authentication
import { isLoggedIn, decodeJWT } from "../util/auth"
// Styled Elements
import {
  Section,
  ContentBox,
  FormWrapper,
  Form,
  InputField,
  Button,
  FancyInputWrapper,
  FancyInputIcon,
  FancyInput,
  FormTitle,
  RegisterWrapper,
  ErrorHelper,
  ContentBoxForm,
  ContentBoxMessage,
  LogoWrapper,
  LogoBox,
  LogoSpan,
} from "../components/styledElements"

export class Signup extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
    loading: false,
    errors: {},
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({
      loading: true,
    })
    const userData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    }
    axios
      .post(`${baseURL}/signup`, userData)
      .then(res => {
        console.log(res.data)
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`)
        this.setState({
          loading: false,
        })
        if (typeof window !== `undefined`) {
          navigate(`/a/tasks/${decodeJWT(res.data.token).user_id}`)
        }
      })
      .catch(err => {
        console.log(err.response.data)
        this.setState({
          errors: err.response.data,
          loading: false,
        })
      })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { errors, loading } = this.state
    const checkLoading = () => {
      if (loading) {
        return (
          <div className="spinner-wrapper">
            <Spinner
              animation="border"
              role="status"
              className="bootstrap--loader"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )
      }
    }
    const checkAuthentication = () => {
      if (!isLoggedIn()) {
        return (
          <RegisterWrapper>
            <SEO title="Register" description="Register" />
            <Section>
              <Container>
                <ContentBox>
                  {/* Logo */}
                  <LogoWrapper MW400 className="ml-auto mr-auto mb-4">
                    <LogoBox Inverted Large className="ml-auto mr-auto">
                      <LogoSpan Inverted Large>
                        fo.
                      </LogoSpan>
                    </LogoBox>
                  </LogoWrapper>
                  {/* //Logo */}
                  <FormWrapper>
                    <Form noValidate onSubmit={this.handleSubmit}>
                      <FormTitle>Create an account.</FormTitle>
                      <InputField>
                        <FancyInputWrapper>
                          <FancyInputIcon>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              className="icon-email"
                            >
                              <path
                                fillRule="evenodd"
                                fill="#bbb"
                                d="M1 8.5V5.498c0-.283.183-.37.41-.212l3.764 2.636c.466.326 1.196.32 1.652 0l3.765-2.636c.22-.153.409-.063.409.212V8.5A1.5 1.5 0 0 1 9.503 10H2.497A1.5 1.5 0 0 1 1 8.5zm0-4.904v-.088C1 2.666 1.67 2 2.497 2h7.006C10.328 2 11 2.675 11 3.508v.088c0 .284-.19.62-.426.756L6.87 6.496c-.479.277-1.26.278-1.742 0L1.426 4.352C1.19 4.216 1 3.877 1 3.596z"
                              ></path>
                            </svg>
                          </FancyInputIcon>
                          <FancyInput
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                          />
                        </FancyInputWrapper>
                        {errors.email ? (
                          <ErrorHelper>{errors.email}</ErrorHelper>
                        ) : (
                          ""
                        )}
                      </InputField>
                      <InputField>
                        <FancyInputWrapper>
                          <FancyInputIcon>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              className="icon-email"
                            >
                              <path
                                fillRule="evenodd"
                                fill="#bbb"
                                d="M10,6.0000001 L10,5 C10,2.99999988 8.209,1 6,1 C3.791,1 2,2.97508333 2,5 L2,6.0000001 C1.44771525,6.0000001 1,6.45097524 1,6.99077799 L1,11.0092217 C1,11.5564132 1.4556644,11.9999996 1.99539757,11.9999996 L10.0046024,11.9999996 C10.5543453,11.9999996 11,11.5490245 11,11.0092217 L11,6.99077799 C11,6.44358647 10.546814,6.0000001 10,6.0000001 L10,6.0000001 Z M4,6 L8,6 L8,5 C8,5 8,3 6,3 C4,3 4,5 4,5 L4,6 L4,6 Z"
                              ></path>
                            </svg>
                          </FancyInputIcon>
                          <FancyInput
                            type="password"
                            name="password"
                            maxlength="3000"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                          />
                        </FancyInputWrapper>
                        {errors.password ? (
                          <ErrorHelper>{errors.password}</ErrorHelper>
                        ) : (
                          ""
                        )}
                      </InputField>
                      <InputField>
                        <FancyInputWrapper>
                          <FancyInputIcon>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              className="icon-email"
                            >
                              <path
                                fillRule="evenodd"
                                fill="#bbb"
                                d="M10,6.0000001 L10,5 C10,2.99999988 8.209,1 6,1 C3.791,1 2,2.97508333 2,5 L2,6.0000001 C1.44771525,6.0000001 1,6.45097524 1,6.99077799 L1,11.0092217 C1,11.5564132 1.4556644,11.9999996 1.99539757,11.9999996 L10.0046024,11.9999996 C10.5543453,11.9999996 11,11.5490245 11,11.0092217 L11,6.99077799 C11,6.44358647 10.546814,6.0000001 10,6.0000001 L10,6.0000001 Z M4,6 L8,6 L8,5 C8,5 8,3 6,3 C4,3 4,5 4,5 L4,6 L4,6 Z"
                              ></path>
                            </svg>
                          </FancyInputIcon>
                          <FancyInput
                            type="password"
                            name="confirmPassword"
                            maxlength="3000"
                            placeholder="Confirm Password"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                          />
                        </FancyInputWrapper>
                        {errors.confirmPassword ? (
                          <ErrorHelper>{errors.confirmPassword}</ErrorHelper>
                        ) : (
                          ""
                        )}
                      </InputField>
                      <InputField>
                        <FancyInputWrapper>
                          <FancyInput
                            NoPad
                            type="handle"
                            name="handle"
                            maxlength="3000"
                            placeholder="@handle"
                            value={this.state.handle}
                            onChange={this.handleChange}
                          />
                        </FancyInputWrapper>
                        {errors.handle ? (
                          <ErrorHelper>{errors.handle}</ErrorHelper>
                        ) : (
                          ""
                        )}
                        {errors.error ? (
                          <ErrorHelper>{errors.error}</ErrorHelper>
                        ) : (
                          ""
                        )}
                      </InputField>
                      <InputField Last>
                        <Button Submit type="submit">
                          Sign up
                        </Button>
                      </InputField>
                      {checkLoading()}
                    </Form>
                  </FormWrapper>
                  <ContentBoxForm>
                    <ContentBoxMessage>
                      Already have an account?
                    </ContentBoxMessage>
                    <Link to="/a/login">Sign in</Link>
                  </ContentBoxForm>
                </ContentBox>
              </Container>
            </Section>
          </RegisterWrapper>
        )
      } else {
        if (typeof window !== `undefined`) {
          navigate(
            `/a/tasks/${decodeJWT(window.localStorage.FBIdToken).user_id}`
          )
        }
      }
    }
    return <>{checkAuthentication()}</>
  }
}

export default Signup
