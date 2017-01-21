import React, {Component} from "react"
import {css} from "glamor"
import * as R from 'ramda'
import {RaisedButton, FloatingActionButton} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {processAction} from "../../../lefrex-js/action-processor";
import {subscribeToEvent} from "../../../lefrex-js/event-aggregator";
import * as roomActions from "../../../domain/room/actions";
import * as roomEvents from "../../../domain/room/events";
import {sortObject} from '../../../utils/sortObject'
// import { ActionVerifiedUser } from "material-ui/svg-icons/action";
import ActionVerifiedUser from "material-ui/svg-icons/action/verified-user";
import AlertWarning from "material-ui/svg-icons/alert/warning";
import ArrowBack from "material-ui/svg-icons/navigation/arrow-back";

export const Player = ({name, isCurrent, isReady, hasTeam}) => {
    return (
        <div {...css({
            fontSize: "1em",
            margin: "0.2em",
            ':hover': {
                background: '#BDBDBD'
            },
            color: "#212121",
            background: '#E0E0E0',
            filter: isCurrent ? 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))' : undefined,
            borderWidth: isCurrent ? '0px 0px 1px 0px' : '0px',
            borderStyle: 'solid',
            borderColor: '#666',
            boxSizing: 'border-box'
        })}>
            <div {...css({
                display: "flex",
                alignItems: 'center'
            })}>
                <span {...css({flex: 1, padding: '6px 12px'})}>{name}</span>
                {hasTeam ? <span {...css({padding: '6px 12px', background: isReady ? '#4CAF50' : "#f44336"})}>
                    {isReady ? <ActionVerifiedUser style={{color: '#F5F5F5'}}/>
                         : <AlertWarning style={{color: '#F5F5F5'}}/>}
                </span> : undefined}
            </div>
        </div>
    )
};

export const Team = ({currentUser, teamId, players, join}) => {
    const canCurrentUserJoinTeam = !currentUser.isReady && currentUser.teamId !== teamId
    return (
        <div {...css({display: "flex", flexDirection: "column"})}>
            <div {...css({display: "flex", justifyContent: "center", margin: "0.5em"})}>
                <FloatingActionButton
                    disabled={!canCurrentUserJoinTeam}
                    mini={true}
                    onClick={() => join(teamId)
                    }>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
            {players.map(({id, name, isReady, teamId}) =>
                <Player
                    key={id}
                    name={name}
                    isReady={isReady}
                    isCurrent={currentUser.id === id}
                    hasTeam={teamId !== id}
                />
            )}
        </div>
    )
};

export const Teams = ({currentUser, teams, joinTeam}) => {
    const lastTeam = R.last(R.keys(teams))
    return (
        <div {...css({display: "flex"})}>
            {R.pipe(
                R.mapObjIndexed((players, teamId) => [
                    <div key={teamId} {...css({flex: 1})}>
                        <Team
                            key={teamId}
                            currentUser={currentUser}
                            teamId={teamId}
                            players={players}
                            join={joinTeam}
                        />
                    </div>,
                    teamId !== lastTeam &&
                    <div {...css({fontSize: "2em", padding: "24px", display: "flex", alignItems: "center"})}>
                        VS
                    </div>]),
                R.values)(teams)}
        </div>
    )
};

export const WaitingPlayers = ({currentUserId, players}) => {
    return (
        <div {...css({marginLeft: '4px'})}>
            <h3>Waiting...</h3>
            <div {...css({display: "flex", flexWrap: true})}>
                {players.map(({id, name, isReady, teamId}) =>
                    <Player
                        key={id}
                        isCurrent={currentUserId === id}
                        name={name}
                        isReady={isReady}
                        hasTeam={teamId !== undefined}
                    />
                )}
            </div>
        </div>
    )
};

export const RoomView = ({
    currentUserId,
    roomId,
    players,
    leaveRoom,
    getReady,
    joinTeam,
}) => {

    const currentUser = players.find(x => x.id === currentUserId)

    const teams = R.pipe(
        R.filter(({teamId}) => teamId !== undefined),
        R.groupBy(x => x.teamId),
        sortObject
    )(players)

    const waitingPlayers =
        players.filter(({teamId}) => teamId === undefined)

    return (
        <div {...css({
            display: "flex",
            margin: '12px',
            fontFamily: 'Roboto',
            maxWidth: '800px',
            background: '#EEE',
            padding: '24px',
            filter: 'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.5))',
            flexDirection: "column"})}>
            <Teams
                currentUser={currentUser}
                teams={teams}
                joinTeam={teamId => joinTeam(currentUser.id, roomId, teamId)}
            />
            <WaitingPlayers
                currentUserId={currentUser.id}
                players={waitingPlayers}
            />
            <div {...css({marginLeft: '4px', marginTop: '12px'})}>
                <RaisedButton
                    disabled={currentUser.teamId == undefined || currentUser.isReady}
                    onClick={() => getReady(currentUser.id, roomId)}
                    backgroundColor={'rgb(255, 235, 59)'}
                    label="Accept"
                    icon={<ActionVerifiedUser/>}/>
                <RaisedButton
                    style={{marginLeft: '8px'}}
                    disabled={currentUser.teamId == undefined || currentUser.isReady}
                    onClick={() => leaveRoom(currentUser.id, roomId)}
                    backgroundColor={'rgb(255, 235, 59)'}
                    label="Leave"
                    icon={<ArrowBack/>}/>
            </div>
        </div>
    )
};

export class Room extends Component {
    state = {
        players: [
        //   {id: '1', name: "Player 1", teamId: "A", isReady: false},
        //   {id: '2', name: "Player 2", teamId: "B", isReady: false},
        //   {id: '3', name: "Player 3", teamId: "A", isReady: true },
        //   {id: '4', name: "Player 4", teamId: undefined},
        //   {id: '5', name: "Player 5", teamId: "A", isReady: false},
        //   {id: '6', name: "Player 6", teamId: undefined},
        //   {id: '7', name: "Player 7", teamId: "B", isReady: true},
        ]
    }
    eventUnsubscribtions = [];
    
    componentDidMount() {
        this.fetchRoomDetails();
        this.eventUnsubscribtions.push(
            subscribeToEvent(
                roomEvents.createPlayerJoinedEvent,
                () => this.fetchRoomDetails())
        );
    }
    componentWillUnmount() {
        // this.eventUnsubscribtions.forEach(f => f());
        // this.eventUnsubscribtions = [];
    }
    fetchRoomDetails = () => {
        console.log("Room id %O", this.props.roomId)
        processAction(roomActions.createGetRoomDetailsAction(this.props.roomId))
        .then(players => {
            this.setState({players});
        })
    }

    updateUser = (userId, wholeState, oldUserState) => ({
        ...wholeState,
        players: [
            ...wholeState.players.filter(x => x.id !== userId),
            {...wholeState.players.find(x => x.id === userId), ...oldUserState}
        ]
    });
    leaveRoom = (userId, roomId) => {

    };
    getReady = (userId, roomId) => {
        this.setState(s => this.updateUser(userId, s, {isReady: true}));
    };
    joinTeam = (userId, roomId, teamId) => {
        this.setState(s => this.updateUser(userId, s, { teamId }))
    }

    render() {
        const { players } = this.state
        const { roomId, userId } = this.props
        console.log("User id %O", userId)
        console.log("Players: %O", players)
        return (
            <RoomView 
                roomId={roomId} 
                currentUserId={userId}
                players={players}
                leaveRoom={this.leaveRoom}
                getReady={this.getReady}
                joinTeam={this.joinTeam}
            />
        )
    }
}