import React, { Component } from "react"
import PaneWrapper from "./PaneWrapper"

export class Pane extends Component {
  render() {
    return (
      <div className="pane-wrapper">
        <div className="pane-wrapper__contents">
          <PaneWrapper
            currentMonth={this.props.currentMonth}
            selectedDate={this.props.selectedDate}
            tasks={this.props.tasks}
            updateRows={this.props.updateRows}
            handleStatus={this.props.handleStatus}
            changeStatus={this.props.changeStatus}
          />
        </div>
      </div>
    )
  }
}

export default Pane
