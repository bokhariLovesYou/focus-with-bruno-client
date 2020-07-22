import React, { Component } from "react"
// Components
import TableHeader from "./tableHeader"
import Pane from "./pane"
// Styled Components
import styled from "styled-components"
// Bootstrap
import { Container, Row, Col } from "react-bootstrap"
import Toast from "react-bootstrap/Toast"
// import Spinner from "react-bootstrap/Spinner"
// date-fns
import { format, addMonths, subMonths } from "date-fns"
// Axios
import axios from "axios"
import { baseURL } from "../base/axios.js"
// NProgress
import NProgress from "nprogress"
import "nprogress/nprogress.css"
// Authentication
import { getToken } from "../util/auth"
// Update Task Components
import UpdateTaskTable from "./updateTaskTable"

const TableWrapper = styled.div`
  background-color: #fff;
  height: 88vh;
  border-radius: 4px;
  overflow-y: auto;
`

export class Table extends Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    tasks: null,
    calendarPrevButton: true,
    hideCompleted: true,
    renderTaskDetails: false,
    singleTaskDetails: null,
    error: false,
    loading: false,
    loadingTaskDetails: false,
  }

  // Render Tasks
  renderTasks = () => {
    NProgress.inc()
    this.setState({
      loading: true,
    })
    const userId = window.location.href.split("/")[5]
    axios
      .get(`${baseURL}/tasks/${userId}`)
      .then(res => {
        if (res.data.length > 0) {
          let response = res.data
          response = response.sort(function (a, b) {
            return a.createdAt < b.createdAt
              ? -1
              : a.createdAt > b.createdAt
              ? 1
              : 0
          })
          let nonCompletedTasks = []
          response.forEach(elem => {
            elem.statusChanger = false
          })
          response.forEach(elem => {
            if (elem.status !== "Completed") {
              nonCompletedTasks.push(elem)
            }
          })

          // Push all older tasks to today's date!
          const currentDate = format(new Date(), "yyyy-MM-dd")
          nonCompletedTasks.forEach(elem => {
            if (elem.dueDate < currentDate) {
              elem.dueDate = currentDate
            }
          })
          if (this.state.hideCompleted) {
            this.setState({
              tasks: nonCompletedTasks,
              loading: false,
            })
            Number(format(this.state.currentMonth, "M")) >
            Number(format(new Date(), "M"))
              ? this.setState({ calendarPrevButton: true })
              : this.setState({ calendarPrevButton: false })
          } else {
            this.setState({
              tasks: response,
              calendarPrevButton: true,
              loading: false,
            })
          }
        }
        // let taskId
        // if (data) {
        //   taskId = data
        // } else {
        //   taskId = urlParams.get("task_id")
        // }
        if (this.state.singleTaskDetails) {
          let tasks = this.state.tasks
          tasks.forEach(elem => {
            elem.selected = false
            if (elem.taskId === this.state.singleTaskDetails.taskId) {
              elem.selected = true
            }
          })
          this.setState({
            tasks,
          })
        }
        NProgress.done()
      })
      .catch(err => {
        console.log(err)
        NProgress.done()
        this.setState({
          error: true,
          loading: false,
        })
      })
  }

  componentDidMount() {
    this.renderTasks()
    if (typeof document !== `undefined`) {
      document.addEventListener("mousedown", this.handleClick, false)
      document.addEventListener("mousedown", this.handleClickSingle, false)
    }
    const urlParams = new URLSearchParams(window.location.search)
    const taskId = urlParams.get("task_id")
    if (taskId) {
      this.renderTaskDetails()
    }
  }

  // Handle Outside Click of Status Change Toolbox
  componentWillUnmount() {
    if (typeof document !== `undefined`) {
      document.removeEventListener("mousedown", this.handleClick, false)
      document.removeEventListener("mousedown", this.handleClickSingle, false)
    }
  }

  // Handle Outside Click of Status Change Toolbox
  handleClick = e => {
    if (this.node) {
      const nodeName = this.node.getAttribute("data-tag")
      const targetName = e.target.getAttribute("data-tag")
      if (nodeName !== targetName) {
        return
      } else {
        this.closeChangeStatus()
      }
    }
  }

  changeStatusSingle = () => {
    this.setState({
      singleTaskDetails: {
        ...this.state.singleTaskDetails,
        statusChanger: true,
      },
    })
  }

  handleClickSingle = e => {
    if (this.node !== null) {
      if (!this.node.contains(e.target)) {
        this.closeStatusSingle()
      }
    }
  }

  // Get Next Month
  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1),
      calendarPrevButton: true,
      state: this.state,
    })
  }

  // Get Previous Month
  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1),
    })
    if (
      Number(format(this.state.currentMonth, "M")) - 1 ===
        Number(format(new Date(), "M")) &&
      this.state.hideCompleted
    ) {
      this.setState({
        calendarPrevButton: false,
      })
    }
  }

  // Update Rows
  updateRows = task => {
    if (this.state.tasks) {
      this.setState({
        tasks: [...this.state.tasks, task],
      })
    } else {
      this.setState({
        tasks: [task],
      })
    }
  }

  // Handle Status Change
  handleStatus = (e, data) => {
    NProgress.inc()
    const config = {
      headers: {
        Authorization: "Bearer " + getToken().split("Bearer ").pop(),
      },
    }
    const updatedStatus = {
      status: data.split("_").pop(),
    }
    axios
      .post(
        `${baseURL}/updatetaskstatus/${data.split("_").shift()}`,
        updatedStatus,
        config
      )
      .then(res => {
        let tasks = this.state.tasks
        tasks.forEach(elem => {
          if (elem.taskId === data.split("_").shift()) {
            elem.status = data.split("_").pop()
            elem.statusChanger = false
          }
          const urlParams = new URLSearchParams(window.location.search)
          const paramTaskId = urlParams.get("task_id")
          if (paramTaskId) {
            if (elem.taskId === this.state.singleTaskDetails.taskId) {
              this.setState({
                singleTaskDetails: elem,
              })
            }
          }
        })
        this.setState({
          tasks,
        })
        // this.renderTasks()
        NProgress.done()
      })
      .catch(err => {
        console.log(err)
        NProgress.done()
        this.setState({
          error: true,
        })
      })
  }

  // Handle Status Change Toolbox
  changeStatus = (e, data) => {
    let tasks = this.state.tasks
    tasks.forEach(elem => {
      elem.statusChanger = false
      if (elem.taskId === data.split("_").shift()) {
        elem.statusChanger = true
      }
    })
    this.setState({
      tasks,
    })
  }

  // Close Status Change Toolbox
  closeChangeStatus = () => {
    let tasks = this.state.tasks
    tasks.forEach(elem => {
      elem.statusChanger = false
    })
    this.setState({
      tasks,
    })
  }

  // Hide Completed
  hideCompleted = () => {
    this.state.hideCompleted
      ? this.setState({ hideCompleted: false })
      : this.setState({ hideCompleted: true })
    if (
      format(this.state.currentMonth, "M") - 1 < format(new Date(), "M") &&
      !this.state.hideCompleted
    ) {
      this.setState({
        currentMonth: new Date(),
      })
    }
    this.renderTasks()
  }

  // Render Task Details
  renderTaskDetails = (e, data) => {
    NProgress.inc()
    const urlParams = new URLSearchParams(window.location.search)
    let taskId
    if (data) {
      taskId = data
    } else {
      taskId = urlParams.get("task_id")
    }
    axios
      .get(`${baseURL}/task/${taskId}`)
      .then(res => {
        let tasks = this.state.tasks
        tasks.forEach(elem => {
          elem.selected = false
          if (elem.taskId === taskId) {
            elem.selected = true
          }
        })
        const responseData = res.data
        this.setState({
          renderTaskDetails: true,
          singleTaskDetails: { ...responseData, statusChanger: false },
          tasks,
        })
        NProgress.done()
      })
      .catch(err => {
        console.log(err)
        NProgress.done()
        this.setState({
          error: true,
        })
      })
  }

  // Close Task Details
  closeTaskDetails = () => {
    NProgress.inc()
    let tasks = this.state.tasks
    tasks.forEach(elem => {
      elem.selected = false
    })
    this.setState({
      renderTaskDetails: false,
      singleTaskDetails: null,
      tasks,
    })
    NProgress.done()
  }

  handleUpdateTask = event => {
    this.setState({
      singleTaskDetails: {
        ...this.state.singleTaskDetails,
        [event.target.name]: event.target.value,
      },
    })
  }

  updateDueDate = date => {
    this.setState({
      singleTaskDetails: {
        ...this.state.singleTaskDetails,
        dueDate: format(date, "yyyy-MM-dd"),
      },
    })
  }

  closeStatusSingle = () => {
    this.setState({
      singleTaskDetails: {
        ...this.state.singleTaskDetails,
        statusChanger: false,
      },
    })
  }

  handleStatusSingle = (e, data) => {
    this.setState({
      singleTaskDetails: {
        ...this.state.singleTaskDetails,
        status: data.split("_").pop(),
        statusChanger: false,
      },
    })
  }

  handleSingleTaskUpdate = e => {
    e.preventDefault()
    this.setState({
      loadingTaskDetails: true,
    })
    NProgress.inc()
    let taskId = this.state.singleTaskDetails.taskId
    const updatedData = {
      createdAt: this.state.singleTaskDetails.createdAt,
      userHandle: this.state.singleTaskDetails.userHandle,
      dueDate: this.state.singleTaskDetails.dueDate,
      status: this.state.singleTaskDetails.status,
      title: this.state.singleTaskDetails.title,
      body: this.state.singleTaskDetails.body,
    }
    const config = {
      headers: {
        Authorization: "Bearer " + getToken().split("Bearer ").pop(),
      },
    }
    axios
      .post(`${baseURL}/updatetask/${taskId}`, updatedData, config)
      .then(res => {
        this.renderTasks()
        NProgress.done()
        this.setState({
          loadingTaskDetails: false,
        })
      })
      .catch(err => {
        console.log(err)
        NProgress.done()
        this.setState({
          error: true,
          loadingTaskDetails: false,
        })
      })
  }

  render() {
    const dateFormat = "MMMM yyyy"
    const { children } = this.props
    return (
      <div>
        <Container className="pos-rel mt-3">
          <Row>
            <Col lg={this.state.renderTaskDetails ? 8 : 12}>
              <div className="table-header__tabs-wrapper">
                <div className="table-header__tabs">
                  <div
                    className={`table-header__tab ${
                      this.state.hideCompleted ? "active" : ""
                    }`}
                    onClick={this.hideCompleted}
                  >
                    <span>Hide Completed</span>
                  </div>
                </div>
              </div>
              <TableWrapper>
                <TableHeader
                  currentMonth={format(this.state.currentMonth, dateFormat)}
                  calendarPrevButton={this.state.calendarPrevButton}
                  prevMonth={this.prevMonth}
                  nextMonth={this.nextMonth}
                />
                <Pane
                  {...this.state}
                  updateRows={this.updateRows}
                  handleStatus={this.handleStatus}
                  changeStatus={this.changeStatus}
                  closeChangeStatus={this.closeChangeStatus}
                  renderTaskDetails={this.renderTaskDetails}
                  inputRef={node => (this.node = node)}
                />
                {children}
              </TableWrapper>
            </Col>
            {this.state.renderTaskDetails ? (
              <Col lg={4}>
                <div className="update-task__table">
                  <UpdateTaskTable
                    closeTaskDetails={this.closeTaskDetails}
                    singleTaskDetails={this.state.singleTaskDetails}
                    renderTaskDetails={this.renderTaskDetails}
                    renderTaskDetailsState={this.state.renderTaskDetails}
                    handleUpdateTask={this.handleUpdateTask}
                    updateDueDate={this.updateDueDate}
                    changeStatusSingle={this.changeStatusSingle}
                    closeStatusSingle={this.closeStatusSingle}
                    inputRefSingle={node => (this.node = node)}
                    handleStatusSingle={this.handleStatusSingle}
                    handleSingleTaskUpdate={this.handleSingleTaskUpdate}
                    loading={this.state.loadingTaskDetails}
                  />
                </div>
              </Col>
            ) : (
              ""
            )}
          </Row>
        </Container>
        <div className={`fixed-alert ${this.state.error ? "animate-in" : ""}`}>
          <Toast
            onClose={() => this.setState({ error: false })}
            // show={show}
            delay={2000}
            autohide
          >
            <Toast.Header>
              <strong className="mr-auto">Error</strong>
            </Toast.Header>
            <Toast.Body>
              Oh snap! We just hit an error. Please try again
            </Toast.Body>
          </Toast>
        </div>
      </div>
    )
  }
}

export default Table
