import React, { Component } from "react"
// Components
import TableHeader from "./tableHeader"
import Pane from "./pane"
// Styled Components
import styled from "styled-components"
// Bootstrap
import Container from "react-bootstrap/Container"
// date-fns
import { format, addMonths, subMonths, formatDistance } from "date-fns"
// Axios
import axios from "axios"
import { baseURL } from "../base/axios.js"
// NProgress
import NProgress from "nprogress"
import "nprogress/nprogress.css"
// Authentication
import { getToken } from "../util/auth"

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
  }

  componentDidMount() {
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
          response.map(elem => {
            elem.statusChanger = false
          })
          // console.log(response)
          response.forEach(elem => {
            if (elem.status !== "Completed") {
              nonCompletedTasks.push(elem)
            }
          })

          // Push all older tasks to today's date!
          const currentDate = format(new Date(), "yyyy-MM-dd")
          console.log(currentDate)
          nonCompletedTasks.map(elem => {
            if (elem.dueDate < currentDate) {
              elem.dueDate = currentDate
            }
          })
          this.setState({
            tasks: nonCompletedTasks,
          })
        }
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  renderHeader() {}

  renderDays() {}

  renderCells() {}

  onDateClick = day => {}

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1),
      state: this.state,
    })
  }

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1),
    })
  }

  updateRows = task => {
    this.setState({
      tasks: [...this.state.tasks, task],
    })
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
        console.log(res)
        let tasks = this.state.tasks
        tasks.map(elem => {
          if (elem.taskId === data.split("_").shift()) {
            elem.status = data.split("_").pop()
            elem.statusChanger = false
          }
        })
        this.setState({
          tasks,
        })
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
    let tasks = this.state.tasks
    tasks.map(elem => {
      elem.statusChanger = false
      if (elem.taskId === data.split("_").shift()) {
        elem.statusChanger = true
        console.log(elem)
      }
    })
    this.setState({
      tasks,
    })
  }

  render() {
    const dateFormat = "MMMM yyyy"
    const { children } = this.props

    return (
      <div>
        <Container>
          <TableWrapper className="mt-3">
            <TableHeader
              currentMonth={format(this.state.currentMonth, dateFormat)}
              prevMonth={this.prevMonth}
              nextMonth={this.nextMonth}
            />
            <Pane
              {...this.state}
              updateRows={this.updateRows}
              handleStatus={this.handleStatus}
              changeStatus={this.changeStatus}
            />
            {children}
          </TableWrapper>
        </Container>
      </div>
    )
  }
}

export default Table
