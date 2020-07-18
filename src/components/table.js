import React, { Component } from "react"
// Components
import TableHeader from "./tableHeader"
import Pane from "./pane"
// Styled Components
import styled from "styled-components"
// Bootstrap
import { Container, Row, Col } from "react-bootstrap"
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
  }

  renderTasks = () => {
    NProgress.inc()
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
            })
            Number(format(this.state.currentMonth, "M")) >
            Number(format(new Date(), "M"))
              ? this.setState({ calendarPrevButton: true })
              : this.setState({ calendarPrevButton: false })
          } else {
            this.setState({
              tasks: response,
              calendarPrevButton: true,
            })
          }
        }
        NProgress.done()
      })
      .catch(err => {
        console.log(err)
        NProgress.done()
      })
  }

  componentDidMount() {
    this.renderTasks()
    if (typeof document !== `undefined`) {
      document.addEventListener("mousedown", this.handleClick, false)
    }
    const urlParams = new URLSearchParams(window.location.search)
    const taskId = urlParams.get("task_id")
    if (taskId) {
      this.renderTaskDetails()
    }
  }

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1),
      calendarPrevButton: true,
      state: this.state,
    })
  }

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
          if (elem.taskId === this.state.singleTaskDetails.taskId) {
            this.setState({
              singleTaskDetails: elem,
            })
          }
        })
        this.setState({
          tasks,
        })
        this.renderTasks()
        NProgress.done()
      })
      .catch(err => {
        console.log(err)
        setTimeout(() => {
          NProgress.done()
        }, 2000)
      })
  }

  changeStatus = (e, data) => {
    // if (this.node.contains(e.target)) {
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
    // }
  }

  closeChangeStatus = () => {
    let tasks = this.state.tasks
    tasks.forEach(elem => {
      elem.statusChanger = false
    })
    this.setState({
      tasks,
    })
  }

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

  componentWillUnmount() {
    if (typeof document !== `undefined`) {
      document.removeEventListener("mousedown", this.handleClick, false)
    }
  }

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
        this.setState({
          renderTaskDetails: true,
          singleTaskDetails: res.data,
        })
        NProgress.done()
      })
      .catch(err => {
        console.log(err)
        NProgress.done()
      })
  }

  closeTaskDetails = () => {
    NProgress.inc()
    this.setState({
      renderTaskDetails: false,
    })
    NProgress.done()
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
                <UpdateTaskTable
                  closeTaskDetails={this.closeTaskDetails}
                  singleTaskDetails={this.state.singleTaskDetails}
                  renderTaskDetails={this.renderTaskDetails}
                />
              </Col>
            ) : (
              ""
            )}
          </Row>
        </Container>
      </div>
    )
  }
}

export default Table
