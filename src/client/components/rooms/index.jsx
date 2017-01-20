import React, { Component } from 'react'

export class Rooms extends Component {
  state = {
    rooms: [
      {id: 1, name: "room 1"},
      {id: 2, name: "room 2"},
      {id: 3, name: "room 3"},
    ]
  }
  render() {
    const { openRoom } = this.props
    const { rooms } = this.state
    return (
      <div onClick={openRoom(1)}>
        {rooms.map(({id, name}) => 
          <button 
            onClick={() => {
              openRoom(id);
            }}
          >
            {name}
          </button>
        )}
      </div>
    )
  }
}