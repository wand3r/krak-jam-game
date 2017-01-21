import React, {Component} from 'react'
import FlipMove from 'react-flip-move'
import {css} from 'glamor'
import {processAction} from "../../../lefrex-js/action-processor";
import {subscribeToEvent} from "../../../lefrex-js/event-aggregator";
import * as roomActions from "../../../domain/room/actions";
import * as roomEvents from "../../../domain/room/events";
import { currentUser } from '../../userProfile'
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

const SingleRoom = ({id, name, teams, join}) => {
    return (
        <div
            {...css({display: "flex", border: "blue 1px solid", padding: "1em", margin: "1em 0"})}
        >
            <div {...css({flex: 1})}>
                {name}
            </div>
            <div {...css({flex: 1})}>
                {teams[0]} vs {teams[1]}
            </div>
            <FlatButton label="Join" primary={true} onClick={() => join(id)}/>
        </div>
    )
};


export class RoomsView extends Component {
  state = {
    roomNameSearch: "",
    creatingRoom: false,
  };
  render() {
    const { rooms, joinRoom, createRoom } = this.props
    console.log(rooms)
    const { roomNameSearch, creatingRoom } = this.state
    const filteredRooms = rooms.filter(({name}) => name.includes(roomNameSearch))
    return (
      <div {...css({
        display: "flex", flexDirection: "column",
        flex: 1, 
        height: "100%", 
      })}>
        <div {...css({
          display: "flex", justifyContent: "space-between", 
          height: "50px"
        })}>
          <input 
            {...css({height: "100%", flex: "1", fontSize: "1.5em", padding: "0 1%"})}
            placeholder="Search room name" 
            onChange={({target: {value}}) => this.setState({roomNameSearch: value}) } 
          />
          <div {...css({display: "flex", margin: "0em 2em", justifyContent: "center"})}>
            <FloatingActionButton
                onClick={() => this.setState({creatingRoom: true})} 
            >
                <ContentAdd />
            </FloatingActionButton>
          </div>
          <Dialog
            title="Create Room"
            actions={[]}
            modal={true}
            open={creatingRoom}
            onRequestClose={() => this.setState({creatingRoom: false})}
          >
             <TextField 
                ref={c => c && c.focus()}
                fullWidth={true}
                floatingLabelText="Room name"
                onKeyUp={({keyCode, target: {value}}) => {
                    if(keyCode === 13) { 
                        createRoom(value)
                        this.setState({creatingRoom: false})
                    } else if (keyCode === 27) {
                        this.setState({creatingRoom: false})
                    }
                }}
            />
          </Dialog>
        </div>
        <div {...css({flex: "1"})}>
          <FlipMove>
            {filteredRooms.map((room, index) => (
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
    };
    componentDidMount() {
        this.fetchRoomsList();
        subscribeToEvent(
            roomEvents.room.roomCreatedEvent, 
            (room) =>  { 
                this.fetchRoomsList()
            }
        )
    }
    componentWillUnmount() {

    }
    fetchRoomsList = () => {
        processAction(roomActions.createGetRoomsAction())
            .then((rooms) => {
                this.setState({rooms});
            })
            .catch(x => { throw new Error(x) });
    }
    createRoom = (name) => {
        processAction(roomActions.createCreateRoomAction(
            currentUser.id,
            name,
        ))
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