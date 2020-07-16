import React, { Component } from "react"
import SEO from "./seo"
// Components
import Layout from "./layout"
import Table from "./table"
// Bootstrap
// import Container from "react-bootstrap/Container"
// import Spinner from "react-bootstrap/Spinner"
// Axios
// import axios from "axios"
// import { baseURL } from "../base/axios.js"

export class Tasks extends Component {
  state = {
    tasks: null,
    loading: false,
  }

  // componentDidMount() {
  //   this.setState({
  //     loading: true,
  //   })
  //   const userId = window.location.href.split("/")[5]
  //   axios
  //     .get(`${baseURL}/tasks/${userId}`)
  //     .then(res => {
  //       console.log(res)
  //       if (res.data.length > 0) {
  //         console.log(res.data)
  //         this.setState({
  //           tasks: res.data,
  //           loading: false,
  //         })
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err.response.data)
  //       this.setState({
  //         loading: false,
  //       })
  //     })
  // }

  render() {
    const { tasks, loading } = this.state
    // const checkLoading = () => {
    //   if (loading) {
    //     return (
    //       <div className="spinner-wrapper">
    //         <Spinner
    //           animation="border"
    //           role="status"
    //           className="bootstrap--loader"
    //         >
    //           <span className="sr-only">Loading...</span>
    //         </Spinner>
    //       </div>
    //     )
    //   }
    // }

    const renderTasksByUser = () => {
      // if (loading) {
      //   return <p>Loading...</p>
      // }
      // if (tasks) {
      //   return <>Task Found!</>
      // } else {
      //   return <p>You haven't yet created a task! Please create a task</p>
      // }
      return (
        <Layout>
          <SEO title="Home" description="Home" />
          <Table>
            <div></div>
          </Table>
        </Layout>
      )
    }

    return (
      <>
        <SEO title="Home" />
        {renderTasksByUser()}
      </>
    )
  }
}

export default Tasks
