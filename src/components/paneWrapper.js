import React, { Component } from "react"
import PaneTitle from "./PaneTitle"
// date-fns
import { formatISO, getDay, getMonth, getYear, getDaysInMonth } from "date-fns"

export class PaneWrapper extends Component {
  render() {
    const currentMonth = this.props.currentMonth
    const tasks = this.props.tasks
    const datesInMonth = getDaysInMonth(currentMonth)
    const rows = []

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
        <div className="pane-wrapper__layout" key={key} id={item["ISODate"]}>
          <PaneTitle
            date={item["date"]}
            day={item["day"]}
            tasks={item["tasks"]}
            ISODate={item["ISODate"]}
            currentMonth={getMonth(this.props.currentMonth)}
            updateRows={this.props.updateRows}
            handleStatus={this.props.handleStatus}
            changeStatus={this.props.changeStatus}
          />
        </div>
      ))
    }

    return <>{renderRows()}</>
  }
}

export default PaneWrapper
