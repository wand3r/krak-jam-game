import React, { Component } from "react"

export class Room extends Component {
  render() {
    const { roomId } = this.props
    return (
      <div>Room with id: {roomId}</div>
    )
  }
}