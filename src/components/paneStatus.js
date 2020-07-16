import React, { Component } from "react"

export class PaneStatus extends Component {
  render() {
    return (
      <div className="pane__status-wrapper">
        <div className="pane__sub-header pane-horizontal-default-padding pane__sub-header__status">
          <div className="pane__sub-header__contents">
            <span className="pane__sub-header__title">Status</span>
          </div>
        </div>
        <div className="pane__contents">
          <div className="pane__row pane-horizontal-default-padding">
            <div className="pane__column">
              {/*  */}
              {this.props.tasks.map((item, key) => (
                <div className="pane__statusWrapper" key={key}>
                  <div className="pane__status">
                    <span>{item["status"]}</span>
                  </div>
                </div>
              ))}
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PaneStatus
