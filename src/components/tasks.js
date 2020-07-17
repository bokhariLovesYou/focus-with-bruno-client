import React, { Component } from "react"
import SEO from "./seo"
// Components
import Table from "./table"
import Layout from "./layout"

export class Tasks extends Component {
  render() {
    const renderTasksByUser = () => {
      return (
        <>
          <Layout>
            <SEO title="Home" description="Home" />
            <Table />
          </Layout>
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
