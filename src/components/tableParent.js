import React, { Component } from "react"

export class TableParent extends Component {
  render() {
    const { children } = this.props
    return <div>{children}</div>
  }
}

export default TableParent
