import React, { Component } from "react"
import PaneTitle from "./PaneTitle"
// date-fns
import {
  format,
  formatISO,
  getDay,
  getMonth,
  getYear,
  getDaysInMonth,
} from "date-fns"

export class PaneWrapper extends Component {
  render() {
    const currentMonth = this.props.currentMonth
    const tasks = this.props.tasks
    const datesInMonth = getDaysInMonth(currentMonth)
    let rows = []

    const weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]

    for (let i = 0; i < datesInMonth; i++) {
      const dayIndex = getDay(
        new Date(getYear(currentMonth), getMonth(currentMonth), i)
      )
      rows.push({
        date: i + 1,
        day: weekdays[dayIndex],
        ISODate: formatISO(
          new Date(getYear(currentMonth), getMonth(currentMonth), i + 1),
          { representation: "date" }
        ),
        tasks: [],
      })
    }

    const currentDate = format(new Date(), "yyyy-MM-dd")
    const rowsWithoutHistory = []
    rows.forEach(elem => {
      if (elem.ISODate >= currentDate) {
        rowsWithoutHistory.push(elem)
      }
    })

    if (this.props.hideCompleted) {
      rows = rowsWithoutHistory
    }

    if (tasks) {
      rows.forEach(elem => {
        tasks.forEach(elem2 => {
          if (elem2["dueDate"].split("T").shift() === elem["ISODate"]) {
            elem.tasks.push(elem2)
          }
        })
      })
    }

    const renderRows = () => {
      return rows.map((item, key) => (
        <div
          className="pane-wrapper__layout"
          key={key}
          id={item["ISODate"]}
          ref={node => (this.node = node)}
        >
          <PaneTitle
            date={item["date"]}
            day={item["day"]}
            tasks={item["tasks"]}
            ISODate={item["ISODate"]}
            currentMonth={getMonth(this.props.currentMonth)}
            updateRows={this.props.updateRows}
            handleStatus={this.props.handleStatus}
            changeStatus={this.props.changeStatus}
            closeChangeStatus={this.props.closeChangeStatus}
            renderTaskDetails={this.props.renderTaskDetails}
            inputRef={this.props.inputRef}
          />
        </div>
      ))
    }

    return <>{renderRows()}</>
  }
}

export default PaneWrapper
