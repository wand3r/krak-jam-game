import React, {Component} from 'react'
import FlipMove from 'react-flip-move'
import {css} from 'glamor'
import {processAction} from "../../../lefrex-js/action-processor";
import {subscribeToEvent} from "../../../lefrex-js/event-aggregator";
import * as roomActions from "../../../domain/room/actions";
import * as roomEvents from "../../../domain/room/events";
import {
    FontIcon,
    Dialog,
    FlatButton,
    RaisedButton,
    FloatingActionButton,
    Card,
    Subheader,
    TextField
} from 'material-ui';
import SocialPerson from 'material-ui/svg-icons/social/person';
import ActionPanTool from 'material-ui/svg-icons/action/pan-tool';
import ContentAdd from 'material-ui/svg-icons/content/add';

const SingleRoom = ({id, name, teams, join}) => {
    const players = [...teams[0], ...teams[1]];
    return (
        <Card style={{backgroundColor: 'transparent'}}>
            <div {...css({display: 'flex', alignItems: 'row', padding: '18px'})}>
                <div {...css({flex: 1})}>
                    <div {...css({fontSize: '24px', margin: '0px 0px 4px 0px'})}>{name}</div>
                    <span {...css({fontSize: '12px'})}>{players.map((p, id) => (
                        <span key={id}>{p}, </span>
                    ))}</span>
                </div>
                <span {...css({display: 'flex', alignItems: 'center'})}>
    <SocialPerson style={{width: 48, height: 48}} color={'rgb(255, 235, 59)'}/>
    <span>{teams[0].length} vs {teams[1].length}</span>
    <RaisedButton
        style={{marginLeft: '18px'}}
        backgroundColor={'rgb(255, 235, 59)'}
        label="Join game"
        icon={<ActionPanTool/>}/>
    </span>
            </div>
        </Card>
    )
};


export class RoomsView extends Component {
    state = {
        roomNameSearch: "",
        creatingRoom: false,
        newRoomName: ""
    };

    render() {
        const {rooms, joinRoom, createRoom} = this.props;
        const {roomNameSearch, creatingRoom} = this.state;
        const filteredRooms = rooms.filter(({name}) => name.includes(roomNameSearch));
        return (
            <div {...css({
                display: "flex", flexDirection: "column",
                backgroundColor: '#EEE',
                flex: 1,
                height: "100%",
            })}>
                <div {...css({
                    display: "flex", justifyContent: "space-around",
                    height: "40px"
                })}>
                    <input
                        {...css({height: "100%", minWidth: '800px', flex: "1", fontSize: "1.5em", padding: "0 1%"})}
                        placeholder="Search room name"
                        onChange={({target: {value}}) => this.setState({roomNameSearch: value}) }
                    />
                    <RaisedButton
                        label="Create room"
                        onClick={() => this.setState({creatingRoom: true})}
                        icon={<ContentAdd/>}
                        primary={true}/>
                    {creatingRoom &&
                    <Dialog
                        title="Create Room"
                        actions={[]}
                        modal={true}
                        open={creatingRoom}
                        onRequestClose={() => this.setState({creatingRoom: false})}
                    >
                        <Card>
                            <div {...css({width: '100%', display: 'flex', flexDirection: 'column', padding: '18px'})}>
                                <TextField onChange={({target:{value}}) => this.setState({newRoomName: value})}
                                        hintText="Type your room name"
                                        fullWidth={true}
                                        style={{margin: '10px'}}/>
                                <RaisedButton
                                    label="Create room"
                                    onClick={() => {
                                        createRoom(this.state.newRoomName);
                                        this.setState({creatingRoom: false});
                                    }}
                                    primary={true}/>
                            </div>
                        </Card>
                    </Dialog>}
                </div>
            <div {...css({flex: "1"})}>
                <FlipMove >
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
        </div>
    )}
}

export class Rooms extends Component {
    state = {
        rooms: []
    };
    eventUnsubscriptions = []

    componentDidMount() {
        this.fetchRoomsList();
        this.eventUnsubscriptions.push(
            subscribeToEvent(
                roomEvents.room.roomCreatedEvent,
                (room) => { this.fetchRoomsList() }
            )
        )
        this.eventUnsubscriptions.push(
            subscribeToEvent(
                roomEvents.room.playerJoinedEvent,
                (room) => { this.fetchRoomsList() }
            )
        )
    }

    componentWillUnmount() {
        // this.eventUnsubscriptions.forEach(f => f());
        // this.eventUnsubscriptions = []
    }

    fetchRoomsList = () => {
        processAction(roomActions.createGetRoomsAction())
        .then((rooms) => {
            this.setState({rooms});
        })
        .catch(x => {
            throw new Error(x)
        });
    }

    createRoom = (name) => {
        processAction(roomActions.createCreateRoomAction(
            this.props.user.id,
            name,
        )).then(({id: roomId}) => {
            this.props.goToRoom(roomId);
        })
    }

    joinRoom = (roomId) => {
        processAction(roomActions.createJoinRoomAction(
            this.props.user.id,
            roomId
        )).then(({id: roomId}) => {
            this.props.goToRoom(roomId);
        })
    }

    render() {
        const {rooms} = this.state
        return (
            <RoomsView
                rooms={rooms}
                createRoom={this.createRoom}
                joinRoom={this.joinRoom}
                />
        )
    }
}