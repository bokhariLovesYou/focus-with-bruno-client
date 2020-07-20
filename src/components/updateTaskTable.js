import React, { Component } from "react"
import { Link } from "gatsby"
// Styled Components
import styled from "styled-components"
import { Span } from "./styledElements"
import { Form } from "../components/styledElements"
// Bootstrap
// import Spinner from "react-bootstrap/Spinner"
// date-fns
import { parse } from "date-fns"
// DatePicker
import DatePicker from "react-date-picker"

const TableHeaderWrapper = styled.div`
  padding: 0.5rem 1rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 0 0;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 2;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`
const TableHeaderContents = styled.div`
  line-height: 1;
  padding: 0.25rem 0;
  text-align: center;
  display: flex;
  justify-content: space-between;
`

export class UpdateTaskTable extends Component {
  state = {
    selectNewDate: false,
  }

  render() {
    return (
      <>
        <TableHeaderWrapper>
          <TableHeaderContents>
            <Span Header Transformed>
              {this.props.singleTaskDetails.title}
            </Span>
            <figure>
              <Link
                onClick={this.props.closeTaskDetails}
                to={`/a/tasks/${
                  window.location.href.split("/")[5].split("?")[0]
                }/`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 12 12"
                  className="icon"
                >
                  <path
                    fillRule="evenodd"
                    className=""
                    fill="currentColor"
                    d="M7.41421356,6 L9.88226406,3.5319495 C10.0816659,3.33254771 10.0828664,3.01179862 9.88577489,2.81470708 L9.18529292,2.11422511 C8.97977275,1.90870494 8.66708101,1.91870543 8.4680505,2.11773594 L6,4.58578644 L3.5319495,2.11773594 C3.33254771,1.91833414 3.01179862,1.91713357 2.81470708,2.11422511 L2.11422511,2.81470708 C1.90870494,3.02022725 1.91870543,3.33291899 2.11773594,3.5319495 L4.58578644,6 L2.11773594,8.4680505 C1.91833414,8.66745229 1.91713357,8.98820138 2.11422511,9.18529292 L2.81470708,9.88577489 C3.02022725,10.0912951 3.33291899,10.0812946 3.5319495,9.88226406 L6,7.41421356 L8.4680505,9.88226406 C8.66745229,10.0816659 8.98820138,10.0828664 9.18529292,9.88577489 L9.88577489,9.18529292 C10.0912951,8.97977275 10.0812946,8.66708101 9.88226406,8.4680505 L7.41421356,6 L7.41421356,6 Z"
                  ></path>
                </svg>
              </Link>
            </figure>
          </TableHeaderContents>
        </TableHeaderWrapper>
        <Form noValidate onSubmit={this.handleSubmit}>
          <div className="update-task__body">
            <div className="update-task__field">
              <div className="update-task__taskName">
                <div className="update-task__label">Title:</div>
                <div className="update-task__input">
                  <input
                    type="input"
                    name="title"
                    onChange={this.props.handleUpdateTask}
                    value={this.props.singleTaskDetails.title}
                  />
                </div>
              </div>
            </div>
            <div className="update-task__field">
              <div className="update-task__taskDueDate">
                <div className="update-task__label">Due Date:</div>
                <div className="update-task__input">
                  <div className="custom-input">
                    <span>{this.props.singleTaskDetails.dueDate}</span>
                  </div>
                  <input
                    type="hidden"
                    name="duedate"
                    onChange={this.props.handleUpdateTask}
                    value={this.props.singleTaskDetails.dueDate}
                  />
                  <DatePicker
                    selected={parse(
                      this.props.singleTaskDetails.dueDate,
                      "yyyy/MM/dd",
                      new Date()
                    ).toString()}
                    onChange={this.props.updateDueDate}
                  />
                </div>
              </div>
            </div>
            <div className="update-task__field">
              <div className="update-task__taskStatus">
                <div className="update-task__label">Status:</div>
                <div className="update-task__input">
                  <input
                    type="input"
                    name="status"
                    onChange={this.props.handleUpdateTask}
                    value={this.props.singleTaskDetails.status}
                  />
                </div>
              </div>
            </div>
            <div className="update-task__field">
              <div className="update-task__taskStatus">
                <div className="update-task__label">Description:</div>
                <div className="update-task__input">
                  <textarea
                    type="input"
                    name="body"
                    onChange={this.props.handleUpdateTask}
                    value={this.props.singleTaskDetails.body}
                  />
                </div>
              </div>
            </div>
          </div>
        </Form>
      </>
    )
  }
}

export default UpdateTaskTable
