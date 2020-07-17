import React, { Component } from "react"
import SEO from "./seo"
// Components
import Table from "./table"
// Bootstrap
import Container from "react-bootstrap/Container"

export class Tasks extends Component {
  render() {
    const renderTasksByUser = () => {
      return (
        <>
          <SEO title="Home" description="Home" />
          <Table />
        </>
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
