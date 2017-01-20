import React, { Component } from 'react'
import FlipMove from 'react-flip-move'
import { css } from 'glamor'

const rooms = [
  { id: 1, name: "Room 1", desc: "Cześć", admin: "Andrzej", teams: { red: 1, blue: 2 }},
  { id: 2, name: "Room 1", desc: "Cześć", admin: "Janusz", teams: { red: 1, blue: 2 }},
  { id: 3, name: "Room 1", desc: "Cześć", admin: "Andrzej", teams: { red: 1, blue: 2 }},
  { id: 4, name: "Room 2", desc: "Nie wchodzić", admin: "Roman", teams: { red: 4, blue: 2 }},
  { id: 5, name: "Room 3", desc: "Elo, luz jak w hip-hopie", admin: "Janusz", teams: { red: 3, blue: 8 }},
]

const SingleRoom = ({id, name, desc, admin, teams, open}) => {
  return (
    <div {...css({border: "blue 1px solid", padding: "1em"})} onClick={() => open(id)}>
      <div>Room: {name}</div>
      <div>Admin: {admin}</div>
      <div>Desc: {desc}</div>
      <div>Red/Blue: {teams.red}/{teams.blue}</div> 
    </div>
  )
}

export class Rooms extends Component {
  componentDidMount() {

  }
  state = {
    rooms,
    roomNameSearch: "",
    roomAdminSearch: "",
  }
  render() {
    const { openRoom } = this.props
    const { rooms, roomNameSearch, roomAdminSearch } = this.state
    const filterdRooms = rooms.filter(({name, admin}) => 
      name.includes(roomNameSearch) && admin.includes(roomAdminSearch))
    return (
      <div>
        <div>
          <input 
            placeholder="Room name" 
            onChange={({target: {value}}) => this.setState({roomNameSearch: value}) } 
          />
          <input 
            placeholder="Room admin name" 
            onChange={({target: {value}}) => this.setState({roomAdminSearch: value}) } 
          />
        </div>
        <div>
          <FlipMove>
            {filterdRooms.map((room, index) => ( 
              <div key={room.id}>
                <SingleRoom 
                  {...room}
                  open={openRoom}
                />
              </div>
            ))}
          </FlipMove>
        </div>
      </div>
    )
  }
}