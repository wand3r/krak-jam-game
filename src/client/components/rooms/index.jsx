import React, {Component} from 'react'
import FlipMove from 'react-flip-move'
import {css} from 'glamor'
import {processAction} from "../../../lefrex-js/action-processor";
import rooms from "../../../shared/actions/rooms";
import {ModalContainer, ModalDialog} from 'react-modal-dialog'

// setTimeout(() => {
//     processAction({$type: rooms.get}).then(result => {
//         console.log(result);
//     });
// }, 5000);

const SingleRoom = ({id, name, desc, admin, teams, join}) => {
  return (
    <div 
      {...css({display: "flex", border: "blue 1px solid", padding: "1em", margin: "1em 0"})} 
      onClick={() => open(id)}
    >
      <div {...css({flex: 1})}>
        <div>{name}</div>
      </div>
      <div {...css({flex: 1})}>
        {teams.red} vs {teams.blue}
      </div>
      <button {...css({width: 100, height: '100%'})} onClick={() => join(id)}>
        Join
      </button> 
    </div>
  )
}

export class RoomsView extends Component {
  state = {
    roomNameSearch: "",
    creatingRoom: false,
  }
  render() {
    const { rooms, joinRoom, createRoom } = this.props
    const { roomNameSearch, creatingRoom } = this.state
    const filterdRooms = rooms.filter(({name}) => name.includes(roomNameSearch))
    return (
      <div {...css({
        display: "flex", flexDirection: "column",
        flex: 1, 
        height: "100%", 
      })}>
        <div {...css({
          display: "flex", justifyContent: "space-around", 
          height: "40px"
        })}>
          <input 
            {...css({height: "100%", flex: "1", fontSize: "1.5em", padding: "0 1%"})}
            placeholder="Search room name" 
            onChange={({target: {value}}) => this.setState({roomNameSearch: value}) } 
          />
          <button
            {...css({
              width: "50px", height: "100%", 
              fontSize: "1em", padding: "0 1%"
            })}
            onClick={() => this.setState({creatingRoom: true})} 
          >
            +
          </button>
          {
            creatingRoom &&
            <ModalContainer onClose={() => this.setState({creatingRoom: false})}>
                <ModalDialog onClose={() => this.setState({creatingRoom: false})}>
                    <input 
                        ref={c => c && c.focus()}
                        placeholder="Room name"
                        {...css({
                            fontSize: "1.5em",
                        })}
                        onKeyUp={({keyCode, target: {value}}) => {
                            if(keyCode === 13) { 
                                createRoom(value)
                                this.setState({creatingRoom: false})
                            } else if (keyCode === 27) {
                                this.setState({creatingRoom: false})
                            }
                        }}
                    />
                </ModalDialog>
            </ModalContainer>
          }
        </div>
        <div {...css({flex: "1"})}>
          <FlipMove>
            {filterdRooms.map((room, index) => ( 
              <div key={room.id}>
                <SingleRoom 
                  {...room}
                  join={joinRoom}
                />
              </div>
            ))}
          </FlipMove>
        </div>
        <div {...css({display: "flex", justifyContent: "space-around", height: "40px"})}>
          
        </div>
      </div>
    )
  }
}

export class Rooms extends Component {
    state = {
        rooms: []
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    createRoom = (roomName) => {

    }
    joinRoom = (roomId) => {

    }
    render() {
        const { rooms } = this.state
        return (
            <RoomsView 
                rooms={rooms} 
                createRoom={this.createRoom}
                joinRoom={this.joinRoom} 
            />
        )
    }
}