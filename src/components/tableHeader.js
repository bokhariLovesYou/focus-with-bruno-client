import React, { Component } from "react"
// Styled Components
import styled from "styled-components"
import { Span } from "./styledElements"

const TableHeaderWrapper = styled.div`
  padding: 0.5rem 1rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 0 0;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 2;
`
const TableHeaderContents = styled.div`
  line-height: 1;
  padding: 0.25rem 0;
  text-align: center;
  display: flex;
  justify-content: space-between;
`

export class TableHeader extends Component {
  render() {
    return (
      <>
        <TableHeaderWrapper>
          <TableHeaderContents>
            <div
              className={`previous-wrapper ${
                !this.props.calendarPrevButton ? "disabled" : ""
              }`}
              onClick={this.props.prevMonth}
            >
              <figure>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    fill="currentColor"
                    d="M4.80153237,6.00002 L11.1984676,6.00002 C11.8579881,6.00002 12.2338734,6.76912179 11.8387119,7.30861993 L8.64024427,11.6724979 C8.3194337,12.1091674 7.6805663,12.1091674 7.3611326,11.6724979 L4.1612881,7.30861993 C3.76612658,6.76912179 4.14201193,6.00002 4.80153237,6.00002"
                  ></path>
                </svg>
              </figure>
            </div>
            <Span Header>{this.props.currentMonth}</Span>
            <div className="next-wrapper" onClick={this.props.nextMonth}>
              <figure>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    fill="currentColor"
                    d="M4.80153237,6.00002 L11.1984676,6.00002 C11.8579881,6.00002 12.2338734,6.76912179 11.8387119,7.30861993 L8.64024427,11.6724979 C8.3194337,12.1091674 7.6805663,12.1091674 7.3611326,11.6724979 L4.1612881,7.30861993 C3.76612658,6.76912179 4.14201193,6.00002 4.80153237,6.00002"
                  ></path>
                </svg>
              </figure>
            </div>
          </TableHeaderContents>
        </TableHeaderWrapper>
      </>
    )
  }
}

export default TableHeader
