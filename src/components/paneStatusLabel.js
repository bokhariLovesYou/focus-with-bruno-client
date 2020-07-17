import React, { Component } from "react"
import { slugify } from "../util/slugify"

export class PaneStatusLabel extends Component {
  componentWillMount() {
    if (typeof document !== `undefined`) {
      document.addEventListener("mousedown", this.handleClick, false)
    }
  }

  componentWillUnmount() {
    if (typeof document !== `undefined`) {
      document.removeEventListener("mousedown", this.handleClick, false)
    }
  }
  handleClick = e => {
    if (this.node.contains(e.target)) {
      return
    } else {
      this.props.closeChangeStatus()
      // console.log(e.target[0])
      console.log(this.node)
    }
  }

  render() {
    return (
      <div className="pane__statusWrapper">
        <div
          className={`pane__status ${slugify(this.props.status.toLowerCase())}`}
          onClick={e => this.props.changeStatus(e, `${this.props.taskId}`)}
        >
          <span>{this.props.status}</span>
        </div>
        <div>
          <div
            className={`pane__statusSelectorWrapper ${
              this.props.statusChanger ? "" : "d-none"
            }`}
          >
            <div
              className="pane__StatusSelectorContents"
              ref={node => (this.node = node)}
            >
              <div className="pane__list">
                <div
                  className="pane__listItem active"
                  onClick={e =>
                    this.props.handleStatus(e, `${this.props.taskId}__Active`)
                  }
                >
                  <span>Active</span>
                </div>
                <div
                  className="pane__listItem almost-there"
                  onClick={e =>
                    this.props.handleStatus(
                      e,
                      `${this.props.taskId}__Almost There`
                    )
                  }
                >
                  <span>Almost There</span>
                </div>
                <div
                  className="pane__listItem completed"
                  onClick={e =>
                    this.props.handleStatus(
                      e,
                      `${this.props.taskId}__Completed`
                    )
                  }
                >
                  <span>Completed</span>
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
