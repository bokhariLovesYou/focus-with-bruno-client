import React, { Component } from "react"
import { slugify } from "../util/slugify"

export class PaneStatusLabel extends Component {
  render() {
    return (
      <div
        className={`pane__statusWrapper ${this.props.bolded ? "bolded" : ""}`}
      >
        <div
          className={`pane__status ${slugify(this.props.status.toLowerCase())}`}
          onClick={
            !this.props.bolded
              ? e => this.props.changeStatus(e, `${this.props.taskId}`)
              : this.props.changeStatusSingle
          }
        >
          <span>{this.props.status}</span>
        </div>
        <div>
          <div
            ref={
              this.props.bolded
                ? this.props.inputRefSingle
                : this.props.inputRef
            }
            className={`pane__statusSelectorWrapper ${
              this.props.statusChanger ? "" : "d-none"
            }
            ${this.props.bolded ? "single-task-status-changer" : ""}`}
          >
            <div className="pane__StatusSelectorContents">
              <div className="pane__list">
                <div
                  data-tag={"statusChanger"}
                  className="pane__listItem active"
                  onClick={e =>
                    this.props.handleStatus(e, `${this.props.taskId}__Active`)
                  }
                >
                  <span data-tag={"statusChanger"}>Active</span>
                </div>
                <div
                  data-tag={"statusChanger"}
                  className="pane__listItem almost-there"
                  onClick={e =>
                    this.props.handleStatus(
                      e,
                      `${this.props.taskId}__Almost There`
                    )
                  }
                >
                  <span data-tag={"statusChanger"}>Almost There</span>
                </div>
                <div
                  data-tag={"statusChanger"}
                  className="pane__listItem completed"
                  onClick={e =>
                    this.props.handleStatus(
                      e,
                      `${this.props.taskId}__Completed`
                    )
                  }
                >
                  <span data-tag={"statusChanger"}>Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PaneStatusLabel
