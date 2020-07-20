import React, { Component } from "react"
import { Link } from "gatsby"
import PaneStatusLabel from "./paneStatusLabel"
// Axios
import axios from "axios"
import { baseURL } from "../base/axios.js"
// Authentication
import { decodeJWT, getToken } from "../util/auth"
// NProgress
import NProgress from "nprogress"
import "nprogress/nprogress.css"

export class PaneTitle extends Component {
  state = {
    addTask: false,
    taskAdded: false,
    taskTitle: "",
    newTasks: [],
    newTaskMonth: "",
    loading: false,
  }

  renderAddTaskInput = (e, data) => {
    this.setState({
      addTask: true,
      newTaskMonth: data,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    if (e.target.value.trim() !== "") {
      this.setState({
        loading: true,
      })
      NProgress.inc()
      const config = {
        headers: {
          Authorization: "Bearer " + getToken().split("Bearer ").pop(),
        },
      }
      const newTaskData = {
        body: "",
        createdAt: new Date().toISOString(),
        dueDate: e.target.id,
        title: e.target.value,
        status: "Active",
        statusChanger: false,
        userHandle: "",
        userId: decodeJWT(getToken()).user_id,
      }
      axios
        .post(`${baseURL}/task/`, newTaskData, config)
        .then(res => {
          const taskId = res.data.message.split(" ")[1].toString()
          console.log(taskId)
          this.setState({
            addTask: false,
            loading: false,
          })
          newTaskData.taskId = taskId
          this.props.updateRows(newTaskData)
          NProgress.done()
        })
        .catch(err => {
          console.log(err)
          this.setState({
            loading: false,
          })
          NProgress.done()
        })
    } else {
      this.setState({
        addTask: false,
      })
    }
  }

  handleKeyDown = e => {
    if (e.keyCode === 27) {
      this.setState({
        addTask: false,
      })
    } else if (e.keyCode === 13) {
      e.target.blur()
    }
  }

  render() {
    return (
      <>
        {/* Pane Title */}
        <div className="pane__title-wrapper">
          <div className="pane__sub-header pane-horizontal-default-padding">
            <div className="pane__sub-header__contents pane__sub-header__contents__title">
              <span className="pane__sub-header__title">{this.props.day}</span>
            </div>
          </div>
          <div className="pane__contents">
            <div className="pane__row pane-horizontal-default-padding">
              <div className="pane__labelDateWrapper d-flex">
                <div className="pane__column">
                  <div className="pane__dateWrapper">
                    <div className="pane__date">
                      <span>{this.props.date}</span>
                    </div>
                  </div>
                </div>

                <div className="pane__column">
                  <div className="pane__labelColorWrapper">
                    <div className="pane__labelColor"></div>
                  </div>
                </div>
              </div>

              <div className="pane__column mr-0">
                {!this.props.loading ? (
                  this.props.tasks.map((item, key) => (
                    <Link
                      onClick={e =>
                        this.props.renderTaskDetails(e, item["taskId"])
                      }
                      key={key}
                      to={`?task_id=${item["taskId"]}`}
                    >
                      <div className="pane__titleWrapper">
                        <div className="pane__title">
                          <span>{item["title"]}</span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <>
                    <div className="loading-skeleton"></div>
                    <div className="loading-skeleton medium"></div>
                    <div className="loading-skeleton small"></div>
                  </>
                )}

                {this.state.addTask &&
                this.props.currentMonth === this.state.newTaskMonth ? (
                  <div className="pane__addTaskInputWrapper">
                    <div className="pane__addTaskInputContents">
                      <input
                        autoFocus
                        name="taskTitle"
                        placeholder="Add a To-Do"
                        value={this.state.term}
                        onKeyDown={this.handleKeyDown}
                        id={this.props.ISODate}
                        onBlur={this.handleSubmit}
                        onChange={e =>
                          this.setState([
                            ...this.state.newTasks,
                            e.target.value,
                          ])
                        }
                        className="pane__addTaskInput"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="pane__titleWrapper pane__addTaskWrapper">
                  <div
                    className="pane__addTask d-flex align-items-center"
                    onClick={e =>
                      this.renderAddTaskInput(e, this.props.currentMonth)
                    }
                  >
                    {!this.props.loading ? (
                      <>
                        <figure className="figure-wrapper pr-2">
                          <svg viewBox="0 0 18 18" className="plus">
                            <polygon points="17,8 10,8 10,1 8,1 8,8 1,8 1,10 8,10 8,17 10,17 10,10 17,10 "></polygon>
                          </svg>
                        </figure>
                        <div className="pane__title">
                          <span>Add a new task</span>
                        </div>
                      </>
                    ) : (
                      <div className="loading-skeleton small"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* //Pane Title */}
        {/* Pane Status */}
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
                {!this.props.loading ? (
                  this.props.tasks.map((item, key) => (
                    <PaneStatusLabel
                      key={key}
                      status={item["status"]}
                      taskId={item["taskId"]}
                      statusChanger={item["statusChanger"]}
                      handleStatus={this.props.handleStatus}
                      changeStatus={this.props.changeStatus}
                      closeChangeStatus={this.props.closeChangeStatus}
                      inputRef={this.props.inputRef}
                    />
                  ))
                ) : (
                  <div className="ml-4">
                    <div className="loading-skeleton small"></div>
                    <div className="loading-skeleton small"></div>
                    <div className="loading-skeleton small"></div>
                  </div>
                )}
                {/*  */}
              </div>
            </div>
          </div>
        </div>
        {/* //Pane Status */}
      </>
    )
  }
}

export default PaneTitle
